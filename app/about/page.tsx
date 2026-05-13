import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "About | HaveBrand",
  description:
    "We built HaveBrand because we watched great brands disappear into noise. Learn about our mission, values, and the problem we set out to solve.",
};

const values = [
  {
    number: "01",
    title: "Clarity over cleverness",
    body: "The best brand communication is the clearest, not the cleverest. Say the true thing, not the flashy thing, every time.",
  },
  {
    number: "02",
    title: "Consistency is trust",
    body: "Every message your team sends is a vote for the brand you are. Inconsistency doesn't just confuse, it erodes the trust you've earned.",
  },
  {
    number: "03",
    title: "AI should amplify, not replace",
    body: "Technology is a multiplier. When it multiplies the wrong signal, the damage compounds. We make sure AI amplifies the real you.",
  },
  {
    number: "04",
    title: "Teams win with shared truth",
    body: "Brand clarity is not the marketing team's job alone. It's a team sport. Shared language, shared standards, shared results.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-cream-bg pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
          {/* Ambient blobs */}
          <div
            className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
            style={{ background: "#C44B5F" }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-4xl px-6 text-center relative">
            <AnimateIn from="up">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-8">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold"
                  style={{ animation: "pulse 2s ease-in-out infinite" }}
                  aria-hidden="true"
                />
                Our mission
              </div>
            </AnimateIn>

            <AnimateIn from="up" delay={80}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl text-ink leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                We built HaveBrand because we watched great brands{" "}
                <em className="text-gold not-italic">disappear into noise.</em>
              </h1>
            </AnimateIn>

            <AnimateIn from="up" delay={160}>
              <p className="text-ink-mid text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                Founded in 2024 in New York, we&apos;re a small team on a specific
                mission: make it impossible for AI to erode what a brand has
                worked years to build.
              </p>
            </AnimateIn>

            <AnimateIn from="up" delay={240}>
              <div className="flex items-center justify-center gap-8 mt-12 pt-12 border-t border-cream-border">
                {[
                  { stat: "2024", label: "Founded" },
                  { stat: "New York", label: "Headquarters" },
                  { stat: "120+", label: "Teams protected" },
                ].map(({ stat, label }) => (
                  <div key={label} className="text-center">
                    <div
                      className="text-2xl md:text-3xl text-ink font-semibold"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {stat}
                    </div>
                    <div className="text-ink-light text-xs mt-1 uppercase tracking-widest font-medium">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Mission statement */}
        <section className="bg-cream-panel py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <AnimateIn from="up">
              <p className="text-gold/70 text-sm font-medium tracking-widest uppercase mb-8">
                What we believe
              </p>
            </AnimateIn>
            <AnimateIn from="up" delay={80}>
              <blockquote
                className="text-3xl md:text-5xl text-ink leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                &ldquo;Brand clarity is not a style guide.
                <br className="hidden md:block" />
                It&apos;s a practice. We make it{" "}
                <span className="text-gold">automatic.</span>&rdquo;
              </blockquote>
            </AnimateIn>
          </div>
        </section>

        {/* Founding story */}
        <section className="bg-cream-bg py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
              <AnimateIn from="left">
                <div>
                  <p className="text-gold text-sm font-medium tracking-widest uppercase mb-6">
                    The problem we witnessed
                  </p>
                  <h2
                    className="text-3xl md:text-4xl text-ink leading-tight mb-8"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    The story behind the company
                  </h2>
                  <div className="space-y-5 text-ink-mid leading-relaxed">
                    <p>
                      We&apos;ve all been inside a growing company when AI tools
                      arrived. Within months, everyone became a content creator.
                      Sales reps, engineers, founders, interns, all publishing
                      on behalf of the brand, all pulling from different mental
                      models of what the company actually stood for.
                    </p>
                    <p>
                      The homepage said one thing. The deck said another. The
                      founder&apos;s LinkedIn said a third. And the AI-generated
                      copy filling the gaps invented a fourth version entirely —
                      plausible but wrong, confident but untrue to the real
                      positioning.
                    </p>
                    <p>
                      We saw this pattern across companies of every size and
                      sector. Not because people didn&apos;t care about brand —
                      but because there was no system to keep the signal clear
                      as teams and tools scaled.
                    </p>
                    <p>
                      HaveBrand is that system. Built from the ground up for
                      teams that take their brand seriously and need it to stay
                      that way.
                    </p>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn from="right">
                <div className="space-y-6">
                  {/* Pull quote */}
                  <div className="bg-dark-section rounded-2xl p-8">
                    <svg
                      width="28"
                      height="20"
                      viewBox="0 0 28 20"
                      fill="none"
                      className="mb-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 20V12.4C0 9.2 0.8 6.4 2.4 4 4 1.6 6.4 0.4 9.6 0.4L11.2 3.6C9.2 4 7.6 5 6.4 6.6 5.2 8.2 4.8 10 5.2 12H11.2V20H0ZM16.8 20V12.4C16.8 9.2 17.6 6.4 19.2 4 20.8 1.6 23.2 0.4 26.4 0.4L28 3.6C26 4 24.4 5 23.2 6.6 22 8.2 21.6 10 22 12H28V20H16.8Z"
                        fill="#C44B5F"
                        opacity="0.5"
                      />
                    </svg>
                    <p
                      className="text-white text-xl leading-relaxed mb-6"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      The companies with the clearest brands don&apos;t have
                      better copywriters. They have better systems.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-gold/40" />
                      <span className="text-ink-light text-xs font-medium tracking-wide uppercase">
                        HaveBrand founding principle
                      </span>
                    </div>
                  </div>

                  {/* Stats card */}
                  <div className="bg-cream-panel rounded-2xl p-6 border border-cream-border">
                    <p className="text-ink-mid text-sm mb-5">
                      What we see across teams before HaveBrand:
                    </p>
                    <div className="space-y-4">
                      {[
                        { label: "Different brand descriptions used by same team", value: "3.4x" },
                        { label: "AI-generated assets reviewed before publishing", value: "12%" },
                        { label: "Teams with up-to-date brand guidelines", value: "23%" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between gap-4">
                          <span className="text-ink-mid text-sm leading-snug">{label}</span>
                          <span
                            className="text-gold font-semibold text-lg shrink-0"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-dark-section py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <AnimateIn from="up">
              <div className="text-center mb-16">
                <p className="text-gold/70 text-sm font-medium tracking-widest uppercase mb-4">
                  What guides us
                </p>
                <h2
                  className="text-3xl md:text-5xl text-white leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Our values
                </h2>
              </div>
            </AnimateIn>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <AnimateIn key={v.number} from="up" delay={i * 80}>
                  <div className="bg-white/5 border border-white/8 rounded-2xl p-8 hover:bg-white/8 transition-colors duration-200">
                    <div className="flex items-start gap-5">
                      <span
                        className="text-gold/40 text-xs font-medium shrink-0 mt-1"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        {v.number}
                      </span>
                      <div>
                        <h3
                          className="text-white text-xl mb-3"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {v.title}
                        </h3>
                        <p className="text-ink-light leading-relaxed">{v.body}</p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the founders CTA */}
        <section className="bg-cream-panel py-20 md:py-28">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <AnimateIn from="up">
              <p className="text-gold/80 text-sm font-medium tracking-widest uppercase mb-4">
                The people
              </p>
            </AnimateIn>
            <AnimateIn from="up" delay={80}>
              <h2
                className="text-3xl md:text-4xl text-ink leading-tight mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Meet the team behind the mission
              </h2>
            </AnimateIn>
            <AnimateIn from="up" delay={160}>
              <p className="text-ink-mid leading-relaxed mb-8">
                Three founders from brand agencies, AI labs, and growth teams —
                united by a problem they couldn&apos;t stop thinking about.
              </p>
            </AnimateIn>
            <AnimateIn from="scale" delay={240}>
              <Link
                href="/founders"
                className="inline-flex items-center gap-2 bg-ink hover:bg-ink/80 text-white text-sm font-medium px-6 py-3 rounded-full transition-colors duration-150 shadow-sm"
              >
                Meet the founders
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </Link>
            </AnimateIn>
          </div>
        </section>

        <FooterCTA />
      </main>
    </>
  );
}
