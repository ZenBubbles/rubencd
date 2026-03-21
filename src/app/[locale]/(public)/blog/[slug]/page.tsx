import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getPost, getPostSlugs, PostBody } from "@/features/blog";
import { urlFor } from "@/lib/sanity/image-builder";
import { formatDate } from "@/lib/utils/format";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  if (slug === "__placeholder__") return {};
  await connection();
  const post = await getPost(slug, locale);
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

async function BlogPostContent({ slug, locale }: { slug: string; locale: string }) {
  const t = await getTranslations("blog");
  await connection();
  const post = await getPost(slug, locale);
  if (!post) notFound();

  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1400).height(700).url()
    : null;

  const category = post.categories[0];

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header className="mb-12">
        <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-widest text-[#525252]">
          {category && <span className="text-[#12271d] uppercase">{category.title}</span>}
          {category && <span className="h-1 w-1 rounded-full bg-gray-300" />}
          <span className="font-normal text-gray-400">{formatDate(post.publishedAt)}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="font-normal text-gray-400">{post.estimatedReadingTime} min read</span>
        </div>
        <h1 className="mb-6 font-serif text-4xl leading-[1.15] font-medium text-[#1a1a1a] md:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-xl leading-relaxed font-light text-[#525252]">{post.excerpt}</p>
        )}
      </header>

      {imageUrl && (
        <div className="relative -mx-6 mb-12 aspect-[2/1] overflow-hidden rounded-sm bg-gray-100 shadow-sm md:-mx-12">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover grayscale-[10%]"
          />
          <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
        </div>
      )}

      <div className="border-t border-[#E5E5E5] pt-12">
        <Suspense fallback={<div>{t("loading")}</div>}>
          <PostBody content={post.body as never} />
        </Suspense>
      </div>
    </article>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  return (
    <Suspense fallback={<div>{t("loading")}</div>}>
      <BlogPostContent slug={slug} locale={locale} />
    </Suspense>
  );
}
