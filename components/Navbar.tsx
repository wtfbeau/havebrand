"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { label: "Product", href: "/services" },
  { label: "How it works", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDarkTop = isHome && !scrolled;

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${isDarkTop ? "border-transparent bg-transparent" : "border-cream-border/50 bg-cream-bg/80 backdrop-blur-md"}`}>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-8">
        <Logo variant={isDarkTop ? "dark" : "light"} />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors duration-150 ${isDarkTop ? "text-white/60 hover:text-white" : "text-ink-mid hover:text-ink"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="#"
            className={`hidden md:block text-sm transition-colors duration-150 ${isDarkTop ? "text-white/60 hover:text-white" : "text-ink-mid hover:text-ink"}`}
          >
            Sign in
          </Link>
          <Link
            href="#"
            className="bg-gold hover:bg-gold-dark text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-150 shadow-sm"
          >
            Get early access
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-px w-5 mx-auto transition-all duration-200 origin-center ${isDarkTop ? "bg-white" : "bg-ink"} ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-px w-5 mx-auto transition-all duration-200 ${isDarkTop ? "bg-white" : "bg-ink"} ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 mx-auto transition-all duration-200 origin-center ${isDarkTop ? "bg-white" : "bg-ink"} ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-cream-bg border-t border-cream-border overflow-hidden transition-all duration-200 ${
          mobileOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="px-6 py-3 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-3 text-sm text-ink-mid hover:text-ink border-b border-cream-border/50 transition-colors duration-100"
            >
              {link.label}
            </Link>
          ))}
          <Link href="#" className="py-3 text-sm text-ink-mid hover:text-ink">
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}
