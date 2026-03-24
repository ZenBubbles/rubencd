import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export async function FeaturedArticle() {
  const t = await getTranslations("articles");

  return (
    <section className="mb-32">
      <Link
        href="/blog/claude-skills"
        className="group grid cursor-pointer grid-cols-1 items-start gap-8 border-b border-[#E5E5E5]/60 pb-20 focus-visible:ring-2 focus-visible:ring-[#12271d] focus-visible:ring-offset-4 focus-visible:outline-none lg:grid-cols-12 lg:gap-20"
      >
        <div className="relative h-[400px] w-full overflow-hidden rounded-sm bg-[#0a0a0a] shadow-sm md:h-[550px] lg:col-span-7">
          <Image
            src="/images/iphone_skills_comparison_v2.svg"
            alt="Comparison of two smartphones: one empty representing Claude without skills, one loaded with skill apps"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain p-8 transition-all duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="flex h-full flex-col justify-center pt-4 lg:col-span-5 lg:pt-8">
          <div className="mb-5 flex items-center gap-3 text-xs tracking-widest text-[#999]">
            <span className="font-semibold text-[#12271d] uppercase">AI Skills</span>
            <span className="text-[#d4d4d4]">/</span>
            <span>Mar 19, 2026</span>
          </div>

          <h2 className="mb-6 font-serif text-3xl leading-[1.15] font-light text-[#1a1a1a] italic transition-colors duration-300 group-hover:text-[#12271d] md:text-4xl lg:text-[2.75rem]">
            Claude Without Skills Is Like a Smartphone Without Apps
          </h2>

          <p className="mb-10 text-[15px] leading-[1.85] font-light text-[#707070]">
            Skills are the unlock that turns Claude from a generic chatbot into a personalized
            thinking partner. Learn what they are, why they matter, and how to build your own.
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
