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

export function TmuxArticleNb() {
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
              <span className="text-[#a3a3a3] uppercase">Mine guider</span>
              <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
              <span className="font-normal text-white/30">7 min lesing</span>
            </motion.div>

            <motion.h1
              className="mb-8 font-serif text-[2.5rem] leading-[1.08] font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Du kj&oslash;rer 4 terminalvinduer i 2026. En 10x-utvikler gikk nettopp forbi skjermen
              din og lo.
            </motion.h1>

            <motion.p
              className="max-w-xl text-lg leading-[1.7] font-light text-white/60 md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Se p&aring; skjermen din n&aring;. Fire terminalvinduer. Ett kj&oslash;rer
              dev-serveren. Ett tailer logger. Ett der du faktisk skriver kode. Og ett du
              &aring;pnet for tjue minutter siden av en grunn du ikke lenger husker. Det bare bor
              der n&aring;. Gratis.
            </motion.p>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-[1.7] font-light text-white/60 md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              Du f&oslash;ler deg produktiv. Det er du ikke.
            </motion.p>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-[1.7] font-medium text-white/80 md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              Utvikleren ved siden av deg har &eacute;n terminal &aring;pen. &Eacute;n. De shipper
              raskere enn deg, vurderer AI-output, kj&oslash;rer tre prosesser samtidig, og skjermen
              deres ser ut som cockpiten i et jagerfly. Din ser ut som du pr&oslash;ver &aring;
              lande et fly uten instrumenter.
            </motion.p>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-[1.7] font-medium md:text-xl"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              <span className="text-white/80">Forskjellen er ikke talent. Det er </span>
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
              <ArticleAuthor date="5. apr 2026" dark />
            </motion.div>
          </div>
        </header>

        {/* Seamless transition strip */}
        <div className="h-px bg-[#fafaf8]" aria-hidden="true" />

        {/* Body */}
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          {/* Kaoset du har akseptert som normalt */}
          <Section className="pt-16 md:pt-24">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              Kaoset du har akseptert som normalt
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                La oss snakke om hva du faktisk gj&oslash;r n&aring;r du jobber med spredte
                terminalvinduer.
              </p>
              <p>
                Du swiper gjennom Mission Control p&aring; Macen, fire fingre over trackpaden,
                skanner seks identiske svarte rektangler og pr&oslash;ver &aring; huske hvilket som
                kj&oslash;rer serveren din. Du driver ikke med utvikling. Du spiller et memoryspill.
                Og du taper.
              </p>
              <p>
                Du har en terminal som kj&oslash;rer en lang prosess. Kanskje en build. Kanskje en
                migrering. Den terminalen er n&aring; et gissel. Du kan ikke lukke den. Du kan ikke
                bruke den til noe annet. Den bare sitter der og holder skjermplassen din som fange
                mens du &aring;pner enda et vindu fordi du m&aring; sjekke noe fort.
                &laquo;Fort.&raquo; Jada.
              </p>
              <p>
                Og s&aring; kommer det virkelige sjakkmatt-&oslash;yeblikket. SSH-tilkoblingen
                dropper. Kanskje wifi-en blinket. Kanskje laptopen gikk i dvale. Spiller ingen
                rolle. Alt er borte. Serveren din. Loggene dine. Den tingen du kj&oslash;rte. Alt
                sammen. Forduftet. Og n&aring; bruker du ti minutter p&aring; &aring; bygge opp
                igjen et oppsett det tok deg tretti sekunder &aring; miste. Du har gjort dette
                s&aring; mange ganger at du ikke engang blir sint lenger. Du bare sukker og begynner
                p&aring; nytt. Det er det tristeste.
              </p>
            </div>
          </Section>

          <PullQuote accent="#50fa7b">
            Du driver ikke med utvikling. Du spiller et memoryspill. Og du taper.
          </PullQuote>

          {/* Illustrasjon 1 — Terminal Chaos vs Tmux — breaks out to full width */}
        </div>
        <Section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl rounded-3xl bg-[#0a0a0a] px-6 py-12 md:px-10 md:py-20">
            <h3 className="mb-2 text-center text-xs font-bold tracking-widest text-white/60 uppercase">
              Forskjellen
            </h3>
            <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-white/45 md:mb-12">
              Ett av disse oppsettene shipper kode. Det andre leter etter terminalen som shipper
              kode.
            </p>
            <TerminalChaosComparison />
          </div>
        </Section>

        <div className="mx-auto max-w-3xl px-6 md:px-12">
          {/* Tmux: Cockpiten din */}
          <Section className="pt-12 md:pt-20">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              Tmux: Cockpiten din
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Slutt &aring; tenke p&aring; Tmux som en terminal-multiplekser. Det navnet
                gj&oslash;r den null tjenester. Tenk p&aring; det som en cockpit.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Panes</strong> lar deg se alt p&aring; en gang.
                Serveren til venstre. Koden til h&oslash;yre. Logger som str&oslash;mmer nederst.
                Ingen swiping. Ingen leting. Ingen gjetting p&aring; hvilket svart rektangel som er
                hva. Alt, rett der, i &eacute;n visning.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Windows</strong> lar deg organisere etter
                kontekst. Ett vindu for feature-arbeid. Ett for infrastruktur. Ett for debugging.
                Navngitt. Merket. Byttbart med ett tastetrykk. Ikke en firefinger-swipe og et
                b&oslash;nn.
              </p>
              <p>
                Og <strong className="text-[#1a1a1a]">sessions</strong>? Sessions er den delen som
                f&aring;r deg til &aring; lure p&aring; hvorfor du ventet s&aring; lenge. Laptopen
                g&aring;r i dvale. Du lukker lokket. Wifi-en d&oslash;r p&aring; en kaf&eacute;.
                Spiller ingen rolle. Detach. G&aring; din vei. Kom tilbake i morgen. Reattach. Alt
                kj&oslash;rer fortsatt. N&oslash;yaktig der du forlot det. Serveren stoppet aldri.
                Loggene tok aldri pause. Den langvarige prosessen ble ferdig mens du spiste middag.
              </p>
            </div>
          </Section>

          {/* Detach/Reattach interaktiv demo */}
          <DetachReattachDemo />

          <PullQuote accent="#50fa7b">
            Det der er ikke et terminalverkt&oslash;y. Det er et kommandosenter.
          </PullQuote>

          {/* AI-agenter trenger et hjem */}
          <Section>
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              Delen ingen snakker om: AI-agenter trenger et hjem
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Her slutter dette &aring; v&aelig;re et blogginnlegg fra 2015 og blir en
                realitetssjekk for 2026.
              </p>
              <p>
                Du kj&oslash;rer ikke bare en dev-server lenger. Du har Claude Code som bygger en
                feature i &eacute;n pane. Kanskje Codex som reviewer en PR i en annen. Testsuiten
                din som kj&oslash;rer i en tredje. Tre AI-agenter, alle som jobber samtidig, alle
                som m&aring; holdes i live og v&aelig;re synlige.
              </p>
              <p>
                Pr&oslash;v &aring; gj&oslash;re det med fire flytende terminalvinduer. Pr&oslash;v
                &aring; swipe gjennom Mission Control for &aring; finne ut hvilken agent som ble
                ferdig. Pr&oslash;v &aring; forklare AI-agenten din at den m&aring; begynne p&aring;
                nytt fordi SSH-tilkoblingen din hadde en d&aring;rlig dag.
              </p>
              <p>
                Tmux gj&oslash;r ikke bare dette enklere. Det gj&oslash;r det mulig. &Eacute;n
                terminal. Tre panes. Tre agenter. Du skriver ikke hver eneste kommando lenger. Du
                ser. Styrer. Bestemmer. Det f&oslash;les mindre som koding og mer som &aring; ha
                Jarvis som kj&oslash;rer labben din mens du fokuserer p&aring; det som faktisk betyr
                noe.
              </p>
            </div>
          </Section>

          {/* Illustrasjon 2 — AI Cockpit */}
          <Section className="-mx-6 pt-12 md:-mx-12 md:pt-20">
            <div className="rounded-3xl bg-[#0a0a0a] px-6 py-12 md:px-12 md:py-20">
              <h3 className="mb-2 text-center text-xs font-bold tracking-widest text-white/60 uppercase">
                Cockpiten
              </h3>
              <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-white/45 md:mb-12">
                Claude Code bygger en feature. Codex reviewer en PR. Tester kj&oslash;rer live. Tre
                agenter, &eacute;n terminal, null tab-bytting.
              </p>
              <AICockpit />
            </div>
          </Section>

          {/* 10x-utvikler callback */}
          <Section className="pt-12 md:pt-20">
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Den 10x-utvikleren som gikk forbi skjermen din? Dette er slik oppsettet deres ser
                ut. Det er ikke genialitet. Det er ingen hemmelighet. Det er &eacute;t
                verkt&oslash;y som har v&aelig;rt gratis hele tiden.
              </p>
            </div>
          </Section>

          {/* One More Thing */}
          <Section className="pt-8 md:pt-16">
            <h2 className="mb-6 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
              En ting til
            </h2>
            <div className="space-y-5 text-base leading-[1.9] font-normal text-[#525252] md:text-lg">
              <p>
                Du har tre Tmux-panes som kj&oslash;rer n&aring;. Claude Code i den ene.
                Feature-branchen din i en annen. Serveren i den tredje. Lekkert.
              </p>
              <p>
                Men alle tre peker p&aring; samme branch. Samme mappe. Samme flaskehals. Du vil
                fikse en bug p&aring; main? Fint. Stash arbeidet ditt. Bytt branch. Be til at
                ingenting konflikter. Eller enda verre, commit det med en melding som sier
                &laquo;please squash me later&raquo; og lat som det er en strategi.
              </p>
              <p className="font-medium text-[#1a1a1a]">
                Det finnes en l&oslash;sning p&aring; det ogs&aring;. Og den forandrer alt.
              </p>
              <p className="mt-4 font-serif text-lg text-[#737373] italic md:text-xl">
                Les del 2: Git Worktrees forandret hvordan jeg koder. Jeg overdriver ikke.
              </p>
            </div>
          </Section>

          {/* Avslutning */}
          <section className="pb-32 md:pb-40">
            <div className="mt-8 pb-8 md:mt-12">
              <TypewriterQuote
                text="Slutt å lande fly uten instrumenter."
                className="text-center"
              />
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
