import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Nav } from "../nav";

describe("Nav", () => {
  it("renders the RCD. logo", () => {
    render(<Nav mobileMenuOpen={false} setMobileMenuOpen={vi.fn()} />);
    expect(screen.getByText("RCD.")).toBeInTheDocument();
  });

  it("renders Articles and Contact links", () => {
    render(<Nav mobileMenuOpen={false} setMobileMenuOpen={vi.fn()} />);
    const articlesLink = screen.getByText("Articles");
    const contactLink = screen.getByText("Contact");
    expect(articlesLink).toBeInTheDocument();
    expect(articlesLink.closest("a")).toHaveAttribute("href", "#articles");
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest("a")).toHaveAttribute("href", "#contact");
  });

  it("has proper aria-label on nav element", () => {
    render(<Nav mobileMenuOpen={false} setMobileMenuOpen={vi.fn()} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Main navigation");
  });

  it("renders hamburger button with aria-label", () => {
    render(<Nav mobileMenuOpen={false} setMobileMenuOpen={vi.fn()} />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("shows 'Close menu' aria-label when mobile menu is open", () => {
    render(<Nav mobileMenuOpen={true} setMobileMenuOpen={vi.fn()} />);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  it("calls setMobileMenuOpen when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    const setMobileMenuOpen = vi.fn();
    render(<Nav mobileMenuOpen={false} setMobileMenuOpen={setMobileMenuOpen} />);

    await user.click(screen.getByLabelText("Open menu"));
    expect(setMobileMenuOpen).toHaveBeenCalledWith(true);
  });

  it("calls setMobileMenuOpen(false) when menu is open and button is clicked", async () => {
    const user = userEvent.setup();
    const setMobileMenuOpen = vi.fn();
    render(<Nav mobileMenuOpen={true} setMobileMenuOpen={setMobileMenuOpen} />);

    await user.click(screen.getByLabelText("Close menu"));
    expect(setMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  it("RCD. logo is a link element", () => {
    render(<Nav mobileMenuOpen={false} setMobileMenuOpen={vi.fn()} />);
    const logo = screen.getByText("RCD.");
    const linkElement = logo.closest("a") ?? (logo.tagName === "A" ? logo : null);
    expect(linkElement).not.toBeNull();
    expect(linkElement).toHaveAttribute("href");
  });

  it("accepts scrollProgress prop without error", () => {
    const mockMotionValue = { on: () => () => {}, get: () => 0 };
    // Should not throw when scrollProgress is provided
    expect(() =>
      render(
        <Nav
          mobileMenuOpen={false}
          setMobileMenuOpen={vi.fn()}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          scrollProgress={mockMotionValue as any}
        />,
      ),
    ).not.toThrow();
  });
});
