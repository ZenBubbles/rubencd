import React, { useState } from "react";
import { WatercolorPlant } from "./WatercolorPlant";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section
      className="relative mt-32 border-t border-[#E5E5E5] pt-24"
      style={{ minHeight: "700px" }}
    >
      {/* Watercolor plant behind the section — positioned higher */}
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

      {/* Push subscribe content lower so vase appears above it */}
      <div className="pt-40" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-serif text-3xl font-medium text-[#1a1a1a]">
          Subscribe to the newsletter
        </h2>
        <p className="mb-8 leading-relaxed font-light text-[#525252]">
          Get the latest articles and design resources sent to your inbox weekly.
          <br />
          We respect your privacy and inbox zero.
        </p>
        {submitted ? (
          <div className="border border-[#12271d] bg-white px-6 py-4 text-sm font-medium text-[#12271d]">
            Thank you for subscribing! You'll hear from us soon.
          </div>
        ) : (
          <>
            <form
              className="flex flex-col gap-0 shadow-sm sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="flex-grow rounded-none border border-gray-200 bg-white px-6 py-4 font-sans text-[#1a1a1a] placeholder-gray-400 transition-colors outline-none focus:border-[#12271d] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="border border-[#1a1a1a] bg-[#1a1a1a] px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:border-[#12271d] hover:bg-[#12271d]"
              >
                Subscribe
              </button>
            </form>
            {error && <p className="mt-2 text-left text-xs text-[#12271d]">{error}</p>}
          </>
        )}
      </div>

      <footer className="relative z-10 mt-32 flex items-center justify-center border-t border-[#E5E5E5]/40 pt-8 pb-12 text-xs font-medium tracking-wide text-gray-400">
        <div>© 2026 Ruben Christoffer Damgaard.</div>
      </footer>
    </section>
  );
};
