import AnimateIn from "./AnimateIn";
import { AvatarSK, AvatarMD } from "./AvatarImage";
import {
  ArchformLogo,
  LumenAILogo,
  StackwellLogo,
  BravoHealthLogo,
  FynanceLogo,
  CrudoLogo,
} from "./CompanyLogos";

const testimonials = [
  {
    quote:
      "We were using AI for every email and deck, and suddenly no two pieces sounded the same. HaveBrand caught that in about 10 minutes.",
    name: "Sarah K.",
    role: "Head of Marketing",
    company: "Lumen AI",
    Avatar: AvatarSK,
  },
  {
    quote:
      "Our sales team had three different versions of our company description. HaveBrand told us exactly which page was the problem and how to fix it.",
    name: "Marcus D.",
    role: "Founder",
    company: "Archform",
    Avatar: AvatarMD,
  },
];

export default function LogoBar() {
  return (
    <section className="bg-cream-panel border-y border-cream-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <AnimateIn from="up">
          <p className="text-center text-ink-light text-sm mb-10">
            Teams keeping their brand clear
          </p>
        </AnimateIn>

        <AnimateIn from="up" delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-16 text-ink">
            <div className="opacity-35 hover:opacity-60 transition-opacity duration-200">
              <ArchformLogo />
            </div>
            <div className="opacity-35 hover:opacity-60 transition-opacity duration-200">
              <LumenAILogo />
            </div>
            <div className="opacity-35 hover:opacity-60 transition-opacity duration-200">
              <StackwellLogo />
            </div>
            <div className="opacity-35 hover:opacity-60 transition-opacity duration-200">
              <BravoHealthLogo />
            </div>
            <div className="opacity-35 hover:opacity-60 transition-opacity duration-200">
              <FynanceLogo />
            </div>
            <div className="opacity-35 hover:opacity-60 transition-opacity duration-200">
              <CrudoLogo />
            </div>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.name} from="up" delay={i * 120}>
              <blockquote className="bg-cream-bg rounded-xl p-6 border border-cream-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <p className="text-ink text-base leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <t.Avatar size={36} />
                  <div>
                    <div className="text-ink text-sm font-medium">{t.name}</div>
                    <div className="text-ink-light text-xs">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
