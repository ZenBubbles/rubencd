"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { VideoScrollAnimationProps } from "../types";

gsap.registerPlugin(ScrollTrigger);

function subscribePrefersReducedMotion(callback: () => void): () => void {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshotPrefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshotPrefersReducedMotion(): boolean {
  return false;
}

/**
 * Extracts frames from a video by seeking through it and capturing each frame
 * to an offscreen canvas. Returns an array of ImageBitmap objects.
 */
async function extractFrames(
  videoUrl: string,
  numFrames: number,
  onProgress: (percent: number) => void,
  signal: { cancelled: boolean },
): Promise<ImageBitmap[]> {
  const video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = videoUrl;

  await new Promise<void>((resolve, reject) => {
    video.onloadeddata = () => resolve();
    video.onerror = () => reject(new Error("Failed to load video"));
  });

  if (signal.cancelled) return [];

  const duration = video.duration;
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for offscreen canvas");

  const frames: ImageBitmap[] = [];

  for (let i = 0; i < numFrames; i++) {
    if (signal.cancelled) break;

    const time = (i / (numFrames - 1)) * duration;
    video.currentTime = time;

    await new Promise<void>((resolve) => {
      video.onseeked = () => resolve();
    });

    ctx.drawImage(video, 0, 0);
    const bitmap = await createImageBitmap(canvas);
    frames.push(bitmap);

    onProgress(Math.round(((i + 1) / numFrames) * 100));
  }

  // Clean up video element
  video.src = "";
  video.load();

  return frames;
}

/**
 * Draws a frame to the visible canvas using cover-fit logic.
 * Calculates source rect so the image fills the canvas while preserving aspect ratio.
 */
export function drawFrame(
  ctx: CanvasRenderingContext2D,
  frame: ImageBitmap,
  canvasWidth: number,
  canvasHeight: number,
  dpr: number,
): void {
  const frameAspect = frame.width / frame.height;
  const canvasAspect = canvasWidth / canvasHeight;

  let sx: number, sy: number, sw: number, sh: number;

  if (frameAspect > canvasAspect) {
    // Frame is wider — crop sides
    sh = frame.height;
    sw = frame.height * canvasAspect;
    sx = (frame.width - sw) / 2;
    sy = 0;
  } else {
    // Frame is taller — crop top/bottom
    sw = frame.width;
    sh = frame.width / canvasAspect;
    sx = 0;
    sy = (frame.height - sh) / 2;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.drawImage(frame, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);
}

export function VideoScrollAnimation({
  videoUrl,
  numFrames = 120,
  scrollHeight = 300,
  scrub = 1,
}: VideoScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const currentFrameRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [progress, setProgress] = useState(0);
  const [extractionDone, setExtractionDone] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getSnapshotPrefersReducedMotion,
    getServerSnapshotPrefersReducedMotion,
  );

  const isLoading = !prefersReducedMotion && !extractionDone;

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frame = framesRef.current[currentFrameRef.current];
    if (frame) {
      drawFrame(ctx, frame, width, height, dpr);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const signal = { cancelled: false };

    async function init() {
      try {
        const frames = await extractFrames(videoUrl, numFrames, setProgress, signal);
        if (signal.cancelled || frames.length === 0) return;

        framesRef.current = frames;

        // Size canvas and draw first frame
        sizeCanvas();

        setExtractionDone(true);

        // Create GSAP animation
        const frameObj = { frame: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub,
            invalidateOnRefresh: true,
          },
        });

        tl.to(frameObj, {
          frame: frames.length - 1,
          ease: "none",
          onUpdate: () => {
            if (signal.cancelled) return;

            const index = Math.round(frameObj.frame);
            if (index === currentFrameRef.current) return;

            currentFrameRef.current = index;
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const currentFrame = framesRef.current[index];
            if (!currentFrame) return;

            const dpr = window.devicePixelRatio || 1;
            drawFrame(ctx, currentFrame, canvas.clientWidth, canvas.clientHeight, dpr);
          },
        });

        timelineRef.current = tl;

        if (tl.scrollTrigger) {
          scrollTriggerRef.current = tl.scrollTrigger;
        }
      } catch (err) {
        if (!signal.cancelled) {
          console.error("Failed to extract video frames:", err);
        }
      }
    }

    void init();

    // Debounced resize handler
    function handleResize() {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      resizeTimerRef.current = setTimeout(() => {
        sizeCanvas();
      }, 150);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      signal.cancelled = true;
      window.removeEventListener("resize", handleResize);

      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      for (const frame of framesRef.current) {
        frame.close();
      }
      framesRef.current = [];
    };
  }, [videoUrl, numFrames, scrub, sizeCanvas, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section className="relative" style={{ height: "100vh" }}>
        <video
          src={videoUrl}
          className="sticky top-0 h-dvh w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Sunset with birds video - scroll animation disabled due to reduced motion preference"
        />
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative" style={{ height: `${scrollHeight}vh` }}>
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          role="status"
          aria-live="polite"
        >
          <p className="text-lg font-medium text-white">Extracting frames... {progress}%</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className="sticky top-0 h-dvh w-full"
        role="img"
        aria-label="Scroll-driven video animation of a sunset with birds"
      />
    </section>
  );
}
