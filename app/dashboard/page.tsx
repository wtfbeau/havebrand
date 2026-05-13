"use client";

import Link from "next/link";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import ScoreRing from "@/components/dashboard/ScoreRing";
import MetricBar from "@/components/dashboard/MetricBar";
import SeverityBadge from "@/components/dashboard/SeverityBadge";

const metrics = [
  { label: "Messaging Consistency", value: 82, color: "green"  as const },
  { label: "CTA Strength",          value: 61, color: "orange" as const },
  { label: "Claim Accuracy",         value: 78, color: "orange" as const },
];

const quickActions = [
  { label: "Run new audit",    href: "/dashboard/audit",      primary: true  },
  { label: "Check content",    href: "/dashboard/compliance", primary: false },
  { label: "Add to Brain",     href: "/dashboard/brain",      primary: false },
  { label: "Add message block",href: "/dashboard/library",    primary: false },
];

export default function DashboardOverview() {
  const { issues, blocks, brainEntries, activity } = useDashboard();

  const openIssues      = issues.filter((i) => i.status === "open");
  const highPriority    = openIssues.filter((i) => i.severity === "HIGH");
  const approvedBlocks  = blocks.filter((b) => b.status === "Approved");
  const pendingBlocks   = blocks.filter((b) => b.status === "Pending");
  const clarityScore    = Math.max(0, 100 - openIssues.length * 4);

  const stats = [
    {
      label: "Clarity Score",
      value: clarityScore.toString(),
      unit: "/100",
      trend: openIssues.length > 0 ? `${openIssues.length} open issues` : "No open issues",
      trendColor: openIssues.length > 2 ? "#E8A838" : "#3D9A5C",
      accent: "#C44B5F",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <circle cx="9" cy="9" r="7" /><path d="M9 5v4l2.5 2.5" />
        </svg>
      ),
    },
    {
      label: "Open Issues",
      value: openIssues.length.toString(),
      unit: "",
      trend: `${highPriority.length} high priority`,
      trendColor: highPriority.length > 0 ? "#D94F3D" : "#3D9A5C",
      accent: "#D94F3D",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 2L1.5 14.5h15L9 2z" /><path d="M9 7.5v3.5M9 13h.01" />
        </svg>
      ),
    },
    {
      label: "Brain Entries",
      value: brainEntries.length.toString(),
      unit: "",
      trend: "Knowledge base active",
      trendColor: "#3D9A5C",
      accent: "#3D9A5C",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 3C6.8 3 5 4.8 5 7c0 .7.2 1.4.5 2C4.2 9.7 3 11 3 12.5 3 14.4 4.6 16 6.5 16h5c1.9 0 3.5-1.6 3.5-3.5 0-1.5-1.2-2.8-2.5-3.5.3-.6.5-1.3.5-2C13 4.8 11.2 3 9 3z" />
          <circle cx="9" cy="8" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Library Blocks",
      value: blocks.length.toString(),
      unit: "",
      trend: `${pendingBlocks.length} pending approval`,
      trendColor: pendingBlocks.length > 0 ? "#B8840A" : "#3D9A5C",
      accent: "#C44B5F",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="4" height="12" rx="1" /><rect x="7" y="3" width="4" height="12" rx="1" />
          <path d="M13 3l2.5 11.2a1 1 0 01-.7 1.2l-1.5.4" />
        </svg>
      ),
    },
  ];

  const topIssues = openIssues.slice(0, 4);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl text-ink mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
            Good morning.
          </h1>
          <p className="text-ink-mid text-sm">
            Your brand clarity score is{" "}
            <span className="text-ink font-semibold">{clarityScore}/100</span>
            {openIssues.length > 0 && `, ${openIssues.length} issue${openIssues.length !== 1 ? "s" : ""} need attention.`}
            {openIssues.length === 0 && ", everything looks on brand."}
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-gold/10 border border-gold/20 text-gold text-xs font-medium px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" style={{ animation: "pulse 2.5s ease-in-out infinite" }} aria-hidden="true" />
          Updated 2 hours ago
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-cream-panel border border-cream-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-ink-light text-xs font-medium uppercase tracking-widest">{s.label}</span>
              <span style={{ color: s.accent }} className="opacity-60">{s.icon}</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-semibold text-ink leading-none" style={{ fontFamily: "var(--font-playfair)" }}>
                {s.value}
              </span>
              {s.unit && <span className="text-ink-mid text-sm mb-0.5">{s.unit}</span>}
            </div>
            <p className="text-xs mt-1.5" style={{ color: s.trendColor }}>{s.trend}</p>
          </div>
        ))}
      </div>

      {/* Main row */}
      <div className="grid lg:grid-cols-[3fr_2fr] gap-6">
        <div className="bg-cream-panel border border-cream-border rounded-xl p-6">
          <h2 className="text-ink-light text-xs font-semibold uppercase tracking-widest mb-5">Brand Health</h2>
          <div className="flex items-center gap-8 flex-wrap">
            <ScoreRing score={clarityScore} size={140} strokeWidth={11} />
            <div className="flex-1 min-w-[160px] space-y-4">
              {metrics.map((m) => <MetricBar key={m.label} {...m} />)}
            </div>
          </div>
        </div>

        <div className="bg-cream-panel border border-cream-border rounded-xl p-6 flex flex-col">
          <h2 className="text-ink-light text-xs font-semibold uppercase tracking-widest mb-4">
            Top Issues
          </h2>
          {topIssues.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
              <div className="w-10 h-10 rounded-full bg-[rgba(61,154,92,0.12)] flex items-center justify-center mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#3D9A5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9l3.5 3.5 7-7" /></svg>
              </div>
              <p className="text-[#2D7A4A] text-sm font-medium">All clear!</p>
              <p className="text-ink-light text-xs mt-1">No open issues</p>
            </div>
          ) : (
            <div className="flex-1 space-y-3">
              {topIssues.map((issue) => (
                <div key={issue.id} className="flex items-start gap-3 py-2.5 border-b border-cream-border last:border-0">
                  <SeverityBadge level={issue.severity} />
                  <div className="min-w-0">
                    <p className="text-ink-light text-[11px] mb-0.5" style={{ fontFamily: "var(--font-jetbrains)" }}>{issue.page}</p>
                    <p className="text-ink-mid text-sm leading-snug">{issue.issue}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link href="/dashboard/audit" className="mt-4 flex items-center gap-1.5 text-gold text-sm font-medium hover:text-gold-dark transition-colors duration-150">
            View all in Audit
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-ink-light text-xs font-semibold uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((a) => (
            <Link key={a.label} href={a.href} className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-150 shadow-sm ${a.primary ? "bg-gold hover:bg-gold-dark text-white" : "bg-cream-panel border border-cream-border text-ink-mid hover:text-ink hover:bg-cream-bg"}`}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div className="bg-cream-panel border border-cream-border rounded-xl p-6">
        <h2 className="text-ink-light text-xs font-semibold uppercase tracking-widest mb-5">Recent Activity</h2>
        <ol className="relative">
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-cream-border" aria-hidden="true" />
          <div className="space-y-4">
            {activity.slice(0, 10).map((item) => (
              <li key={item.id} className="flex items-start gap-4 pl-6 relative">
                <span className="absolute left-0 top-[5px] w-2.5 h-2.5 rounded-full border-2 border-cream-panel shrink-0" style={{ backgroundColor: item.color }} aria-hidden="true" />
                <p className="text-ink-mid text-sm leading-snug flex-1">{item.text}</p>
                <span className="shrink-0 text-ink-light text-xs whitespace-nowrap">{item.time}</span>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </div>
  );
}
