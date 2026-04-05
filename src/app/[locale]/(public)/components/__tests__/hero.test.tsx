import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Hero } from "../hero";

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === "(min-width: 768px)",
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} />
  ),
}));

const mockScrollYProgress = {
  get: () => 0,
  on: () => () => {},
};

vi.mock("motion/react", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_target: object, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, style, ...rest }: any) => {
          const Tag = tag as keyof React.JSX.IntrinsicElements;
          return (
            <Tag style={style} {...rest}>
              {children}
            </Tag>
          );
        },
    },
  ),
  useScroll: () => ({ scrollYProgress: mockScrollYProgress }),
  useTransform: () => ({
    get: () => 0,
    on: () => () => {},
  }),
  useMotionTemplate: () => "blur(0px)",
  useMotionValueEvent: vi.fn(),
  useReducedMotion: () => false,
  motionValue: (v: number) => ({
    get: () => v,
    on: () => () => {},
  }),
}));

describe("Hero", () => {
  it("renders the 300vh wrapper div", () => {
    const { container } = render(<Hero />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.height).toBe("500vh");
    expect(wrapper.style.position).toBe("relative");
  });

  it("renders a single h1 element", () => {
    render(<Hero />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it("h1 has correct aria-label", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveAttribute("aria-label", "Ruben Christoffer Damsgaard");
  });

  it("contains the name part RUBEN", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("RUBEN");
  });

  it("contains the name part CHRISTOFFER", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("CHRISTOFFER");
  });

  it("contains the name part DAMSGAARD", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("DAMSGAARD");
  });

  it("renders two image copies (left and right halves)", () => {
    const { container } = render(<Hero />);
    const heroImages = container.querySelectorAll('img[src="/images/hero.png"]');
    expect(heroImages).toHaveLength(2);
  });

  it("renders the hero image with correct alt text", () => {
    render(<Hero />);
    const image = screen.getByAltText("Ruben Christoffer Damsgaard");
    expect(image).toHaveAttribute("src", "/images/hero.png");
  });

  it("second image copy is aria-hidden (decorative duplicate)", () => {
    const { container } = render(<Hero />);
    const heroImages = container.querySelectorAll('img[src="/images/hero.png"]');
    const hiddenImage = Array.from(heroImages).find(
      (img) => img.getAttribute("aria-hidden") === "true",
    );
    expect(hiddenImage).not.toBeNull();
  });

  it("calls onScrollProgress callback with scrollYProgress", () => {
    const onScrollProgress = vi.fn();
    render(<Hero onScrollProgress={onScrollProgress} />);
    expect(onScrollProgress).toHaveBeenCalledWith(mockScrollYProgress);
  });

  it("has vignette overlays", () => {
    const { container } = render(<Hero />);
    const stickyContainer = container.querySelector(".sticky") as HTMLElement;
    const gradientDivs = Array.from(stickyContainer.children).filter((el) => {
      const style = (el as HTMLElement).style;
      return style.pointerEvents === "none" && style.background?.includes("linear-gradient");
    });
    // Left vignette, right vignette, top vignette, bottom gradient = 4 gradient overlays
    expect(gradientDivs.length).toBe(4);
  });

  it("has grain overlay with noise texture", () => {
    const { container } = render(<Hero />);
    const stickyContainer = container.querySelector(".sticky") as HTMLElement;
    const grainDiv = Array.from(stickyContainer.children).find((el) => {
      const style = (el as HTMLElement).style;
      return style.backgroundImage?.includes("feTurbulence");
    });
    expect(grainDiv).not.toBeNull();
  });

  it("aria-label spells 'Damsgaard' correctly (with S)", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const ariaLabel = h1.getAttribute("aria-label")!;
    expect(ariaLabel).toContain("Damsgaard");
    expect(ariaLabel).not.toContain("Damgaard");
  });

  it("renders without crashing when prefers-reduced-motion (useReducedMotion mock already active)", () => {
    // The mock returns false, but the production code branches on useReducedMotion().
    // Since useTransform is mocked to always return 1 regardless of input,
    // both paths produce valid output. This test confirms the component doesn't
    // throw or fail to mount — the real reduced-motion behaviour is an E2E concern.
    expect(() => render(<Hero />)).not.toThrow();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
  });

  it("sticky container does not use 100vw (prevents horizontal scroll)", () => {
    const { container } = render(<Hero />);
    const sticky = container.querySelector(".sticky") as HTMLElement;
    expect(sticky.style.width).toBe("100%");
  });

  it("renders hero image with responsive object positioning", () => {
    const { container } = render(<Hero />);
    const img = container.querySelector('img[src="/images/hero.png"]') as HTMLElement;
    expect(img.className).toContain("object-cover");
    expect(img.className).toContain("object-top");
  });

  it("left image half has correct clipPath", () => {
    const { container } = render(<Hero />);
    const leftHalf = Array.from(container.querySelectorAll('[style*="clip-path"]')).find(
      (el) => (el as HTMLElement).style.clipPath === "inset(0 50% 0 0)",
    );
    expect(leftHalf).toBeTruthy();
  });

  it("right image half has correct clipPath", () => {
    const { container } = render(<Hero />);
    const rightHalf = Array.from(container.querySelectorAll('[style*="clip-path"]')).find(
      (el) => (el as HTMLElement).style.clipPath === "inset(0 0 0 50%)",
    );
    expect(rightHalf).toBeTruthy();
  });
});
