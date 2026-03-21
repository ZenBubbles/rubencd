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

describe("scroll-sequence barrel export", () => {
  it("exports VideoScrollAnimation as a function component", async () => {
    const mod = await import("@/features/scroll-sequence");
    expect(mod.VideoScrollAnimation).toBeDefined();
    expect(typeof mod.VideoScrollAnimation).toBe("function");
  });

  it("exports drawFrame as a function", async () => {
    const mod = await import("@/features/scroll-sequence");
    expect(mod.drawFrame).toBeDefined();
    expect(typeof mod.drawFrame).toBe("function");
  });
});
