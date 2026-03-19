import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { Link } from "@/i18n/routing";
import { getPosts } from "@/features/blog";
import { urlFor } from "@/lib/sanity/image-builder";
import { formatDate } from "@/lib/utils/format";

export async function FeaturedArticle() {
  const t = await getTranslations("articles");
  await connection();
  const posts = await getPosts();
  const featured = posts[0];

  if (!featured) {
    return (
      <section className="mb-32">
        <Link
          href="/blog/is-software-and-saas-dying"
          className="group grid cursor-pointer grid-cols-1 items-start gap-8 border-b border-[#E5E5E5]/60 pb-20 focus-visible:ring-2 focus-visible:ring-[#12271d] focus-visible:ring-offset-4 focus-visible:outline-none lg:grid-cols-12 lg:gap-20"
        >
          <div className="relative h-[400px] w-full overflow-hidden rounded-sm bg-gray-100 shadow-sm md:h-[550px] lg:col-span-7">
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              alt={t("featured.imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
          </div>

          <div className="flex h-full flex-col justify-center pt-4 lg:col-span-5 lg:pt-8">
            <div className="mb-5 flex items-center gap-3 text-xs tracking-widest text-[#999]">
              <span className="font-semibold text-[#12271d] uppercase">
                {t("featured.category")}
              </span>
              <span className="text-[#d4d4d4]">/</span>
              <span>{t("featured.date")}</span>
            </div>

            <h2 className="mb-6 font-serif text-3xl leading-[1.15] font-light text-[#1a1a1a] italic transition-colors duration-300 group-hover:text-[#12271d] md:text-4xl lg:text-[2.75rem]">
              {t("featured.title")}
            </h2>

            <p className="mb-10 text-[15px] leading-[1.85] font-light text-[#707070]">
              {t("featured.excerpt")}
            </p>

            <span className="inline-flex items-center gap-3 self-start">
              <span className="text-xs font-medium tracking-[0.15em] text-[#1a1a1a] uppercase transition-colors duration-200 group-hover:text-[#12271d]">
                {t("readFullStory")}
              </span>
              <span className="h-px w-8 bg-[#1a1a1a] transition-all duration-300 group-hover:w-12 group-hover:bg-[#12271d]" />
            </span>
          </div>
        </Link>
      </section>
    );
  }

  const imageUrl = featured.mainImage?.asset
    ? urlFor(featured.mainImage).width(1200).height(800).url()
    : null;

  const category = featured.categories[0];

  return (
    <section className="mb-32">
      <Link
        href={`/blog/${featured.slug}`}
        className="group grid cursor-pointer grid-cols-1 items-start gap-8 border-b border-[#E5E5E5]/60 pb-20 focus-visible:ring-2 focus-visible:ring-[#12271d] focus-visible:ring-offset-4 focus-visible:outline-none lg:grid-cols-12 lg:gap-20"
      >
        <div className="relative h-[400px] w-full overflow-hidden rounded-sm bg-gray-100 shadow-sm md:h-[550px] lg:col-span-7">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
          )}
          <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="flex h-full flex-col justify-center pt-4 lg:col-span-5 lg:pt-8">
          <div className="mb-5 flex items-center gap-3 text-xs tracking-widest text-[#999]">
            {category && (
              <>
                <span className="font-semibold text-[#12271d] uppercase">{category.title}</span>
                <span className="text-[#d4d4d4]">/</span>
              </>
            )}
            <span>{formatDate(featured.publishedAt)}</span>
          </div>

          <h2 className="mb-6 font-serif text-3xl leading-[1.15] font-light text-[#1a1a1a] italic transition-colors duration-300 group-hover:text-[#12271d] md:text-4xl lg:text-[2.75rem]">
            {featured.title}
          </h2>

          {featured.excerpt && (
            <p className="mb-10 text-[15px] leading-[1.85] font-light text-[#707070]">
              {featured.excerpt}
            </p>
          )}

          <span className="inline-flex items-center gap-3 self-start">
            <span className="text-xs font-medium tracking-[0.15em] text-[#1a1a1a] uppercase transition-colors duration-200 group-hover:text-[#12271d]">
              {t("readFullStory")}
            </span>
            <span className="h-px w-8 bg-[#1a1a1a] transition-all duration-300 group-hover:w-12 group-hover:bg-[#12271d]" />
          </span>
        </div>
      </Link>
    </section>
  );
}
