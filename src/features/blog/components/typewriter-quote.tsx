"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface TypewriterQuoteProps {
  text: string;
  className?: string;
}

export function TypewriterQuote({ text, className = "" }: TypewriterQuoteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayedChars, setDisplayedChars] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? text.length
      : 0,
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!isInView) return;

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setDisplayedChars(current);
      if (current >= text.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [isInView, text, prefersReducedMotion]);

  return (
    <div ref={ref} className={className} aria-label={text}>
      <span className="font-serif text-3xl leading-tight font-medium text-[#1a1a1a] md:text-5xl lg:text-6xl">
        {text.slice(0, displayedChars)}
        {displayedChars < text.length && isInView && (
          <motion.span
            className="ml-0.5 inline-block h-[1em] w-[3px] bg-[#12271d] align-text-bottom"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            aria-hidden="true"
          />
        )}
      </span>
    </div>
  );
}
