import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";
import AnimateIn from "@/components/AnimateIn";
import { AvatarMH, AvatarRT, AvatarJP } from "@/components/AvatarImage";

export const metadata: Metadata = {
  title: "Founders | HaveBrand",
  description:
    "Three founders from brand agencies, AI labs, and growth teams. We built HaveBrand because we couldn't find a tool that did what we needed.",
};

const founders = [
  {
    Avatar: AvatarMH,
    name: "Mara Holt",
    role: "Co-founder & CEO",
    bio: "Mara spent a decade at Wolff Olins and IDEO building brand systems for companies from Series A startups to global enterprises. She then served as VP of Brand at a Series B SaaS, where she watched, up close, as AI tools began eroding the identity she'd spent two years establishing. She left to build the solution she couldn't find.",
    quote:
      "The brands that survive AI aren't the loudest. They're the most consistent.",
    prev: ["Wolff Olins", "IDEO", "VP of Brand @ Kova"],
  },
  {
    Avatar: AvatarRT,
    name: "Reza Tahir",
    role: "Co-founder & CTO",
    bio: "Reza was an ML engineer at Cohere before leading AI infrastructure at a series of martech startups. He understands, at a technical level, why language models hallucinate brand claims, and how to build guardrails that work with the model rather than against it. He built the first version of HaveBrand's Brand Brain in a weekend.",
    quote:
      "LLMs don't lie about your brand on purpose. They just don't know what you actually stand for. That's fixable.",
    prev: ["Cohere", "Head of AI @ Markr", "Stanford CS"],
  },
  {
    Avatar: AvatarJP,
    name: "Jordan Park",
    role: "Co-founder & CPO",
    bio: "Jordan led growth and marketing operations at HubSpot and later Figma, where they ran brand governance across a 600-person marketing org. They've built brand guidelines that lived in Notion and died in obscurity, which is exactly what drove them to build something better. Jordan owns product at HaveBrand with a simple mandate: make clarity effortless.",
    quote:
      "I've written more brand guidelines than I can count. None of them worked. Systems work. That's what we're building.",
    prev: ["HubSpot", "Figma", "Head of Marketing Ops @ Stackwell"],
  },
];

export default function FoundersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-cream-bg pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-[500px] h-[400px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
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
                The team
              </div>
            </AnimateIn>

            <AnimateIn from="up" delay={80}>
              <h1
                className="text-5xl md:text-6xl text-ink leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Three people who&apos;ve seen what happens when{" "}
                <em className="text-gold not-italic">brand breaks.</em>
              </h1>
            </AnimateIn>

            <AnimateIn from="up" delay={160}>
              <p className="text-ink-mid text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                We come from brand agencies, AI labs, and growth teams. We built
                HaveBrand because we couldn&apos;t find a tool that did what we
                needed.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Founder cards */}
        <section className="bg-cream-bg pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {founders.map((f, i) => (
                <AnimateIn key={f.name} from="up" delay={i * 100}>
                  <div className="bg-cream-panel border border-cream-border rounded-2xl p-7 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center gap-4 mb-6">
                      <f.Avatar size={56} />
                      <div>
                        <h2
                          className="text-ink text-lg font-semibold"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {f.name}
                        </h2>
                        <p className="text-gold text-xs font-medium mt-0.5">
                          {f.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-ink-mid text-sm leading-relaxed mb-5 flex-1">
                      {f.bio}
                    </p>

                    <blockquote className="border-l-2 border-gold pl-4 mb-6">
                      <p
                        className="text-ink text-sm italic leading-relaxed"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        &ldquo;{f.quote}&rdquo;
                      </p>
                    </blockquote>

                    <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-cream-border">
                      {f.prev.map((p) => (
                        <span
                          key={p}
                          className="text-ink-light text-xs bg-cream-bg border border-cream-border px-2.5 py-1 rounded-full"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Why we built this, dark pull quote */}
        <section className="bg-dark-section py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <AnimateIn from="up">
              <p className="text-gold/70 text-sm font-medium tracking-widest uppercase mb-8">
                The founding moment
              </p>
            </AnimateIn>
            <AnimateIn from="up" delay={80}>
              <blockquote
                className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                &ldquo;We were sitting in a brand review and half the room didn&apos;t
                recognize our own positioning in the AI-generated copy. That was
                the day we decided to build HaveBrand.&rdquo;
              </blockquote>
            </AnimateIn>
            <AnimateIn from="up" delay={160}>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-gold/40" />
                <span className="text-ink-light text-xs font-medium tracking-wide uppercase">
                  Mara Holt, Co-founder & CEO
                </span>
                <div className="w-8 h-px bg-gold/40" />
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Hiring CTA */}
        <section className="bg-cream-panel py-20 md:py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <AnimateIn from="up">
              <h2
                className="text-3xl md:text-4xl text-ink leading-tight mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                We&apos;re building a team that believes in this problem
              </h2>
            </AnimateIn>
            <AnimateIn from="up" delay={80}>
              <p className="text-ink-mid leading-relaxed mb-8">
                We hire for conviction, not credentials. If you&apos;ve been
                inside a growing team and felt brand drift firsthand, we want
                to talk.
              </p>
            </AnimateIn>
            <AnimateIn from="scale" delay={160}>
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-medium px-6 py-3 rounded-full transition-colors duration-150 shadow-sm"
              >
                See open roles
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
