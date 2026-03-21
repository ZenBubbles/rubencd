import { describe, it, expect, vi } from "vitest";

// Mock GSAP since the component registers the plugin at module level
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    getAll: vi.fn(() => []),
  },
}));

describe("drawFrame cover-fit logic", () => {
  function createMockContext() {
    const calls: { method: string; args: unknown[] }[] = [];
    return {
      calls,
      ctx: {
        setTransform: (...args: unknown[]) => calls.push({ method: "setTransform", args }),
        drawImage: (...args: unknown[]) => calls.push({ method: "drawImage", args }),
      } as unknown as CanvasRenderingContext2D,
    };
  }

  function createMockBitmap(width: number, height: number) {
    return { width, height } as unknown as ImageBitmap;
  }

  it("crops sides when frame is wider than canvas", async () => {
    const { drawFrame } = await import("@/features/scroll-sequence");
    const { ctx, calls } = createMockContext();
    const frame = createMockBitmap(1920, 1080); // 16:9

    drawFrame(ctx, frame, 400, 400, 1); // 1:1 canvas

    const drawCall = calls.find((c) => c.method === "drawImage");
    expect(drawCall).toBeDefined();

    // Source should crop sides: sw = 1080 * (400/400) = 1080, sx = (1920 - 1080) / 2 = 420
    const [, sx, sy, sw, sh, dx, dy, dw, dh] = drawCall!.args as number[];
    expect(sw).toBe(1080); // cropped width = height * canvasAspect
    expect(sh).toBe(1080); // full height used
    expect(sx).toBe(420); // centered crop
    expect(sy).toBe(0);
    expect(dx).toBe(0);
    expect(dy).toBe(0);
    expect(dw).toBe(400);
    expect(dh).toBe(400);
  });

  it("crops top/bottom when frame is taller than canvas", async () => {
    const { drawFrame } = await import("@/features/scroll-sequence");
    const { ctx, calls } = createMockContext();
    const frame = createMockBitmap(1080, 1920); // 9:16 (portrait)

    drawFrame(ctx, frame, 400, 400, 1); // 1:1 canvas

    const drawCall = calls.find((c) => c.method === "drawImage");
    expect(drawCall).toBeDefined();

    // Source should crop top/bottom: sh = 1080 / (400/400) = 1080, sy = (1920 - 1080) / 2 = 420
    const [, sx, sy, sw, sh] = drawCall!.args as number[];
    expect(sw).toBe(1080); // full width used
    expect(sh).toBe(1080); // cropped height = width / canvasAspect
    expect(sx).toBe(0);
    expect(sy).toBe(420); // centered crop
  });

  it("applies DPR scaling via setTransform", async () => {
    const { drawFrame } = await import("@/features/scroll-sequence");
    const { ctx, calls } = createMockContext();
    const frame = createMockBitmap(800, 600);

    drawFrame(ctx, frame, 400, 300, 2);

    const transformCall = calls.find((c) => c.method === "setTransform");
    expect(transformCall).toBeDefined();
    expect(transformCall!.args).toEqual([2, 0, 0, 2, 0, 0]);
  });

  it("handles exact aspect ratio match without cropping", async () => {
    const { drawFrame } = await import("@/features/scroll-sequence");
    const { ctx, calls } = createMockContext();
    const frame = createMockBitmap(800, 400); // 2:1

    drawFrame(ctx, frame, 600, 300, 1); // also 2:1

    const drawCall = calls.find((c) => c.method === "drawImage");
    expect(drawCall).toBeDefined();

    const [, sx, sy, sw, sh] = drawCall!.args as number[];
    // When aspects match exactly, the "wider" branch runs: sw = 400 * 2 = 800, sx = 0
    expect(sx).toBe(0);
    expect(sy).toBe(0);
    expect(sw).toBe(800);
    expect(sh).toBe(400);
  });
});
