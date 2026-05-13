"use client";

import { useState, useMemo } from "react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

interface FlagRule {
  pattern: RegExp;
  type: "Claim" | "Buzzword" | "Tone";
  severity: "HIGH" | "MED" | "LOW";
  explanation: string;
  alternative: string;
}

const BASE_RULES: FlagRule[] = [
  { pattern: /supercharg/gi,    type: "Claim",   severity: "HIGH", explanation: "Unsupported superlative claim, doesn't match your direct, evidence-based brand tone.", alternative: "improve" },
  { pattern: /game.?chang/gi,   type: "Claim",   severity: "HIGH", explanation: "Hyperbolic, makes a bold claim without substantiation.", alternative: "meaningfully different" },
  { pattern: /revolutionar/gi,  type: "Claim",   severity: "HIGH", explanation: "Overused buzzword with no specific meaning.", alternative: "a new approach to" },
  { pattern: /disrupt/gi,       type: "Claim",   severity: "HIGH", explanation: "Clichéd and vague, avoids describing what you actually do.", alternative: "fix" },
  { pattern: /leverag/gi,       type: "Buzzword",severity: "MED",  explanation: "Corporate jargon, not consistent with your direct, clear brand voice.", alternative: "use" },
  { pattern: /synerg/gi,        type: "Buzzword",severity: "MED",  explanation: "On your Brand Brain avoid list.", alternative: "work together" },
  { pattern: /seamless/gi,      type: "Buzzword",severity: "MED",  explanation: "Overused promise word, doesn't describe the actual experience.", alternative: "simple" },
  { pattern: /unlock/gi,        type: "Buzzword",severity: "MED",  explanation: "Marketing cliché, prefer direct language about specific outcomes.", alternative: "access" },
  { pattern: /cutting.?edge/gi, type: "Buzzword",severity: "MED",  explanation: "Worn-out tech cliché, tell what's specifically advanced.", alternative: "purpose-built" },
  { pattern: /\bvery\b/gi,      type: "Tone",    severity: "LOW",  explanation: "Filler intensifier, weakens the adjacent claim.", alternative: "remove it" },
  { pattern: /\bamazing\b/gi,   type: "Tone",    severity: "LOW",  explanation: "Vague enthusiasm, prefer specific, concrete language.", alternative: "effective" },
  { pattern: /\bawesome\b/gi,   type: "Tone",    severity: "LOW",  explanation: "Informal and imprecise, not aligned with your authoritative tone.", alternative: "strong" },
];

interface Match {
  start: number;
  end: number;
  rule: FlagRule;
  matchedText: string;
}

function analyzeText(text: string, rules: FlagRule[]): Match[] {
  const matches: Match[] = [];
  for (const rule of rules) {
    const re = new RegExp(rule.pattern.source, "gi");
    let m;
    while ((m = re.exec(text)) !== null) {
      const overlaps = matches.some(
        (existing) => m!.index < existing.end && m!.index + m![0].length > existing.start
      );
      if (!overlaps) {
        matches.push({ start: m.index, end: m.index + m[0].length, rule, matchedText: m[0] });
      }
    }
  }
  return matches.sort((a, b) => a.start - b.start);
}

function computeScore(matches: Match[]): number {
  const high = matches.filter((m) => m.rule.severity === "HIGH").length;
  const med  = matches.filter((m) => m.rule.severity === "MED").length;
  const low  = matches.filter((m) => m.rule.severity === "LOW").length;
  return Math.max(0, 100 - high * 15 - med * 8 - low * 3);
}

type Segment = { text: string; match: Match | null };

function buildSegments(text: string, matches: Match[]): Segment[] {
  const segments: Segment[] = [];
  let pos = 0;
  for (const m of matches) {
    if (m.start > pos) segments.push({ text: text.slice(pos, m.start), match: null });
    segments.push({ text: text.slice(m.start, m.end), match: m });
    pos = m.end;
  }
  if (pos < text.length) segments.push({ text: text.slice(pos), match: null });
  return segments;
}

const highlightColors: Record<string, { bg: string; text: string; border: string }> = {
  HIGH: { bg: "rgba(217,79,61,0.12)",  text: "#C0341D", border: "#D94F3D" },
  MED:  { bg: "rgba(232,168,56,0.14)", text: "#9B6908", border: "#E8A838" },
  LOW:  { bg: "rgba(107,99,88,0.12)",  text: "#6B6358", border: "#A89F93" },
};

interface RecentCheck {
  preview: string;
  score: number;
  time: string;
}

function ScorePill({ score }: { score: number }) {
  const color = score >= 80 ? "#3D9A5C" : score >= 60 ? "#B8840A" : "#D94F3D";
  const bg    = score >= 80 ? "rgba(61,154,92,0.1)" : score >= 60 ? "rgba(232,168,56,0.1)" : "rgba(217,79,61,0.1)";
  const label = score >= 80 ? "On brand" : score >= 60 ? "Review" : "Needs work";
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
      style={{ color, backgroundColor: bg, borderColor: color + "33" }}>
      {score}, {label}
    </span>
  );
}

const PLACEHOLDER = `We're excited to supercharge your growth with our revolutionary AI platform. Leveraging cutting-edge technology, we deliver seamless experiences that game-change the industry. Our very amazing solution unlocks value across your entire organization.`;

const STATIC_RECENT: RecentCheck[] = [
  { preview: "We supercharge your marketing strategy with AI-powered…", score: 55, time: "Yesterday" },
  { preview: "Our platform delivers seamless integrations across your entire…", score: 72, time: "2 days ago" },
  { preview: "HaveBrand keeps your brand clear and consistent across…", score: 91, time: "3 days ago" },
];

export default function CompliancePage() {
  const { brainEntries } = useDashboard();
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ matches: Match[]; score: number; segments: Segment[] } | null>(null);
  const [checking, setChecking] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [recentChecks, setRecentChecks] = useState<RecentCheck[]>(STATIC_RECENT);

  const allRules = useMemo(() => {
    const avoidEntry = brainEntries.find((e) => e.key === "Avoid");
    if (!avoidEntry) return BASE_RULES;
    const basePatterns = new Set(BASE_RULES.map((r) => r.pattern.source.toLowerCase()));
    const dynamicRules = avoidEntry.value
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean)
      .reduce<FlagRule[]>((acc, word) => {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (!basePatterns.has(escaped.toLowerCase())) {
          acc.push({
            pattern: new RegExp(escaped, "gi"),
            type: "Buzzword",
            severity: "MED",
            explanation: `"${word}" is on your Brand Brain avoid list.`,
            alternative: "a more specific, direct phrase",
          });
        }
        return acc;
      }, []);
    return [...BASE_RULES, ...dynamicRules];
  }, [brainEntries]);

  const handleCheck = () => {
    if (!text.trim()) return;
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      const matches = analyzeText(text, allRules);
      const score = computeScore(matches);
      const segments = buildSegments(text, matches);
      setResult({ matches, score, segments });
      setChecking(false);
      setRecentChecks((prev) => [
        { preview: text.slice(0, 75) + (text.length > 75 ? "…" : ""), score, time: "Just now" },
        ...prev.slice(0, 4),
      ]);
    }, 1500);
  };

  const handleTryExample = () => {
    setText(PLACEHOLDER);
    setResult(null);
  };

  const highCount = result?.matches.filter((m) => m.rule.severity === "HIGH").length ?? 0;
  const medCount  = result?.matches.filter((m) => m.rule.severity === "MED").length ?? 0;
  const lowCount  = result?.matches.filter((m) => m.rule.severity === "LOW").length ?? 0;

  const avoidEntry = brainEntries.find((e) => e.key === "Avoid");

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl text-ink mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
          Content Compliance Checker
        </h1>
        <p className="text-ink-light text-sm">
          Check any AI-generated copy against your Brand Brain, flags off-brand language before it ships.
        </p>
      </div>

      {avoidEntry && (
        <div className="flex items-center gap-2 text-xs text-ink-light">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#C44B5F" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" /><path d="M7 5v2.5M7 9h.01" />
          </svg>
          <span>Checking against Brain, avoid list: </span>
          <span className="text-ink-mid font-medium">{avoidEntry.value}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-start">
        {/* Main checker */}
        <div className="space-y-4">
          {/* Input */}
          <div className="bg-cream-panel border border-cream-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-cream-border flex items-center justify-between">
              <span className="text-ink-light text-xs font-semibold uppercase tracking-widest">
                Paste your copy
              </span>
              <button onClick={handleTryExample} className="text-gold text-xs font-medium hover:text-gold-dark transition-colors">
                Try an example
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setResult(null); }}
              placeholder="Paste AI-generated copy here, from ChatGPT, Claude, Gemini, Copilot, or any other tool…"
              rows={7}
              className="w-full px-5 py-4 text-sm text-ink bg-transparent outline-none resize-none placeholder:text-ink-light/50 leading-relaxed"
            />
            <div className="px-5 py-3 border-t border-cream-border flex items-center justify-between">
              <span className="text-ink-light/60 text-xs">
                {text.length > 0 ? `${text.length} characters` : "Works with ChatGPT, Claude, Gemini, Copilot output"}
              </span>
              <button
                onClick={handleCheck}
                disabled={!text.trim() || checking}
                className="flex items-center gap-2 bg-gold hover:bg-gold-dark disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors duration-150 shadow-sm"
              >
                {checking ? (
                  <>
                    <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                      <path d="M6.5 1.5A5 5 0 1111.5 6.5" />
                    </svg>
                    Checking…
                  </>
                ) : (
                  "Check content"
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <>
              {/* Score header */}
              <div className="bg-cream-panel border border-cream-border rounded-xl px-6 py-4 flex items-center justify-between flex-wrap gap-3" style={{ animation: "fadeUp 0.2s cubic-bezier(0.22,1,0.36,1)" }}>
                <div className="flex items-center gap-3">
                  <ScorePill score={result.score} />
                  <span className="text-ink-mid text-sm">
                    {result.matches.length === 0
                      ? "No issues found, looks on brand."
                      : `${result.matches.length} issue${result.matches.length !== 1 ? "s" : ""} found`}
                  </span>
                </div>
                {result.matches.length > 0 && (
                  <div className="flex items-center gap-3 text-xs">
                    {highCount > 0 && <span className="text-[#D94F3D] font-medium">{highCount} high</span>}
                    {medCount  > 0 && <span className="text-[#B8840A] font-medium">{medCount} medium</span>}
                    {lowCount  > 0 && <span className="text-ink-mid">{lowCount} low</span>}
                  </div>
                )}
              </div>

              {/* Annotated copy */}
              {result.matches.length > 0 && (
                <div className="bg-cream-panel border border-cream-border rounded-xl p-6" style={{ animation: "fadeUp 0.24s cubic-bezier(0.22,1,0.36,1)" }}>
                  <p className="text-ink-light text-xs font-semibold uppercase tracking-widest mb-4">
                    Annotated copy
                  </p>
                  <p className="text-ink-mid text-sm leading-[1.9] relative">
                    {result.segments.map((seg, i) => {
                      if (!seg.match) return <span key={i}>{seg.text}</span>;
                      const c = highlightColors[seg.match.rule.severity];
                      return (
                        <span
                          key={i}
                          className="relative cursor-help rounded px-0.5"
                          style={{ backgroundColor: c.bg, color: c.text, borderBottom: `2px solid ${c.border}` }}
                          title={seg.match.rule.explanation}
                          onMouseEnter={() => setTooltip(`${i}`)}
                          onMouseLeave={() => setTooltip(null)}
                          aria-label={`Flagged: ${seg.match.rule.explanation}`}
                        >
                          {seg.text}
                          {tooltip === `${i}` && (
                            <span
                              className="absolute bottom-full left-0 mb-2 z-10 rounded-lg px-3 py-2 text-white text-xs leading-snug max-w-[220px] shadow-lg"
                              style={{ backgroundColor: "#1C1814", whiteSpace: "normal" }}
                            >
                              <strong className="block mb-1 capitalize">{seg.match.rule.type}</strong>
                              {seg.match.rule.explanation}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </p>
                </div>
              )}

              {/* Issue list */}
              {result.matches.length > 0 && (
                <div className="bg-cream-panel border border-cream-border rounded-xl overflow-hidden" style={{ animation: "fadeUp 0.28s cubic-bezier(0.22,1,0.36,1)" }}>
                  <div className="px-6 py-4 border-b border-cream-border">
                    <p className="text-ink-light text-xs font-semibold uppercase tracking-widest">Issue details</p>
                  </div>
                  <div className="divide-y divide-cream-border">
                    {result.matches.map((m, i) => {
                      const c = highlightColors[m.rule.severity];
                      return (
                        <div key={i} className="px-6 py-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                              style={{ color: c.text, backgroundColor: c.bg, borderColor: c.border + "55" }}>
                              {m.rule.type}
                            </span>
                            <span className="text-ink-light text-xs capitalize">{m.rule.severity.toLowerCase()} severity</span>
                          </div>
                          <code className="block text-sm mb-2 px-3 py-1.5 rounded-lg"
                            style={{ backgroundColor: c.bg, color: c.text, fontFamily: "var(--font-jetbrains)" }}>
                            &ldquo;{m.matchedText}&rdquo;
                          </code>
                          <p className="text-ink-mid text-sm mb-2">{m.rule.explanation}</p>
                          <div className="flex items-center gap-2 text-sm rounded-lg px-3 py-2 border"
                            style={{ borderColor: "#C44B5F33", backgroundColor: "rgba(196,75,95,0.06)" }}>
                            <span className="text-gold text-xs font-medium uppercase tracking-wide shrink-0">Try:</span>
                            <span className="text-ink-mid italic">{m.rule.alternative}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {result.matches.length === 0 && (
                <div className="bg-[rgba(61,154,92,0.06)] border border-[rgba(61,154,92,0.2)] rounded-xl px-6 py-8 text-center" style={{ animation: "fadeUp 0.2s cubic-bezier(0.22,1,0.36,1)" }}>
                  <div className="w-10 h-10 rounded-full bg-[rgba(61,154,92,0.15)] flex items-center justify-center mx-auto mb-3">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#3D9A5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 9l3.5 3.5 7-7" />
                    </svg>
                  </div>
                  <p className="text-[#2D7A4A] text-sm font-medium">This copy looks on brand.</p>
                  <p className="text-[#2D7A4A]/70 text-xs mt-1">No flagged phrases found against your Brand Brain.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Recent checks sidebar */}
        <div className="bg-cream-panel border border-cream-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-cream-border">
            <h2 className="text-ink-light text-xs font-semibold uppercase tracking-widest">
              Recent Checks
            </h2>
          </div>
          {recentChecks.length === 0 ? (
            <div className="px-5 py-8 text-center text-ink-light text-xs">
              No checks yet.
            </div>
          ) : (
            <div className="divide-y divide-cream-border">
              {recentChecks.map((check, i) => (
                <div key={i} className="px-5 py-4">
                  <p className="text-ink-mid text-xs leading-relaxed mb-2 line-clamp-2">{check.preview}</p>
                  <div className="flex items-center justify-between">
                    <ScorePill score={check.score} />
                    <span className="text-ink-light text-[11px]">{check.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
