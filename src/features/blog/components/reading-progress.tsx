"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#7F77DD] via-[#1D9E75] to-[#D85A30]"
      style={{ scaleX }}
      role="progressbar"
      aria-label="Reading progress"
    />
  );
}
