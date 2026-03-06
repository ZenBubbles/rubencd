import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PublicShell } from "../public-shell";

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
  useTransform: () => 1,
  useMotionTemplate: () => "blur(0px)",
  motionValue: (v: number) => ({
    get: () => v,
    on: () => () => {},
  }),
}));

describe("PublicShell", () => {
  it("renders a 'Skip to content' link with href '#main-content'", () => {
    render(<PublicShell>Content</PublicShell>);
    const skipLink = screen.getByText("Skip to content");
    expect(skipLink).toBeInTheDocument();
    expect(skipLink.tagName).toBe("A");
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("renders a main element with id 'main-content'", () => {
    render(<PublicShell>Content</PublicShell>);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
  });

  it("renders children inside main", () => {
    render(
      <PublicShell>
        <p>Hello world</p>
      </PublicShell>,
    );
    const main = screen.getByRole("main");
    expect(main).toHaveTextContent("Hello world");
  });
});
