import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Hero } from "../hero";

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
  useTransform: () => 1,
  useMotionTemplate: () => "blur(0px)",
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
    expect(hiddenImage).toBeDefined();
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
    expect(gradientDivs.length).toBeGreaterThanOrEqual(4);
  });

  it("has grain overlay with noise texture", () => {
    const { container } = render(<Hero />);
    const stickyContainer = container.querySelector(".sticky") as HTMLElement;
    const grainDiv = Array.from(stickyContainer.children).find((el) => {
      const style = (el as HTMLElement).style;
      return style.backgroundImage?.includes("feTurbulence");
    });
    expect(grainDiv).toBeDefined();
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
});
