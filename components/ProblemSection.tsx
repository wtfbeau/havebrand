import AnimateIn from "./AnimateIn";

const problems = [
  {
    number: "01",
    title: "Everyone sounds different",
    body: "The homepage says one thing. The deck says another. The founder says something else. No two pieces of content agree on what you do or who you do it for.",
  },
  {
    number: "02",
    title: "AI invents your brand",
    body: "ChatGPT fills in the gaps with plausible-sounding claims. Marketing publishes vague copy. Sales uses outdated positioning. Nobody has flagged any of it.",
  },
  {
    number: "03",
    title: "No approved source of truth",
    body: "There is no single document the whole team trusts. So every person, tool, and agency invents their own version of your brand from scratch, every time.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-dark-section">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <AnimateIn from="up" className="max-w-2xl mb-16">
          <p className="text-gold text-sm font-medium tracking-wide uppercase mb-4">
            The problem
          </p>
          <h2
            className="text-white text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            AI made everyone a content creator. It made no one a brand manager.
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((p, i) => (
            <AnimateIn key={p.number} from="up" delay={i * 100}>
              <div className="group">
                <div className="text-gold/40 font-mono text-xs font-medium mb-4 group-hover:text-gold/70 transition-colors duration-300">
                  {p.number}
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">
                  {p.title}
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">{p.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn from="up" delay={300}>
          <div className="border-t border-white/10 pt-10">
            <p className="text-ink-light text-sm">
              This is brand drift. And it gets worse with every new AI tool your
              team adopts.
            </p>
            <p className="text-white font-medium mt-1">
              HaveBrand stops it at the source.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
