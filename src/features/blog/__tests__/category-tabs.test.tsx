import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategoryTabs } from "../components/category-tabs";
import type { PostCardData } from "../types";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

// Mock @/i18n/routing
vi.mock("@/i18n/routing", () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// Mock @/lib/sanity/image-builder
vi.mock("@/lib/sanity/image-builder", () => ({
  urlFor: () => ({ width: () => ({ height: () => ({ url: () => "/mock-image.jpg" }) }) }),
}));

// Mock @/lib/utils/format
vi.mock("@/lib/utils/format", () => ({
  formatDate: (d: string) => d,
}));

const featuredPost: PostCardData = {
  _id: "featured-1",
  title: "Is Software and SaaS Dying?",
  slug: "is-software-and-saas-dying",
  publishedAt: "2026-03-05",
  excerpt: "How AI is eroding traditional software moats.",
  estimatedReadingTime: 5,
  categories: [{ title: "My Views", slug: "my-views" }],
};

const guidePost: PostCardData = {
  _id: "guide-1",
  title: "Building AI Agents from Scratch",
  slug: "building-ai-agents",
  publishedAt: "2026-03-10",
  excerpt: "A hands-on guide to building AI agents.",
  estimatedReadingTime: 8,
  categories: [{ title: "My Guides", slug: "my-guides" }],
};

const uncategorizedPost: PostCardData = {
  _id: "uncat-1",
  title: "Uncategorized Thought",
  slug: "uncategorized-thought",
  publishedAt: "2026-03-12",
  excerpt: "A post with no category.",
  estimatedReadingTime: 3,
  categories: [],
};

const allPosts = [featuredPost, guidePost, uncategorizedPost];

describe("CategoryTabs", () => {
  it("shows ALL posts including featured post in the default 'All' tab", () => {
    render(<CategoryTabs posts={allPosts} />);

    expect(screen.getByText("Is Software and SaaS Dying?")).toBeInTheDocument();
    expect(screen.getByText("Building AI Agents from Scratch")).toBeInTheDocument();
    expect(screen.getByText("Uncategorized Thought")).toBeInTheDocument();
  });

  it("filters to only 'My Views' posts (including featured) when My Views tab is clicked", async () => {
    const user = userEvent.setup();
    render(<CategoryTabs posts={allPosts} />);

    await user.click(screen.getByRole("tab", { name: "My Views" }));

    expect(screen.getByText("Is Software and SaaS Dying?")).toBeInTheDocument();
    expect(screen.queryByText("Building AI Agents from Scratch")).not.toBeInTheDocument();
    expect(screen.queryByText("Uncategorized Thought")).not.toBeInTheDocument();
  });

  it("filters to only 'My Guides' posts when My Guides tab is clicked", async () => {
    const user = userEvent.setup();
    render(<CategoryTabs posts={allPosts} />);

    await user.click(screen.getByRole("tab", { name: "My Guides" }));

    expect(screen.queryByText("Is Software and SaaS Dying?")).not.toBeInTheDocument();
    expect(screen.getByText("Building AI Agents from Scratch")).toBeInTheDocument();
    expect(screen.queryByText("Uncategorized Thought")).not.toBeInTheDocument();
  });

  it("returns to showing all posts when All tab is clicked after filtering", async () => {
    const user = userEvent.setup();
    render(<CategoryTabs posts={allPosts} />);

    await user.click(screen.getByRole("tab", { name: "My Views" }));
    expect(screen.queryByText("Building AI Agents from Scratch")).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "All" }));
    expect(screen.getByText("Is Software and SaaS Dying?")).toBeInTheDocument();
    expect(screen.getByText("Building AI Agents from Scratch")).toBeInTheDocument();
    expect(screen.getByText("Uncategorized Thought")).toBeInTheDocument();
  });

  it("shows empty state when filtering a category with no posts", async () => {
    const user = userEvent.setup();
    // Only pass the guide post (My Guides) — no My Views posts
    render(<CategoryTabs posts={[guidePost]} />);

    await user.click(screen.getByRole("tab", { name: "My Views" }));
    expect(screen.getByText("No articles in this category yet.")).toBeInTheDocument();
  });
});
