"use client";

import { useState, useMemo } from "react";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import type { LibraryBlock, BlockCategory } from "@/components/dashboard/DashboardContext";
import BlockModal from "@/components/dashboard/BlockModal";

const categoryColors: Record<BlockCategory, { bg: string; text: string; border: string }> = {
  "Headline":       { bg: "rgba(196,75,95,0.10)",  text: "#8B2337",  border: "rgba(196,75,95,0.25)" },
  "Elevator Pitch": { bg: "rgba(61,154,92,0.10)",   text: "#2D7A4A",  border: "rgba(61,154,92,0.25)"  },
  "Objection":      { bg: "rgba(107,99,88,0.10)",   text: "#5A5248",  border: "rgba(107,99,88,0.25)"  },
  "Proof Point":    { bg: "rgba(26,92,106,0.10)",   text: "#1A5C6A",  border: "rgba(26,92,106,0.25)"  },
  "CTA":            { bg: "rgba(217,79,61,0.08)",   text: "#B03020",  border: "rgba(217,79,61,0.20)"  },
};

const ALL = "All";
type FilterTab = typeof ALL | BlockCategory;

function BlockCard({
  block,
  onEdit,
  onDelete,
  onApprove,
}: {
  block: LibraryBlock;
  onEdit: (block: LibraryBlock) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isHeadline = block.category === "Headline" || block.category === "CTA";
  const cc = categoryColors[block.category];

  const handleCopy = () => {
    const text = block.secondary
      ? `Q: ${block.content}\nA: ${block.secondary}`
      : block.content;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-cream-panel border border-cream-border rounded-xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Top: category + status */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
          style={{ backgroundColor: cc.bg, color: cc.text, borderColor: cc.border }}
        >
          {block.category}
        </span>
        {block.status === "Approved" ? (
          <span className="inline-flex items-center gap-1 text-[#2D7A4A] text-[11px] font-medium">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 6l2.5 2.5 5-5" />
            </svg>
            Approved
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onApprove(block.id)}
              className="text-[11px] font-medium text-[#2D7A4A] bg-[rgba(61,154,92,0.1)] border border-[rgba(61,154,92,0.2)] px-2 py-0.5 rounded-full hover:bg-[rgba(61,154,92,0.18)] transition-colors"
            >
              Approve
            </button>
            <span className="inline-flex items-center gap-1 text-[#B8840A] text-[11px] font-medium">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <circle cx="5.5" cy="5.5" r="4.5" /><path d="M5.5 3.5v2.5" /><circle cx="5.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              Pending
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        {block.secondary ? (
          <>
            <p className="text-ink-light text-xs mb-1 font-medium uppercase tracking-widest">Objection</p>
            <p className="text-ink text-sm font-medium mb-3">{block.content}</p>
            <p className="text-ink-light text-xs mb-1 font-medium uppercase tracking-widest">Response</p>
            <p className="text-ink-mid text-sm leading-relaxed">{block.secondary}</p>
          </>
        ) : (
          <p
            className={`text-ink leading-relaxed ${isHeadline ? "text-base font-medium" : "text-sm"}`}
            style={{ fontFamily: isHeadline ? "var(--font-playfair)" : undefined }}
          >
            {block.content}
          </p>
        )}
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-cream-border">
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0"
            style={{ backgroundColor: block.authorColor }}
            aria-label={block.author}
          >
            {block.initials}
          </span>
          <span className="text-ink-light text-xs">{block.author.split(" ")[0]}</span>
        </div>
        <div className="flex items-center gap-2">
          {confirmDelete ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onDelete(block.id)}
                className="text-[11px] font-medium text-[#D94F3D] bg-[rgba(217,79,61,0.1)] border border-[rgba(217,79,61,0.2)] px-2 py-0.5 rounded-full hover:bg-[rgba(217,79,61,0.18)] transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-ink-light text-[11px] hover:text-ink transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-ink-light hover:text-[#D94F3D] transition-colors"
                aria-label="Delete block"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 3.5h9M5 3.5V2.5h3v1M5.5 5.5v4M7.5 5.5v4M3 3.5l.5 6.5h6l.5-6.5" />
                </svg>
              </button>
              <button
                onClick={() => onEdit(block)}
                className="text-ink-light text-xs hover:text-gold transition-colors duration-150"
              >
                Edit
              </button>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150 ${
                  copied
                    ? "bg-[rgba(61,154,92,0.12)] text-[#2D7A4A] border border-[rgba(61,154,92,0.25)]"
                    : "bg-cream-bg border border-cream-border text-ink-mid hover:text-gold hover:border-gold/30"
                }`}
              >
                {copied ? (
                  <>
                    <svg width="10" height="10" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 4l2.5 2.5L9 1" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="4" y="4" width="7" height="7" rx="1.5" />
                      <path d="M1 8V2a1 1 0 011-1h6" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  const { blocks, addBlock, updateBlock, deleteBlock, approveBlock } = useDashboard();
  const [activeFilter, setActiveFilter] = useState<FilterTab>(ALL);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<LibraryBlock | undefined>(undefined);

  const approved = blocks.filter((b) => b.status === "Approved");
  const pending  = blocks.filter((b) => b.status === "Pending");

  const tabs: { label: string; value: FilterTab; count: number }[] = [
    { label: "All",             value: ALL,               count: blocks.length },
    { label: "Headlines",       value: "Headline",        count: blocks.filter((b) => b.category === "Headline").length },
    { label: "Elevator Pitches",value: "Elevator Pitch",  count: blocks.filter((b) => b.category === "Elevator Pitch").length },
    { label: "Objections",      value: "Objection",       count: blocks.filter((b) => b.category === "Objection").length },
    { label: "Proof Points",    value: "Proof Point",     count: blocks.filter((b) => b.category === "Proof Point").length },
    { label: "CTAs",            value: "CTA",             count: blocks.filter((b) => b.category === "CTA").length },
  ];

  const filtered = useMemo(() => {
    let result = blocks;
    if (activeFilter !== ALL) result = result.filter((b) => b.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) => b.content.toLowerCase().includes(q) || (b.secondary?.toLowerCase().includes(q) ?? false)
      );
    }
    return result;
  }, [blocks, activeFilter, search]);

  const handleExport = () => {
    const lines: string[] = [
      "HAVEBRAND MESSAGING LIBRARY",
      "=".repeat(40),
      `Exported ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      `${approved.length} approved blocks`,
      "",
    ];
    const cats: BlockCategory[] = ["Headline", "Elevator Pitch", "Objection", "Proof Point", "CTA"];
    cats.forEach((cat) => {
      const catBlocks = approved.filter((b) => b.category === cat);
      if (catBlocks.length === 0) return;
      lines.push(`### ${cat.toUpperCase()}S`, "");
      catBlocks.forEach((b, i) => {
        if (b.secondary) {
          lines.push(`${i + 1}. Q: ${b.content}`, `   A: ${b.secondary}`, "");
        } else {
          lines.push(`${i + 1}. ${b.content}`, "");
        }
      });
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "messaging-library.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const openAddModal = () => {
    setEditTarget(undefined);
    setModalOpen(true);
  };

  const openEditModal = (block: LibraryBlock) => {
    setEditTarget(block);
    setModalOpen(true);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl text-ink mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
            Messaging Library
          </h1>
          <p className="text-ink-light text-sm">
            {approved.length} approved block{approved.length !== 1 ? "s" : ""} ·{" "}
            {pending.length} pending review
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light pointer-events-none" width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <circle cx="6" cy="6" r="4.5" /><path d="M10 10l2.5 2.5" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blocks…"
              className="pl-8 pr-4 py-2 text-sm text-ink bg-cream-panel border border-cream-border rounded-full outline-none focus:border-gold transition-colors w-44"
            />
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-150 shadow-sm"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <path d="M6 2v8M2 6h8" />
            </svg>
            Add block
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 bg-cream-panel border border-cream-border text-ink-mid hover:text-ink text-sm font-medium px-4 py-2 rounded-full transition-colors duration-150"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 8V2M3 5l3 3 3-3M2 10h8" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={String(tab.value)}
            onClick={() => setActiveFilter(tab.value)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
              activeFilter === tab.value
                ? "bg-ink text-white shadow-sm"
                : "bg-cream-panel border border-cream-border text-ink-mid hover:text-ink"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center ${
                activeFilter === tab.value ? "bg-white/20 text-white" : "bg-cream-bg text-ink-light"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ink-light text-sm">
            {search ? "No blocks match your search." : "No blocks in this category."}
          </p>
          {search && (
            <button onClick={() => setSearch("")} className="mt-2 text-gold text-sm font-medium hover:text-gold-dark transition-colors">
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((block) => (
            <BlockCard
              key={block.id}
              block={block}
              onEdit={openEditModal}
              onDelete={deleteBlock}
              onApprove={approveBlock}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <BlockModal
          initial={editTarget}
          onSave={(data) => {
            if (editTarget) {
              updateBlock(editTarget.id, data);
            } else {
              addBlock(data);
            }
          }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
