import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Services | HaveBrand",
  description:
    "From one-time brand audits to ongoing AI governance, HaveBrand meets your team at every stage of growth.",
};

const services = [
  {
    number: "01",
    name: "Brand Audit",
    tag: "One-time · Starting point",
    headline: "Know exactly where your brand stands.",
    description:
      "We scan your website, decks, sales materials, and AI-generated content against your stated positioning. You get a clarity score from 0–100, a ranked list of inconsistencies, and a prioritized fix plan, all within 48 hours.",
    bullets: [
      "Full website and asset scan",
      "Clarity score with breakdown by channel",
      "Prioritized inconsistency report",
      "Recommended fixes with examples",
      "PDF and Notion export",
    ],
    cta: "Start an audit",
    ideal: "Teams that need a starting point",
  },
  {
    number: "02",
    name: "Brand Setup",
    tag: "Onboarding · One-time",
    headline: "Build the source of truth your team will actually use.",
    description:
      "We work with you to build your AI Brand Brain, a structured knowledge base that captures your positioning, tone of voice, approved vocabulary, messaging hierarchy, and usage rules. Import from existing decks, URLs, and docs in minutes.",
    bullets: [
      "Structured brand knowledge base",
      "Positioning and tone documentation",
      "Approved vocabulary and examples",
      "Import from Notion, Google Docs, URLs",
      "Team onboarding session included",
    ],
    cta: "Get set up",
    ideal: "Teams launching or rebranding",
  },
  {
    number: "03",
    name: "Ongoing Compliance",
    tag: "Subscription · Always on",
    headline: "Keep every AI asset on brand, every time.",
    description:
      "Continuous monitoring that catches off-brand language, wrong tone, outdated claims, and AI-invented positioning before it ships. Your team gets a shared messaging library with an approval workflow, plus integrations into the tools they already use.",
    bullets: [
      "Real-time content compliance checks",
      "Shared messaging library with tags",
      "Approval workflows for key assets",
      "Slack + Notion + HubSpot integrations",
      "Monthly brand health report",
    ],
    cta: "Start monitoring",
    ideal: "Teams shipping AI content at scale",
  },
];

const steps = [
  {
    n: "1",
    title: "Audit",
    body: "We scan everything your team has published and score it against your stated positioning.",
  },
  {
    n: "2",
    title: "Build",
    body: "We structure your brand knowledge into an AI Brand Brain your whole team can query.",
  },
  {
    n: "3",
    title: "Monitor",
    body: "Every piece of content gets checked in real-time, so brand drift doesn't compound.",
  },
];

const tableRows = [
  { feature: "Brand clarity score", audit: true, setup: true, ongoing: true },
  { feature: "AI Brand Brain", audit: false, setup: true, ongoing: true },
  { feature: "Content compliance checks", audit: false, setup: false, ongoing: true },
  { feature: "Messaging library", audit: false, setup: false, ongoing: true },
  { feature: "Team approval workflows", audit: false, setup: false, ongoing: true },
  { feature: "Slack / Notion / CRM integrations", audit: false, setup: false, ongoing: true },
  { feature: "Monthly health report", audit: false, setup: false, ongoing: true },
  { feature: "Onboarding session", audit: false, setup: true, ongoing: true },
];

function Check({ on }: { on: boolean }) {
  if (!on) {
    return <span className="text-ink-light/30 text-sm">—</span>;
  }
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold/15">
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        fill="none"
        stroke="#C44B5F"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="Included"
      >
        <path d="M1 4l2.5 2.5L9 1" />
      </svg>
    </span>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-cream-bg pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
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
                What we offer
              </div>
            </AnimateIn>

            <AnimateIn from="up" delay={80}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl text-ink leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Brand clarity at every stage of{" "}
                <em className="text-gold not-italic">your growth.</em>
              </h1>
            </AnimateIn>

            <AnimateIn from="up" delay={160}>
              <p className="text-ink-mid text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                From a one-time audit to ongoing AI governance, HaveBrand meets
                your team where you are and grows with you.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Service cards */}
        <section className="bg-cream-bg pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-6 space-y-8">
            {services.map((s, i) => (
              <AnimateIn key={s.number} from="up" delay={i * 80}>
                <div className="bg-cream-panel border border-cream-border rounded-2xl p-8 md:p-10 hover:shadow-md transition-shadow duration-200">
                  <div className="grid md:grid-cols-[1fr_300px] gap-8 md:gap-12">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className="text-gold/50 text-xs font-medium"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {s.number}
                        </span>
                        <span className="h-px flex-1 max-w-[32px] bg-gold/30" />
                        <span className="text-ink-light text-xs">{s.tag}</span>
                      </div>

                      <h2
                        className="text-2xl md:text-3xl text-ink mb-3"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {s.name}
                      </h2>
                      <p className="text-ink text-base font-medium mb-4">{s.headline}</p>
                      <p className="text-ink-mid leading-relaxed mb-6">{s.description}</p>

                      <p className="text-ink-light text-xs uppercase tracking-widest font-medium mb-3">
                        Ideal for
                      </p>
                      <p className="text-ink-mid text-sm">{s.ideal}</p>
                    </div>

                    <div className="border-t md:border-t-0 md:border-l border-cream-border pt-6 md:pt-0 md:pl-10">
                      <p className="text-ink-light text-xs uppercase tracking-widest font-medium mb-4">
                        What&apos;s included
                      </p>
                      <ul className="space-y-3 mb-8">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm text-ink-mid">
                            <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center">
                              <svg
                                width="8"
                                height="7"
                                viewBox="0 0 10 8"
                                fill="none"
                                stroke="#C44B5F"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M1 4l2.5 2.5L9 1" />
                              </svg>
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="#"
                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-150 shadow-sm"
                      >
                        {s.cta}
                        <svg
                          width="12"
                          height="12"
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
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-dark-section py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <AnimateIn from="up">
              <div className="text-center mb-16">
                <p className="text-gold/70 text-sm font-medium tracking-widest uppercase mb-4">
                  The process
                </p>
                <h2
                  className="text-3xl md:text-4xl text-white leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  How it works
                </h2>
              </div>
            </AnimateIn>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <AnimateIn key={step.n} from="up" delay={i * 100}>
                  <div className="relative">
                    {i < steps.length - 1 && (
                      <div
                        className="hidden md:block absolute top-6 left-[calc(100%+12px)] right-0 h-px bg-gold/20"
                        aria-hidden="true"
                      />
                    )}
                    <div className="bg-white/5 border border-white/8 rounded-2xl p-7">
                      <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center mb-5">
                        <span
                          className="text-gold text-sm font-semibold"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {step.n}
                        </span>
                      </div>
                      <h3
                        className="text-white text-xl mb-3"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-ink-light leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-cream-bg py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <AnimateIn from="up">
              <div className="text-center mb-12">
                <h2
                  className="text-3xl md:text-4xl text-ink leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Compare services
                </h2>
              </div>
            </AnimateIn>

            <AnimateIn from="up" delay={80}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cream-border">
                      <th className="text-left py-4 pr-6 text-ink-light text-xs uppercase tracking-widest font-medium w-1/2">
                        Feature
                      </th>
                      {["Brand Audit", "Brand Setup", "Ongoing Compliance"].map((h) => (
                        <th
                          key={h}
                          className="text-center py-4 px-4 text-ink text-sm font-semibold"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-cream-border/50 ${
                          i % 2 === 0 ? "bg-cream-panel/40" : ""
                        }`}
                      >
                        <td className="py-3.5 pr-6 text-sm text-ink-mid">{row.feature}</td>
                        <td className="py-3.5 px-4 text-center">
                          <Check on={row.audit} />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Check on={row.setup} />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Check on={row.ongoing} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimateIn>

            <AnimateIn from="up" delay={160}>
              <div className="text-center mt-10">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-dark text-sm font-medium transition-colors duration-150"
                >
                  See pricing for each service
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
              </div>
            </AnimateIn>
          </div>
        </section>

        <FooterCTA />
      </main>
    </>
  );
}
