"use client";

import { useState, useRef, useEffect } from "react";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import type { BrainEntry, BrainSource } from "@/components/dashboard/DashboardContext";

function SourceIcon({ type }: { type: BrainSource["type"] }) {
  if (type === "url") return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-ink-light shrink-0" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" />
      <path d="M7 1.5C5.5 3.5 4.5 5.2 4.5 7s1 3.5 2.5 5.5M7 1.5C8.5 3.5 9.5 5.2 9.5 7S8.5 10.5 7 12.5M1.5 7h11" />
    </svg>
  );
  if (type === "notion") return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-ink-light shrink-0" aria-hidden="true">
      <rect x="2" y="2" width="10" height="10" rx="2" />
      <path d="M5 5h4M5 7.5h3" />
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-ink-light shrink-0" aria-hidden="true">
      <path d="M8 1.5H4a1.5 1.5 0 00-1.5 1.5v8A1.5 1.5 0 004 12.5h6A1.5 1.5 0 0011.5 11V5l-3.5-3.5z" />
      <path d="M8 1.5V5h3.5M5 7.5h4M5 9.5h3" />
    </svg>
  );
}

function EditableRow({
  entry,
  onSave,
  onDelete,
}: {
  entry: BrainEntry;
  onSave: (id: string, value: string) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(entry.value);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) setDraft(entry.value);
  }, [entry.value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSave = () => {
    if (draft.trim()) onSave(entry.id, draft.trim());
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="group flex items-start gap-4 py-3.5 border-b border-cream-border last:border-0">
      <span className="w-28 shrink-0 text-[11px] font-semibold uppercase tracking-widest text-ink-light pt-0.5">
        {entry.key}
      </span>
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") { setDraft(entry.value); setEditing(false); }
            }}
            className="w-full text-sm text-ink bg-cream-bg border border-gold rounded-lg px-3 py-1.5 outline-none"
            style={{ boxShadow: "0 0 0 3px rgba(196,75,95,0.15)" }}
          />
        ) : (
          <button
            className="w-full text-left text-sm text-ink-mid group-hover:text-ink leading-relaxed"
            onClick={() => { setDraft(entry.value); setEditing(true); }}
          >
            {entry.value}
          </button>
        )}
      </div>
      <div className="shrink-0 flex items-center gap-2 h-6 mt-0.5">
        {saved ? (
          <span className="text-[#3D9A5C] text-xs font-medium whitespace-nowrap">Saved ✓</span>
        ) : editing ? null : (
          <>
            <button
              onClick={() => { setDraft(entry.value); setEditing(true); }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-ink-light hover:text-gold"
              aria-label={`Edit ${entry.key}`}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 2l2 2-7 7H2V9l7-7z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-ink-light hover:text-[#D94F3D]"
              aria-label={`Delete ${entry.key}`}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 3.5h9M5 3.5V2.5h3v1M5.5 5.5v4M7.5 5.5v4M3 3.5l.5 6.5h6l.5-6.5" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function AddEntryForm({
  sections,
  onAdd,
  onCancel,
}: {
  sections: string[];
  onAdd: (section: string, key: string, value: string) => void;
  onCancel: () => void;
}) {
  const [section, setSection] = useState(sections[0] ?? "Audience");
  const [customSection, setCustomSection] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const resolvedSection = useCustom ? customSection.trim() : section;
  const canSubmit = resolvedSection && key.trim() && value.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    onAdd(resolvedSection, key.trim(), value.trim());
  };

  return (
    <div className="bg-cream-panel border border-gold/30 rounded-xl p-5 space-y-3" style={{ animation: "fadeUp 0.18s cubic-bezier(0.22,1,0.36,1)" }}>
      <p className="text-ink text-sm font-medium">Add new entry</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink-light mb-1.5">Section</label>
          <select
            value={useCustom ? "__new__" : section}
            onChange={(e) => {
              if (e.target.value === "__new__") { setUseCustom(true); } else { setUseCustom(false); setSection(e.target.value); }
            }}
            className="w-full bg-cream-bg border border-cream-border rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-gold transition-colors"
          >
            {sections.map((s) => <option key={s} value={s}>{s}</option>)}
            <option value="__new__">+ New section…</option>
          </select>
          {useCustom && (
            <input
              type="text"
              value={customSection}
              onChange={(e) => setCustomSection(e.target.value)}
              placeholder="Section name"
              autoFocus
              className="mt-2 w-full bg-cream-bg border border-cream-border rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-gold transition-colors"
            />
          )}
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink-light mb-1.5">Label</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g. Mission, Values"
            className="w-full bg-cream-bg border border-cream-border rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink-light mb-1.5">Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Enter the brand attribute value"
          className="w-full bg-cream-bg border border-cream-border rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-gold transition-colors"
        />
      </div>
      <div className="flex items-center gap-2 justify-end pt-1">
        <button onClick={onCancel} className="px-4 py-2 text-sm text-ink-mid hover:text-ink transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="px-5 py-2 bg-gold hover:bg-gold-dark disabled:opacity-40 text-white text-sm font-medium rounded-full transition-colors shadow-sm"
        >
          Add entry
        </button>
      </div>
    </div>
  );
}

export default function BrainPage() {
  const {
    brainEntries,
    brainSources,
    updateBrainEntry,
    addBrainEntry,
    deleteBrainEntry,
    resyncSource,
    addSource,
  } = useDashboard();

  const [showImportForm, setShowImportForm] = useState(false);
  const [importUrl, setImportUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);

  const sections = Array.from(new Set(brainEntries.map((e) => e.section)));

  const handleImport = () => {
    if (!importUrl.trim()) return;
    setImporting(true);
    setTimeout(() => {
      addSource(importUrl.replace(/^https?:\/\//, ""), "url");
      setImportUrl("");
      setImporting(false);
      setShowImportForm(false);
    }, 1600);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl text-ink" style={{ fontFamily: "var(--font-playfair)" }}>
              AI Brand Brain
            </h1>
            <span className="inline-flex items-center gap-1.5 bg-[#3D9A5C]/10 border border-[#3D9A5C]/20 text-[#2D7A4A] text-xs font-medium px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D9A5C]" style={{ animation: "pulse 2s ease-in-out infinite" }} aria-hidden="true" />
              Active
            </span>
          </div>
          <p className="text-ink-light text-sm">
            Your encoded brand knowledge, click any value to edit inline
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => { setShowAddEntry(!showAddEntry); setShowImportForm(false); }}
            className="shrink-0 flex items-center gap-2 bg-cream-panel border border-cream-border hover:border-gold text-ink-mid hover:text-gold text-sm font-medium px-4 py-2.5 rounded-full transition-colors duration-150"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <path d="M6 2v8M2 6h8" />
            </svg>
            Add entry
          </button>
          <button
            onClick={() => { setShowImportForm(!showImportForm); setShowAddEntry(false); }}
            className="shrink-0 flex items-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-medium px-4 py-2.5 rounded-full transition-colors duration-150 shadow-sm"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" />
              <path d="M6.5 4v5M4 6.5l2.5 2.5 2.5-2.5" />
            </svg>
            Import source
          </button>
        </div>
      </div>

      {/* Add entry form */}
      {showAddEntry && (
        <AddEntryForm
          sections={sections}
          onAdd={(section, key, value) => {
            addBrainEntry({ section, key, value });
            setShowAddEntry(false);
          }}
          onCancel={() => setShowAddEntry(false)}
        />
      )}

      {/* Import form */}
      {showImportForm && (
        <div className="bg-cream-panel border border-gold/30 rounded-xl p-5" style={{ animation: "fadeUp 0.18s cubic-bezier(0.22,1,0.36,1)" }}>
          <p className="text-ink text-sm font-medium mb-3">Import from URL</p>
          <div className="flex gap-2.5">
            <input
              type="url"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleImport()}
              placeholder="https://yourwebsite.com/about"
              autoFocus
              className="flex-1 bg-cream-bg border border-cream-border rounded-lg px-4 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
              style={{ boxShadow: importUrl ? "0 0 0 3px rgba(196,75,95,0.12)" : undefined }}
            />
            <button
              onClick={handleImport}
              disabled={importing || !importUrl.trim()}
              className="flex items-center gap-2 bg-gold hover:bg-gold-dark disabled:opacity-50 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-150"
            >
              {importing ? (
                <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M6.5 1.5A5 5 0 1111.5 6.5" />
                </svg>
              ) : "Import"}
            </button>
            <button onClick={() => setShowImportForm(false)} className="px-3 py-2.5 text-ink-light hover:text-ink text-sm transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Sources panel */}
        <div className="bg-cream-panel border border-cream-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-cream-border">
            <h2 className="text-ink-light text-xs font-semibold uppercase tracking-widest">
              Knowledge Sources
            </h2>
          </div>
          <div className="divide-y divide-cream-border">
            {brainSources.map((src) => (
              <div key={src.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-cream-bg/50 transition-colors duration-100">
                <SourceIcon type={src.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-ink-mid text-xs font-medium truncate">{src.name}</p>
                  <p className="text-ink-light text-[11px] mt-0.5">
                    {src.status === "syncing" ? (
                      <span className="text-gold">Syncing…</span>
                    ) : (
                      `Synced ${src.synced}`
                    )}
                  </p>
                </div>
                <button
                  onClick={() => resyncSource(src.id)}
                  disabled={src.status === "syncing"}
                  className="text-ink-light text-[11px] hover:text-gold transition-colors shrink-0 mt-0.5 disabled:opacity-40"
                >
                  {src.status === "syncing" ? "…" : "Re-sync"}
                </button>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-cream-border">
            <button
              onClick={() => { setShowImportForm(true); setShowAddEntry(false); }}
              className="flex items-center gap-2 text-gold text-xs font-medium hover:text-gold-dark transition-colors duration-150"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M6 2v8M2 6h8" />
              </svg>
              Add source
            </button>
          </div>
        </div>

        {/* Attributes panel */}
        <div className="bg-cream-panel border border-cream-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-cream-border flex items-center justify-between">
            <h2 className="text-ink-light text-xs font-semibold uppercase tracking-widest">
              Brand Attributes
            </h2>
            <span className="text-ink-light text-xs">{brainEntries.length} entries</span>
          </div>

          <div className="divide-y divide-cream-border">
            {sections.map((section) => (
              <div key={section}>
                <div className="px-6 py-3 bg-cream-bg/50">
                  <span className="text-gold text-[11px] font-semibold uppercase tracking-widest">
                    {section}
                  </span>
                </div>
                <div className="px-6">
                  {brainEntries
                    .filter((e) => e.section === section)
                    .map((entry) => (
                      <EditableRow
                        key={entry.id}
                        entry={entry}
                        onSave={updateBrainEntry}
                        onDelete={deleteBrainEntry}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-cream-border bg-cream-bg/30 flex items-center justify-between gap-4">
            <p className="text-ink-light text-xs">
              Click any value to edit. Changes reflect instantly in compliance checks.
            </p>
            <button
              onClick={() => { setShowAddEntry(true); setShowImportForm(false); }}
              className="shrink-0 text-gold text-xs font-medium hover:text-gold-dark transition-colors flex items-center gap-1"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M6 2v8M2 6h8" />
              </svg>
              Add entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
