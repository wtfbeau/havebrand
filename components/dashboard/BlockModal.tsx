"use client";

import { useEffect, useRef, useState } from "react";
import type { BlockCategory, BlockStatus, LibraryBlock } from "./DashboardContext";

const CATEGORIES: BlockCategory[] = ["Headline", "Elevator Pitch", "Objection", "Proof Point", "CTA"];

interface Props {
  initial?: Partial<LibraryBlock>;
  onSave: (data: Omit<LibraryBlock, "id">) => void;
  onClose: () => void;
}

export default function BlockModal({ initial, onSave, onClose }: Props) {
  const [category, setCategory] = useState<BlockCategory>(initial?.category ?? "Headline");
  const [content, setContent] = useState(initial?.content ?? "");
  const [secondary, setSecondary] = useState(initial?.secondary ?? "");
  const [status, setStatus] = useState<BlockStatus>(initial?.status ?? "Approved");
  const firstRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSave = () => {
    if (!content.trim()) return;
    onSave({
      category,
      status,
      content: content.trim(),
      secondary: category === "Objection" ? secondary.trim() || undefined : undefined,
      author: "Mara Holt",
      initials: "MH",
      authorColor: "#C44B5F",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(28,24,20,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-cream-bg border border-cream-border rounded-2xl shadow-2xl w-full max-w-lg"
        style={{ animation: "fadeUp 0.2s cubic-bezier(0.22,1,0.36,1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-border">
          <h2 className="text-ink font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
            {initial?.content ? "Edit block" : "New block"}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-cream-panel flex items-center justify-center text-ink-light hover:text-ink transition-colors"
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-ink-light mb-1.5">
              Category
            </label>
            <select
              ref={firstRef}
              value={category}
              onChange={(e) => setCategory(e.target.value as BlockCategory)}
              className="w-full bg-cream-panel border border-cream-border rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-ink-light mb-1.5">
              {category === "Objection" ? "Objection" : "Content"}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                category === "Headline" ? "Your brand. Every AI output."
                : category === "Objection" ? "We already have brand guidelines."
                : category === "CTA" ? "Get early access"
                : "Enter the message content…"
              }
              rows={category === "Elevator Pitch" ? 4 : 2}
              className="w-full bg-cream-panel border border-cream-border rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Secondary (Objection only) */}
          {category === "Objection" && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-ink-light mb-1.5">
                Response
              </label>
              <textarea
                value={secondary}
                onChange={(e) => setSecondary(e.target.value)}
                placeholder="Guidelines in a PDF don't scale. HaveBrand makes them active…"
                rows={3}
                className="w-full bg-cream-panel border border-cream-border rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors resize-none leading-relaxed"
              />
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-ink-light mb-2">
              Status
            </label>
            <div className="flex gap-3">
              {(["Approved", "Pending"] as BlockStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                    status === s
                      ? s === "Approved"
                        ? "bg-[rgba(61,154,92,0.12)] border-[rgba(61,154,92,0.3)] text-[#2D7A4A]"
                        : "bg-[rgba(232,168,56,0.12)] border-[rgba(232,168,56,0.3)] text-[#B8840A]"
                      : "border-cream-border text-ink-mid hover:border-cream-border"
                  }`}
                >
                  {s === "Approved" ? (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 6l2.5 2.5 5-5" /></svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="5.5" cy="5.5" r="4.5" /><path d="M5.5 3.5v2.5" /><circle cx="5.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                  )}
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-cream-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-sm text-ink-mid hover:text-ink border border-cream-border hover:border-cream-border bg-cream-panel transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-5 py-2 rounded-full text-sm font-medium bg-gold hover:bg-gold-dark disabled:opacity-40 text-white transition-colors shadow-sm"
          >
            {initial?.content ? "Save changes" : "Add block"}
          </button>
        </div>
      </div>
    </div>
  );
}
