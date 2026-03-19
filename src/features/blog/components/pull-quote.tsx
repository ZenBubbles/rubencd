"use client";

import { motion, useReducedMotion } from "motion/react";

interface PullQuoteProps {
  children: React.ReactNode;
  accent?: string;
}

export function PullQuote({ children, accent = "#12271d" }: PullQuoteProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.blockquote
      className="relative my-16 rounded-2xl border border-[#e5e5e5] bg-white px-6 py-8 shadow-sm md:my-24 md:border-0 md:bg-transparent md:py-8 md:pr-0 md:pl-12 md:shadow-none"
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute top-0 left-0 hidden h-full w-1 rounded-full md:block"
        style={{ backgroundColor: accent }}
        initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      {/* Mobile top accent bar */}
      <motion.div
        className="absolute top-0 right-0 left-0 h-1 rounded-t-2xl md:hidden"
        style={{ backgroundColor: accent }}
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      <p className="text-xl leading-relaxed font-light text-[#3a3a3a] md:font-serif md:text-2xl lg:text-3xl">
        {children}
      </p>
    </motion.blockquote>
  );
}
