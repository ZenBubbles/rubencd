import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/live";
import { defineQuery } from "next-sanity";

const sitemapPostsQuery = defineQuery(`*[_type == "post" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubencd.com";

  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "/blog", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap(({ path, priority }) => [
    {
      url: `${siteUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority,
    },
    {
      url: `${siteUrl}/nb${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: priority - 0.1,
    },
  ]);

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const { data: posts } = await sanityFetch({ query: sitemapPostsQuery });
    postEntries = (posts ?? []).flatMap((post: { slug: string; _updatedAt: string }) => [
      {
        url: `${siteUrl}/en/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${siteUrl}/nb/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ]);
  } catch {
    // Sanity fetch may fail during build without token — static pages still generated
  }

  // Static article page
  const staticArticle: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/en/blog/is-software-and-saas-dying`,
      lastModified: new Date("2026-03-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/nb/blog/is-software-and-saas-dying`,
      lastModified: new Date("2026-03-05"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticEntries, ...staticArticle, ...postEntries];
}
