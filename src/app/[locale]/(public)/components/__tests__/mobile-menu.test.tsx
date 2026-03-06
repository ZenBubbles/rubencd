import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MobileMenu } from "../mobile-menu";

describe("MobileMenu", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<MobileMenu open={false} onClose={vi.fn()} />);
    expect(container.innerHTML).toBe("");
  });

  it("has role='dialog' and aria-modal='true' when open", () => {
    render(<MobileMenu open={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("has aria-label from translations", () => {
    render(<MobileMenu open={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Navigation menu");
  });

  it("calls onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileMenu open={true} onClose={onClose} />);

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders close button and nav links", () => {
    render(<MobileMenu open={true} onClose={vi.fn()} />);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileMenu open={true} onClose={onClose} />);

    await user.click(screen.getByLabelText("Close menu"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("traps focus: Tab from last element wraps to first", async () => {
    const user = userEvent.setup();
    render(<MobileMenu open={true} onClose={vi.fn()} />);

    const closeButton = screen.getByLabelText("Close menu");
    const contactLink = screen.getByText("Contact");

    // Focus should start on close button (first focusable)
    expect(document.activeElement).toBe(closeButton);

    // Tab to Articles link
    await user.tab();
    expect(document.activeElement).toBe(screen.getByText("Articles"));

    // Tab to Contact link (last focusable)
    await user.tab();
    expect(document.activeElement).toBe(contactLink);

    // Tab again should wrap to close button
    await user.tab();
    expect(document.activeElement).toBe(closeButton);
  });

  it("traps focus: Shift+Tab from first element wraps to last", async () => {
    const user = userEvent.setup();
    render(<MobileMenu open={true} onClose={vi.fn()} />);

    const closeButton = screen.getByLabelText("Close menu");
    const contactLink = screen.getByText("Contact");

    // Focus starts on close button
    expect(document.activeElement).toBe(closeButton);

    // Shift+Tab should wrap to last element (Contact)
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(contactLink);
  });
});
