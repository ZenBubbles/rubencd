import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export async function FeaturedArticle() {
  const t = await getTranslations("articles");

  return (
    <section className="mb-24">
      <article className="group grid grid-cols-1 items-start gap-8 border-b border-[#E5E5E5] pb-16 lg:grid-cols-12 lg:gap-16">
        <div className="relative h-[400px] w-full overflow-hidden bg-gray-100 shadow-sm md:h-[550px] lg:col-span-7">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt={t("featured.imageAlt")}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover grayscale-[10%] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="flex h-full flex-col justify-center pt-4 lg:col-span-5 lg:pt-8">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-widest text-[#525252]">
            <span className="text-[#12271d] uppercase">{t("featured.category")}</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="font-normal text-gray-400">{t("featured.date")}</span>
          </div>

          <h2 className="mb-6 font-serif text-3xl leading-[1.2] font-medium text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#12271d] md:text-4xl lg:text-5xl">
            {t("featured.title")}
          </h2>

          <p className="mb-8 text-lg leading-relaxed font-light text-[#525252] antialiased">
            {t("featured.excerpt")}
          </p>

          <Link
            href="/blog/is-software-and-saas-dying"
            className="group/link flex cursor-pointer items-center gap-2 rounded-sm focus-visible:ring-2 focus-visible:ring-[#12271d] focus-visible:outline-none"
          >
            <span className="border-b border-[#1a1a1a] pb-1 text-xs font-bold tracking-widest uppercase transition-all group-hover/link:border-[#12271d] group-hover/link:text-[#12271d]">
              {t("readFullStory")}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-4 w-4 transition-colors duration-300 group-hover/link:translate-x-1 group-hover/link:text-[#12271d]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </article>
    </section>
  );
}
