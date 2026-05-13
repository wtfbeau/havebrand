const CIRCUMFERENCE = 2 * Math.PI * 50;
const SCORE = 74;
const DASH_OFFSET = CIRCUMFERENCE * (1 - SCORE / 100);

const metrics = [
  { label: "Messaging Consistency", value: 82, color: "#3D9A5C" },
  { label: "CTA Strength",          value: 61, color: "#E8A838" },
  { label: "Claim Accuracy",        value: 78, color: "#E8A838" },
];

const issues = [
  { page: "/homepage", issue: "Vague positioning",    sev: "HIGH", sevColor: "#D94F3D" },
  { page: "/pricing",  issue: "Inconsistent tone",    sev: "MED",  sevColor: "#E8A838" },
  { page: "/about",    issue: "Missing proof points", sev: "MED",  sevColor: "#E8A838" },
  { page: "/blog",     issue: "Off-brand voice",      sev: "LOW",  sevColor: "#3D9A5C" },
];

const navItems = [
  {
    label: "Dashboard",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        <rect x="1" y="1" width="5" height="5" rx="1" />
        <rect x="8" y="1" width="5" height="5" rx="1" />
        <rect x="1" y="8" width="5" height="5" rx="1" />
        <rect x="8" y="8" width="5" height="5" rx="1" />
      </svg>
    ),
    active: false,
  },
  {
    label: "Brand Audit",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="6" cy="6" r="4.5" />
        <path d="m9.5 9.5 2.5 2.5" />
      </svg>
    ),
    active: true,
  },
  {
    label: "AI Brain",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 2.5C3.3 2.5 2 3.8 2 5.5c0 .8.3 1.5.8 2L3 9h8l-.8-1.5c.5-.5.8-1.2.8-2 0-1.7-1.3-3-3-3" />
        <path d="M5 9v2h4V9" />
        <path d="M7 2.5v-.5" />
      </svg>
    ),
    active: false,
  },
  {
    label: "Compliance",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="10" height="10" rx="1.5" />
        <path d="m4.5 7 2 2 3-3" />
      </svg>
    ),
    active: false,
  },
  {
    label: "Library",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        <rect x="2" y="3"   width="10" height="1.5" rx="0.5" />
        <rect x="2" y="6.25" width="10" height="1.5" rx="0.5" />
        <rect x="2" y="9.5" width="6"  height="1.5" rx="0.5" />
      </svg>
    ),
    active: false,
  },
];

export default function DashboardMockup() {
  return (
    <div className="relative w-full">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-3xl -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 65% 35%, rgba(196,75,95,0.14) 0%, transparent 65%)",
        }}
      />

      {/* Browser window */}
      <div
        className="rounded-xl overflow-hidden border border-cream-border"
        style={{
          boxShadow:
            "0 24px 64px rgba(28,24,20,0.15), 0 4px 20px rgba(28,24,20,0.07)",
        }}
      >
          {/* Chrome */}
          <div className="h-8 bg-[#EDE8DF] flex items-center px-3 gap-3 border-b border-cream-border/80">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 mx-2 bg-white/50 border border-cream-border/60 rounded px-2 py-0.5 flex items-center gap-1.5">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                className="text-ink-light shrink-0"
              >
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
                <path d="M3 3.5h2M3 5h1.5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
              </svg>
              <span
                className="text-[9px] text-ink-light truncate"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                app.havebrand.com/audit/results
              </span>
            </div>
          </div>

          {/* App layout */}
          <div className="flex" style={{ height: 390 }}>
            {/* Sidebar */}
            <div
              className="w-11 shrink-0 flex flex-col items-center py-3 gap-1"
              style={{ backgroundColor: "#1C1814" }}
            >
              <div className="w-6 h-6 rounded bg-gold flex items-center justify-center mb-1">
                <span
                  className="text-white font-bold text-[8px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  HB
                </span>
              </div>
              <div className="w-5 h-px bg-white/10 my-1.5" />

              {navItems.map((item) => (
                <div
                  key={item.label}
                  title={item.label}
                  className="w-7 h-7 rounded flex items-center justify-center"
                  style={{
                    color: item.active ? "#C44B5F" : "#A89F93",
                    backgroundColor: item.active
                      ? "rgba(196,75,95,0.15)"
                      : "transparent",
                  }}
                >
                  {item.icon}
                </div>
              ))}

              <div className="flex-1" />
              <div
                title="Settings"
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ color: "#A89F93" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <circle cx="7" cy="7" r="2" />
                  <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.9 2.9l1.1 1.1M10 10l1.1 1.1M2.9 11.1l1.1-1.1M10 4l1.1-1.1" />
                </svg>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 bg-cream-bg overflow-hidden">
              {/* Header bar */}
              <div className="px-4 py-2.5 border-b border-cream-border flex items-center justify-between gap-2 shrink-0">
                <div>
                  <div
                    className="text-[11px] font-semibold text-ink leading-tight"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Brand Clarity Audit
                  </div>
                  <div
                    className="text-[9px] text-ink-light mt-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Archform.io &middot; Last run 2 hours ago
                  </div>
                </div>
                <button
                  className="shrink-0 text-white text-[9px] font-semibold px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: "#C44B5F",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Run new audit
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {/* Score + metrics */}
                <div className="flex gap-3">
                  {/* Score ring, draws on load */}
                  <div
                    className="shrink-0 relative"
                    style={{ width: 84, height: 84 }}
                  >
                    <svg
                      viewBox="0 0 120 120"
                      width="84"
                      height="84"
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      <circle
                        cx="60" cy="60" r="50"
                        fill="none"
                        stroke="#E5DDD0"
                        strokeWidth="11"
                      />
                      <circle
                        cx="60" cy="60" r="50"
                        fill="none"
                        stroke="#C44B5F"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        style={{
                          strokeDashoffset: DASH_OFFSET,
                          animation:
                            "drawRing 1.6s cubic-bezier(0.4,0,0.2,1) 1.1s both",
                        }}
                      />
                    </svg>
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <span
                        className="text-[20px] font-bold text-ink leading-none"
                        style={{
                          animation:
                            "fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) 1.5s both",
                        }}
                      >
                        {SCORE}
                      </span>
                      <span
                        className="text-[7px] text-ink-light mt-0.5"
                        style={{
                          animation:
                            "fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) 1.6s both",
                        }}
                      >
                        / 100
                      </span>
                    </div>
                  </div>

                  {/* Metric cards, bars grow */}
                  <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                    {metrics.map((m, i) => (
                      <div
                        key={m.label}
                        className="flex items-center gap-2 rounded-md px-2.5 py-1.5"
                        style={{
                          backgroundColor: "#F2EDE3",
                          animation: `fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) ${
                            1.0 + i * 0.1
                          }s both`,
                        }}
                      >
                        <span
                          className="text-[9px] text-ink-mid flex-1 truncate"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {m.label}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div
                            className="rounded-full overflow-hidden"
                            style={{
                              width: 44,
                              height: 4,
                              backgroundColor: "#E5DDD0",
                            }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${m.value}%`,
                                backgroundColor: m.color,
                                animation: `growBar 1s cubic-bezier(0.22,1,0.36,1) ${
                                  1.2 + i * 0.1
                                }s both`,
                              }}
                            />
                          </div>
                          <span
                            className="text-[10px] font-semibold"
                            style={{
                              color: m.color,
                              fontFamily: "var(--font-inter)",
                              minWidth: 24,
                              textAlign: "right",
                            }}
                          >
                            {m.value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Issues table */}
                <div
                  className="rounded-lg overflow-hidden border"
                  style={{
                    borderColor: "#E5DDD0",
                    animation:
                      "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 1.2s both",
                  }}
                >
                  <div
                    className="grid px-3 py-1.5 border-b"
                    style={{
                      gridTemplateColumns: "1.2fr 1.4fr 56px",
                      backgroundColor: "#F2EDE3",
                      borderColor: "#E5DDD0",
                    }}
                  >
                    {["Page", "Issue", "Severity"].map((h) => (
                      <span
                        key={h}
                        className="text-[8px] font-semibold uppercase tracking-wide"
                        style={{
                          color: "#A89F93",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {issues.map((row, i) => (
                    <div
                      key={row.page}
                      className="grid items-center px-3 py-2 border-b last:border-0"
                      style={{
                        gridTemplateColumns: "1.2fr 1.4fr 56px",
                        borderColor: "#E5DDD0",
                        backgroundColor: i % 2 === 0 ? "#FAFAF7" : "#F7F3EC",
                        animation: `fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) ${
                          1.3 + i * 0.07
                        }s both`,
                      }}
                    >
                      <span
                        className="text-[9px] truncate"
                        style={{
                          color: "#1C1814",
                          fontFamily: "var(--font-jetbrains)",
                        }}
                      >
                        {row.page}
                      </span>
                      <span
                        className="text-[9px] truncate"
                        style={{
                          color: "#6B6358",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {row.issue}
                      </span>
                      <span
                        className="text-[7px] font-bold px-1.5 py-0.5 rounded-sm text-center"
                        style={{
                          color: row.sevColor,
                          backgroundColor: `${row.sevColor}18`,
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {row.sev}
                      </span>
                    </div>
                  ))}
                </div>

                {/* AI Brand Brain card */}
                <div
                  className="rounded-lg p-3 border"
                  style={{
                    backgroundColor: "#1C1814",
                    borderColor: "rgba(196,75,95,0.2)",
                    animation:
                      "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 1.55s both",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center"
                      style={{ backgroundColor: "rgba(196,75,95,0.2)" }}
                    >
                      {/* Pulsing dot */}
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: "#C44B5F",
                          animation: "pulse 2.5s ease-in-out 2s infinite",
                        }}
                      />
                    </div>
                    <span
                      className="text-[9px] font-semibold"
                      style={{
                        color: "#EDA0AE",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      AI Brand Brain
                    </span>
                    <span
                      className="ml-auto text-[7px] font-medium px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: "rgba(196,75,95,0.15)",
                        color: "#C44B5F",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                    {[
                      { k: "Tone",  v: "Direct, authoritative" },
                      { k: "ICP",   v: "B2B SaaS, 10–200 emp." },
                      { k: "Avoid", v: "Vague, buzzwordy" },
                      { k: "Proof", v: "Reduce drift by 80%" },
                    ].map((e) => (
                      <div key={e.k} className="flex gap-1.5">
                        <span
                          className="text-[7px] font-semibold uppercase"
                          style={{
                            color: "#A89F93",
                            fontFamily: "var(--font-inter)",
                            minWidth: 24,
                          }}
                        >
                          {e.k}
                        </span>
                        <span
                          className="text-[8px]"
                          style={{
                            color: "#EDA0AE",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {e.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
