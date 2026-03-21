import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { VideoScrollAnimation } from "@/features/scroll-sequence";

// ---- Browser API mocks (acceptable per testing rules) ----

// Store the matchMedia mock so tests can override the reduced-motion result
let matchMediaMatches = false;

function createMatchMediaMock(matches: boolean) {
  return vi.fn().mockImplementation((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// Mock GSAP since it relies on browser scroll/DOM measurement unavailable in jsdom
vi.mock("gsap", () => {
  const timelineMock = {
    to: vi.fn().mockReturnThis(),
    kill: vi.fn(),
  };
  return {
    default: {
      registerPlugin: vi.fn(),
      timeline: vi.fn(() => timelineMock),
    },
  };
});

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    getAll: vi.fn(() => []),
  },
}));

beforeEach(() => {
  matchMediaMatches = false;
  window.matchMedia = createMatchMediaMock(matchMediaMatches);

  // Mock canvas getContext (jsdom does not implement canvas)
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    drawImage: vi.fn(),
    setTransform: vi.fn(),
    clearRect: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("VideoScrollAnimation", () => {
  const defaultProps = {
    videoUrl: "https://example.com/test-video.mp4",
  };

  describe("rendering", () => {
    it("renders without crashing with only required props", () => {
      const { container } = render(<VideoScrollAnimation {...defaultProps} />);
      expect(container.querySelector("section")).not.toBeNull();
    });

    it("renders a section element as the root", () => {
      const { container } = render(<VideoScrollAnimation {...defaultProps} />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("renders a canvas element for animation", () => {
      const { container } = render(<VideoScrollAnimation {...defaultProps} />);
      const canvas = container.querySelector("canvas");
      expect(canvas).toBeInTheDocument();
    });

    it("sets the canvas aria-label for accessibility", () => {
      render(<VideoScrollAnimation {...defaultProps} />);
      const canvas = screen.getByLabelText("Scroll-driven video animation of a sunset with birds");
      expect(canvas).toBeInTheDocument();
      expect(canvas.tagName).toBe("CANVAS");
    });
  });

  describe("loading state", () => {
    it("shows loading text with progress percentage initially", () => {
      render(<VideoScrollAnimation {...defaultProps} />);
      const loadingText = screen.getByText(/Extracting frames\.\.\./);
      expect(loadingText).toBeInTheDocument();
      expect(loadingText.textContent).toContain("0%");
    });

    it("renders the loading overlay with fixed positioning", () => {
      const { container } = render(<VideoScrollAnimation {...defaultProps} />);
      const overlay = container.querySelector(".fixed");
      expect(overlay).toBeInTheDocument();
    });
  });

  describe("scrollHeight prop", () => {
    it("applies default scrollHeight of 300vh", () => {
      const { container } = render(<VideoScrollAnimation {...defaultProps} />);
      const section = container.querySelector("section");
      expect(section?.style.height).toBe("300vh");
    });

    it("applies custom scrollHeight when provided", () => {
      const { container } = render(<VideoScrollAnimation {...defaultProps} scrollHeight={500} />);
      const section = container.querySelector("section");
      expect(section?.style.height).toBe("500vh");
    });
  });

  describe("prefers-reduced-motion", () => {
    it("renders a video element instead of canvas when reduced motion is preferred", () => {
      window.matchMedia = createMatchMediaMock(true);

      const { container } = render(<VideoScrollAnimation {...defaultProps} />);

      const video = container.querySelector("video");
      expect(video).toBeInTheDocument();
      expect(video?.getAttribute("src")).toBe(defaultProps.videoUrl);

      const canvas = container.querySelector("canvas");
      expect(canvas).toBeNull();
    });

    it("sets muted and playsInline on the reduced-motion video", () => {
      window.matchMedia = createMatchMediaMock(true);

      const { container } = render(<VideoScrollAnimation {...defaultProps} />);
      const video = container.querySelector("video");
      expect(video).toBeInTheDocument();
      expect(video?.muted).toBe(true);
      expect(video?.playsInline).toBe(true);
    });

    it("sets an accessible aria-label on the reduced-motion video", () => {
      window.matchMedia = createMatchMediaMock(true);

      render(<VideoScrollAnimation {...defaultProps} />);
      const video = screen.getByLabelText(
        "Sunset with birds video - scroll animation disabled due to reduced motion preference",
      );
      expect(video).toBeInTheDocument();
    });

    it("does not show loading overlay when reduced motion is preferred", () => {
      window.matchMedia = createMatchMediaMock(true);

      render(<VideoScrollAnimation {...defaultProps} />);
      const loadingText = screen.queryByText(/Extracting frames/);
      expect(loadingText).toBeNull();
    });

    it("renders the video with the correct src in reduced motion mode", () => {
      window.matchMedia = createMatchMediaMock(true);

      const { container } = render(
        <VideoScrollAnimation videoUrl="https://example.com/custom.mp4" />,
      );
      const video = container.querySelector("video");
      expect(video?.getAttribute("src")).toBe("https://example.com/custom.mp4");
    });
  });

  describe("props with defaults", () => {
    it("accepts all optional props without error", () => {
      expect(() =>
        render(
          <VideoScrollAnimation
            videoUrl="https://example.com/video.mp4"
            numFrames={60}
            scrollHeight={400}
            scrub={2}
          />,
        ),
      ).not.toThrow();
    });
  });
});
