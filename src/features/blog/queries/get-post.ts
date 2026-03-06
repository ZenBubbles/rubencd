import { defineQuery } from "groq";
import { fetchSanity } from "@/lib/sanity/client";
import type { PostData } from "../types";
const GET_POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, publishedAt, excerpt, body,
    mainImage, "categories": categories[]->title,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200) + 1
  }
`);
const GET_POST_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
);
export const getPost = (slug: string) => fetchSanity<PostData | null>(GET_POST_QUERY, { slug });
export const getPostSlugs = () => fetchSanity<{ slug: string }[]>(GET_POST_SLUGS_QUERY);
