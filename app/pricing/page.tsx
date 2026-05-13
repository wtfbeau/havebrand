"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";
import AnimateIn from "@/components/AnimateIn";
import EarlyAccessForm from "@/components/EarlyAccessForm";

const plans = [
  {
    name: "Starter",
    tag: "For solo brand teams",
    monthlyPrice: 49,
    annualPrice: 39,
    description:
      "Everything you need to get your brand clarity baseline and start working from a single source of truth.",
    features: [
      "1 brand workspace",
      "3 team seats",
      "Brand clarity audit (monthly)",
      "AI Brand Brain (basic)",
      "Content compliance checker",
      "Email support",
    ],
    cta: "Get early access",
    ctaHref: "#",
    highlight: false,
  },
  {
    name: "Growth",
    tag: "For growing marketing teams",
    monthlyPrice: 149,
    annualPrice: 119,
    description:
      "Full platform access for teams shipping content at scale. Keep every AI asset on brand without slowing down.",
    features: [
      "3 brand workspaces",
      "10 team seats",
      "Unlimited clarity audits",
      "AI Brand Brain (advanced)",
      "Real-time content compliance",
      "Team messaging library",
      "Approval workflows",
      "Notion + Slack integrations",
      "Priority email support",
    ],
    cta: "Get early access",
    ctaHref: "#",
    highlight: true,
  },
  {
    name: "Enterprise",
    tag: "For multi-brand organizations",
    monthlyPrice: null,
    annualPrice: null,
    description:
      "Custom configuration for organizations with multiple brands, complex governance needs, and dedicated support requirements.",
    features: [
      "Unlimited brand workspaces",
      "Unlimited seats",
      "Custom brand brain configuration",
      "SSO / SAML",
      "HubSpot + Salesforce + CRM integrations",
      "Dedicated onboarding",
      "Priority Slack support",
      "SLA & security review",
    ],
    cta: "Talk to sales",
    ctaHref: "#",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What counts as a 'brand workspace'?",
    a: "A brand workspace is a single brand identity, one set of positioning, tone of voice, vocabulary, and guidelines. If you manage multiple brands (e.g., a holding company or agency), each brand needs its own workspace.",
  },
  {
    q: "Can I try HaveBrand before committing?",
    a: "Yes. We offer a free brand clarity audit for new accounts, no card required. You'll get a real clarity score and inconsistency report for your primary domain within 48 hours.",
  },
  {
    q: "How does the AI Brand Brain learn our brand?",
    a: "You import from existing sources: your website, Notion docs, Google Slides decks, or any URL. Our system structures this into a queryable knowledge base. You can also add rules and examples manually.",
  },
  {
    q: "What integrations are available?",
    a: "Growth plans include Notion and Slack. Enterprise includes HubSpot, Salesforce, Google Workspace, and custom API access. We're shipping new integrations monthly, see the changelog for what's coming next.",
  },
  {
    q: "What happens to my data?",
    a: "Your brand content is stored securely and is never used to train external models. Enterprise customers can request a data processing agreement and security review.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades take effect at the end of your billing cycle.",
  },
];

function PlanCard({
  plan,
  annual,
}: {
  plan: (typeof plans)[0];
  annual: boolean;
}) {
  const price = annual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 h-full transition-shadow duration-200 hover:shadow-lg ${
        plan.highlight
          ? "bg-dark-section border-2 border-gold/50"
          : "bg-cream-panel border border-cream-border"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-gold text-white text-xs font-semibold px-3.5 py-1 rounded-full shadow-sm">
            Most popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <p
          className={`text-xs font-medium uppercase tracking-widest mb-1 ${
            plan.highlight ? "text-gold/70" : "text-ink-light"
          }`}
        >
          {plan.tag}
        </p>
        <h3
          className={`text-2xl font-semibold mb-4 ${
            plan.highlight ? "text-white" : "text-ink"
          }`}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {plan.name}
        </h3>

        <div className="flex items-end gap-1.5 mb-4">
          {price !== null ? (
            <>
              <span
                className={`text-4xl font-semibold ${
                  plan.highlight ? "text-white" : "text-ink"
                }`}
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ${price}
              </span>
              <span
                className={`text-sm mb-1.5 ${
                  plan.highlight ? "text-ink-light" : "text-ink-mid"
                }`}
              >
                / mo{annual ? " · billed annually" : ""}
              </span>
            </>
          ) : (
            <span
              className={`text-3xl font-semibold ${
                plan.highlight ? "text-white" : "text-ink"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Custom
            </span>
          )}
        </div>

        <p
          className={`text-sm leading-relaxed ${
            plan.highlight ? "text-ink-light" : "text-ink-mid"
          }`}
        >
          {plan.description}
        </p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <span
              className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                plan.highlight ? "bg-gold/20" : "bg-gold/15"
              }`}
            >
              <svg
                width="8"
                height="7"
                viewBox="0 0 10 8"
                fill="none"
                stroke="#C44B5F"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 4l2.5 2.5L9 1" />
              </svg>
            </span>
            <span className={plan.highlight ? "text-ink-light" : "text-ink-mid"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={plan.ctaHref}
        className={`w-full text-center text-sm font-medium py-3 rounded-full transition-colors duration-150 shadow-sm ${
          plan.highlight
            ? "bg-gold hover:bg-gold-dark text-white"
            : "bg-ink hover:bg-ink/80 text-white"
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-cream-border">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-ink text-sm font-medium">{q}</span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full bg-cream-panel border border-cream-border flex items-center justify-center transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M3 4.5l3 3 3-3" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-60 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-ink-mid text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-cream-bg pt-36 pb-16 md:pt-44 md:pb-20 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
            style={{ background: "#C44B5F" }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-3xl px-6 text-center relative">
            <AnimateIn from="up">
              <h1
                className="text-5xl md:text-6xl text-ink leading-tight tracking-tight mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Simple pricing.{" "}
                <em className="text-gold not-italic">Clear value.</em>
              </h1>
            </AnimateIn>
            <AnimateIn from="up" delay={80}>
              <p className="text-ink-mid text-lg leading-relaxed mb-10">
                No hidden fees. No per-seat surprises. Cancel any time.
              </p>
            </AnimateIn>

            {/* Billing toggle */}
            <AnimateIn from="scale" delay={160}>
              <div className="inline-flex items-center gap-3 bg-cream-panel border border-cream-border rounded-full p-1">
                <button
                  onClick={() => setAnnual(false)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                    !annual
                      ? "bg-white text-ink shadow-sm"
                      : "text-ink-mid hover:text-ink"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    annual
                      ? "bg-white text-ink shadow-sm"
                      : "text-ink-mid hover:text-ink"
                  }`}
                >
                  Annual
                  <span className="text-gold text-xs font-semibold">
                    Save 20%
                  </span>
                </button>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="bg-cream-bg pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {plans.map((plan, i) => (
                <AnimateIn key={plan.name} from="up" delay={i * 80}>
                  <PlanCard plan={plan} annual={annual} />
                </AnimateIn>
              ))}
            </div>

            <AnimateIn from="up" delay={320}>
              <p className="text-center text-ink-light text-sm mt-8">
                All plans include a{" "}
                <span className="text-ink-mid font-medium">
                  14-day free trial
                </span>
                . No card required to start.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cream-panel py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <AnimateIn from="up">
              <div className="text-center mb-12">
                <p className="text-gold/70 text-sm font-medium tracking-widest uppercase mb-4">
                  Questions
                </p>
                <h2
                  className="text-3xl md:text-4xl text-ink leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Frequently asked
                </h2>
              </div>
            </AnimateIn>

            <AnimateIn from="up" delay={80}>
              <div>
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Still deciding CTA */}
        <section className="bg-cream-bg py-20 md:py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <AnimateIn from="up">
              <h2
                className="text-3xl md:text-4xl text-ink leading-tight mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Still deciding?
              </h2>
            </AnimateIn>
            <AnimateIn from="up" delay={80}>
              <p className="text-ink-mid leading-relaxed mb-8">
                Start with a free brand clarity audit. You&apos;ll get a real
                score and a prioritized report, no account required.
              </p>
            </AnimateIn>
            <AnimateIn from="scale" delay={160}>
              <div className="flex flex-col items-center gap-4">
                <EarlyAccessForm variant="light" />
                <Link
                  href="#"
                  className="text-ink-mid/60 hover:text-ink-mid text-sm transition-colors duration-150 flex items-center gap-1.5"
                >
                  Or talk to the founders
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
