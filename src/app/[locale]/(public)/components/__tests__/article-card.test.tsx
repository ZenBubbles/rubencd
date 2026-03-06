import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ArticleCard } from "../article-card";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} />
  ),
}));

const defaultProps = {
  image: "https://example.com/photo.jpg",
  imageAlt: "Test image alt",
  category: "Technology",
  date: "Sep 15, 2023",
  title: "Test article title",
  excerpt: "This is a test excerpt for the article card component.",
  readTime: "5 MIN READ",
  slug: "test-article-title",
};

describe("ArticleCard", () => {
  it("renders the category", () => {
    render(<ArticleCard {...defaultProps} />);
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<ArticleCard {...defaultProps} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Test article title" }),
    ).toBeInTheDocument();
  });

  it("renders the excerpt", () => {
    render(<ArticleCard {...defaultProps} />);
    expect(
      screen.getByText("This is a test excerpt for the article card component."),
    ).toBeInTheDocument();
  });

  it("renders the read time", () => {
    render(<ArticleCard {...defaultProps} />);
    expect(screen.getByText("5 MIN READ")).toBeInTheDocument();
  });

  it("renders the date", () => {
    render(<ArticleCard {...defaultProps} />);
    expect(screen.getByText("Sep 15, 2023")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<ArticleCard {...defaultProps} />);
    const img = screen.getByAltText("Test image alt");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("renders as an article element", () => {
    render(<ArticleCard {...defaultProps} />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("entire card is wrapped in a link to /blog/[slug]", () => {
    render(<ArticleCard {...defaultProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/test-article-title");
  });

  it("link href uses the slug prop", () => {
    render(<ArticleCard {...defaultProps} slug="custom-slug" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/custom-slug");
  });
});
