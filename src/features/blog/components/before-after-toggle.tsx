"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const WITHOUT_SKILL = `We are looking for a Senior Designer to join our growing team. The ideal candidate will have 5+ years of experience in product design, strong proficiency in Figma, and excellent communication skills. You will collaborate cross-functionally with engineering and product teams to deliver intuitive, user-centered designs. We offer competitive compensation, comprehensive benefits, and a collaborative work environment. If you are passionate about design and want to make an impact, we would love to hear from you.`;

const WITH_SKILL = `We are 40 people building software that helps chefs run their kitchens without losing their minds. Our users have burns on their forearms and tickets printing at 9pm on a Friday. They do not care about our design system. They care about whether the thing works when the dinner rush hits. We need a senior designer who gets that. Someone who has shipped real products, not just polished case studies. Someone who would rather watch a line cook struggle with an iPad than sit in a three hour brainstorm about button radius. You will own how our product looks, feels, and works. You will talk to chefs. A lot. If your portfolio is mostly theoretical redesigns of Spotify, this is probably not your gig. If you have ever designed something that a stressed out person needed to understand in two seconds, let's talk.`;

export function BeforeAfterToggle() {
  const [hasSkill, setHasSkill] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="my-12 md:my-20">
      <div
        className="mb-6 flex items-center justify-center gap-1 rounded-full bg-[#f0f0ec] p-1 md:mx-auto md:max-w-md"
        role="radiogroup"
        aria-label="Compare Claude output"
      >
        <button
          onClick={() => setHasSkill(false)}
          role="radio"
          aria-checked={!hasSkill}
          className={`flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            !hasSkill
              ? "bg-[#b91c1c] text-white shadow-lg"
              : "bg-[#b91c1c]/10 text-[#b91c1c] hover:bg-[#b91c1c]/20"
          }`}
        >
          Without Skill
        </button>
        <button
          onClick={() => setHasSkill(true)}
          role="radio"
          aria-checked={hasSkill}
          className={`flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            hasSkill
              ? "bg-[#15803d] text-white shadow-lg"
              : "bg-[#15803d]/10 text-[#15803d] hover:bg-[#15803d]/20"
          }`}
        >
          With Skill
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm md:p-10">
        <div
          className={`absolute top-0 left-0 h-1 w-full transition-colors duration-500 ${
            hasSkill ? "bg-[#15803d]" : "bg-[#b91c1c]"
          }`}
        />

        <div className="mb-4 flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white transition-colors duration-500 ${
              hasSkill ? "bg-[#15803d]" : "bg-[#b91c1c]"
            }`}
            aria-hidden="true"
          >
            {hasSkill ? "S" : "G"}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a1a1a]">
              {hasSkill ? "Claude + Company Voice Skill" : "Claude (generic)"}
            </p>
            <p className="text-xs text-[#737373]">
              Prompt: &ldquo;Write a job posting for a senior designer at a scrappy 40-person
              startup that builds tools for chefs.&rdquo;
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={hasSkill ? "with" : "without"}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className={`text-base leading-[1.9] font-light transition-colors duration-500 md:text-lg ${
                hasSkill ? "text-[#1a1a1a]" : "text-[#737373]"
              }`}
            >
              &ldquo;{hasSkill ? WITH_SKILL : WITHOUT_SKILL}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>

        {hasSkill && (
          <motion.p
            className="mt-6 text-center text-xs font-medium tracking-widest text-[#15803d] uppercase"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Same Claude. Same prompt. One had a skill.
          </motion.p>
        )}
      </div>
    </div>
  );
}
