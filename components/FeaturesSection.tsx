import AnimateIn from "./AnimateIn";

const features = [
  {
    number: "01",
    title: "Brand Clarity Audit",
    description:
      "Scan your website, landing pages, and sales decks to surface unclear positioning, vague claims, weak CTAs, and inconsistent messaging before it reaches buyers.",
    bullets: [
      "Flags every page with positioning gaps",
      "Scores your clarity from 0 to 100",
      "Prioritizes fixes by revenue impact",
    ],
    visual: <AuditVisual />,
  },
  {
    number: "02",
    title: "AI Brand Brain",
    description:
      "Turn your approved positioning, ICP, product claims, proof points, and objections into a structured knowledge base. Your brand, encoded, searchable, and enforceable.",
    bullets: [
      "Imports from decks, docs, and URLs",
      "Structured by audience, use case, and stage",
      "Always up to date, one source of truth",
    ],
    visual: <BrainVisual />,
  },
  {
    number: "03",
    title: "Content Compliance Checker",
    description:
      "Paste any AI-generated copy and HaveBrand flags off-brand language, unsupported claims, wrong tone, and unclear messaging before it goes live.",
    bullets: [
      "Works with ChatGPT, Claude, and Gemini output",
      "Highlights specific phrases, not just flags",
      "Suggests on-brand alternatives",
    ],
    visual: <ComplianceVisual />,
  },
  {
    number: "04",
    title: "Team Messaging Library",
    description:
      "Give marketing, sales, founders, and agencies the same approved headlines, product explanations, comparison copy, and proof points, all in one place.",
    bullets: [
      "Shareable with the whole team",
      "Approval workflow built in",
      "Exports to Notion, Slides, and CRMs",
    ],
    visual: <LibraryVisual />,
  },
];

function AuditVisual() {
  const rows = [
    { page: "/homepage", score: 61, color: "#E8A838" },
    { page: "/pricing",  score: 44, color: "#D94F3D" },
    { page: "/about",    score: 78, color: "#3D9A5C" },
  ];
  return (
    <div className="bg-cream-bg rounded-xl border border-cream-border p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-ink">Page Clarity Report</span>
        <span className="text-[10px] text-ink-light">3 issues found</span>
      </div>
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.page} className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-ink-mid w-20 shrink-0">
              {r.page}
            </span>
            <div className="flex-1 h-1.5 bg-cream-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${r.score}%`, backgroundColor: r.color }}
              />
            </div>
            <span
              className="text-[10px] font-semibold w-6 text-right"
              style={{ color: r.color }}
            >
              {r.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrainVisual() {
  const entries = [
    { label: "ICP",   value: "B2B SaaS, 10–200 employees" },
    { label: "Tone",  value: "Direct, authoritative, clear" },
    { label: "Avoid", value: "Vague, generic, buzzwords" },
    { label: "Proof", value: "Reduce brand drift by 80%" },
  ];
  return (
    <div className="bg-cream-bg rounded-xl border border-cream-border p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded bg-gold/20 flex items-center justify-center">
          <div
            className="w-2 h-2 rounded-full bg-gold"
            style={{ animation: "pulse 2.5s ease-in-out infinite" }}
          />
        </div>
        <span className="text-xs font-semibold text-ink">AI Brand Brain</span>
        <span className="ml-auto text-[9px] bg-gold/10 text-gold-dark font-medium px-1.5 py-0.5 rounded">
          Active
        </span>
      </div>
      <div className="space-y-2">
        {entries.map((e) => (
          <div key={e.label} className="flex gap-3 items-baseline">
            <span className="text-[9px] font-semibold text-ink-light uppercase tracking-wide w-10 shrink-0">
              {e.label}
            </span>
            <span className="text-[11px] text-ink">{e.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceVisual() {
  return (
    <div className="bg-cream-bg rounded-xl border border-cream-border p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-ink">Content Check</span>
        <span className="text-[9px] bg-[#D94F3D]/10 text-[#D94F3D] font-semibold px-1.5 py-0.5 rounded">
          2 issues
        </span>
      </div>
      <div className="text-[11px] leading-relaxed text-ink-mid bg-cream-panel rounded-lg p-3 mb-3 font-mono">
        <span>Our platform helps </span>
        <mark className="bg-[#D94F3D]/15 text-[#D94F3D] rounded px-0.5 not-italic">
          supercharge your growth
        </mark>
        <span> by </span>
        <mark className="bg-[#E8A838]/20 text-[#8B2337] rounded px-0.5 not-italic">
          leveraging AI synergies
        </mark>
        <span> across your funnel.</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-start gap-2 text-[10px]">
          <span className="text-[#D94F3D] mt-0.5">&#x2715;</span>
          <span className="text-ink-mid">
            &ldquo;supercharge your growth&rdquo;, vague, unsupported claim
          </span>
        </div>
        <div className="flex items-start gap-2 text-[10px]">
          <span className="text-[#E8A838] mt-0.5">&#x26A0;</span>
          <span className="text-ink-mid">
            &ldquo;leveraging AI synergies&rdquo;, off-brand buzzwords
          </span>
        </div>
      </div>
    </div>
  );
}

function LibraryVisual() {
  const blocks = [
    { tag: "Headline",      text: "Your brand. Every AI output." },
    { tag: "Elevator pitch", text: "HaveBrand gives teams one approved source of truth for every message." },
    { tag: "Objection",     text: "We already have brand guidelines." },
    { tag: "Proof point",   text: "Reduce brand inconsistencies by 80% in 30 days." },
  ];
  return (
    <div className="bg-cream-bg rounded-xl border border-cream-border p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-ink">Messaging Library</span>
        <span className="text-[10px] text-ink-light">24 blocks</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {blocks.map((b) => (
          <div
            key={b.tag}
            className="bg-cream-panel rounded-lg p-2.5 border border-cream-border/60 hover:border-gold/30 transition-colors duration-150"
          >
            <div className="text-[8px] font-semibold text-gold uppercase tracking-wide mb-1">
              {b.tag}
            </div>
            <p className="text-[10px] text-ink leading-snug line-clamp-2">
              {b.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-cream-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <AnimateIn from="up" className="max-w-2xl mb-20">
          <p className="text-gold text-sm font-medium tracking-wide uppercase mb-4">
            How it works
          </p>
          <h2
            className="text-ink text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            One system. Four layers of brand control.
          </h2>
        </AnimateIn>

        <div className="space-y-24">
          {features.map((feature, i) => {
            const copyFrom = i % 2 === 0 ? "left" : "right";
            const visualFrom = i % 2 === 0 ? "right" : "left";
            return (
              <div
                key={feature.number}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <AnimateIn from={copyFrom}>
                  <div>
                    <div className="inline-flex items-center gap-2.5 mb-6">
                      <span className="text-gold font-mono text-sm font-medium">
                        {feature.number}
                      </span>
                      <div className="w-8 h-px bg-gold/40" />
                    </div>
                    <h3
                      className="text-ink text-3xl mb-4 leading-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-ink-mid text-base leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-2.5">
                      {feature.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-2.5 text-sm text-ink"
                        >
                          <span className="w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                            <svg
                              width="8"
                              height="6"
                              viewBox="0 0 8 6"
                              fill="none"
                              stroke="#C44B5F"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M1 3l2 2 4-4" />
                            </svg>
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>
                <AnimateIn from={visualFrom} delay={120}>
                  <div>{feature.visual}</div>
                </AnimateIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
