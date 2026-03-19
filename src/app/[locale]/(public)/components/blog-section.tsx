import { connection } from "next/server";
import { getPosts, CategoryTabs } from "@/features/blog";
import { FeaturedArticle } from "./featured-article";

export async function BlogSection() {
  await connection();
  const posts = await getPosts();

  return (
    <>
      <FeaturedArticle />
      <section className="mt-8">
        <CategoryTabs posts={posts} />
      </section>
    </>
  );
}
