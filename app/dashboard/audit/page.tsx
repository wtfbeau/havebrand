"use client";

import { useState } from "react";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import ScoreRing from "@/components/dashboard/ScoreRing";
import MetricBar from "@/components/dashboard/MetricBar";
import SeverityBadge from "@/components/dashboard/SeverityBadge";
import type { IssueStatus, IssueSeverity } from "@/components/dashboard/DashboardContext";

type FilterLevel = "ALL" | IssueSeverity | "RESOLVED";

const metrics = [
  { label: "Messaging Consistency", value: 82, color: "green"  as const },
  { label: "CTA Strength",          value: 61, color: "orange" as const },
  { label: "Claim Accuracy",         value: 78, color: "orange" as const },
];

const pageBreakdown = [
  { page: "/homepage", score: 61, issues: 2 },
  { page: "/pricing",  score: 55, issues: 2 },
  { page: "/about",    score: 70, issues: 2 },
  { page: "/blog",     score: 88, issues: 2 },
];

function scoreColor(s: number) { return s >= 80 ? "#3D9A5C" : s >= 60 ? "#E8A838" : "#D94F3D"; }

export default function AuditPage() {
  const { issues, resolveIssue, dismissIssue, reopenIssue, runAudit, auditRunning } = useDashboard();
  const [filter, setFilter] = useState<FilterLevel>("ALL");
  const [expanded, setExpanded] = useState(false);
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  const open     = issues.filter((i) => i.status === "open");
  const resolved = issues.filter((i) => i.status === "resolved");
  const high     = open.filter((i) => i.severity === "HIGH");
  const med      = open.filter((i) => i.severity === "MED");
  const low      = open.filter((i) => i.severity === "LOW");

  const clarityScore = Math.max(0, 100 - open.length * 4);

  const counts: Record<FilterLevel, number> = {
    ALL:      open.length,
    HIGH:     high.length,
    MED:      med.length,
    LOW:      low.length,
    RESOLVED: resolved.length,
  };

  const filtered =
    filter === "ALL"      ? open :
    filter === "RESOLVED" ? resolved :
    open.filter((i) => i.severity === filter);

  const tabs: { label: string; level: FilterLevel }[] = [
    { label: `All (${counts.ALL})`,           level: "ALL"      },
    { label: `High (${counts.HIGH})`,         level: "HIGH"     },
    { label: `Medium (${counts.MED})`,        level: "MED"      },
    { label: `Low (${counts.LOW})`,           level: "LOW"      },
    { label: `Resolved (${counts.RESOLVED})`, level: "RESOLVED" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl text-ink mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
            Brand Clarity Audit
          </h1>
          <p className="text-ink-light text-sm flex items-center gap-2">
            <span className="font-mono text-xs bg-cream-panel border border-cream-border px-2 py-0.5 rounded" style={{ fontFamily: "var(--font-jetbrains)" }}>archform.io</span>
            <span>·</span>
            <span>Last run 2 hours ago</span>
          </p>
        </div>
        <button
          onClick={runAudit}
          disabled={auditRunning}
          className="shrink-0 flex items-center gap-2 bg-gold hover:bg-gold-dark disabled:opacity-60 text-white text-sm font-medium px-4 py-2.5 rounded-full transition-colors duration-150 shadow-sm"
        >
          {auditRunning ? (
            <>
              <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6.5 1.5A5 5 0 1111.5 6.5" /></svg>
              Scanning…
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M6 2v4l2.5 2.5" /><circle cx="6" cy="6" r="5" /></svg>
              Run new audit
            </>
          )}
        </button>
      </div>

      {/* Score + metrics */}
      <div className="bg-cream-panel border border-cream-border rounded-xl p-6">
        <div className="flex items-center gap-8 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <ScoreRing score={clarityScore} size={140} strokeWidth={11} />
            <p className="text-ink-light text-xs text-center">Overall clarity score</p>
          </div>
          <div className="flex-1 min-w-[200px] space-y-5">
            {metrics.map((m) => <MetricBar key={m.label} {...m} />)}
          </div>
        </div>
      </div>

      {/* Filter tabs + table */}
      <div className="bg-cream-panel border border-cream-border rounded-xl overflow-hidden">
        <div className="flex border-b border-cream-border px-4 pt-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.level}
              onClick={() => setFilter(tab.level)}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-150 ${filter === tab.level ? "border-gold text-gold" : "border-transparent text-ink-mid hover:text-ink"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="py-14 text-center">
              <div className="w-10 h-10 rounded-full bg-[rgba(61,154,92,0.12)] flex items-center justify-center mx-auto mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#3D9A5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9l3.5 3.5 7-7" /></svg>
              </div>
              <p className="text-ink-mid text-sm">
                {filter === "RESOLVED" ? "No resolved issues yet." : "No issues in this category."}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-border bg-cream-bg/50">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-ink-light uppercase tracking-widest">Page</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-ink-light uppercase tracking-widest">Issue</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-ink-light uppercase tracking-widest hidden sm:table-cell">Category</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-ink-light uppercase tracking-widest">Severity</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((issue, i) => {
                  const isResolved = issue.status === "resolved";
                  const isDismissed = issue.status === "dismissed";
                  const isExpanded = expandedIssue === issue.id;

                  return (
                    <tr
                      key={issue.id}
                      className={`border-b border-cream-border/50 last:border-0 transition-colors duration-100 ${i % 2 === 1 ? "bg-cream-bg/30" : ""} ${isResolved || isDismissed ? "opacity-50" : "hover:bg-cream-bg/60"}`}
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-ink-mid text-xs" style={{ fontFamily: "var(--font-jetbrains)" }}>{issue.page}</span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-ink-mid max-w-[260px]">
                        <span className={isResolved ? "line-through" : ""}>{issue.issue}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <span className="text-xs text-ink-light bg-cream-bg border border-cream-border px-2 py-0.5 rounded-full">{issue.category}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <SeverityBadge level={issue.severity} />
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2 justify-end">
                          {isResolved || isDismissed ? (
                            <button
                              onClick={() => reopenIssue(issue.id)}
                              className="text-ink-light text-xs hover:text-gold transition-colors"
                            >
                              Reopen
                            </button>
                          ) : (
                            <>
                              <div className="relative">
                                <button
                                  onClick={() => setExpandedIssue(isExpanded ? null : issue.id)}
                                  className="text-xs font-medium transition-colors"
                                  style={{ color: issue.severity === "HIGH" ? "#D94F3D" : issue.severity === "MED" ? "#B8840A" : "#6B6358" }}
                                >
                                  {issue.severity === "HIGH" ? "Fix" : issue.severity === "MED" ? "Review" : "Flag"}
                                </button>
                                {isExpanded && (
                                  <div className="absolute right-0 top-full mt-1 z-10 bg-cream-bg border border-cream-border rounded-xl shadow-lg py-1.5 min-w-[140px]">
                                    <button
                                      onClick={() => { resolveIssue(issue.id); setExpandedIssue(null); }}
                                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-left text-[#2D7A4A] hover:bg-cream-panel transition-colors"
                                    >
                                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 6.5l2.5 2.5 6-6" /></svg>
                                      Resolve
                                    </button>
                                    <button
                                      onClick={() => { dismissIssue(issue.id); setExpandedIssue(null); }}
                                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-left text-ink-mid hover:bg-cream-panel transition-colors"
                                    >
                                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" /></svg>
                                      Dismiss
                                    </button>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Page breakdown */}
      <div className="bg-cream-panel border border-cream-border rounded-xl overflow-hidden">
        <button className="w-full flex items-center justify-between px-6 py-4 text-left" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          <span className="text-ink-light text-xs font-semibold uppercase tracking-widest">Page Breakdown ({pageBreakdown.length} pages scanned)</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`text-ink-light transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} aria-hidden="true">
            <path d="M3 5l4 4 4-4" />
          </svg>
        </button>
        {expanded && (
          <div className="border-t border-cream-border px-6 py-4 space-y-4">
            {pageBreakdown.map((p) => (
              <div key={p.page} className="flex items-center gap-4">
                <span className="w-24 shrink-0 text-xs text-ink-mid" style={{ fontFamily: "var(--font-jetbrains)" }}>{p.page}</span>
                <div className="flex-1 h-2 bg-cream-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.score}%`, backgroundColor: scoreColor(p.score) }} />
                </div>
                <span className="text-xs font-semibold w-8 text-right" style={{ color: scoreColor(p.score) }}>{p.score}</span>
                <span className="text-ink-light text-xs w-16 text-right">{p.issues} issues</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
