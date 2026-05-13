"use client";

import { FormEvent, useState } from "react";

interface Props {
  variant?: "light" | "dark";
}

export default function EarlyAccessForm({ variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={`flex items-center gap-2.5 text-sm ${
          variant === "dark" ? "text-ink-light" : "text-ink-mid"
        }`}
      >
        <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[#3D9A5C]/15">
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            stroke="#3D9A5C"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 4l2.5 2.5L9 1" />
          </svg>
        </span>
        You&rsquo;re on the list. We&rsquo;ll be in touch soon.
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md"
    >
      <div
        className="flex items-center gap-2 flex-1 rounded-full px-4 py-2.5 transition-all duration-150"
        style={{
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
          border: `1px solid ${
            focused
              ? "#C44B5F"
              : isDark
              ? "rgba(255,255,255,0.12)"
              : "#E5DDD0"
          }`,
          boxShadow: focused ? "0 0 0 3px rgba(196,75,95,0.15)" : "none",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke={isDark ? "#A89F93" : "#A89F93"}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <rect x="1.5" y="3" width="11" height="8" rx="1.5" />
          <path d="M1.5 5l5.5 3.5L12.5 5" />
        </svg>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="your@company.com"
          required
          aria-label="Work email address"
          className={`flex-1 bg-transparent text-sm outline-none placeholder:text-ink-light ${
            isDark ? "text-white" : "text-ink"
          }`}
        />
      </div>
      <button
        type="submit"
        className="bg-gold hover:bg-gold-dark text-white font-medium px-5 py-2.5 rounded-full text-sm transition-all duration-150 whitespace-nowrap shrink-0"
        style={{ boxShadow: "0 0 22px rgba(196,75,95,0.4), 0 2px 8px rgba(0,0,0,0.2)" }}
      >
        Get early access
      </button>
    </form>
  );
}
