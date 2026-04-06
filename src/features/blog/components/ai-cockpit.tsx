"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// ---------------------------------------------------------------------------
// Pane content definitions — each line is a React node array
// ---------------------------------------------------------------------------

function buildClaudeLines(): React.ReactNode[][] {
  return [
    [
      <span key="b" className="text-[#bd93f9]">
        {"●"}
      </span>,
      " Building auth module...",
    ],
    [""],
    [
      <span key="c1" className="text-[#999]">
        Created
      </span>,
      " ",
      <span key="f1" className="text-[#f1fa8c]">
        auth/middleware.ts
      </span>,
    ],
    [
      <span key="c2" className="text-[#999]">
        Created
      </span>,
      " ",
      <span key="f2" className="text-[#f1fa8c]">
        auth/validate.ts
      </span>,
    ],
    [
      <span key="c3" className="text-[#999]">
        Created
      </span>,
      " ",
      <span key="f3" className="text-[#f1fa8c]">
        auth/tokens.ts
      </span>,
    ],
    [
      <span key="u1" className="text-[#999]">
        Updated
      </span>,
      " ",
      <span key="f4" className="text-[#f1fa8c]">
        routes/index.ts
      </span>,
    ],
    [""],
    [
      <span key="g1" className="text-[#50fa7b]">
        {"✓"}
      </span>,
      " JWT validation added",
    ],
    [
      <span key="g2" className="text-[#50fa7b]">
        {"✓"}
      </span>,
      " Rate limiting configured",
    ],
    [
      <span key="b2" className="text-[#bd93f9]">
        {"●"}
      </span>,
      " Writing tests...",
    ],
  ];
}

function buildCodexLines(): React.ReactNode[][] {
  return [
    [
      <span key="b" className="text-[#8be9fd]">
        {"●"}
      </span>,
      " Reviewing PR #247...",
    ],
    [""],
    [
      <span key="o1" className="text-[#ffb86c]">
        src/api/users.ts:42
      </span>,
    ],
    [
      "  ",
      <span key="w1" className="text-[#f1fa8c]">
        {"⚠"}
      </span>,
      " Missing null check on",
    ],
    [
      "    ",
      <span key="p1" className="text-[#8be9fd]">
        user.permissions
      </span>,
    ],
    [""],
    [
      <span key="o2" className="text-[#ffb86c]">
        src/api/users.ts:87
      </span>,
    ],
    [
      "  ",
      <span key="w2" className="text-[#f1fa8c]">
        {"⚠"}
      </span>,
      " SQL query not parameterized",
    ],
    ["    Risk: injection"],
    [""],
    [
      <span key="g1" className="text-[#50fa7b]">
        {"✓"}
      </span>,
      " 2 issues found, 0 critical",
    ],
    [
      <span key="b2" className="text-[#8be9fd]">
        {"●"}
      </span>,
      " Generating fix...",
    ],
  ];
}

function buildTestLines(): React.ReactNode[][] {
  return [
    [
      <span key="d" className="text-[#50fa7b]">
        $
      </span>,
      " npm test -- --watch",
    ],
    [""],
    [
      " ",
      <span key="p" className="text-[#50fa7b]">
        PASS
      </span>,
      "  auth/middleware.test.ts",
    ],
    [
      "   ",
      <span key="t1" className="text-[#50fa7b]">
        {"✓"}
      </span>,
      " validates JWT tokens ",
      <span key="m1" className="text-[#999]">
        (4ms)
      </span>,
      "     ",
      <span key="t2" className="text-[#50fa7b]">
        {"✓"}
      </span>,
      " rejects expired tokens ",
      <span key="m2" className="text-[#999]">
        (2ms)
      </span>,
      "     ",
      <span key="t3" className="text-[#50fa7b]">
        {"✓"}
      </span>,
      " handles missing auth header ",
      <span key="m3" className="text-[#999]">
        (1ms)
      </span>,
      "     ",
      <span key="t4" className="text-[#50fa7b]">
        {"✓"}
      </span>,
      " rate limits by IP ",
      <span key="m4" className="text-[#999]">
        (3ms)
      </span>,
    ],
    [""],
    [
      <span key="tl" className="text-[#8be9fd]">
        Tests:
      </span>,
      "  ",
      <span key="tp" className="text-[#50fa7b]">
        4 passed
      </span>,
      ", 4 total    ",
      <span key="ti" className="text-[#8be9fd]">
        Time:
      </span>,
      "   0.847s    ",
      <span key="ww" className="text-[#999]">
        Watching for changes...
      </span>,
    ],
  ];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BlinkingDot({ color }: { color: string }) {
  return (
    <motion.span
      className="inline-block h-[5px] w-[5px] rounded-full"
      style={{ background: color }}
      animate={{ opacity: [1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
      aria-hidden="true"
    />
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      className="inline-block text-[#b0b0b0]"
      animate={{ opacity: [1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
      aria-hidden="true"
    >
      {"█"}
    </motion.span>
  );
}

function PaneLabel({ color, label }: { color: string; label: string }) {
  return (
    <div className="absolute top-[3px] right-[6px] z-10 flex items-center gap-[3px] font-mono text-[8px] opacity-80 md:text-[9px]">
      <BlinkingDot color={color} />
      <span style={{ color }}>{label}</span>
    </div>
  );
}

function AnimatedPane({
  lines,
  baseDelay,
  lineStagger,
  isInView,
  skipAnimation,
  showCursor,
  className = "",
  children,
}: {
  lines: React.ReactNode[][];
  baseDelay: number;
  lineStagger: number;
  isInView: boolean;
  skipAnimation: boolean;
  showCursor: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#0d0d0d] p-[5px_7px] font-mono text-[9px] leading-[1.45] whitespace-pre text-[#b0b0b0] md:text-[10px] ${className}`}
    >
      {children}
      {lines.map((lineContent, i) => {
        const isLast = i === lines.length - 1;
        return (
          <motion.div
            key={i}
            initial={skipAnimation ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={skipAnimation ? {} : { duration: 0.3, delay: baseDelay + i * lineStagger }}
          >
            {lineContent.map((node, j) => (
              <span key={j}>{node}</span>
            ))}
            {isLast && showCursor && <BlinkingCursor />}
          </motion.div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function AICockpit() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReduced = useReducedMotion();
  const skip = Boolean(prefersReduced);

  const claudeLines = buildClaudeLines();
  const codexLines = buildCodexLines();
  const testLines = buildTestLines();

  return (
    <div
      ref={ref}
      role="figure"
      aria-label="Tmux terminal showing three AI agents — Claude Code, Codex, and a test suite — running concurrently in separate panes"
      className="mx-auto w-full max-w-[680px]"
    >
      {/* Terminal frame */}
      <motion.div
        className="relative overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{ aspectRatio: "16 / 10" }}
        initial={skip ? {} : { opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={skip ? {} : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Traffic light dots */}
        <div className="absolute top-0 left-0 z-10 flex gap-[5px] p-[8px_10px]">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>

        {/* Pane grid */}
        <div className="absolute inset-x-0 top-[26px] bottom-[16px] grid grid-cols-2 grid-rows-2 gap-px bg-[#444]">
          {/* Pane 1 — Claude Code (top-left) */}
          <AnimatedPane
            lines={claudeLines}
            baseDelay={0.4}
            lineStagger={0.12}
            isInView={isInView}
            skipAnimation={skip}
            showCursor
          >
            <PaneLabel color="#bd93f9" label="claude code" />
          </AnimatedPane>

          {/* Pane 2 — Codex Review (top-right) */}
          <AnimatedPane
            lines={codexLines}
            baseDelay={0.6}
            lineStagger={0.12}
            isInView={isInView}
            skipAnimation={skip}
            showCursor
          >
            <PaneLabel color="#8be9fd" label="codex review" />
          </AnimatedPane>

          {/* Pane 3 — Test Suite (bottom, full width) */}
          <AnimatedPane
            lines={testLines}
            baseDelay={0.8}
            lineStagger={0.12}
            isInView={isInView}
            skipAnimation={skip}
            showCursor={false}
            className="col-span-2"
          >
            <PaneLabel color="#50fa7b" label="test suite" />
          </AnimatedPane>
        </div>

        {/* Status bar */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-[5] flex h-[16px] items-center bg-[#282a36] px-[6px] font-mono text-[8px] md:text-[9px]"
          initial={skip ? {} : { opacity: 0, y: 4 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={skip ? {} : { duration: 0.4, delay: 1.6 }}
        >
          <span className="rounded-sm bg-[#44475a] px-[5px] py-px text-[#f8f8f2]">0:feature</span>
          <span className="px-[5px] py-px text-[#b0b0b0]">1:hotfix</span>
          <span className="px-[5px] py-px text-[#b0b0b0]">2:infra</span>
          <span className="ml-auto text-[#50fa7b]">{"● session: dev"}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
