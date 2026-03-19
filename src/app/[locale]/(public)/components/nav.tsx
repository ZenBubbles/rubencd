"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useTransform,
  useMotionTemplate,
  motionValue,
  type MotionValue,
} from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const STATIC_ONE = motionValue(1);

interface NavProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollProgress?: MotionValue<number>;
  hamburgerRef?: React.RefObject<HTMLButtonElement | null>;
}

const SCROLL_THRESHOLD = 15;

function useScrollDirection(enabled: boolean, mobileMenuOpen: boolean) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef<number | null>(null);
  const accumulatedDelta = useRef(0);

  const handleScroll = useCallback(() => {
    if (mobileMenuOpen) return;
    const currentY = window.scrollY;

    // First event after mount — seed with current position, don't act
    if (lastScrollY.current === null) {
      lastScrollY.current = currentY;
      return;
    }

    const delta = currentY - lastScrollY.current;

    if (Math.sign(delta) !== Math.sign(accumulatedDelta.current)) {
      accumulatedDelta.current = 0;
    }
    accumulatedDelta.current += delta;

    if (accumulatedDelta.current > SCROLL_THRESHOLD) {
      setHidden(true);
      accumulatedDelta.current = 0;
    } else if (accumulatedDelta.current < -SCROLL_THRESHOLD || currentY <= 0) {
      setHidden(false);
      accumulatedDelta.current = 0;
    }

    lastScrollY.current = currentY;
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!enabled) return;
    // Reset on enable so we seed fresh on next scroll
    lastScrollY.current = null;
    accumulatedDelta.current = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional reset when `enabled` changes
    setHidden(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, handleScroll]);

  return enabled ? hidden : false;
}

export function Nav({ mobileMenuOpen, setMobileMenuOpen, scrollProgress, hamburgerRef }: NavProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const navHidden = useScrollDirection(!isHome, mobileMenuOpen);

  const navOpacity = useTransform(
    scrollProgress ?? STATIC_ONE,
    [0.04, 0.16, 0.6, 0.68],
    [1, 0, 0, 1],
  );

  const textColor = useTransform(
    scrollProgress ?? STATIC_ONE,
    [0.25, 0.6],
    ["rgba(255,255,255,0.95)", "rgba(26,26,26,0.95)"],
  );

  const textShadowOpacity = useTransform(scrollProgress ?? STATIC_ONE, [0.25, 0.6], [1, 0]);

  const textShadow = useMotionTemplate`0 1px 3px rgba(0,0,0,${textShadowOpacity})`;
  const textShadowLight = useMotionTemplate`0 1px 2px rgba(0,0,0,${textShadowOpacity})`;

  const darkColor = "rgba(26,26,26,0.95)";
  const activeTextColor = mobileMenuOpen ? darkColor : textColor;
  const activeTextShadow = mobileMenuOpen ? "none" : textShadow;
  const activeTextShadowLight = mobileMenuOpen ? "none" : textShadowLight;

  const [interactive, setInteractive] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!scrollProgress) return;
    const unsubscribe = navOpacity.on("change", (latest) => {
      setInteractive(latest > 0.5);
      setVisible(latest > 0.01);
    });
    return unsubscribe;
  }, [scrollProgress, navOpacity]);

  const currentFlag = locale === "nb" ? "🇳🇴" : "🇺🇸";

  function handleLanguageSwitch() {
    const otherLocale = locale === "en" ? "nb" : "en";
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <motion.nav
      aria-label="Main navigation"
      className="fixed top-4 right-4 left-4 z-50 flex items-center justify-between rounded-2xl md:right-8 md:left-8 lg:right-12 lg:left-12"
      initial={false}
      animate={{ y: navHidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{
        padding: "14px 24px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.18) 100%)",
        backdropFilter: "blur(40px) saturate(200%) brightness(1.1)",
        WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(1.1)",
        border: "1px solid rgba(255,255,255,0.35)",
        boxShadow:
          "inset 0 1px 1px 0 rgba(255,255,255,0.4), inset 0 -1px 2px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
        opacity: navOpacity,
        pointerEvents: interactive && !navHidden ? "auto" : "none",
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 70%, transparent 100%)",
          borderRadius: "16px 16px 0 0",
          pointerEvents: "none",
        }}
      />

      <motion.a
        href="/"
        className="cursor-pointer font-serif text-2xl font-black tracking-tight transition-colors focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
        style={{ color: activeTextColor, textShadow: activeTextShadow }}
      >
        RCD.
      </motion.a>

      <motion.div
        className="hidden items-center gap-10 text-xs font-medium tracking-[0.1em] uppercase md:flex"
        style={{ color: activeTextColor, textShadow: activeTextShadowLight }}
      >
        <a
          href={isHome ? "#articles" : "/#articles"}
          className="flex min-h-[44px] items-center rounded-sm transition-colors hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
        >
          {t("articles")}
        </a>
        <a
          href={isHome ? "#contact" : "/#contact"}
          className="flex min-h-[44px] items-center rounded-sm transition-colors hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
        >
          {t("contact")}
        </a>
        <button
          onClick={handleLanguageSwitch}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm font-bold transition-colors hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
          aria-label={t("switchLanguage")}
        >
          <span className="text-base leading-none">{currentFlag}</span>
        </button>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 md:hidden"
        style={{ color: activeTextColor, textShadow: activeTextShadowLight }}
      >
        <button
          onClick={handleLanguageSwitch}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-xs font-bold tracking-[0.1em] uppercase focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
          aria-label={t("switchLanguage")}
        >
          <span className="text-base leading-none">{currentFlag}</span>
        </button>
        <button
          ref={hamburgerRef}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </motion.div>
    </motion.nav>
  );
}
