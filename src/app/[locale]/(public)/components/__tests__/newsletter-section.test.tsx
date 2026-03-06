import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { NewsletterSection } from "../newsletter-section";

// WatercolorPlant uses canvas which is unavailable in jsdom
vi.mock("../watercolor-plant", () => ({
  WatercolorPlant: () => <div data-testid="watercolor-plant-mock" />,
}));

describe("NewsletterSection", () => {
  it("renders the heading", () => {
    render(<NewsletterSection />);
    expect(screen.getByText("Subscribe to the newsletter")).toBeInTheDocument();
  });

  it("email input has aria-label", () => {
    render(<NewsletterSection />);
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
  });

  it("shows error when submitting with empty email", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection />);

    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("shows error when submitting with invalid email", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection />);

    await user.type(screen.getByLabelText("Email address"), "not-an-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("shows success message on valid email submit", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection />);

    await user.type(screen.getByLabelText("Email address"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(screen.getByText(/Thank you for subscribing/)).toBeInTheDocument();
  });

  it("footer contains 'Damsgaard' spelled correctly (with S)", () => {
    render(<NewsletterSection />);
    const footer = document.querySelector("footer")!;
    expect(footer.textContent).toContain("Damsgaard");
    expect(footer.textContent).not.toContain("Damgaard");
  });

  it("clears error when user starts typing", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection />);

    // Trigger error
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();

    // Start typing — error should clear
    await user.type(screen.getByLabelText("Email address"), "a");
    expect(screen.queryByText("Please enter a valid email address.")).not.toBeInTheDocument();
  });
});
