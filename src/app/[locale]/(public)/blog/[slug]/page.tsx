import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getPost, getPostSlugs, PostBody } from "@/features/blog";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  if (slug === "__placeholder__") return {};
  await connection();
  const post = await getPost(slug);
  if (!post) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  const title = post.title ?? t("title");
  const description = post.excerpt ?? "";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      languages: {
        en: `/en/blog/${slug}`,
        nb: `/nb/blog/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs();
    if (slugs.length === 0) return [{ slug: "__placeholder__" }];
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [{ slug: "__placeholder__" }];
  }
}

async function BlogPostContent({ slug }: { slug: string }) {
  const t = await getTranslations("blog");
  await connection();
  const post = await getPost(slug);
  if (!post) notFound();
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 font-serif text-4xl font-medium text-[#1a1a1a] md:text-5xl">
        {post.title}
      </h1>
      <Suspense fallback={<div>{t("loading")}</div>}>
        <PostBody content={post.body as never} />
      </Suspense>
    </article>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  return (
    <Suspense fallback={<div>{t("loading")}</div>}>
      <BlogPostContent slug={slug} />
    </Suspense>
  );
}
