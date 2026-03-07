"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { WatercolorPlant } from "./watercolor-plant";

const liquidGlassStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow:
    "0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 4px 20px rgba(255, 255, 255, 0.15)",
} as const;

const inputClassName =
  "w-full rounded-2xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#999] transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-[#12271d]/30 focus-visible:ring-offset-1";

export function NewsletterSection() {
  const t = useTranslations("newsletter");
  const tFooter = useTranslations("footer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!name.trim()) {
      setError(t("errorName"));
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(t("errorInvalid"));
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section
      className="relative mt-32 border-t border-[#E5E5E5] pt-24"
      style={{ minHeight: "700px" }}
      id="contact"
    >
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.55,
        }}
      >
        <WatercolorPlant />
      </div>

      <div className="pt-16" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-serif text-3xl font-medium text-[#1a1a1a]">{t("title")}</h2>
        <p className="mb-8 leading-relaxed font-light text-[#525252]">{t("description")}</p>

        {submitted ? (
          <div className="py-6 text-sm font-medium text-[#12271d]">{t("success")}</div>
        ) : (
          <form
            className="flex flex-col gap-4"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Name input */}
            <input
              type="text"
              placeholder={t("namePlaceholder")}
              aria-label={t("nameLabel")}
              aria-invalid={error ? true : undefined}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className={inputClassName}
              style={liquidGlassStyle}
            />

            {/* Email input */}
            <input
              type="email"
              placeholder={t("placeholder")}
              aria-label={t("emailLabel")}
              aria-invalid={error ? true : undefined}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={inputClassName}
              style={liquidGlassStyle}
            />

            {/* Message textarea */}
            <textarea
              placeholder={t("messagePlaceholder")}
              aria-label={t("messageLabel")}
              rows={4}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className={inputClassName + " resize-none"}
              style={liquidGlassStyle}
            />

            {error && (
              <p role="alert" className="text-left text-xs text-[#12271d]">
                {error}
              </p>
            )}

            {/* Liquid glass dark submit button */}
            <button
              type="submit"
              className="mt-2 w-full cursor-pointer rounded-xl px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all outline-none hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{
                background: "linear-gradient(135deg, rgba(20,20,20,0.6), rgba(40,40,40,0.4))",
                backdropFilter: "blur(40px) saturate(150%)",
                WebkitBackdropFilter: "blur(40px) saturate(150%)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "inset 0 1px 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.18)",
              }}
            >
              {t("submit")}
            </button>
          </form>
        )}
      </div>

      <footer className="relative z-10 mt-32 flex items-center justify-center border-t border-[#E5E5E5]/40 pt-8 pb-12 text-xs font-medium tracking-wide text-gray-400">
        <div>&copy; {tFooter("copyright")}</div>
      </footer>
    </section>
  );
}
