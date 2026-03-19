import Image from "next/image";
import { Link } from "@/i18n/routing";

export interface ArticleCardProps {
  image: string;
  imageAlt: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  slug: string;
}

export function ArticleCard({
  image,
  imageAlt,
  category,
  date,
  title,
  excerpt,
  readTime,
  slug,
}: ArticleCardProps) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/blog/${slug}`}
        className="flex h-full cursor-pointer flex-col focus-visible:ring-2 focus-visible:ring-[#12271d]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf8] focus-visible:outline-none"
      >
        <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="mb-4 flex items-center gap-3 text-xs tracking-widest text-[#999]">
          <span className="font-semibold text-[#12271d] uppercase">{category}</span>
          <span className="text-[#d4d4d4]">/</span>
          <span>{date}</span>
        </div>

        <h3 className="mb-4 font-serif text-[1.375rem] leading-[1.3] font-light text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#12271d]">
          {title}
        </h3>

        <p className="mb-6 line-clamp-3 text-[14px] leading-[1.8] font-light text-[#707070]">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <span className="text-[11px] font-medium tracking-[0.1em] text-[#999] uppercase">
            {readTime}
          </span>
          <span className="h-px flex-1 bg-[#E5E5E5]/60" />
          <span className="h-px w-6 bg-[#1a1a1a] transition-all duration-300 group-hover:w-10 group-hover:bg-[#12271d]" />
        </div>
      </Link>
    </article>
  );
}
