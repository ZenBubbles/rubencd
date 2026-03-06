import { defineQuery } from "groq";
import { fetchSanity } from "@/lib/sanity/client";
import type { PostCardData } from "../types";
const GET_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, publishedAt, excerpt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200) + 1,
    "categories": categories[]->title
  }
`);
export const getPosts = () => fetchSanity<PostCardData[]>(GET_POSTS_QUERY);
