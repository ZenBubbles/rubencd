"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const APP_COLORS = [
  "#7F77DD",
  "#1D9E75",
  "#D85A30",
  "#378ADD",
  "#D4537E",
  "#639922",
  "#BA7517",
  "#E24B4A",
  "#534AB7",
  "#993556",
  "#0F6E56",
  "#854F0B",
];

const APP_LABELS = [
  "Blog writer",
  "Email tone",
  "Job posts",
  "Reports",
  "Social",
  "Code review",
  "Proposals",
  "Support",
  "Analytics",
  "New skill",
  "Uploads",
  "Scheduler",
];

function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-[220px] rounded-[36px] border-2 border-[#48484a] bg-[#1c1c1e] p-2 md:w-[260px] ${className}`}
    >
      <div className="relative h-[400px] overflow-hidden rounded-[28px] bg-[#0a0a0a] md:h-[460px]">
        {/* Dynamic Island */}
        <div className="absolute top-[10px] left-1/2 z-10 h-[22px] w-[66px] -translate-x-1/2 rounded-full bg-black" />
        {/* Status bar */}
        <span className="absolute top-[18px] left-[22px] z-10 text-[13px] font-medium text-white">
          9:41
        </span>
        {children}
      </div>
    </div>
  );
}

function EmptyPhone() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-[11px] text-[#333] opacity-30">No apps installed</p>
        <p className="mt-1 text-[9px] text-[#333] opacity-20">Swipe to search</p>
      </div>
      {/* Empty dock */}
      <div className="absolute right-[16px] bottom-[24px] left-[16px] h-[40px] rounded-[18px] bg-white/[0.08]" />
    </PhoneFrame>
  );
}

function LoadedPhone({
  isInView,
  prefersReduced,
}: {
  isInView: boolean;
  prefersReduced: boolean | null;
}) {
  return (
    <PhoneFrame>
      <div className="px-[16px] pt-[50px]">
        {/* App grid */}
        <div className="grid grid-cols-3 gap-x-[12px] gap-y-[18px] md:gap-x-[16px] md:gap-y-[22px]">
          {APP_COLORS.map((color, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1"
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.3 }}
              animate={
                isInView || prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }
              }
              transition={{
                duration: 0.4,
                delay: prefersReduced ? 0 : 0.6 + i * 0.08,
                ease: [0.175, 0.885, 0.32, 1.275],
              }}
            >
              <div
                className="h-[40px] w-[40px] rounded-[10px] md:h-[46px] md:w-[46px] md:rounded-[12px]"
                style={{ backgroundColor: color }}
              />
              <span className="text-[7px] text-white/85 md:text-[8px]">{APP_LABELS[i]}</span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Dock */}
      <div className="absolute right-[16px] bottom-[24px] left-[16px] flex h-[40px] items-center justify-around rounded-[18px] bg-white/[0.08] px-[10px]">
        {APP_COLORS.slice(0, 4).map((color, i) => (
          <motion.div
            key={i}
            className="h-[28px] w-[28px] rounded-[7px] md:h-[30px] md:w-[30px]"
            style={{ backgroundColor: color }}
            initial={prefersReduced ? {} : { opacity: 0, scale: 0 }}
            animate={
              isInView || prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 0.5,
              delay: prefersReduced ? 0 : 1.6 + i * 0.1,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
          />
        ))}
      </div>
    </PhoneFrame>
  );
}

export function PhoneComparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-150px" });
  const prefersReduced = useReducedMotion();

  return (
    <div
      ref={containerRef}
      className="my-16 md:my-24"
      role="figure"
      aria-label="Comparison of two smartphones: one empty with no apps representing Claude without skills, and one loaded with 12 skill apps like Blog Writer, Email Tone, Code Review, representing Claude with skills installed."
    >
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
        {/* Left phone - empty */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
          animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <EmptyPhone />
          <p className="mt-4 text-center text-sm font-medium text-[#a3a3a3]">Claude</p>
          <p className="text-center text-xs text-[#a3a3a3]/60">Smart, but starting from zero.</p>
        </motion.div>

        {/* VS divider */}
        <motion.span
          className="text-xl font-medium text-[#a3a3a3]/40 md:text-2xl"
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={isInView || prefersReduced ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          aria-hidden="true"
        >
          vs
        </motion.span>

        {/* Right phone - loaded */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
          animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <LoadedPhone isInView={isInView} prefersReduced={prefersReduced} />
          <p className="mt-4 text-center text-sm font-medium text-[#c2c0b6]">Claude + Skills</p>
          <p className="text-center text-xs text-[#888]">Your expertise, installed.</p>
        </motion.div>
      </div>
    </div>
  );
}
