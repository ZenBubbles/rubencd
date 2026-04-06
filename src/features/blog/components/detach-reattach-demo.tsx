"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type DemoState = "attached" | "detached" | "reattached";

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MAX_EPOCHS = 200;
const TICK_MS = 600;
const INITIAL_LOSS = 0.0842;
const LOSS_DECAY = 0.002;

function Dots() {
  return (
    <div
      className="absolute top-0 left-0 z-10 flex gap-[5px] px-[10px] py-[8px]"
      aria-hidden="true"
    >
      <span className="h-[8px] w-[8px] rounded-full bg-[#ff5f57]" />
      <span className="h-[8px] w-[8px] rounded-full bg-[#febc2e]" />
      <span className="h-[8px] w-[8px] rounded-full bg-[#28c840]" />
    </div>
  );
}

function ProgressBar({ epoch }: { epoch: number }) {
  const filled = Math.floor((epoch / MAX_EPOCHS) * 10);
  const empty = 10 - filled;
  return (
    <span>
      {"█".repeat(filled)}
      {"░".repeat(empty)}
    </span>
  );
}

function computeLoss(epoch: number): string {
  const loss = Math.max(0.001, INITIAL_LOSS - epoch * LOSS_DECAY);
  return loss.toFixed(4);
}

function computeElapsed(epoch: number): number {
  return Math.floor((epoch * TICK_MS) / 1000);
}

function StatusBar({ visible }: { visible: boolean }) {
  if (!visible) {
    return <div className="h-[16px] rounded-b-xl bg-[#282a36]" />;
  }

  return (
    <div className="flex h-[16px] items-center justify-between rounded-b-xl bg-[#282a36] px-2 font-mono text-[6.5px]">
      <span className="rounded-sm bg-[#44475a] px-1 py-px text-[#f8f8f2]">0:training</span>
      <span className="text-[#50fa7b]">● session: ml-lab</span>
    </div>
  );
}

function TerminalContent({ epoch }: { epoch: number }) {
  const clampedEpoch = Math.min(epoch, MAX_EPOCHS);

  return (
    <div className="space-y-0 p-3 font-mono text-[9px] leading-relaxed text-[#8a8a8a] md:text-[11px]">
      <p>
        <span className="text-[#50fa7b]">$</span>{" "}
        <span className="text-[#50fa7b]">python train_model.py --epochs 200</span>
      </p>
      <p>&nbsp;</p>
      <p>
        <span className="text-[#8be9fd]">[info]</span> Loading dataset... done
      </p>
      <p>
        <span className="text-[#8be9fd]">[info]</span> Model initialized (ResNet-50)
      </p>
      <p>&nbsp;</p>
      <p aria-live="polite">
        Epoch {clampedEpoch}/{MAX_EPOCHS} <ProgressBar epoch={clampedEpoch} /> loss=
        {computeLoss(clampedEpoch)}
      </p>
      <p className="text-[#666]">elapsed: {computeElapsed(clampedEpoch)}s</p>
    </div>
  );
}

export function DetachReattachDemo() {
  const prefersReducedMotion = useReducedMotion();

  const [state, setState] = useState<DemoState>("attached");
  const [displayEpoch, setDisplayEpoch] = useState(0);
  const [detachedSeconds, setDetachedSeconds] = useState(0);
  const [showScanline, setShowScanline] = useState(false);
  const [showRestoredFlash, setShowRestoredFlash] = useState(false);

  const epochRef = useRef(0);
  const tickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const detachedIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef<DemoState>("attached");

  // Keep stateRef in sync
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Main epoch ticker -- runs the entire lifecycle
  useEffect(() => {
    tickIntervalRef.current = setInterval(() => {
      if (epochRef.current < MAX_EPOCHS) {
        epochRef.current += 1;
      }
      // Only update display when terminal content is visible
      if (stateRef.current === "attached" || stateRef.current === "reattached") {
        setDisplayEpoch(epochRef.current);
      }
    }, TICK_MS);

    return () => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    };
  }, []);

  // Detached seconds counter
  useEffect(() => {
    if (state === "detached") {
      detachedIntervalRef.current = setInterval(() => {
        setDetachedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (detachedIntervalRef.current) {
        clearInterval(detachedIntervalRef.current);
        detachedIntervalRef.current = null;
      }
    }

    return () => {
      if (detachedIntervalRef.current) clearInterval(detachedIntervalRef.current);
    };
  }, [state]);

  const handleDetach = useCallback(() => {
    setDetachedSeconds(0);
    setState("detached");
  }, []);

  const handleReattach = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayEpoch(epochRef.current);
      setShowRestoredFlash(true);
      setState("reattached");
      return;
    }

    setShowScanline(true);
    setTimeout(() => {
      setShowScanline(false);
      setDisplayEpoch(epochRef.current);
      setShowRestoredFlash(true);
      setState("reattached");
    }, 150);
  }, [prefersReducedMotion]);

  const handleReset = useCallback(() => {
    epochRef.current = 0;
    setDisplayEpoch(0);
    setDetachedSeconds(0);
    setShowScanline(false);
    setShowRestoredFlash(false);
    setState("attached");

    // Restart the ticker
    if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    tickIntervalRef.current = setInterval(() => {
      if (epochRef.current < MAX_EPOCHS) {
        epochRef.current += 1;
      }
      if (stateRef.current === "attached" || stateRef.current === "reattached") {
        setDisplayEpoch(epochRef.current);
      }
    }, TICK_MS);
  }, []);

  const animationProps = prefersReducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3, ease: EASE_OUT_EXPO },
      };

  const buttonAnimationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.3, ease: EASE_OUT_EXPO },
      };

  return (
    <div
      className="my-12 md:my-20"
      role="region"
      aria-label="Interactive demonstration of tmux session detach and reattach"
    >
      {/* Terminal frame */}
      <div className="relative mx-auto max-w-xl overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a] shadow-lg">
        <Dots />

        {/* Terminal content area */}
        <div className="relative min-h-[180px] bg-[#0d0d0d] pt-[28px]">
          {/* Scanline effect */}
          {showScanline && !prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute right-0 left-0 z-20 h-[2px] bg-white/80 blur-sm"
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          )}

          <AnimatePresence mode="wait">
            {(state === "attached" || state === "reattached") && (
              <motion.div key="terminal-content" {...animationProps}>
                <TerminalContent epoch={displayEpoch} />

                {/* "Session restored" flash overlay */}
                {state === "reattached" && showRestoredFlash && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    onAnimationComplete={() => setShowRestoredFlash(false)}
                  >
                    <span className="rounded-lg bg-[#0d0d0d]/90 px-4 py-2 font-mono text-sm font-semibold text-[#50fa7b]">
                      Session restored &#x2713;
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}

            {state === "detached" && (
              <motion.div
                key="detached-content"
                className="flex min-h-[152px] items-center justify-center"
                {...animationProps}
              >
                <p className="font-mono text-[9px] text-[#50fa7b] md:text-[11px]">
                  [detached (from session ml-lab)]
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status bar */}
        <StatusBar visible={state !== "detached"} />
      </div>

      {/* Controls below terminal */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          {state === "attached" && (
            <motion.div
              key="detach-controls"
              className="flex flex-col items-center"
              {...buttonAnimationProps}
            >
              <button
                onClick={handleDetach}
                className="cursor-pointer rounded-lg border border-[#444] bg-[#282a36] px-5 py-2.5 text-sm font-medium text-[#f8f8f2] transition-colors hover:bg-[#44475a]"
              >
                Detach Session <span className="ml-1 text-xs text-[#888]">Ctrl+B, D</span>
              </button>
            </motion.div>
          )}

          {state === "detached" && (
            <motion.div
              key="reattach-controls"
              className="flex flex-col items-center gap-3"
              {...buttonAnimationProps}
            >
              <motion.p
                className="text-center text-xs text-[#737373]"
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { delay: 0.5, duration: 0.4 },
                    })}
              >
                Your session is still running. Go make coffee.
              </motion.p>
              <p className="text-xs text-[#50fa7b]/60">Detached for {detachedSeconds}s...</p>
              <button
                onClick={handleReattach}
                className="cursor-pointer rounded-lg border border-[#50fa7b]/30 bg-[#50fa7b]/10 px-5 py-2.5 font-mono text-sm font-medium text-[#50fa7b] transition-colors hover:bg-[#50fa7b]/20"
              >
                tmux attach -t ml-lab
              </button>
            </motion.div>
          )}

          {state === "reattached" && (
            <motion.div
              key="reattached-controls"
              className="flex flex-col items-center gap-2"
              {...buttonAnimationProps}
            >
              <p className="text-center text-xs text-[#525252]">
                Everything kept running. Nothing was lost.
              </p>
              <button
                onClick={handleReset}
                className="cursor-pointer text-xs text-[#999] underline transition-colors hover:text-[#ccc]"
              >
                Reset demo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
