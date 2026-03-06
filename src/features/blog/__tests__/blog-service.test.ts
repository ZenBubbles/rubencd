import { describe, it, expect } from "vitest";
import { filterByCategory, uniqueCategories } from "../services/blog-service";
const posts = [
  {
    _id: "1",
    title: "A",
    slug: "a",
    publishedAt: "2025-01-01",
    estimatedReadingTime: 2,
    categories: ["AI", "ML"],
  },
  {
    _id: "2",
    title: "B",
    slug: "b",
    publishedAt: "2025-02-01",
    estimatedReadingTime: 3,
    categories: ["UI"],
  },
];
describe("blog-service", () => {
  it("filters by category", () => {
    expect(filterByCategory(posts, "AI")).toHaveLength(1);
  });
  it("returns unique sorted categories", () => {
    expect(uniqueCategories(posts)).toEqual(["AI", "ML", "UI"]);
  });
});
