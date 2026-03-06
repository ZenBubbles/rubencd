import React from "react";
import { Hero } from "./Hero";
import { BlogSection } from "./BlogSection";
import { NewsletterSection } from "./NewsletterSection";

export const Home = () => {
  return (
    <main className="w-full flex-grow">
      <Hero />
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24 lg:px-24" id="articles">
        <header className="mb-16 max-w-4xl md:mb-24">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#12271d]"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-[#12271d] uppercase">
              Latest Writing
            </span>
          </div>
          <h2 className="font-serif text-5xl leading-[1.1] font-light text-[#1a1a1a] md:text-7xl">
            Ideas worth <br />
            <span className="font-normal italic">reading slowly.</span>
          </h2>
        </header>
        <BlogSection />
        <NewsletterSection />
      </div>
    </main>
  );
};
