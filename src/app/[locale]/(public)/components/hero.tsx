"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { useTranslations } from "next-intl";

interface AnimatedNameProps {
  text: string;
  style: React.CSSProperties;
  startDelay: number;
  letterStyle?: React.CSSProperties;
}

function AnimatedName({ text, style, startDelay, letterStyle }: AnimatedNameProps) {
  const letters = text.split("");

  return (
    <span style={{ ...style, display: "flex", justifyContent: "center" }} aria-hidden="true">
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: startDelay + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block", ...letterStyle }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

interface HeroProps {
  onScrollProgress?: (progress: MotionValue<number>) => void;
}

export function Hero({ onScrollProgress }: HeroProps) {
  const t = useTranslations("hero");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    onScrollProgress?.(scrollYProgress);
  }, [scrollYProgress, onScrollProgress]);

  // Container zoom: starts at 90% and grows to fill viewport (0% → 35%)
  const containerScale = useTransform(
    scrollYProgress,
    [0, 0.35],
    prefersReducedMotion ? [1, 1] : [0.9, 1.0],
  );

  // Name fadeout (0% → 12%)
  const nameOpacity = useTransform(
    scrollYProgress,
    [0, 0.12],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );
  const nameY = useTransform(scrollYProgress, [0, 0.12], prefersReducedMotion ? [0, 0] : [0, -60]);

  // Overlays
  const bottomGradientOpacity = useTransform(scrollYProgress, [0.08, 0.25], [1, 0]);
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );
  const vignetteWidth = useTransform(
    scrollYProgress,
    [0, 0.35],
    prefersReducedMotion ? ["40%", "40%"] : ["40%", "50%"],
  );
  const grainOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0.6, 0]);

  // Split (35% → 65%)
  const leftX = useTransform(
    scrollYProgress,
    [0.25, 0.75],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-105%"],
  );
  const rightX = useTransform(
    scrollYProgress,
    [0.25, 0.75],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "105%"],
  );
  const splitShadowOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.45, 0.65],
    prefersReducedMotion ? [0, 0, 0] : [0, 1, 0],
  );

  // Background transition: dark → light during split
  const bgColor = useTransform(scrollYProgress, [0.25, 0.6], ["#111111", "#FAFAF8"]);

  return (
    <div ref={wrapperRef} style={{ height: "500vh", position: "relative" }}>
      <motion.div
        className="sticky top-0 h-dvh overflow-hidden"
        style={{
          backgroundColor: bgColor,
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Image container — scales from 0.9 to 1.0 */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            scale: containerScale,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          {/* Left image half */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "inset(0 50% 0 0)",
              x: leftX,
              zIndex: 10,
            }}
          >
            <Image
              src="/images/hero.png"
              alt="Ruben Christoffer Damsgaard"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top md:object-contain md:object-bottom"
              style={{
                filter: "brightness(0.95) contrast(1.05)",
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset -4px 0 20px rgba(0,0,0,0.4)",
                opacity: splitShadowOpacity,
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* Right image half */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "inset(0 0 0 50%)",
              x: rightX,
              zIndex: 10,
            }}
          >
            <Image
              src="/images/hero.png"
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
              className="object-cover object-top md:object-contain md:object-bottom"
              style={{
                filter: "brightness(0.95) contrast(1.05)",
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset 4px 0 20px rgba(0,0,0,0.4)",
                opacity: splitShadowOpacity,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Left vignette */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: vignetteWidth,
            height: "100%",
            background:
              "linear-gradient(to right, rgba(20,20,18,0.85) 0%, rgba(40,40,35,0.6) 30%, rgba(100,100,90,0.3) 60%, transparent 100%)",
            zIndex: 22,
            pointerEvents: "none",
            opacity: vignetteOpacity,
          }}
        />

        {/* Right vignette */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: vignetteWidth,
            height: "100%",
            background:
              "linear-gradient(to left, rgba(20,20,18,0.85) 0%, rgba(40,40,35,0.6) 30%, rgba(100,100,90,0.3) 60%, transparent 100%)",
            zIndex: 22,
            pointerEvents: "none",
            opacity: vignetteOpacity,
          }}
        />

        {/* Top vignette */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(to bottom, rgba(20,20,18,0.4) 0%, transparent 100%)",
            zIndex: 22,
            pointerEvents: "none",
            opacity: vignetteOpacity,
          }}
        />

        {/* Bottom gradient */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, #FAFAF8 0%, transparent 100%)",
            zIndex: 22,
            pointerEvents: "none",
            opacity: bottomGradientOpacity,
          }}
        />

        {/* Grain overlay */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
            pointerEvents: "none",
            zIndex: 25,
            opacity: grainOpacity,
          }}
        />

        {/* Name container */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            zIndex: 30,
            pointerEvents: "none",
            userSelect: "none",
            width: "100%",
            opacity: nameOpacity,
            y: nameY,
          }}
        >
          <h1
            data-hero-name
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              lineHeight: "0.85",
              textAlign: "center",
            }}
            aria-label={t("ariaLabel")}
          >
            <AnimatedName
              text="RUBEN"
              startDelay={0.3}
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(60px, 10vw, 160px)",
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
                width: "100%",
                margin: 0,
                padding: 0,
              }}
              letterStyle={{
                background: "linear-gradient(to bottom, #1a1a1a, #6b7280)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            />
            <AnimatedName
              text="CHRISTOFFER"
              startDelay={0.5}
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(60px, 10vw, 160px)",
                color: "#1a1a1a",
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
                width: "100%",
                margin: 0,
                marginTop: "-2vw",
                padding: 0,
              }}
            />
            <AnimatedName
              text="DAMSGAARD"
              startDelay={0.95}
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(60px, 10vw, 160px)",
                color: "#9ca3af",
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
                width: "100%",
                margin: 0,
                marginTop: "-2vw",
                marginBottom: "2vw",
                padding: 0,
              }}
            />
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
}
