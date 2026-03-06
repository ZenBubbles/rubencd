import React from "react";

interface NavProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Nav = ({ mobileMenuOpen, setMobileMenuOpen }: NavProps) => (
  <nav
    className="fixed top-4 right-4 left-4 z-50 flex items-center justify-between rounded-2xl transition-all duration-300 md:right-8 md:left-8 lg:right-12 lg:left-12"
    style={{
      padding: "14px 24px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.18) 100%)",
      backdropFilter: "blur(40px) saturate(200%) brightness(1.1)",
      WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(1.1)",
      border: "1px solid rgba(255,255,255,0.35)",
      boxShadow:
        "inset 0 1px 1px 0 rgba(255,255,255,0.4), inset 0 -1px 2px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
    }}
  >
    {/* Specular highlight on top edge */}
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
    <div
      className="cursor-pointer font-serif text-2xl font-black tracking-tight text-white transition-colors hover:text-[#12271d]"
      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
    >
      RCD.
    </div>
    <div
      className="hidden items-center gap-10 text-xs font-medium tracking-[0.1em] text-white/90 uppercase md:flex"
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
    >
      <a href="#articles" className="transition-colors hover:text-white">
        Articles
      </a>
      <a href="#contact" className="transition-colors hover:text-white">
        Contact
      </a>
    </div>
    <button className="text-white md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
  </nav>
);
