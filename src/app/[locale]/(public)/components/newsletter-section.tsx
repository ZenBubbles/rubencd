"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { WatercolorPlant } from "./watercolor-plant";

export function NewsletterSection() {
  const t = useTranslations("newsletter");
  const tFooter = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
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

      <div className="pt-40" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-serif text-3xl font-medium text-[#1a1a1a]">{t("title")}</h2>
        <p className="mb-8 leading-relaxed font-light text-[#525252]">
          {t("description")}
          <br />
          {t("privacyNote")}
        </p>

        {submitted ? (
          <div className="border border-[#12271d] bg-white px-6 py-4 text-sm font-medium text-[#12271d]">
            {t("success")}
          </div>
        ) : (
          <>
            <form
              className="flex flex-col gap-0 shadow-sm sm:flex-row"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="email"
                placeholder={t("placeholder")}
                aria-label={t("emailLabel")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="flex-grow rounded-none border border-gray-200 bg-white px-6 py-4 font-sans text-[#1a1a1a] placeholder-gray-400 transition-colors outline-none focus:border-[#12271d] focus:outline-none"
              />
              <button
                type="submit"
                className="border border-[#1a1a1a] bg-[#1a1a1a] px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:border-[#12271d] hover:bg-[#12271d] focus-visible:ring-2 focus-visible:ring-[#12271d] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t("subscribe")}
              </button>
            </form>
            {error && <p className="mt-2 text-left text-xs text-[#12271d]">{error}</p>}
          </>
        )}
      </div>

      <footer className="relative z-10 mt-32 flex items-center justify-center border-t border-[#E5E5E5]/40 pt-8 pb-12 text-xs font-medium tracking-wide text-gray-400">
        <div>&copy; {tFooter("copyright")}</div>
      </footer>
    </section>
  );
}
