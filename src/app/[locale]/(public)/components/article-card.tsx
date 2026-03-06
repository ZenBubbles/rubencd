import Image from "next/image";
import { Link } from "@/i18n/routing";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
        className="flex h-full flex-col rounded-sm focus-visible:ring-2 focus-visible:ring-[#12271d] focus-visible:outline-none"
      >
        <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden bg-gray-100 shadow-sm">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover grayscale-[10%] transition-transform duration-700 group-hover:scale-105 group-hover:opacity-95 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="mb-3 flex items-center gap-3 text-xs font-bold tracking-widest text-[#525252]">
          <span className="text-[#12271d] uppercase">{category}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="font-normal text-gray-400">{date}</span>
        </div>

        <h3 className="mb-3 font-serif text-2xl leading-snug font-medium text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#12271d]">
          {title}
        </h3>

        <p className="mb-5 line-clamp-3 text-[15px] leading-relaxed font-light text-[#525252]">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[#E5E5E5]/60 pt-5">
          <span className="font-mono text-xs font-medium text-gray-400">{readTime}</span>
          <ArrowIcon className="h-4 w-4 text-gray-300 transition-colors group-hover:text-[#12271d]" />
        </div>
      </Link>
    </article>
  );
}
