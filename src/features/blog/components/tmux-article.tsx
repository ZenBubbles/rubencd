"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useScrollProgress } from "@/app/[locale]/(public)/components/scroll-context";
import { ArticleAuthor } from "./article-author";
import { AICockpit } from "./ai-cockpit";
import { DetachReattachDemo } from "./detach-reattach-demo";
import { PullQuote } from "./pull-quote";
import { ReadingProgress } from "./reading-progress";
import { TerminalChaosComparison } from "./terminal-chaos-comparison";
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

const DARK_HERO_HEIGHT = 350;

export function TmuxArticle() {
  const prefersReduced = useReducedMotion();
  const { setDarkHeaderHeight } = useScrollProgress();

  useEffect(() => {
    setDarkHeaderHeight(DARK_HERO_HEIGHT);
    return () => setDarkHeaderHeight(0);
  }, [setDarkHeaderHeight]);

  return (
    <>
      <ReadingProgress gradient="from-[#404040] via-[#a3a3a3] to-[#e5e5e5]" />

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
              <span className="text-[#a3a3a3] uppercase">My Guides</span>
              <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
              <span className="font-normal text-white/30">7 min read</span>
            </motion.div>

            <motion.h1
              className="mb-8 font-serif text-[2.5rem] leading-[1.08] font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              You&apos;re Running 4 Terminal Windows in 2026. A 10x Engineer Just Walked Past Your
              Screen and Laughed.
            </motion.h1>

            <motion.p
              className="max-w-xl text-lg leading-[1.7] font-light text-white/60 md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Look at your screen right now. Four terminal windows. One running your dev server. One
              tailing logs. One where you are actually writing code. And one you opened twenty
              minutes ago for a reason you can no longer recall. It just lives there now. Rent free.
            </motion.p>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-[1.7] font-light text-white/60 md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              You feel productive. You are not.
            </motion.p>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-[1.7] font-medium text-white/80 md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              The engineer sitting next to you has one terminal open. One. They are shipping faster
              than you, reviewing AI output, running three processes at once, and their screen looks
              like the cockpit of a fighter jet. Yours looks like you are trying to land a plane
              without instruments.
            </motion.p>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-[1.7] font-medium md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              <span className="text-white/80">The difference is not talent. It is </span>
              <span className="text-[#50fa7b] drop-shadow-[0_0_8px_rgba(80,250,123,0.3)]">
                Tmux
              </span>
              <span className="text-white/80">.</span>
            </motion.p>

            <motion.div
              className="mt-8"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <ArticleAuthor date="Apr 5, 2026" dark />
            </motion.div>
          </div>
        </header>

        {/* Seamless transition strip */}
        <div className="h-px bg-[#fafaf8]" aria-hidden="true" />

        {/* Body */}
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          {/* The Chaos You Have Accepted as Normal */}
          <Section className="pt-16 md:pt-24">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              The Chaos You Have Accepted as Normal
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Let&apos;s talk about what you are actually doing when you work with scattered
                terminal windows.
              </p>
              <p>
                You are swiping through Mission Control on your Mac, four fingers dragging across
                the trackpad, scanning six identical black rectangles trying to remember which one
                has your server running. You are not engineering. You are playing a memory card
                game. And you are losing.
              </p>
              <p>
                You have a terminal running a long process. Maybe a build. Maybe a migration. That
                terminal is now a hostage. You cannot close it. You cannot use it for anything else.
                It just sits there, holding your screen real estate prisoner while you open yet
                another window because you need to check something quick. &ldquo;Quick.&rdquo; Sure.
              </p>
              <p>
                And then the real gut punch. Your SSH connection drops. Maybe your wifi blinked.
                Maybe your laptop went to sleep. Doesn&apos;t matter. Everything is gone. Your
                server. Your logs. That thing you were running. All of it. Evaporated. And now you
                are spending ten minutes rebuilding a setup that took you thirty seconds to lose.
                You have done this so many times that you do not even get angry anymore. You just
                sigh and start over. That is the saddest part.
              </p>
            </div>
          </Section>

          <PullQuote accent="#50fa7b">
            You are not engineering. You are playing a memory card game. And you are losing.
          </PullQuote>

          {/* Illustration 1 — Terminal Chaos vs Tmux — breaks out to full width */}
        </div>
        <Section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl rounded-3xl bg-[#0a0a0a] px-6 py-12 md:px-10 md:py-20">
            <h3 className="mb-2 text-center text-xs font-bold tracking-widest text-white/60 uppercase">
              The difference
            </h3>
            <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-white/45 md:mb-12">
              One of these setups ships code. The other one searches for the terminal that ships
              code.
            </p>
            <TerminalChaosComparison />
          </div>
        </Section>

        <div className="mx-auto max-w-3xl px-6 md:px-12">
          {/* Tmux: Your Cockpit */}
          <Section className="pt-12 md:pt-20">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              Tmux: Your Cockpit
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Stop thinking about Tmux as a terminal multiplexer. That name does it zero favors.
                Think about it as a cockpit.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Panes</strong> let you see everything at once.
                Your server on the left. Your code on the right. Logs streaming at the bottom. No
                swiping. No hunting. No guessing which black rectangle is which. Everything, right
                there, in one view.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Windows</strong> let you organize by context. One
                window for your feature work. Another for infrastructure. Another for debugging.
                Named. Labeled. Switchable with a single keystroke. Not a four finger swipe and a
                prayer.
              </p>
              <p>
                And <strong className="text-[#1a1a1a]">sessions</strong>? Sessions are the part that
                will make you wonder why you waited this long. Your laptop goes to sleep. You close
                the lid. Your wifi dies at a coffee shop. Doesn&apos;t matter. Detach. Walk away.
                Come back tomorrow. Reattach. Everything is still running. Exactly where you left
                it. Your server never stopped. Your logs never paused. Your long running process
                finished while you were eating dinner.
              </p>
            </div>
          </Section>

          {/* Detach/Reattach Interactive Demo */}
          <DetachReattachDemo />

          <PullQuote accent="#50fa7b">
            That is not a terminal tool. That is a command center.
          </PullQuote>

          {/* AI Agents Need a Home */}
          <Section>
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              The Part Nobody Talks About: AI Agents Need a Home
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Here is where this stops being a 2015 blog post and becomes a 2026 reality check.
              </p>
              <p>
                You are not just running a dev server anymore. You have Claude Code building a
                feature in one pane. Maybe Codex reviewing a PR in another. Your test suite running
                in a third. Three AI agents, all working at the same time, all needing to stay alive
                and visible.
              </p>
              <p>
                Try doing that with four floating terminal windows. Try swiping through Mission
                Control to figure out which agent finished. Try explaining to your AI agent that it
                needs to start over because your SSH connection had a bad day.
              </p>
              <p>
                Tmux does not just make this easier. It makes it possible. One terminal. Three
                panes. Three agents. You are not typing every command anymore. You are watching.
                Steering. Deciding. It feels less like coding and more like having Jarvis running
                your lab while you focus on what actually matters.
              </p>
            </div>
          </Section>

          {/* Illustration 2 — AI Cockpit */}
          <Section className="-mx-6 pt-12 md:-mx-12 md:pt-20">
            <div className="rounded-3xl bg-[#0a0a0a] px-6 py-12 md:px-12 md:py-20">
              <h3 className="mb-2 text-center text-xs font-bold tracking-widest text-white/60 uppercase">
                The cockpit
              </h3>
              <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-white/45 md:mb-12">
                Claude Code building a feature. Codex reviewing a PR. Tests running live. Three
                agents, one terminal, zero tab switching.
              </p>
              <AICockpit />
            </div>
          </Section>

          {/* That 10x engineer callback */}
          <Section className="pt-12 md:pt-20">
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                That 10x engineer who walked past your screen? This is what their setup looks like.
                It is not genius. It is not some secret. It is one tool that has been free this
                entire time.
              </p>
            </div>
          </Section>

          {/* One More Thing */}
          <Section className="pt-8 md:pt-16">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              One More Thing
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                You have got three Tmux panes running now. Claude Code in one. Your feature branch
                in another. Your server in the third. Beautiful.
              </p>
              <p>
                But all three are pointing at the same branch. Same directory. Same bottleneck. You
                want to fix a bug on main? Cool. Stash your work. Switch branches. Pray nothing
                conflicts. Or worse, commit it with a message that says &ldquo;please squash me
                later&rdquo; and pretend that is a strategy.
              </p>
              <p className="font-medium text-[#1a1a1a]">
                There is a fix for that too. And it changes everything.
              </p>
              <p className="mt-4 font-serif text-lg text-[#737373] italic md:text-xl">
                Read Part 2: Git Worktrees Changed How I Code. I&apos;m Not Being Dramatic.
              </p>
            </div>
          </Section>

          {/* Closing */}
          <section className="pb-32 md:pb-40">
            <div className="mt-8 pb-8 md:mt-12">
              <TypewriterQuote
                text="Stop landing planes without instruments."
                className="text-center"
              />
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
