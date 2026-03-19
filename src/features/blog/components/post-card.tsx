import Image from "next/image";
import { Link } from "@/i18n/routing";
import { urlFor } from "@/lib/sanity/image-builder";
import { formatDate } from "@/lib/utils/format";
import type { PostCardData } from "../types";

export function PostCard({ post }: { post: PostCardData }) {
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(800).height(600).url()
    : null;

  const category = post.categories[0];

  return (
    <article className="group flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-[#E5E5E5]/80 bg-white transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-[#12271d]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf8] focus-visible:outline-none"
      >
        {imageUrl && (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center gap-3 text-xs tracking-widest text-[#999]">
            {category && (
              <>
                <span className="font-semibold text-[#12271d] uppercase">{category.title}</span>
                <span className="text-[#d4d4d4]">/</span>
              </>
            )}
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <h3 className="mb-4 font-serif text-[1.375rem] leading-[1.3] font-light text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#12271d]">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mb-6 line-clamp-3 text-[14px] leading-[1.8] font-light text-[#707070]">
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E5]/60 pt-5">
            <span className="text-[11px] font-medium tracking-[0.1em] text-[#999] uppercase">
              {post.estimatedReadingTime} min read
            </span>
            <span className="h-px flex-1 bg-[#E5E5E5]/40" />
            <span className="h-px w-6 bg-[#1a1a1a] transition-all duration-300 group-hover:w-10 group-hover:bg-[#12271d]" />
          </div>
        </div>
      </Link>
    </article>
  );
}
