"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    exact: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="6" height="6" rx="1.5" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Brand Audit",
    href: "/dashboard/audit",
    exact: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" />
        <path d="M13 13l3 3" />
        <path d="M5.5 8h5M8 5.5v5" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    label: "AI Brain",
    href: "/dashboard/brain",
    exact: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3C6.8 3 5 4.8 5 7c0 .7.2 1.4.5 2C4.2 9.7 3 11 3 12.5 3 14.4 4.6 16 6.5 16h5c1.9 0 3.5-1.6 3.5-3.5 0-1.5-1.2-2.8-2.5-3.5.3-.6.5-1.3.5-2C13 4.8 11.2 3 9 3z" />
        <circle cx="9" cy="8" r="1.2" fill="currentColor" stroke="none" />
        <path d="M6 12.5h6" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    label: "Compliance",
    href: "/dashboard/compliance",
    exact: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 2L3 5v5c0 4 2.7 7.7 6 9 3.3-1.3 6-5 6-9V5L9 2z" />
        <path d="M6 9l2 2 4-4" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Library",
    href: "/dashboard/library",
    exact: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="4" height="12" rx="1" />
        <rect x="7" y="3" width="4" height="12" rx="1" />
        <path d="M13 3l2.5 11.2a1 1 0 01-.7 1.2l-1.5.4" />
      </svg>
    ),
  },
];

const settingsItem = {
  label: "Settings",
  href: "/dashboard/settings",
  icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="2.5" />
      <path d="M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M4.1 4.1l1 1M12.9 12.9l1 1M13.9 4.1l-1 1M5.1 12.9l-1 1" />
    </svg>
  ),
};

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-[220px] shrink-0 flex flex-col h-screen sticky top-0 border-r border-white/8" style={{ backgroundColor: "#1C1814" }}>
      {/* Logo */}
      <div className="px-5 h-14 flex items-center border-b border-white/8 shrink-0">
        <Logo variant="dark" size="sm" />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/20">
          Workspace
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 border-l-2 ${
                    active
                      ? "bg-white/[0.07] text-white border-gold"
                      : "text-white/45 hover:text-white/70 hover:bg-white/[0.04] border-transparent"
                  }`}
                >
                  <span className={active ? "text-gold" : ""}>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="shrink-0 border-t border-white/8 px-3 py-4">
        <Link
          href={settingsItem.href}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 border-l-2 ${
            pathname.startsWith("/dashboard/settings")
              ? "bg-white/[0.07] text-white border-gold"
              : "text-white/40 hover:text-white/60 hover:bg-white/[0.04] border-transparent"
          }`}
        >
          <span className={pathname.startsWith("/dashboard/settings") ? "text-gold" : ""}>{settingsItem.icon}</span>
          <span className="font-medium">{settingsItem.label}</span>
          {pathname.startsWith("/dashboard/settings") && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
          )}
        </Link>
        {/* User pill */}
        <div className="mt-2 px-3 py-2 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
            <span className="text-gold text-xs font-semibold" style={{ fontFamily: "var(--font-jetbrains)" }}>
              MH
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-white/70 text-xs font-medium truncate">Mara Holt</p>
            <p className="text-white/30 text-[10px] truncate">CEO · Archform</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
