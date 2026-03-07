import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { NewsletterSection } from "../newsletter-section";

// WatercolorPlant uses canvas which is unavailable in jsdom
vi.mock("../watercolor-plant", () => ({
  WatercolorPlant: () => <div data-testid="watercolor-plant-mock" />,
}));

describe("NewsletterSection (Contact Form)", () => {
  it("renders the section heading", () => {
    render(<NewsletterSection />);
    const heading = screen.getByRole("heading", { name: /let.*conversation|get in touch/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders name input with accessible label", () => {
    render(<NewsletterSection />);
    // Look for a name input by label text or aria-label
    const nameInput = screen.queryByLabelText(/name/i) ?? screen.queryByPlaceholderText(/name/i);
    expect(nameInput).not.toBeNull();
    expect(nameInput!.tagName).toBe("INPUT");
  });

  it("renders email input with accessible label", () => {
    render(<NewsletterSection />);
    const emailInput = screen.queryByLabelText(/email/i) ?? screen.queryByPlaceholderText(/email/i);
    expect(emailInput).not.toBeNull();
    expect(emailInput!.tagName).toBe("INPUT");
  });

  it("renders a message textarea", () => {
    render(<NewsletterSection />);
    const textarea = document.querySelector("textarea");
    expect(textarea).not.toBeNull();
  });

  it("renders a submit button", () => {
    render(<NewsletterSection />);
    const submitButton = screen.getByRole("button", { name: /submit|send|subscribe|contact/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("shows success message after valid submission", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection />);

    // Fill in name field
    const nameInput = screen.queryByLabelText(/name/i) ?? screen.queryByPlaceholderText(/name/i);
    expect(nameInput).not.toBeNull();
    await user.type(nameInput!, "Test User");

    // Fill in email field
    const emailInput = screen.queryByLabelText(/email/i) ?? screen.queryByPlaceholderText(/email/i);
    expect(emailInput).not.toBeNull();
    await user.type(emailInput!, "test@example.com");

    // Submit
    const submitButton = screen.getByRole("button", { name: /submit|send|subscribe|contact/i });
    await user.click(submitButton);

    // Should show success feedback (translation key or English text)
    const successEl =
      screen.queryByText(/thank you/i) ??
      screen.queryByText(/success/i) ??
      screen.queryByText(/sent/i) ??
      screen.queryByText(/received/i);
    expect(successEl).not.toBeNull();
  });

  it("shows error when submitting with empty name", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection />);

    const emailInput = screen.queryByLabelText(/email/i) ?? screen.queryByPlaceholderText(/email/i);
    await user.type(emailInput!, "test@example.com");

    const submitButton = screen.getByRole("button", { name: /send/i });
    await user.click(submitButton);

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
  });

  it("shows error when submitting with invalid email", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection />);

    const nameInput = screen.queryByLabelText(/name/i) ?? screen.queryByPlaceholderText(/name/i);
    await user.type(nameInput!, "Test User");

    const emailInput = screen.queryByLabelText(/email/i) ?? screen.queryByPlaceholderText(/email/i);
    await user.type(emailInput!, "not-an-email");

    const submitButton = screen.getByRole("button", { name: /send/i });
    await user.click(submitButton);

    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("clears error when user types in the errored field", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection />);

    // Trigger name validation error
    const submitButton = screen.getByRole("button", { name: /send/i });
    await user.click(submitButton);
    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();

    // Type in the name field — error should clear
    const nameInput = screen.queryByLabelText(/name/i) ?? screen.queryByPlaceholderText(/name/i);
    await user.type(nameInput!, "R");
    expect(screen.queryByText("Please enter your name.")).toBeNull();
  });

  it("footer contains 'Damsgaard' spelled correctly (with S)", () => {
    render(<NewsletterSection />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.textContent).toContain("Damsgaard");
    expect(footer.textContent).not.toContain("Damgaard");
  });

  it("has the watercolor plant background", () => {
    render(<NewsletterSection />);
    expect(screen.getByTestId("watercolor-plant-mock")).toBeInTheDocument();
  });
});
