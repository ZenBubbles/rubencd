import { describe, it, expect } from "vitest";
import { filterByCategory, uniqueCategories } from "../services/blog-service";
import type { PostCardData } from "../types";

const posts: PostCardData[] = [
  {
    _id: "1",
    title: "A",
    slug: "a",
    publishedAt: "2025-01-01",
    estimatedReadingTime: 2,
    categories: [
      { title: "AI", slug: "ai" },
      { title: "ML", slug: "ml" },
    ],
  },
  {
    _id: "2",
    title: "B",
    slug: "b",
    publishedAt: "2025-02-01",
    estimatedReadingTime: 3,
    categories: [{ title: "UI", slug: "ui" }],
  },
];

describe("blog-service", () => {
  it("filters by category slug", () => {
    expect(filterByCategory(posts, "ai")).toHaveLength(1);
  });
  it("returns unique sorted categories", () => {
    const cats = uniqueCategories(posts);
    expect(cats.map((c) => c.title)).toEqual(["AI", "ML", "UI"]);
  });
});
