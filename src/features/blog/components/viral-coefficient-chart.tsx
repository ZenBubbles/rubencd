"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const SEED = 100;
const CYCLES = 20;

// Growth model: each cycle's new users = previous cycle's new users * K,
// cumulative total is what the chart plots.
function buildPoints(k: number): number[] {
  const points = [SEED];
  let newUsers = SEED;
  let total = SEED;
  for (let cycle = 1; cycle <= CYCLES; cycle++) {
    newUsers *= k;
    total += newUsers;
    points.push(total);
  }
  return points;
}

interface Series {
  k: number;
  label: string;
  color: string;
  points: number[];
  total: number;
}

// Sub-1 K-factors wear neutral gray (growth that fizzles); the K > 1 ladder
// wears an ordered green ramp, darkest = highest K. Drawn flattest-first so
// the steepest line sits on top.
const SERIES: Series[] = [
  { k: 0.9, label: "K = 0.90", color: "#b3b0a8" },
  { k: 0.99, label: "K = 0.99", color: "#8a8880" },
  { k: 1.1, label: "K = 1.10", color: "#74b691" },
  { k: 1.3, label: "K = 1.30", color: "#459c6d" },
  { k: 1.5, label: "K = 1.50", color: "#1f7f4c" },
  { k: 1.6, label: "K = 1.60", color: "#0b5b33" },
].map((s) => {
  const points = buildPoints(s.k);
  return { ...s, points, total: points[points.length - 1] ?? SEED };
});

function formatUsers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${Math.round(n)}`;
}

const LINEAR_MAX = 3_400_000;
const LOG_MIN = 2; // log10(100)
const LOG_MAX = 6.55; // just above log10(3.22M)

const LINEAR_TICKS = [0, 1_000_000, 2_000_000, 3_000_000];
const LOG_TICKS = [100, 1_000, 10_000, 100_000, 1_000_000];

type Scale = "linear" | "log";

// The SVG scales to its container, so text drawn on the wide desktop canvas
// halves in size on a phone. The mobile layout draws on a narrow, taller
// canvas instead: labels render near 1:1 and the curves get more height.
interface Layout {
  w: number;
  h: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  xTicks: number[];
}

const DESKTOP: Layout = {
  w: 720,
  h: 420,
  top: 16,
  right: 78,
  bottom: 40,
  left: 56,
  xTicks: [0, 4, 8, 12, 16, 20],
};

const MOBILE: Layout = {
  w: 360,
  h: 440,
  top: 14,
  right: 62,
  bottom: 38,
  left: 40,
  xTicks: [0, 5, 10, 15, 20],
};

function plotW(l: Layout): number {
  return l.w - l.left - l.right;
}

function plotH(l: Layout): number {
  return l.h - l.top - l.bottom;
}

function yFor(value: number, scale: Scale, l: Layout): number {
  if (scale === "log") {
    const t = (Math.log10(Math.max(value, 100)) - LOG_MIN) / (LOG_MAX - LOG_MIN);
    return l.top + plotH(l) * (1 - t);
  }
  return l.top + plotH(l) * (1 - value / LINEAR_MAX);
}

function xFor(cycle: number, l: Layout): number {
  return l.left + (cycle / CYCLES) * plotW(l);
}

function pathFor(points: number[], scale: Scale, l: Layout): string {
  return points
    .map((v, i) => `${i === 0 ? "M" : "L"}${xFor(i, l).toFixed(1)} ${yFor(v, scale, l).toFixed(1)}`)
    .join(" ");
}

interface ChartCanvasProps {
  layout: Layout;
  scale: Scale;
  hoverCycle: number | null;
  onHover: (cycle: number | null) => void;
  className?: string;
}

function ChartCanvas({ layout: l, scale, hoverCycle, onHover, className = "" }: ChartCanvasProps) {
  const prefersReduced = useReducedMotion();
  // WebKit's IntersectionObserver is unreliable on SVG child elements, so the
  // draw-in trigger observes the HTML wrapper instead of the paths themselves.
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });
  const revealed = prefersReduced || inView;
  const yTicks = scale === "log" ? LOG_TICKS : LINEAR_TICKS;

  // Linear scale: only the two runaway endpoints get direct labels (the rest
  // pile up at the baseline); log scale separates all six, so all are labeled.
  const labeledSeries = scale === "log" ? SERIES : SERIES.filter((s) => s.total >= 900_000);

  function handlePointer(event: React.PointerEvent<SVGRectElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const fraction = (event.clientX - rect.left) / rect.width;
    onHover(Math.min(CYCLES, Math.max(0, Math.round(fraction * CYCLES))));
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${l.w} ${l.h}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Line chart of cumulative users for six K-factors from 0.9 to 1.6, starting from ${SEED} seed users over ${CYCLES} cycles. K of 0.9 ends at 891 users while K of 1.6 ends at 3.22 million users.`}
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={l.left}
              x2={l.w - l.right}
              y1={yFor(tick, scale, l)}
              y2={yFor(tick, scale, l)}
              stroke="#e7e6e1"
              strokeWidth={1}
            />
            <text
              x={l.left - 8}
              y={yFor(tick, scale, l) + 4}
              textAnchor="end"
              className="fill-[#999] text-[11px]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {tick === 0 ? "0" : formatUsers(tick)}
            </text>
          </g>
        ))}

        <line
          x1={l.left}
          x2={l.w - l.right}
          y1={l.top + plotH(l)}
          y2={l.top + plotH(l)}
          stroke="#d4d2cb"
          strokeWidth={1}
        />

        {l.xTicks.map((tick) => (
          <text
            key={tick}
            x={xFor(tick, l)}
            y={l.h - l.bottom + 22}
            textAnchor="middle"
            className="fill-[#999] text-[11px]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {tick}
          </text>
        ))}
        <text
          x={l.left + plotW(l) / 2}
          y={l.h - 2}
          textAnchor="middle"
          className="fill-[#999] text-[11px]"
        >
          Cycle
        </text>

        {hoverCycle !== null && (
          <line
            x1={xFor(hoverCycle, l)}
            x2={xFor(hoverCycle, l)}
            y1={l.top}
            y2={l.top + plotH(l)}
            stroke="#d4d2cb"
            strokeWidth={1}
          />
        )}

        {SERIES.map((s, index) => (
          <motion.path
            key={s.k}
            d={pathFor(s.points, scale, l)}
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={prefersReduced ? {} : { pathLength: 0 }}
            animate={{ pathLength: revealed ? 1 : 0 }}
            transition={{ duration: 1.1, delay: index * 0.12, ease: "easeInOut" }}
          />
        ))}

        {hoverCycle !== null &&
          SERIES.map((s) => (
            <circle
              key={s.k}
              cx={xFor(hoverCycle, l)}
              cy={yFor(s.points[hoverCycle] ?? SEED, scale, l)}
              r={3.5}
              fill={s.color}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}

        <motion.g
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.5, delay: prefersReduced ? 0 : 1.4 }}
        >
          {SERIES.map((s) => (
            <circle
              key={s.k}
              cx={xFor(CYCLES, l)}
              cy={yFor(s.total, scale, l)}
              r={4}
              fill={s.color}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}
          {labeledSeries.map((s) => (
            <text
              key={s.k}
              x={xFor(CYCLES, l) + 8}
              y={yFor(s.total, scale, l) + 4}
              className="fill-[#525252] text-[12px] font-medium"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatUsers(s.total)}
            </text>
          ))}
        </motion.g>

        <rect
          x={l.left}
          y={l.top}
          width={plotW(l)}
          height={plotH(l)}
          fill="transparent"
          onPointerMove={handlePointer}
          onPointerDown={handlePointer}
          onPointerLeave={() => onHover(null)}
        />
      </svg>

      {hoverCycle !== null && (
        <div
          className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded-sm border border-[#E5E5E5] bg-white px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          style={{
            left: `${Math.min(74, Math.max(26, (xFor(hoverCycle, l) / l.w) * 100))}%`,
          }}
        >
          <p
            className="mb-2 text-[11px] font-medium tracking-[0.1em] text-[#999] uppercase"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            Cycle {hoverCycle}
          </p>
          <dl className="space-y-1">
            {[...SERIES].reverse().map((s) => (
              <div key={s.k} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: s.color }}
                  aria-hidden="true"
                />
                <dt className="text-[#707070]">{s.label}</dt>
                <dd
                  className="ml-auto pl-4 font-medium text-[#1a1a1a]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {formatUsers(s.points[hoverCycle] ?? SEED)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

export function ViralCoefficientChart() {
  const [scale, setScale] = useState<Scale>("linear");
  const [hoverCycle, setHoverCycle] = useState<number | null>(null);

  return (
    <figure className="my-12 md:my-16">
      <div className="rounded-sm border border-[#E5E5E5]/80 bg-white p-4 md:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#12271d] uppercase">
              The K-factor ladder
            </p>
            <p className="mt-1 text-xs text-[#999]">
              Cumulative users from {SEED} seeds over {CYCLES} cycles
            </p>
          </div>
          <div
            className="flex items-center gap-1 rounded-full border border-[#E5E5E5] p-1"
            role="group"
            aria-label="Chart scale"
          >
            {(["linear", "log"] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={scale === s}
                onClick={() => setScale(s)}
                className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors duration-200 ${
                  scale === s ? "bg-[#12271d] text-white" : "text-[#999] hover:text-[#525252]"
                }`}
              >
                {s === "linear" ? "Linear" : "Log"}
              </button>
            ))}
          </div>
        </div>

        <ChartCanvas
          layout={DESKTOP}
          scale={scale}
          hoverCycle={hoverCycle}
          onHover={setHoverCycle}
          className="hidden md:block"
        />
        <ChartCanvas
          layout={MOBILE}
          scale={scale}
          hoverCycle={hoverCycle}
          onHover={setHoverCycle}
          className="md:hidden"
        />

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#E5E5E5]/60 pt-5">
          {[...SERIES].reverse().map((s) => (
            <li key={s.k} className="flex items-center gap-2 text-xs">
              <span
                className="h-[3px] w-4 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden="true"
              />
              <span className="font-medium text-[#1a1a1a]">{s.label}</span>
              <span className="text-[#999]">→ {formatUsers(s.total)} users</span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className="mt-4 text-center text-xs leading-relaxed text-[#999]">
        {SEED} seed users compounding over {CYCLES} cycles. The linear scale shows how brutal the K
        &gt; 1 threshold really is. Flip to log to see the sub-1 curves flatten out.
      </figcaption>
    </figure>
  );
}
