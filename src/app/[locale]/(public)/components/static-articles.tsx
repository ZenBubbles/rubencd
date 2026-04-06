import Image from "next/image";
import { Link } from "@/i18n/routing";

interface StaticArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  imageAlt: string;
}

const STATIC_ARTICLES: StaticArticle[] = [
  {
    slug: "claude-skills",
    title: "Claude Without Skills Is Like a Smartphone Without Apps",
    excerpt:
      "Skills are the unlock that turns Claude from a generic chatbot into a personalized thinking partner. Learn what they are, why they matter, and how to build your own.",
    category: "AI Skills",
    date: "Mar 19, 2026",
    readTime: "8 MIN READ",
    image: "/images/iphone_skills_comparison_v2.svg",
    imageAlt:
      "Comparison of two smartphones: one empty representing Claude without skills, one loaded with skill apps",
  },
  {
    slug: "tmux-is-your-cockpit",
    title:
      "You're Running 4 Terminal Windows in 2026. A 10x Engineer Just Walked Past Your Screen and Laughed.",
    excerpt:
      "The difference is not talent. It is Tmux. Why the terminal multiplexer is your cockpit in the AI agent era.",
    category: "My Guides",
    date: "Apr 5, 2026",
    readTime: "7 MIN READ",
    imageAlt: "A tmux terminal showing three AI agents running in parallel panes",
  },
];

export function StaticArticles() {
  return (
    <section className="mt-16 md:mt-24">
      <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
        {STATIC_ARTICLES.map((article) => (
          <article key={article.slug} className="group flex flex-col">
            <Link
              href={`/blog/${article.slug}`}
              className="flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-[#E5E5E5]/80 bg-white transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-[#12271d]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf8] focus-visible:outline-none"
            >
              {article.image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 ring-1 ring-black/5 ring-inset" />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center gap-3 text-xs tracking-widest text-[#999]">
                  <span className="font-semibold text-[#12271d] uppercase">{article.category}</span>
                  <span className="text-[#d4d4d4]">/</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="mb-4 font-serif text-[1.375rem] leading-[1.3] font-light text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#12271d]">
                  {article.title}
                </h3>

                <p className="mb-6 line-clamp-3 text-[14px] leading-[1.8] font-light text-[#707070]">
                  {article.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-3 border-t border-[#E5E5E5]/60 pt-5">
                  <span className="text-[11px] font-medium tracking-[0.1em] text-[#999] uppercase">
                    {article.readTime}
                  </span>
                  <span className="h-px flex-1 bg-[#E5E5E5]/40" />
                  <span className="h-px w-6 bg-[#1a1a1a] transition-all duration-300 group-hover:w-10 group-hover:bg-[#12271d]" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
