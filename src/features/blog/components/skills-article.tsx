"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useScrollProgress } from "@/app/[locale]/(public)/components/scroll-context";
import { ArticleAuthor } from "./article-author";
import { BeforeAfterToggle } from "./before-after-toggle";
import { PhoneComparison } from "./phone-comparison";
import { PullQuote } from "./pull-quote";
import { ReadingProgress } from "./reading-progress";
import { TypewriterQuote } from "./typewriter-quote";

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

function SkillBuilderPrompt() {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className="my-12 rounded-2xl border border-[#e5e5e5] bg-gradient-to-br from-[#fafaf8] to-[#f0f0ec] p-6 shadow-sm md:my-20 md:p-10"
      initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="mb-4 text-xs font-bold tracking-widest text-[#12271d] uppercase">
        Try this prompt
      </p>
      <div className="space-y-3 text-base leading-[1.8] font-light text-[#525252] md:text-lg">
        <p>&ldquo;I want to create a skill for</p>
        <span className="inline-block rounded-lg bg-[#7F77DD]/10 px-3 py-1 font-sans text-sm font-medium text-[#7F77DD]">
          YOUR TASK
        </span>
        <p>The output should feel</p>
        <span className="inline-block rounded-lg bg-[#1D9E75]/10 px-3 py-1 font-sans text-sm font-medium text-[#1D9E75]">
          YOUR STYLE
        </span>
        <p>Things I always have to correct:</p>
        <span className="inline-block rounded-lg bg-[#D85A30]/10 px-3 py-1 font-sans text-sm font-medium text-[#D85A30]">
          YOUR PET PEEVES
        </span>
        <p>Here is an example of output I love:</p>
        <span className="inline-block rounded-lg bg-[#378ADD]/10 px-3 py-1 font-sans text-sm font-medium text-[#378ADD]">
          PASTE EXAMPLE
        </span>
        <p>&rdquo;</p>
      </div>
      <p className="mt-6 text-xs text-[#737373]">
        Fill in the brackets. Claude will ask follow-up questions, then generate a reusable SKILL.md
        file.
      </p>
    </motion.div>
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

export function SkillsArticle() {
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
        {/* Hero Section — Dark */}
        <header className="relative overflow-hidden bg-[#0a0a0a] px-6 pt-36 pb-20 md:px-12 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-3xl">
            <motion.div
              className="mb-8 flex items-center gap-3 text-xs font-bold tracking-widest"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="h-px w-6 bg-[#a3a3a3]" aria-hidden="true" />
              <span className="text-[#a3a3a3] uppercase">AI Skills</span>
              <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
              <span className="font-normal text-white/30">8 min read</span>
            </motion.div>

            <motion.h1
              className="mb-8 font-serif text-[2.5rem] leading-[1.08] font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Claude Without Skills Is Like a Smartphone Without Apps
            </motion.h1>

            <motion.p
              className="max-w-xl text-lg leading-[1.7] font-light text-white/60 md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              You are holding a $2,000 computer in your pocket. Now imagine someone hands it to you
              with no App Store. No camera app. No maps. No Spotify. Just a home screen and a web
              browser. That is how most people use Claude today.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <ArticleAuthor date="Mar 19, 2026" dark />
            </motion.div>
          </div>
        </header>

        {/* Seamless transition strip */}
        <div className="h-px bg-[#fafaf8]" aria-hidden="true" />

        {/* Body */}
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          {/* The Problem */}
          <Section className="pt-16 md:pt-24">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              The Problem Nobody Talks About
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Claude is smart. Scary smart, sometimes. But smart and generic is still generic.
              </p>
              <p>
                Every time you open a new conversation, Claude starts from absolute zero. It does
                not know your writing voice. It does not know your company&apos;s tone guide, your
                formatting preferences, or the fact that you hate bullet points. It does not know
                that when you say &ldquo;write me a blog post,&rdquo; you mean something with
                conviction and rhythm, not a five paragraph essay that reads like it was assembled
                by committee.
              </p>
              <p>So you explain. Every. Single. Time.</p>
              <p className="text-[#1a1a1a]">
                &ldquo;Make it punchy.&rdquo; &ldquo;Don&apos;t use corporate jargon.&rdquo;
                &ldquo;Sound like a real person.&rdquo; &ldquo;No, not like that. More like
                this.&rdquo;
              </p>
              <p>
                And the output? It is fine. Competent. Forgettable. You spend twenty minutes
                steering Claude toward something good when it could have started there.
              </p>
              <p>
                This is not a Claude problem. It is a configuration problem. And skills solve it.
              </p>
            </div>
          </Section>

          <PullQuote>
            A skill makes the <em>first</em> output better. The one you did not have to ask twice
            for.
          </PullQuote>

          {/* What Is a Skill */}
          <Section>
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              So What Is a Skill, Exactly?
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                A skill is a set of instructions that teaches Claude how to think about a specific
                type of work. Not a prompt. Not a template. A thinking framework.
              </p>
              <p>
                Here is the difference. A prompt says: &ldquo;Write me a blog post about AI. Make it
                engaging.&rdquo; A skill says: &ldquo;Every blog post revolves around one big idea.
                Open with a hook that reframes the topic. Cut every sentence that does not serve the
                core argument. Never use the words &lsquo;delve,&rsquo; &lsquo;utilize,&rsquo; or
                &lsquo;it is worth noting.&rsquo; Read the draft out loud before delivering. If it
                does not flow, rewrite it.&rdquo;
              </p>
              <p>
                A prompt is a one-time direction. A skill is expertise you install once and use
                forever.
              </p>
            </div>
          </Section>

          <PullQuote>
            Prompts are giving directions to a taxi driver. Skills are hiring a driver who already
            knows your routes.
          </PullQuote>

          {/* Phone Comparison — full width break */}
          <Section className="-mx-6 md:-mx-12">
            <div className="rounded-3xl bg-[#0a0a0a] px-6 py-12 md:px-12 md:py-20">
              <h3 className="mb-2 text-center text-xs font-bold tracking-widest text-white/40 uppercase">
                The difference
              </h3>
              <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-white/25 md:mb-12">
                A smartphone without apps is just an expensive paperweight. Claude without skills is
                just a generic chatbot.
              </p>
              <PhoneComparison />
            </div>
          </Section>

          {/* Proof */}
          <Section className="pt-12 md:pt-20">
            <h2 className="mb-2 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              Proof: Same Request, Two Worlds
            </h2>
            <p className="mb-4 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              Same prompt, sent to Claude. &ldquo;Write a job posting for a senior designer at a
              scrappy 40-person startup that builds tools for chefs.&rdquo;
            </p>
          </Section>

          <BeforeAfterToggle />

          {/* Stats */}
          <Section className="py-12 md:py-20">
            <p className="mb-6 text-center text-xs font-bold tracking-widest text-[#12271d] uppercase">
              The opportunity
            </p>
            <div className="flex flex-col items-center justify-around gap-6 rounded-2xl border border-[#e5e5e5] bg-white py-8 shadow-sm md:flex-row md:gap-0">
              <StatBlock
                value="99.9%"
                label="of Claude users"
                description="don't know skills exist"
                delay={0}
              />
              <div className="hidden h-12 w-px bg-[#e5e5e5] md:block" aria-hidden="true" />
              <div className="h-px w-16 bg-[#e5e5e5] md:hidden" aria-hidden="true" />
              <StatBlock
                value="0.1%"
                label="that's you"
                description="right now, reading this"
                delay={0.2}
              />
            </div>
          </Section>

          {/* How to Build */}
          <Section>
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              How to Build Your Own
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                You do not need to be a developer. You do not even have to write the skill yourself.
              </p>
              <p>
                Claude has a built-in skill called the <strong>Skill Creator</strong>. You tell it
                what you need, it asks you the right questions, and it builds the skill for you.
                Just open Claude and try this:
              </p>
            </div>
          </Section>

          <SkillBuilderPrompt />

          <Section>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                To upload: drop the file into your Claude project&apos;s skills, and it activates
                every time the right kind of request comes in. No setup. No code. It just works.
              </p>
              <p>
                Or you can just call it when you perform a task that would benefit from that skill.
              </p>
            </div>
          </Section>

          {/* The Opportunity */}
          <Section className="pt-8 md:pt-16">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              The People Who Get This Will Pull Ahead
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Here is what the next twelve months look like for someone using skills: they ask
                Claude to do something, and it comes back right the first time. Their writing sounds
                like them. Their reports follow their format. Their emails hit the right tone
                without three rounds of &ldquo;no, more like this.&rdquo;
              </p>
              <p>
                And the person without skills? They are still typing &ldquo;make it more
                engaging&rdquo; into the chat box for the fourteenth time this week.
              </p>
              <p className="font-medium text-[#1a1a1a]">
                You are not behind. Almost nobody knows this yet. But now you do.
              </p>
            </div>
          </Section>

          {/* Closing */}
          <section className="pb-32 md:pb-40">
            <PullQuote>
              The best tools disappear into the work. You do not think about your keyboard. You do
              not think about your glasses. They just make everything sharper.
            </PullQuote>

            <div className="mt-8 pb-8 md:mt-12">
              <TypewriterQuote text="Don't just use Claude. Teach it." className="text-center" />
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
