"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

function Dots({ className }: { className?: string }) {
  return (
    <div
      className={`absolute top-0 left-0 z-10 flex gap-[5px] px-[10px] py-[8px] ${className ?? ""}`}
      aria-hidden="true"
    >
      <span className="h-[8px] w-[8px] rounded-full bg-[#ff5f57]" />
      <span className="h-[8px] w-[8px] rounded-full bg-[#febc2e]" />
      <span className="h-[8px] w-[8px] rounded-full bg-[#28c840]" />
    </div>
  );
}

function MiniDots() {
  return (
    <div className="flex gap-[2px]" aria-hidden="true">
      <span className="h-[4px] w-[4px] rounded-full bg-[#555]" />
      <span className="h-[4px] w-[4px] rounded-full bg-[#555]" />
      <span className="h-[4px] w-[4px] rounded-full bg-[#555]" />
    </div>
  );
}

function MiniWindow({
  style,
  title,
  children,
  animate,
  delay,
}: {
  style: React.CSSProperties;
  title: string;
  children: React.ReactNode;
  animate: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute overflow-hidden rounded-[6px] border border-[#444] bg-[#0d0d0d] font-mono text-[10px] leading-[1.4] text-[#b0b0b0] md:text-[12px]"
      style={style}
      initial={animate ? { opacity: 0, scale: 0.9 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5, delay, ease: EASE_OUT_EXPO }}
    >
      <div className="flex items-center gap-[3px] border-b border-[#333] bg-[#222] px-[4px] py-[2px] text-[9px] text-[#999] md:text-[10px]">
        <MiniDots />
        <span>{title}</span>
      </div>
      <div className="overflow-hidden px-[4px] py-[3px] whitespace-pre">{children}</div>
    </motion.div>
  );
}

function ChaosTerminal({ animate }: { animate: boolean }) {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <motion.div
        className="relative h-[280px] w-full overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a] shadow-[0_4px_24px_rgba(0,0,0,0.3)] md:h-[360px]"
        initial={animate ? { opacity: 0, y: 40 } : false}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      >
        <Dots />

        {/* Window 1: npm run dev */}
        <MiniWindow
          style={{ top: "24px", left: "8px", width: "55%", height: "38%" }}
          title="bash"
          animate={animate}
          delay={0.3}
        >
          <span className="text-[#50fa7b]">$</span> npm run dev{"\n"}
          <span className="text-[#999]">Starting server...</span>
          {"\n"}
          <span className="text-[#999]">Listening on :3000</span>
          {"\n"}
          <span className="text-[#999]">GET / 200 12ms</span>
          {"\n"}
          <span className="text-[#999]">GET /api 200 8ms</span>
        </MiniWindow>

        {/* Window 2: tail -f logs */}
        <MiniWindow
          style={{ top: "38px", left: "30%", width: "50%", height: "35%" }}
          title="bash"
          animate={animate}
          delay={0.5}
        >
          <span className="text-[#50fa7b]">$</span> tail -f logs{"\n"}
          <span className="text-[#888]">...</span>
          {"\n"}
          <span className="text-[#888]">[ info] connected</span>
          {"\n"}
          <span className="text-[#888]">[ warn] timeout</span>
        </MiniWindow>

        {/* Window 3: empty bash */}
        <MiniWindow
          style={{ top: "58%", left: "5%", width: "48%", height: "34%" }}
          title="bash"
          animate={animate}
          delay={0.7}
        >
          <span className="text-[#50fa7b]">$</span> <span className="text-[#888]">{"\u2588"}</span>
          {"\n\n\n"}
          <span className="text-[#777]">{"// what was this for?"}</span>
        </MiniWindow>

        {/* Window 4: ssh prod-01 */}
        <MiniWindow
          style={{ top: "52%", left: "42%", width: "52%", height: "38%" }}
          title="bash"
          animate={animate}
          delay={0.9}
        >
          <span className="text-[#50fa7b]">$</span> ssh prod-01{"\n"}
          <span className="text-[#ff5555]">Connection reset</span>
          {"\n"}
          <span className="text-[#50fa7b]">$</span> ssh prod-01{"\n"}
          <span className="text-[#ff5555]">Connection reset</span>
          {"\n"}
          <span className="text-[#50fa7b]">$</span> <span className="text-[#888]">{"\u2588"}</span>
        </MiniWindow>

        {/* Floating annotations */}
        <motion.span
          className="absolute top-[30%] right-[8%] font-sans text-sm font-medium text-[#ff6b6b] opacity-90"
          style={{ transform: "rotate(-8deg)" }}
          initial={animate ? { opacity: 0 } : false}
          animate={animate ? { opacity: 0.9 } : undefined}
          transition={{ duration: 0.4, delay: 1.1 }}
          aria-hidden="true"
        >
          ???
        </motion.span>
        <motion.span
          className="absolute bottom-[18%] left-[22%] font-sans text-sm font-medium text-[#ff6b6b] opacity-90"
          style={{ transform: "rotate(5deg)" }}
          initial={animate ? { opacity: 0 } : false}
          animate={animate ? { opacity: 0.9 } : undefined}
          transition={{ duration: 0.4, delay: 1.3 }}
          aria-hidden="true"
        >
          which one?
        </motion.span>
      </motion.div>

      {/* Labels */}
      <motion.div
        className="text-center"
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <p className="text-[15px] font-medium text-white/90">Your setup</p>
        <p className="text-[12px] text-white/50">4 windows. 0 control.</p>
      </motion.div>
    </div>
  );
}

function TmuxTerminal({ animate }: { animate: boolean }) {
  const paneDelays = [0.8, 0.95, 1.1] as const;

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <motion.div
        className="relative h-[280px] w-full overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a] shadow-[0_4px_24px_rgba(0,0,0,0.3)] md:h-[360px]"
        initial={animate ? { opacity: 0, y: 40 } : false}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
      >
        <Dots />

        {/* Pane grid */}
        <div className="absolute top-[26px] right-0 bottom-[16px] left-0 grid grid-cols-2 grid-rows-2 gap-[1px] bg-[#444]">
          {/* Pane 0: code */}
          <motion.div
            className="relative overflow-hidden bg-[#0d0d0d] p-[4px_6px] font-mono text-[10px] leading-[1.4] whitespace-pre text-[#b0b0b0] md:text-[12px]"
            initial={animate ? { opacity: 0 } : false}
            animate={animate ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, delay: paneDelays[0] }}
          >
            <span className="absolute top-[3px] right-[5px] font-mono text-[9px] text-[#50fa7b] opacity-70 md:text-[10px]">
              0: code
            </span>
            <span className="text-[#bd93f9]">func</span>{" "}
            <span className="text-[#8be9fd]">handleAuth</span>(req) {"{\n"}
            {"  "}token := req.<span className="text-[#f1fa8c]">Header</span>
            {"\n  "}
            <span className="text-[#bd93f9]">if</span> token == &quot;&quot; {"{\n"}
            {"    "}
            <span className="text-[#bd93f9]">return</span>{" "}
            <span className="text-[#ff5555]">401</span>
            {"\n  }\n  "}user := <span className="text-[#8be9fd]">validate</span>(token)
            {"\n  "}
            <span className="text-[#bd93f9]">return</span> user{"\n}"}
          </motion.div>

          {/* Pane 1: server */}
          <motion.div
            className="relative overflow-hidden bg-[#0d0d0d] p-[4px_6px] font-mono text-[10px] leading-[1.4] whitespace-pre text-[#b0b0b0] md:text-[12px]"
            initial={animate ? { opacity: 0 } : false}
            animate={animate ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, delay: paneDelays[1] }}
          >
            <span className="absolute top-[3px] right-[5px] font-mono text-[9px] text-[#50fa7b] opacity-70 md:text-[10px]">
              1: server
            </span>
            <span className="text-[#50fa7b]">$</span> npm run dev{"\n"}
            <span className="text-[#8be9fd]">{"✓"}</span> Server on :3000{"\n"}
            <span className="text-[#999]">GET / 200 4ms</span>
            {"\n"}
            <span className="text-[#999]">POST /api 201 8ms</span>
            {"\n"}
            <span className="text-[#999]">GET /health 200 1ms</span>
            {"\n"}
            <span className="text-[#999]">GET /api 200 6ms</span>
          </motion.div>

          {/* Pane 2: logs (wide) */}
          <motion.div
            className="relative col-span-2 overflow-hidden bg-[#0d0d0d] p-[4px_6px] font-mono text-[10px] leading-[1.4] whitespace-pre text-[#b0b0b0] md:text-[12px]"
            initial={animate ? { opacity: 0 } : false}
            animate={animate ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, delay: paneDelays[2] }}
          >
            <span className="absolute top-[3px] right-[5px] font-mono text-[9px] text-[#50fa7b] opacity-70 md:text-[10px]">
              2: logs
            </span>
            <span className="text-[#999]">14:02:31</span>{" "}
            <span className="text-[#8be9fd]">[info]</span> db connected pool=5{"\n"}
            <span className="text-[#999]">14:02:32</span>{" "}
            <span className="text-[#8be9fd]">[info]</span> cache warm keys=128{"\n"}
            <span className="text-[#999]">14:02:33</span>{" "}
            <span className="text-[#f1fa8c]">[warn]</span> rate limit uid=3827 path=/api/export
            {"\n"}
            <span className="text-[#999]">14:02:34</span>{" "}
            <span className="text-[#8be9fd]">[info]</span> request completed status=200 latency=4ms
          </motion.div>
        </div>

        {/* Status bar */}
        <motion.div
          className="absolute right-0 bottom-0 left-0 z-5 flex h-[16px] items-center bg-[#282a36] px-[6px] font-mono text-[9px] md:text-[10px]"
          initial={animate ? { opacity: 0, y: 8 } : false}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: 1.4, ease: EASE_OUT_EXPO }}
        >
          <span className="rounded-[2px] bg-[#44475a] px-[5px] py-[1px] text-[#f8f8f2]">
            0:feature
          </span>
          <span className="px-[5px] py-[1px] text-[#b0b0b0]">1:infra</span>
          <span className="px-[5px] py-[1px] text-[#b0b0b0]">2:debug</span>
          <span className="ml-auto text-[#50fa7b]">{"●"} session: dev</span>
        </motion.div>
      </motion.div>

      {/* Labels */}
      <motion.div
        className="text-center"
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        <p className="text-[15px] font-medium text-white/90">Tmux</p>
        <p className="text-[12px] text-white/50">1 terminal. Full control.</p>
      </motion.div>
    </div>
  );
}

export function TerminalChaosComparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = isInView && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      role="figure"
      aria-label="Side-by-side comparison: a chaotic multi-window terminal setup versus a clean tmux layout with organized panes"
      className="flex flex-col items-center justify-center gap-6 py-8 md:flex-row md:items-start md:gap-4"
    >
      <div className="flex w-full flex-1 flex-col items-center gap-3">
        <ChaosTerminal animate={shouldAnimate} />
      </div>

      <motion.span
        className="shrink-0 self-center pt-0 text-sm font-medium text-white/30 md:pt-[80px]"
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={shouldAnimate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        vs
      </motion.span>

      <div className="flex w-full flex-1 flex-col items-center gap-3">
        <TmuxTerminal animate={shouldAnimate} />
      </div>
    </div>
  );
}
