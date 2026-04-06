"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { PostCardData } from "../types";
import { PostCard } from "./post-card";

interface CategoryTabsProps {
  posts: PostCardData[];
  allLabel?: string;
}

const CATEGORIES = [
  { slug: "my-views", label: "My Views" },
  { slug: "my-guides", label: "My Guides" },
  { slug: "builder-notes", label: "Builder Notes" },
] as const;

function SkillsCard() {
  return (
    <article className="group flex flex-col">
      <Link
        href="/blog/claude-skills"
        className="flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-[#E5E5E5]/80 bg-white transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-[#12271d]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf8] focus-visible:outline-none"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
          <Image
            src="/images/iphone_skills_comparison_v2.svg"
            alt="Comparison of two smartphones: one empty representing Claude without skills, one loaded with skill apps"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center gap-3 text-xs tracking-widest text-[#999]">
            <span className="font-semibold text-[#12271d] uppercase">AI Skills</span>
            <span className="text-[#d4d4d4]">/</span>
            <span>Mar 19, 2026</span>
          </div>

          <h3 className="mb-4 font-serif text-[1.375rem] leading-[1.3] font-light text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#12271d]">
            Claude Without Skills Is Like a Smartphone Without Apps
          </h3>

          <p className="mb-6 line-clamp-3 text-[14px] leading-[1.8] font-light text-[#707070]">
            Skills are the unlock that turns Claude from a generic chatbot into a personalized
            thinking partner. Learn what they are, why they matter, and how to build your own.
          </p>

          <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E5]/60 pt-5">
            <span className="text-[11px] font-medium tracking-[0.1em] text-[#999] uppercase">
              8 min read
            </span>
            <span className="h-px flex-1 bg-[#E5E5E5]/40" />
            <span className="h-px w-6 bg-[#1a1a1a] transition-all duration-300 group-hover:w-10 group-hover:bg-[#12271d]" />
          </div>
        </div>
      </Link>
    </article>
  );
}

function TmuxCard() {
  return (
    <article className="group flex flex-col">
      <Link
        href="/blog/tmux-is-your-cockpit"
        className="flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-[#E5E5E5]/80 bg-white transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-[#12271d]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf8] focus-visible:outline-none"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
          <div className="flex h-full items-center justify-center p-6">
            <div className="w-full max-w-[280px] rounded-lg border border-[#333] bg-[#1a1a1a] p-3">
              <div className="mb-2 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </div>
              <div className="grid grid-cols-2 gap-px bg-[#444]">
                <div className="bg-[#0d0d0d] p-1.5 font-mono text-[6px] text-[#bd93f9]">
                  claude code
                </div>
                <div className="bg-[#0d0d0d] p-1.5 font-mono text-[6px] text-[#8be9fd]">
                  codex review
                </div>
                <div className="col-span-2 bg-[#0d0d0d] p-1.5 font-mono text-[6px] text-[#50fa7b]">
                  test suite ✓
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center gap-3 text-xs tracking-widest text-[#999]">
            <span className="font-semibold text-[#12271d] uppercase">My Guides</span>
            <span className="text-[#d4d4d4]">/</span>
            <span>Apr 5, 2026</span>
          </div>

          <h3 className="mb-4 font-serif text-[1.375rem] leading-[1.3] font-light text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#12271d]">
            You&apos;re Running 4 Terminal Windows in 2026. A 10x Engineer Just Walked Past Your
            Screen and Laughed.
          </h3>

          <p className="mb-6 line-clamp-3 text-[14px] leading-[1.8] font-light text-[#707070]">
            The difference is not talent. It is Tmux. Why the terminal multiplexer is your cockpit
            in the AI agent era.
          </p>

          <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E5]/60 pt-5">
            <span className="text-[11px] font-medium tracking-[0.1em] text-[#999] uppercase">
              7 min read
            </span>
            <span className="h-px flex-1 bg-[#E5E5E5]/40" />
            <span className="h-px w-6 bg-[#1a1a1a] transition-all duration-300 group-hover:w-10 group-hover:bg-[#12271d]" />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function CategoryTabs({ posts, allLabel = "All" }: CategoryTabsProps) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? posts.filter((p) => p.categories.some((c) => c.slug === active))
    : posts;

  // Show static cards when "All" tab or matching category is active
  const showSkillsCard = active === null || active === "my-guides";
  const showTmuxCard = active === null || active === "my-guides";

  return (
    <div>
      {/* Editorial tab bar — understated, typographic */}
      <div
        className="mb-16 flex items-center gap-8 border-b border-[#E5E5E5]/60"
        role="tablist"
        aria-label="Filter by category"
      >
        <button
          role="tab"
          aria-selected={active === null}
          onClick={() => setActive(null)}
          className={`relative cursor-pointer pb-4 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 focus-visible:outline-none ${
            active === null ? "text-[#1a1a1a]" : "text-[#999] hover:text-[#525252]"
          }`}
        >
          {allLabel}
          {active === null && (
            <span className="absolute right-0 bottom-0 left-0 h-px bg-[#1a1a1a]" />
          )}
        </button>
        {CATEGORIES.map(({ slug, label }) => {
          const isActive = active === slug;
          return (
            <button
              key={slug}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(slug)}
              className={`relative cursor-pointer pb-4 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 focus-visible:outline-none ${
                isActive ? "text-[#1a1a1a]" : "text-[#999] hover:text-[#525252]"
              }`}
            >
              {label}
              {isActive && <span className="absolute right-0 bottom-0 left-0 h-px bg-[#1a1a1a]" />}
            </button>
          );
        })}
      </div>

      <div role="tabpanel">
        {filtered.length === 0 && !showSkillsCard && !showTmuxCard ? (
          <p className="py-20 text-center font-serif text-lg font-light text-[#999] italic">
            No articles in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
            {showTmuxCard && <TmuxCard />}
            {showSkillsCard && <SkillsCard />}
            {filtered.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
