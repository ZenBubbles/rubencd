"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useTransform, useMotionValueEvent, type MotionValue } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface HeroVideoRevealProps {
  scrollYProgress: MotionValue<number>;
  desktopBasePath?: string;
  mobileBasePath?: string;
  prefix?: string;
  extension?: string;
  frameCount?: number;
  startIndex?: number;
  padLength?: number;
  scrollStart?: number;
  scrollEnd?: number;
}

export function HeroVideoReveal({
  scrollYProgress,
  desktopBasePath = "/images/scroll-frames/desktop",
  mobileBasePath = "/images/scroll-frames/mobile",
  prefix = "frame-",
  extension = ".avif",
  frameCount = 120,
  startIndex = 1,
  padLength = 3,
  scrollStart = 0.38,
  scrollEnd = 0.85,
}: HeroVideoRevealProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const basePath = isDesktop ? desktopBasePath : mobileBasePath;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  const [framesLoaded, setFramesLoaded] = useState(false);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 1440, height: 810 });

  // Preload all frames on mount (effects only run client-side, so
  // useMediaQuery has already resolved from real matchMedia by this point)
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];

    const urls: string[] = [];
    for (let i = startIndex; i < startIndex + frameCount; i++) {
      const paddedIndex = String(i).padStart(padLength, "0");
      urls.push(`${basePath}/${prefix}${paddedIndex}${extension}`);
    }

    const promises = urls.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          images.push(img);
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = reject;
        }),
    );

    Promise.all(promises)
      .then((loaded) => {
        if (!cancelled) {
          framesRef.current = loaded;
          const first = loaded[0];
          if (first) {
            setCanvasDimensions({ width: first.naturalWidth, height: first.naturalHeight });
          }
          setFramesLoaded(true);
        }
      })
      .catch(() => {
        // Frames failed to load — stay hidden, fallback image remains visible
      });

    return () => {
      cancelled = true;
      // Abort in-flight image downloads
      for (const img of images) {
        img.src = "";
      }
      framesRef.current = [];
      setFramesLoaded(false);
    };
  }, [basePath, prefix, extension, frameCount, startIndex, padLength]);

  // Draw a specific frame to the canvas with cover-fit logic
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const frames = framesRef.current;
    const frame = frames[index];
    if (!frame) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const bufferW = Math.round(rect.width * dpr);
    const bufferH = Math.round(rect.height * dpr);

    // Only resize the canvas buffer when dimensions actually change
    // Setting canvas.width/height clears content and triggers layout
    if (canvasSizeRef.current.width !== bufferW || canvasSizeRef.current.height !== bufferH) {
      canvas.width = bufferW;
      canvas.height = bufferH;
      canvasSizeRef.current = { width: bufferW, height: bufferH };
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Cover-fit calculation
    const canvasAspect = rect.width / rect.height;
    const imgAspect = frame.naturalWidth / frame.naturalHeight;

    let sx: number, sy: number, sw: number, sh: number;

    if (imgAspect > canvasAspect) {
      // Image is wider — crop sides
      sh = frame.naturalHeight;
      sw = sh * canvasAspect;
      sx = (frame.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      // Image is taller — crop top/bottom
      sw = frame.naturalWidth;
      sh = sw / canvasAspect;
      sx = 0;
      sy = (frame.naturalHeight - sh) / 2;
    }

    ctx.drawImage(frame, sx, sy, sw, sh, 0, 0, rect.width, rect.height);
  }, []);

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [scrollStart, scrollEnd], [0, frameCount - 1]);

  // Draw frame on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    const clamped = Math.max(0, Math.min(frameCount - 1, index));

    if (clamped === currentFrameRef.current) return;
    currentFrameRef.current = clamped;

    drawFrame(clamped);
  });

  // Draw initial frame when frames finish loading
  useEffect(() => {
    if (!framesLoaded) return;
    const index = Math.round(frameIndex.get());
    const clamped = Math.max(0, Math.min(frameCount - 1, index));
    currentFrameRef.current = clamped;
    drawFrame(clamped);
  }, [framesLoaded, frameIndex, frameCount, drawFrame]);

  // Debounced resize handler
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      resizeTimerRef.current = setTimeout(() => {
        if (currentFrameRef.current >= 0) {
          drawFrame(currentFrameRef.current);
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      framesRef.current = [];
    };
  }, [drawFrame]);

  if (!framesLoaded) return null;

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Sunset birds animation"
      width={canvasDimensions.width}
      height={canvasDimensions.height}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}
