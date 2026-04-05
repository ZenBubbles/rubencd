import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ---- Acceptable mocks: motion/react hooks, browser APIs, Image constructor ----

// Track mock Image instances so tests can trigger onload
let mockImageInstances: Array<{
  src: string;
  onload: (() => void) | null;
  onerror: (() => void) | null;
  naturalWidth: number;
  naturalHeight: number;
}> = [];

vi.stubGlobal(
  "Image",
  class MockImage {
    src = "";
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    naturalWidth = 1440;
    naturalHeight = 810;
    constructor() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      mockImageInstances.push(self as (typeof mockImageInstances)[number]);
    }
  },
);

// Mock motion/react with vi.fn() so we can assert calls
const mockUseTransform = vi.fn((_source: unknown, _input: number[], output: number[]) => ({
  get: () => output[0],
  on: () => () => {},
}));

// Capture the useMotionValueEvent callback so tests can invoke it
let capturedMotionValueCallback: ((latest: number) => void) | null = null;
const mockUseMotionValueEvent = vi.fn(
  (_value: unknown, _event: string, callback: (latest: number) => void) => {
    capturedMotionValueCallback = callback;
  },
);

vi.mock("motion/react", () => ({
  useTransform: (source: unknown, input: number[], output: number[]) =>
    mockUseTransform(source, input, output),
  useMotionValueEvent: (value: unknown, event: string, callback: (v: number) => void) =>
    mockUseMotionValueEvent(value, event, callback),
}));

// Mock useMediaQuery (browser API wrapper -- acceptable mock)
const mockUseMediaQuery = vi.fn((_query: string) => true); // default: desktop
vi.mock("@/hooks/use-media-query", () => ({
  useMediaQuery: (query: string) => mockUseMediaQuery(query),
}));

// Canvas getContext mock (jsdom has no canvas)
const mockDrawImage = vi.fn();
const mockSetTransform = vi.fn();
const mockClearRect = vi.fn();
const mockGetContext = vi.fn().mockReturnValue({
  drawImage: mockDrawImage,
  setTransform: mockSetTransform,
  clearRect: mockClearRect,
});

// matchMedia mock for useSyncExternalStore fallback
function createMatchMediaMock() {
  return vi.fn().mockImplementation((query: string) => ({
    matches: query === "(min-width: 768px)",
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// Import after mocks
import { HeroVideoReveal } from "../hero-video-reveal";

// Create a mock scrollYProgress MotionValue
function createMockScrollYProgress() {
  return {
    get: () => 0,
    on: () => () => {},
  } as never; // cast to MotionValue<number>
}

describe("HeroVideoReveal", () => {
  beforeEach(() => {
    mockImageInstances = [];
    capturedMotionValueCallback = null;
    mockDrawImage.mockClear();
    mockSetTransform.mockClear();
    mockGetContext.mockClear();
    mockUseTransform.mockClear();
    mockUseMotionValueEvent.mockClear();
    mockUseMediaQuery.mockReturnValue(true);
    window.matchMedia = createMatchMediaMock();
    HTMLCanvasElement.prototype.getContext = mockGetContext as never;

    // Mock getBoundingClientRect for all canvas elements (jsdom returns 0x0 by default)
    vi.spyOn(HTMLCanvasElement.prototype, "getBoundingClientRect").mockReturnValue({
      width: 800,
      height: 450,
      top: 0,
      left: 0,
      bottom: 450,
      right: 800,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ---- Frame URL generation ----

  describe("frame URL generation", () => {
    it("generates URLs with correct padding, prefix, and extension for desktop", () => {
      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      // 120 images should be created
      expect(mockImageInstances).toHaveLength(120);

      // First frame: index 1, padded to 3 digits
      expect(mockImageInstances[0]!.src).toBe("/images/scroll-frames/desktop/frame-001.avif");

      // Last frame: index 120, padded to 3 digits
      expect(mockImageInstances[119]!.src).toBe("/images/scroll-frames/desktop/frame-120.avif");

      // Middle frame: index 60
      expect(mockImageInstances[59]!.src).toBe("/images/scroll-frames/desktop/frame-060.avif");
    });

    it("generates mobile URLs when viewport is narrow", () => {
      mockUseMediaQuery.mockReturnValue(false);
      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      expect(mockImageInstances[0]!.src).toBe("/images/scroll-frames/mobile/frame-001.avif");
      expect(mockImageInstances[119]!.src).toBe("/images/scroll-frames/mobile/frame-120.avif");
    });

    it("uses custom basePath, prefix, extension, padLength, startIndex", () => {
      const scrollYProgress = createMockScrollYProgress();
      render(
        <HeroVideoReveal
          scrollYProgress={scrollYProgress}
          desktopBasePath="/custom/path"
          prefix="img_"
          extension=".webp"
          padLength={4}
          startIndex={0}
          frameCount={3}
        />,
      );

      expect(mockImageInstances).toHaveLength(3);
      expect(mockImageInstances[0]!.src).toBe("/custom/path/img_0000.webp");
      expect(mockImageInstances[1]!.src).toBe("/custom/path/img_0001.webp");
      expect(mockImageInstances[2]!.src).toBe("/custom/path/img_0002.webp");
    });
  });

  // ---- Cover-fit math ----

  describe("cover-fit calculation", () => {
    it("crops sides when image is wider than canvas aspect ratio", async () => {
      // Image: 1920x1080 (16:9 = 1.78), Canvas rect: 400x400 (1:1)
      // imgAspect (1.78) > canvasAspect (1.0) => crop sides
      // sh = 1080, sw = 1080 * 1.0 = 1080, sx = (1920-1080)/2 = 420, sy = 0

      // Override getBoundingClientRect to return a 1:1 canvas
      vi.spyOn(HTMLCanvasElement.prototype, "getBoundingClientRect").mockReturnValue({
        width: 400,
        height: 400,
        top: 0,
        left: 0,
        bottom: 400,
        right: 400,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Use 1920x1080 images
      vi.stubGlobal(
        "Image",
        class MockImage1920 {
          src = "";
          onload: (() => void) | null = null;
          onerror: (() => void) | null = null;
          naturalWidth = 1920;
          naturalHeight = 1080;
          constructor() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const self = this;
            mockImageInstances.push(self as (typeof mockImageInstances)[number]);
          }
        },
      );

      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} frameCount={1} />);

      // Trigger onload to set framesLoaded = true
      await act(async () => {
        mockImageInstances[0]!.onload?.();
      });

      // drawFrame is called by the initial useEffect after framesLoaded
      expect(mockDrawImage).toHaveBeenCalled();

      const [, sx, sy, sw, sh] = mockDrawImage.mock.calls[0]!;
      expect(sx).toBe(420); // (1920 - 1080) / 2
      expect(sy).toBe(0);
      expect(sw).toBe(1080); // 1080 * 1.0
      expect(sh).toBe(1080);
    });

    it("crops top/bottom when image is taller than canvas aspect ratio", async () => {
      // Image: 800x1200 (0.667), Canvas rect: 1000x500 (2.0)
      // imgAspect (0.667) < canvasAspect (2.0) => crop top/bottom
      // sw = 800, sh = 800 / 2.0 = 400, sx = 0, sy = (1200 - 400) / 2 = 400

      vi.spyOn(HTMLCanvasElement.prototype, "getBoundingClientRect").mockReturnValue({
        width: 1000,
        height: 500,
        top: 0,
        left: 0,
        bottom: 500,
        right: 1000,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      vi.stubGlobal(
        "Image",
        class MockImageTall {
          src = "";
          onload: (() => void) | null = null;
          onerror: (() => void) | null = null;
          naturalWidth = 800;
          naturalHeight = 1200;
          constructor() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const self = this;
            mockImageInstances.push(self as (typeof mockImageInstances)[number]);
          }
        },
      );

      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} frameCount={1} />);

      await act(async () => {
        mockImageInstances[0]!.onload?.();
      });

      expect(mockDrawImage).toHaveBeenCalled();

      const [, sx, sy, sw, sh] = mockDrawImage.mock.calls[0]!;
      expect(sx).toBe(0);
      expect(sy).toBe(400); // (1200 - 400) / 2
      expect(sw).toBe(800);
      expect(sh).toBe(400); // 800 / 2.0
    });

    it("uses full image when aspect ratios match exactly", async () => {
      // Image: 1600x900 (16:9), Canvas rect: 800x450 (16:9)
      // imgAspect === canvasAspect => else branch (taller path, but sh = sw / aspect = 1600/1.78 = 900)
      // sw = 1600, sh = 1600 / (800/450) = 1600 / 1.778 = 900, sx = 0, sy = 0

      vi.spyOn(HTMLCanvasElement.prototype, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      vi.stubGlobal(
        "Image",
        class MockImageExact {
          src = "";
          onload: (() => void) | null = null;
          onerror: (() => void) | null = null;
          naturalWidth = 1600;
          naturalHeight = 900;
          constructor() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const self = this;
            mockImageInstances.push(self as (typeof mockImageInstances)[number]);
          }
        },
      );

      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} frameCount={1} />);

      await act(async () => {
        mockImageInstances[0]!.onload?.();
      });

      expect(mockDrawImage).toHaveBeenCalled();

      const [, sx, sy, sw, sh] = mockDrawImage.mock.calls[0]!;
      expect(sx).toBe(0);
      // sy should be ~0 since aspect ratios match (floating point may cause tiny offset)
      expect(sy).toBeCloseTo(0, 0);
      expect(sw).toBe(1600);
      expect(sh).toBeCloseTo(900, 0);
    });
  });

  // ---- Scroll-to-frame index mapping ----

  describe("scroll-to-frame index mapping", () => {
    it("maps scrollStart and scrollEnd to frame index range [0, 119]", () => {
      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      // Verify useTransform was called with the correct scroll range and frame range
      expect(mockUseTransform).toHaveBeenCalledWith(scrollYProgress, [0.38, 0.85], [0, 119]);
    });

    it("uses custom scrollStart, scrollEnd, and frameCount", () => {
      const scrollYProgress = createMockScrollYProgress();
      render(
        <HeroVideoReveal
          scrollYProgress={scrollYProgress}
          scrollStart={0.1}
          scrollEnd={0.9}
          frameCount={60}
        />,
      );

      expect(mockUseTransform).toHaveBeenCalledWith(scrollYProgress, [0.1, 0.9], [0, 59]);
    });
  });

  // ---- Rendering behaviour ----

  describe("rendering", () => {
    it("returns null before frames are loaded", () => {
      const scrollYProgress = createMockScrollYProgress();
      const { container } = render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      // No canvas should be rendered yet (frames haven't loaded)
      expect(container.querySelector("canvas")).toBeNull();
    });

    it("renders canvas with role='img' and aria-label after frames load", async () => {
      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      // Trigger all image onload callbacks
      await act(async () => {
        for (const img of mockImageInstances) {
          img.onload?.();
        }
      });

      const canvas = screen.getByRole("img");
      expect(canvas).toBeInTheDocument();
      expect(canvas.tagName).toBe("CANVAS");
      expect(canvas).toHaveAttribute("aria-label", "Sunset birds animation");
    });

    it("canvas has numeric width and height attributes after frames load", async () => {
      // Restore the default Image mock (previous cover-fit tests may override it)
      vi.stubGlobal(
        "Image",
        class MockImageDefault {
          src = "";
          onload: (() => void) | null = null;
          onerror: (() => void) | null = null;
          naturalWidth = 1440;
          naturalHeight = 810;
          constructor() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const self = this;
            mockImageInstances.push(self as (typeof mockImageInstances)[number]);
          }
        },
      );

      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      await act(async () => {
        for (const img of mockImageInstances) {
          img.onload?.();
        }
      });

      // After loading, canvas is rendered. The React prop sets width/height from
      // naturalWidth/Height, but the drawFrame useEffect immediately overrides
      // canvas.width/height with DPR-scaled values. We verify it has positive dimensions.
      const canvas = screen.getByRole("img") as HTMLCanvasElement;
      expect(Number(canvas.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(canvas.getAttribute("height"))).toBeGreaterThan(0);
    });

    it("canvas has absolute positioning covering parent", async () => {
      const scrollYProgress = createMockScrollYProgress();
      const { container } = render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      await act(async () => {
        for (const img of mockImageInstances) {
          img.onload?.();
        }
      });

      const canvas = container.querySelector("canvas") as HTMLCanvasElement;
      expect(canvas.style.position).toBe("absolute");
      expect(canvas.style.inset).toBe("0px");
      expect(canvas.style.width).toBe("100%");
      expect(canvas.style.height).toBe("100%");
    });
  });

  // ---- Error handling ----

  describe("error handling", () => {
    it("stays hidden when frame loading fails (no canvas rendered)", async () => {
      const scrollYProgress = createMockScrollYProgress();
      const { container } = render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      // Trigger onerror on all images
      await act(async () => {
        for (const img of mockImageInstances) {
          img.onerror?.();
        }
      });

      expect(container.querySelector("canvas")).toBeNull();
    });
  });

  // ---- Resize handler ----

  describe("resize handler", () => {
    it("debounces resize events with 150ms delay", async () => {
      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      // Load frames first
      await act(async () => {
        for (const img of mockImageInstances) {
          img.onload?.();
        }
      });

      mockDrawImage.mockClear();

      // Fire resize
      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      // drawImage should NOT have been called yet (debounced)
      expect(mockDrawImage).not.toHaveBeenCalled();

      // Advance past the debounce timer
      act(() => {
        vi.advanceTimersByTime(150);
      });

      // After debounce, drawFrame should have been called (currentFrameRef is 0
      // from the initial useEffect after framesLoaded)
      expect(mockDrawImage).toHaveBeenCalled();
    });
  });

  // ---- Scroll-driven draw path ----

  describe("scroll-driven draw callback", () => {
    it("draws the correct frame when useMotionValueEvent fires", async () => {
      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      // Load frames
      await act(async () => {
        for (const img of mockImageInstances) {
          img.onload?.();
        }
      });

      mockDrawImage.mockClear();
      mockSetTransform.mockClear();

      // Simulate scroll to frame index 50.3 (should round to 50)
      act(() => {
        capturedMotionValueCallback?.(50.3);
      });

      expect(mockDrawImage).toHaveBeenCalledTimes(1);
      // First arg to drawImage is the image element at index 50
      expect(mockDrawImage.mock.calls[0]![0]).toBe(mockImageInstances[50]);
    });

    it("clamps frame index to valid range", async () => {
      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      await act(async () => {
        for (const img of mockImageInstances) {
          img.onload?.();
        }
      });

      mockDrawImage.mockClear();

      // Simulate scroll beyond range (e.g. 150, should clamp to 119)
      act(() => {
        capturedMotionValueCallback?.(150);
      });

      expect(mockDrawImage).toHaveBeenCalledTimes(1);
      expect(mockDrawImage.mock.calls[0]![0]).toBe(mockImageInstances[119]);

      mockDrawImage.mockClear();

      // Simulate negative index (should clamp to 0)
      act(() => {
        capturedMotionValueCallback?.(-5);
      });

      expect(mockDrawImage).toHaveBeenCalledTimes(1);
      expect(mockDrawImage.mock.calls[0]![0]).toBe(mockImageInstances[0]);
    });

    it("deduplicates redundant draws for the same frame", async () => {
      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      await act(async () => {
        for (const img of mockImageInstances) {
          img.onload?.();
        }
      });

      mockDrawImage.mockClear();

      // Draw frame 30
      act(() => {
        capturedMotionValueCallback?.(30);
      });
      expect(mockDrawImage).toHaveBeenCalledTimes(1);

      mockDrawImage.mockClear();

      // Same frame again — should be skipped
      act(() => {
        capturedMotionValueCallback?.(30.4); // rounds to 30
      });
      expect(mockDrawImage).not.toHaveBeenCalled();

      // Different frame — should draw
      act(() => {
        capturedMotionValueCallback?.(31);
      });
      expect(mockDrawImage).toHaveBeenCalledTimes(1);
    });
  });

  // ---- DPR scaling ----

  describe("DPR scaling", () => {
    it("scales canvas buffer by devicePixelRatio and calls setTransform", async () => {
      // Set DPR to 2
      Object.defineProperty(window, "devicePixelRatio", { value: 2, writable: true });

      const scrollYProgress = createMockScrollYProgress();
      render(<HeroVideoReveal scrollYProgress={scrollYProgress} frameCount={1} />);

      await act(async () => {
        mockImageInstances[0]!.onload?.();
      });

      // setTransform should be called with DPR
      expect(mockSetTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);

      // drawImage destination args should use CSS pixel dimensions (800x450), not buffer dimensions
      const [, , , , , dx, dy, dw, dh] = mockDrawImage.mock.calls[0]!;
      expect(dx).toBe(0);
      expect(dy).toBe(0);
      expect(dw).toBe(800);
      expect(dh).toBe(450);

      // Reset DPR
      Object.defineProperty(window, "devicePixelRatio", { value: 1, writable: true });
    });
  });

  // ---- Cleanup ----

  describe("cleanup on unmount", () => {
    it("cleans up resize listener and frames on unmount", async () => {
      const scrollYProgress = createMockScrollYProgress();
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = render(<HeroVideoReveal scrollYProgress={scrollYProgress} />);

      await act(async () => {
        for (const img of mockImageInstances) {
          img.onload?.();
        }
      });

      unmount();

      // Verify resize listener was removed
      const resizeCalls = removeEventListenerSpy.mock.calls.filter(([event]) => event === "resize");
      expect(resizeCalls.length).toBeGreaterThanOrEqual(1);
    });
  });
});
