"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useScrollProgress } from "@/app/[locale]/(public)/components/scroll-context";
import { ArticleAuthor } from "./article-author";
import { PullQuote } from "./pull-quote";
import { ReadingProgress } from "./reading-progress";
import { TypewriterQuote } from "./typewriter-quote";
import { ViralCoefficientChart } from "./viral-coefficient-chart";

function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.section
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function StatBlock({
  value,
  label,
  description,
  delay,
}: {
  value: string;
  label: string;
  description: string;
  delay: number;
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className="px-4 text-center"
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <p className="font-accent text-4xl font-bold text-[#12271d] md:text-5xl">{value}</p>
      <p className="mt-1 text-sm font-medium text-[#525252]">{label}</p>
      <p className="mt-1 text-xs text-[#999]">{description}</p>
    </motion.div>
  );
}

const DARK_HERO_HEIGHT = 350;

export function ViralArticle() {
  const prefersReduced = useReducedMotion();
  const { setDarkHeaderHeight } = useScrollProgress();

  useEffect(() => {
    setDarkHeaderHeight(DARK_HERO_HEIGHT);
    return () => setDarkHeaderHeight(0);
  }, [setDarkHeaderHeight]);

  return (
    <>
      <ReadingProgress />

      <article id="main-content">
        {/* Hero Section (dark) */}
        <header className="relative overflow-hidden bg-[#0a0a0a] px-6 pt-36 pb-20 md:px-12 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-3xl">
            <motion.div
              className="mb-8 flex items-center gap-3 text-xs font-bold tracking-widest"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="h-px w-6 bg-[#a3a3a3]" aria-hidden="true" />
              <span className="text-[#a3a3a3] uppercase">Builder Notes</span>
              <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
              <span className="font-normal text-white/30">4 min read</span>
            </motion.div>

            <motion.h1
              className="mb-8 font-serif text-[2.5rem] leading-[1.08] font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              The Difference Between 891 Users and 3.2 Million Is a Decimal Point
            </motion.h1>

            <motion.p
              className="max-w-xl text-lg leading-[1.7] font-light text-white/60 md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              The viral coefficient, or K-factor, is how many new users each user brings with them.
              A few decimals decide whether your product compounds into millions or quietly fizzles
              out.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <ArticleAuthor date="Aug 29, 2026" dark />
            </motion.div>
          </div>
        </header>

        {/* Seamless transition strip */}
        <div className="h-px bg-[#fafaf8]" aria-hidden="true" />

        {/* Body */}
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <Section className="pt-16 md:pt-24">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              What Is the Viral Coefficient?
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                The viral coefficient is the average number of users a new user brings on after they
                convert, e.g. after they have bought your product, or perhaps signed up on your
                platform. Essentially: how many friends does a new customer bring to your business.
                You want this number as high as possible.
              </p>
              <p>
                The stories and examples below can help you understand the implications of different
                viral coefficients on a deeper level, and hopefully induce some reflection around
                this concept.
              </p>
            </div>
          </Section>

          <PullQuote>
            How many friends does a new customer bring to your business? That single number is the
            K-factor.
          </PullQuote>

          <Section>
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              The Vape Cult of Houston
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                I have a friend in Houston who is infatuated with these fruity and colourful vapes.
                Let us call him John. He likes them so much that he has gotten all his friends and
                his friends&apos; wives to buy them. After John bought his first vape, he converted
                10 people from his network to the vape cult.
              </p>
              <p>
                And if every one of his 10 friends converts 10 new customers, the viral coefficient
                (K-factor) will be 10. Meaning the total number of customers is now 111. If the
                K-factor remains at 10 for another cycle, the total customers will amount to 1,111.
                This compounding effect creates an exponential growth curve.
              </p>
            </div>
          </Section>

          <Section className="pt-10 md:pt-16">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              How TikTok Compounds
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Let us now run through TikTok as an example. A guy named Marc decides to download
                TikTok. He loves it so much that he is telling his friends about the app. He gets 3
                of his friends to create an account. These 3 friends share videos to their other
                friends that have yet to download the app.
              </p>
              <p>
                Out of all the people the 3 users have shared videos to, 9 have gone through with a
                download and have created an account. In this case the average number of new users
                that each converted user has brought onto the app is 3, therefore the viral
                coefficient is 3.
              </p>
            </div>
          </Section>

          <Section>
            <div className="my-12 rounded-2xl border border-[#e5e5e5] bg-gradient-to-br from-[#fafaf8] to-[#f0f0ec] p-6 shadow-sm md:my-16 md:p-10">
              <p className="mb-4 text-xs font-bold tracking-widest text-[#12271d] uppercase">
                A cousin in epidemiology
              </p>
              <div className="space-y-3 text-base leading-[1.8] font-light text-[#525252] md:text-lg">
                <p>
                  A similar factor called the reproduction number is used in epidemiology. In this
                  world it is used to estimate and track how many new people an infected person
                  infects on average, where R&#8320; is how many people a newly infected person will
                  transmit the disease to in a fully susceptible population.
                </p>
                <p>
                  If a person infects 2 people, and they in turn infect another 2 people each, the
                  reproduction number is 2. It is very similar to the viral coefficient we are
                  talking about in business and marketing.
                </p>
              </div>
            </div>
          </Section>

          <Section>
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              The Threshold Is 1. The True Cause Is in the Decimals.
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                If the viral coefficient is K &lt; 1, your growth will fizzle out over time. If it
                is K &gt; 1, your user base will grow exponentially. And decimals matter a lot here.
                The math in this example will showcase this perfectly.
              </p>
              <p>
                I will demonstrate the differences in results with a set of varying K-factors. Let
                us say we have a seed of 100 users that grows over 20 cycles. The first K-factor is
                0.9, the second is 0.99, and the following are: 1.1, 1.3, 1.5, 1.6. Try to hold onto
                your chair while looking at the graph below.
              </p>
            </div>
          </Section>

          <ViralCoefficientChart />

          <Section>
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              Reading the Ladder
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                We see that a K-factor of 0.9 ends at 891 users after 20 cycles. A K-factor of 0.99
                ends at 1.9K users. With a K-factor of 1.1 the user base will still end up small
                relative to the other K-factors, but the user count is still 7 times as large as the
                user base produced by K = 0.9, and the total users end up being 6.4K.
              </p>
              <p>
                And the interesting part revealed by this K-factor ladder is that each small
                increase in K causes disproportionately large differences after 20 cycles. The
                K-factor of 1.3 gives us 82K users, and if we increment the K-factor from 1.3 to 1.5
                we get close to a <strong>MILLION USERS!</strong> That took us from under 100K and
                almost up to 1 million.
              </p>
              <p>
                And if we increment once again from 1.5 to 1.6, the K-factor of 1.6 over 20 cycles
                will give us 3.22 million users. The difference between the highest and lowest
                K-factor is just 0.7, yet over 20 cycles, the difference in the resulting user base
                is a staggering ~3.22 million! Hopefully you did not blow up from this shocking
                illustration of the colossal impact that small differences in the K-factor can have.
              </p>
            </div>
          </Section>

          <Section className="py-12 md:py-20">
            <p className="mb-6 text-center text-xs font-bold tracking-widest text-[#12271d] uppercase">
              Same seed. Same 20 cycles.
            </p>
            <div className="flex flex-col items-center justify-around gap-6 rounded-2xl border border-[#e5e5e5] bg-white py-8 shadow-sm md:flex-row md:gap-0">
              <StatBlock
                value="891"
                label="K = 0.9"
                description="users after 20 cycles"
                delay={0}
              />
              <div className="hidden h-12 w-px bg-[#e5e5e5] md:block" aria-hidden="true" />
              <div className="h-px w-16 bg-[#e5e5e5] md:hidden" aria-hidden="true" />
              <StatBlock
                value="82K"
                label="K = 1.3"
                description="users after 20 cycles"
                delay={0.15}
              />
              <div className="hidden h-12 w-px bg-[#e5e5e5] md:block" aria-hidden="true" />
              <div className="h-px w-16 bg-[#e5e5e5] md:hidden" aria-hidden="true" />
              <StatBlock
                value="3.22M"
                label="K = 1.6"
                description="users after 20 cycles"
                delay={0.3}
              />
            </div>
          </Section>

          {/* Closing */}
          <section className="pb-32 md:pb-40">
            <Section>
              <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
                <p>
                  Now you understand the viral coefficient better and you might also understand its
                  importance in creating a viral product. The difference between a viral loop that
                  scales exponentially and one that fizzles out and dies is a minuscule difference
                  in the K-factor, and tiny changes in K become massive differences in result after
                  repeated cycles.
                </p>
              </div>
            </Section>

            <PullQuote>
              The difference between a loop that scales exponentially and one that fizzles out is a
              decimal.
            </PullQuote>

            <div className="mt-8 pb-8 md:mt-12">
              <TypewriterQuote
                text="Virality is decided in the decimals."
                className="text-center"
              />
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
