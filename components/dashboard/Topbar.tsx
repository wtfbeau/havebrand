"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/dashboard":            "Overview",
  "/dashboard/audit":      "Brand Clarity Audit",
  "/dashboard/brain":      "AI Brand Brain",
  "/dashboard/compliance": "Content Compliance",
  "/dashboard/library":    "Messaging Library",
};

export default function Topbar() {
  const pathname = usePathname();
  const [brandOpen, setBrandOpen] = useState(false);

  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header
      className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-white/8"
      style={{ backgroundColor: "#1C1814" }}
    >
      {/* Left: breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white/30">Dashboard</span>
        {title !== "Overview" && (
          <>
            <span className="text-white/20">/</span>
            <span className="text-white/70 font-medium">{title}</span>
          </>
        )}
      </div>

      {/* Center: brand selector */}
      <div className="relative">
        <button
          onClick={() => setBrandOpen(!brandOpen)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium text-white/80 hover:text-white bg-white/[0.06] hover:bg-white/[0.09] border border-white/10 transition-all duration-150"
        >
          <span
            className="w-2 h-2 rounded-full bg-gold"
            style={{ animation: "pulse 2.5s ease-in-out infinite" }}
            aria-hidden="true"
          />
          Archform.io
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`transition-transform duration-150 ${brandOpen ? "rotate-180" : ""}`} aria-hidden="true">
            <path d="M3 4.5l3 3 3-3" />
          </svg>
        </button>
        {brandOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-dark-section border border-white/10 rounded-xl py-1.5 min-w-[180px] shadow-xl z-10">
            {[
              { name: "Archform.io", active: true },
              { name: "+ Add brand workspace", active: false },
            ].map((b) => (
              <button
                key={b.name}
                onClick={() => setBrandOpen(false)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm text-left transition-colors duration-100 ${
                  b.active
                    ? "text-white"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {b.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                )}
                {b.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/audit"
          className="flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-white text-xs font-medium px-3.5 py-2 rounded-full transition-colors duration-150 shadow-sm"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M6 2v8M2 6h8" />
          </svg>
          Run audit
        </Link>
        <button
          aria-label="Notifications"
          className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors duration-150 relative"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 2a4 4 0 00-4 4v3H2.5a.5.5 0 000 1h9a.5.5 0 000-1H11V6a4 4 0 00-4-4zM5.5 11a1.5 1.5 0 003 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
