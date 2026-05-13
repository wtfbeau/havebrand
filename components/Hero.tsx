"use client";

import { useState, useEffect } from "react";
import EarlyAccessForm from "./EarlyAccessForm";
import { AvatarSK, AvatarMD, AvatarJL, AvatarAW } from "./AvatarImage";
import BrandDriftMap from "./BrandDriftMap";

const HEADLINE_WORDS = [
  "Website copy",
  "AI drafts",
  "Sales decks",
  "Email sends",
  "LinkedIn posts",
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordExiting, setWordExiting] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setWordExiting(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % HEADLINE_WORDS.length);
        setWordExiting(false);
      }, 320);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative overflow-hidden lg:min-h-[100svh]"
      style={{ backgroundColor: "#1C1814", display: "flex", flexDirection: "column" }}
    >
      {/* ── Atmosphere ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(196,75,95,0.11) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "10%", left: "-4%",
          width: "55vw", height: "55vw",
          maxWidth: "700px", maxHeight: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,75,95,0.14) 0%, transparent 65%)",
          animation: "atmosphericPulse 9s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "-10%", right: "-5%",
          width: "45vw", height: "45vw",
          maxWidth: "600px", maxHeight: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,75,95,0.10) 0%, transparent 65%)",
          animation: "atmosphericPulse 11s ease-in-out 3s infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 72%, rgba(28,24,20,0.85) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 flex-1 flex flex-col"
        style={{ paddingTop: "96px" }}
      >
        <div
          className="flex-1 grid grid-cols-1 lg:grid-cols-[5fr_6fr]"
          style={{ alignItems: "stretch" }}
        >
          {/* LEFT: text */}
          <div
            className="flex flex-col justify-center"
            style={{ paddingTop: "24px", paddingBottom: "40px" }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-7 self-start"
              style={{
                background: "rgba(196,75,95,0.1)",
                border: "1px solid rgba(196,75,95,0.28)",
                animation: "fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s both",
              }}
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  backgroundColor: "#C44B5F",
                  boxShadow: "0 0 7px rgba(196,75,95,0.9)",
                  animation: "pulse 2.5s ease-in-out 2s infinite",
                }}
              />
              <span style={{ color: "#EDA0AE", fontSize: "11px", fontWeight: 500, letterSpacing: "0.03em", fontFamily: "var(--font-inter)" }}>
                AI brand intelligence platform
              </span>
            </div>

            {/* H1 */}
            <h1
              className="mb-6"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 600,
                color: "#FAFAF7",
                fontSize: "clamp(2.4rem, 3.2vw, 3.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both",
              }}
            >
              Your brand voice,
              <br />
              enforced across
              <span style={{ display: "block", overflow: "hidden", height: "1.08em" }}>
                <em
                  key={wordIndex}
                  className="not-italic"
                  style={{
                    display: "block",
                    color: "#C44B5F",
                    animation: wordExiting
                      ? "typeSlideOut 0.32s cubic-bezier(0.55,0,1,0.45) both"
                      : "typeSlide 0.38s cubic-bezier(0.22,1,0.36,1) both",
                  }}
                >
                  {HEADLINE_WORDS[wordIndex]}.
                </em>
              </span>
            </h1>

            {/* Subhead */}
            <p
              className="mb-8 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.52)",
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                maxWidth: "44ch",
                fontFamily: "var(--font-inter)",
                animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both",
              }}
            >
              Every asset your team writes gets checked against your brand rules, before a single buyer sees it.
            </p>

            {/* CTA */}
            <div
              className="mb-2"
              style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both" }}
            >
              <EarlyAccessForm variant="dark" />
              <p style={{ marginTop: "10px", fontSize: "12.5px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                No credit card required · Setup in 5 minutes
              </p>
            </div>

            {/* Social proof */}
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-6"
              style={{ animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.45s both" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  <AvatarSK size={28} border />
                  <AvatarMD size={28} border />
                  <AvatarJL size={28} border />
                  <AvatarAW size={28} border />
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", fontFamily: "var(--font-inter)" }}>
                  <span style={{ color: "rgba(255,255,255,0.78)", fontWeight: 600 }}>120+</span> teams in private beta
                </p>
              </div>
              <div
                className="hidden sm:block"
                style={{ width: "1px", height: "28px", backgroundColor: "rgba(255,255,255,0.1)" }}
              />
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: "#3D9A5C",
                    boxShadow: "0 0 6px rgba(61,154,92,0.8)",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", fontFamily: "var(--font-inter)" }}>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.78)", fontWeight: 600,
                      fontFamily: "var(--font-jetbrains)",
                    }}
                  >
                    18,400+
                  </span>{" "}
                  assets audited in beta
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: visualization, desktop only */}
          <div className="hidden lg:flex flex-col" style={{ minHeight: "560px" }}>
            <BrandDriftMap layout="column" />
          </div>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="lg:hidden flex justify-center pb-2 -mt-1" aria-hidden="true">
        <div style={{ animation: "float 2s ease-in-out infinite" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 7l5 5 5-5" stroke="rgba(196,75,95,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Mobile visualization */}
      <div className="lg:hidden">
        <BrandDriftMap layout="standalone" />
      </div>
    </section>
  );
}
