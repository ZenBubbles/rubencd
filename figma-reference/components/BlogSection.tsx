import React, { useState } from "react";

const customStyles = {
  articleCardHoverH3: {
    color: "#12271d",
    transition: "color 0.2s ease",
  },
  articleCardHoverImg: {
    opacity: 0.95,
    transition: "opacity 0.2s ease",
  },
};

const ArrowIcon = ({ className }: { className?: string }) => (
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

const ArticleCard = ({ image, imageAlt, category, date, title, excerpt, readTime }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group flex cursor-pointer flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden bg-gray-100 shadow-sm">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover grayscale-[10%] filter transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
          style={hovered ? customStyles.articleCardHoverImg : {}}
        />
        <div className="absolute inset-0 ring-1 ring-black/5 ring-inset"></div>
      </div>
      <div className="mb-3 flex items-center gap-3 text-xs font-bold tracking-widest text-[#525252]">
        <span className="text-[#12271d] uppercase">{category}</span>
        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
        <span className="font-normal text-gray-400">{date}</span>
      </div>
      <h3
        className="mb-3 font-serif text-2xl leading-snug font-medium text-[#1a1a1a] transition-colors duration-200"
        style={hovered ? customStyles.articleCardHoverH3 : {}}
      >
        {title}
      </h3>
      <p className="mb-5 line-clamp-3 text-[15px] leading-relaxed font-light text-[#525252]">
        {excerpt}
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-[#E5E5E5]/60 pt-5">
        <span className="font-mono text-xs font-medium text-gray-400">{readTime}</span>
        <ArrowIcon
          className={`h-4 w-4 transition-colors ${hovered ? "text-[#12271d]" : "text-gray-300"}`}
        />
      </div>
    </article>
  );
};

const FeaturedArticle = () => (
  <section className="mb-24">
    <article className="group grid grid-cols-1 items-start gap-8 border-b border-[#E5E5E5] pb-16 lg:grid-cols-12 lg:gap-16">
      <div className="relative h-[400px] w-full overflow-hidden bg-gray-100 shadow-sm md:h-[550px] lg:col-span-7">
        <img
          src="https://images.unsplash.com/photo-1497215842964-222b4bef97ed?q=80&w=2070&auto=format&fit=crop"
          alt="Featured Article"
          className="h-full w-full object-cover grayscale-[10%] filter transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 ring-1 ring-black/5 ring-inset"></div>
      </div>
      <div className="flex h-full flex-col justify-center pt-4 lg:col-span-5 lg:pt-8">
        <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-widest text-[#525252]">
          <span className="text-[#12271d] uppercase">Design Philosophy</span>
          <span className="h-1 w-1 rounded-full bg-gray-300"></span>
          <span className="font-normal text-gray-400">Oct 12, 2023</span>
        </div>
        <h2 className="mb-6 font-serif text-3xl leading-[1.2] font-medium text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#12271d] md:text-4xl lg:text-5xl">
          The aesthetics of invisible interfaces
        </h2>
        <p className="mb-8 text-lg leading-relaxed font-light text-[#525252] antialiased">
          Exploring how we can design digital experiences that feel less like tools and more like
          extensions of thought. Why the best interface is often no interface at all, and the return
          to calm computing.
        </p>
        <div className="group/link flex cursor-pointer items-center gap-2">
          <span className="border-b border-[#1a1a1a] pb-1 text-xs font-bold tracking-widest uppercase transition-all group-hover/link:border-[#12271d] group-hover/link:text-[#12271d]">
            Read Full Story
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
        </div>
      </div>
    </article>
  </section>
);

const articles = [
  {
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Typography",
    category: "Typography",
    date: "Sep 28, 2023",
    title: "Serifs in the modern web era",
    excerpt:
      "Why we are returning to classical typography in digital products, and how it shapes reader trust and authority in an age of skepticism.",
    readTime: "5 MIN READ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Technology",
    category: "Technology",
    date: "Sep 15, 2023",
    title: "AI as a creative partner",
    excerpt:
      "Moving beyond prompt engineering into a true collaborative state with artificial intelligence models to augment human creativity.",
    readTime: "8 MIN READ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop",
    imageAlt: "Culture",
    category: "Culture",
    date: "Aug 30, 2023",
    title: "The quiet web movement",
    excerpt:
      "Why users are flocking to smaller, quieter corners of the internet in search of authentic connection away from algorithmic feeds.",
    readTime: "6 MIN READ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    imageAlt: "Leadership",
    category: "Leadership",
    date: "Aug 12, 2023",
    title: "Managing creative teams",
    excerpt:
      "Balancing the need for structure with the chaos required for true innovation to flourish in a remote-first environment.",
    readTime: "10 MIN READ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Product",
    category: "Product",
    date: "Jul 24, 2023",
    title: "The MVP is dead",
    excerpt:
      'Why "Minimum Viable Product" is being replaced by "Minimum Lovable Product" in saturated markets where good enough is no longer enough.',
    readTime: "4 MIN READ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=2069&auto=format&fit=crop",
    imageAlt: "Process",
    category: "Process",
    date: "Jul 10, 2023",
    title: "Systems over goals",
    excerpt:
      "Building sustainable creative habits instead of chasing arbitrary finish lines. A review of Atomic Habits through a designer's lens.",
    readTime: "7 MIN READ",
  },
];

export const BlogSection = () => {
  return (
    <>
      <FeaturedArticle />
      <section className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </section>
    </>
  );
};
