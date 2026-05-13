import Link from "next/link";
import AnimateIn from "./AnimateIn";
import EarlyAccessForm from "./EarlyAccessForm";
import Logo from "./Logo";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Services", href: "/services" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Founders", href: "/founders" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export default function FooterCTA() {
  return (
    <>
      <section className="bg-dark-section">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
          <AnimateIn from="up">
            <p className="text-gold/70 text-sm font-medium tracking-wide uppercase mb-6">
              Get started
            </p>
          </AnimateIn>

          <AnimateIn from="up" delay={80}>
            <h2
              className="text-white text-4xl md:text-6xl leading-tight mb-6 max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Every AI asset. On brand. Every time.
            </h2>
          </AnimateIn>

          <AnimateIn from="up" delay={160}>
            <p className="text-ink-light text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 120+ brand and marketing teams who use HaveBrand to keep
              their message clear, consistent, and approved.
            </p>
          </AnimateIn>

          <AnimateIn from="scale" delay={240}>
            <div className="flex flex-col items-center gap-4">
              <EarlyAccessForm variant="dark" />
              <Link
                href="#"
                className="text-ink-light/60 hover:text-ink-light text-sm transition-colors duration-150 flex items-center gap-1.5"
              >
                Or see a live demo
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

      <footer className="bg-dark-section border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Logo variant="dark" size="sm" />
              </div>
              <p className="text-ink-light text-xs leading-relaxed max-w-[180px]">
                Brand clarity and AI governance for growing companies.
              </p>
            </div>
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-ink-light text-[10px] font-semibold uppercase tracking-widest mb-3">
                  {section}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-ink-light/60 hover:text-ink-light text-sm transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-ink-light/40 text-xs">
              &copy; 2025 HaveBrand, Inc. All rights reserved.
            </p>
            <p className="text-ink-light/40 text-xs">
              Made for teams who take their brand seriously.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
