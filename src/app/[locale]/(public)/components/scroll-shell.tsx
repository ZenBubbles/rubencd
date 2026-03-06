"use client";

import { useTransform, motionValue, motion } from "motion/react";
import { Hero } from "./hero";
import { useScrollProgress } from "./scroll-context";

const STATIC_ONE = motionValue(1);

interface ScrollShellProps {
  children: React.ReactNode;
}

export function ScrollShell({ children }: ScrollShellProps) {
  const { scrollProgress, setScrollProgress } = useScrollProgress();

  const contentOpacity = useTransform(scrollProgress ?? STATIC_ONE, [0.6, 0.68], [0, 1]);

  return (
    <div className="w-full flex-grow">
      <Hero onScrollProgress={setScrollProgress} />
      <motion.div style={{ opacity: contentOpacity }}>{children}</motion.div>
    </div>
  );
}
