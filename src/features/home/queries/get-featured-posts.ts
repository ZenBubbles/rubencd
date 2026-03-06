import { defineQuery } from "groq";
import { fetchSanity } from "@/lib/sanity/client";
import type { PostCardData } from "@/features/blog";

const GET_FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...3] {
    _id, title, "slug": slug.current, publishedAt, excerpt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200) + 1,
    "categories": categories[]->title
  }
`);

export const getFeaturedPosts = () => fetchSanity<PostCardData[]>(GET_FEATURED_POSTS_QUERY);
