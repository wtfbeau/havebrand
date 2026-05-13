"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BlockCategory = "Headline" | "Elevator Pitch" | "Objection" | "Proof Point" | "CTA";
export type BlockStatus    = "Approved" | "Pending";
export type IssueSeverity  = "HIGH" | "MED" | "LOW";
export type IssueStatus    = "open" | "resolved" | "dismissed";

export interface BrainEntry {
  id: string;
  section: string;
  key: string;
  value: string;
}

export interface BrainSource {
  id: string;
  type: "url" | "doc" | "notion";
  name: string;
  synced: string;
  status: "active" | "syncing";
}

export interface LibraryBlock {
  id: string;
  category: BlockCategory;
  status: BlockStatus;
  content: string;
  secondary?: string;
  author: string;
  initials: string;
  authorColor: string;
}

export interface AuditIssue {
  id: string;
  page: string;
  issue: string;
  category: string;
  severity: IssueSeverity;
  status: IssueStatus;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  color: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

// ─── Initial data ─────────────────────────────────────────────────────────────

export const INITIAL_BRAIN: BrainEntry[] = [
  { id: "b1", section: "Audience", key: "ICP",            value: "B2B SaaS companies, 10–200 employees, Series A–C" },
  { id: "b2", section: "Audience", key: "Pain",           value: "Brand drift, AI-generated inconsistency, no source of truth" },
  { id: "b3", section: "Voice",    key: "Tone",           value: "Direct, authoritative, clear, no buzzwords" },
  { id: "b4", section: "Voice",    key: "Avoid",          value: "Supercharge, leverage, synergies, game-changing, revolutionary" },
  { id: "b5", section: "Claims",   key: "Proof",          value: "Reduce brand inconsistencies by 80% in 30 days" },
  { id: "b6", section: "Claims",   key: "Differentiator", value: "Only tool built specifically for AI-era brand governance" },
  { id: "b7", section: "Product",  key: "One-liner",      value: "HaveBrand keeps your brand sounding like you, even at AI scale." },
  { id: "b8", section: "Product",  key: "Category",       value: "Brand clarity and AI governance platform" },
];

export const INITIAL_SOURCES: BrainSource[] = [
  { id: "s1", type: "url",    name: "archform.io/about",   synced: "2 hours ago", status: "active" },
  { id: "s2", type: "doc",    name: "Brand Deck 2024.pdf", synced: "3 days ago",  status: "active" },
  { id: "s3", type: "notion", name: "ICP Document.notion", synced: "1 week ago",  status: "active" },
];

export const INITIAL_ISSUES: AuditIssue[] = [
  { id: "i1", page: "/homepage", issue: "Vague positioning statement",              category: "Messaging", severity: "HIGH", status: "open" },
  { id: "i2", page: "/homepage", issue: '"Supercharge", unsupported claim',        category: "Claims",    severity: "HIGH", status: "open" },
  { id: "i3", page: "/pricing",  issue: "Inconsistent tone (formal → casual)",      category: "Tone",      severity: "MED",  status: "open" },
  { id: "i4", page: "/pricing",  issue: "Missing social proof on tier 2",           category: "Claims",    severity: "MED",  status: "open" },
  { id: "i5", page: "/about",    issue: "Missing concrete proof points",            category: "Claims",    severity: "MED",  status: "open" },
  { id: "i6", page: "/about",    issue: "ICP not stated clearly",                   category: "Messaging", severity: "MED",  status: "open" },
  { id: "i7", page: "/blog",     issue: "Off-brand voice in intro paragraph",       category: "Tone",      severity: "LOW",  status: "open" },
  { id: "i8", page: "/blog",     issue: "CTA copy doesn't match Brain definition",  category: "CTAs",      severity: "LOW",  status: "open" },
];

export const INITIAL_BLOCKS: LibraryBlock[] = [
  { id: "h1",   category: "Headline",       status: "Approved", content: "Your brand. Every AI output.",                                                                                                                                                             author: "Mara Holt",   initials: "MH", authorColor: "#C44B5F" },
  { id: "h2",   category: "Headline",       status: "Approved", content: "Keep your brand sounding like you, at scale.",                                                                                                                                            author: "Mara Holt",   initials: "MH", authorColor: "#C44B5F" },
  { id: "h3",   category: "Headline",       status: "Approved", content: "AI made everyone a content creator. We make them a brand manager.",                                                                                                                       author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "h4",   category: "Headline",       status: "Pending",  content: "Brand clarity for the age of AI.",                                                                                                                                                        author: "Reza Tahir",  initials: "RT", authorColor: "#1A5C6A" },
  { id: "ep1",  category: "Elevator Pitch", status: "Approved", content: "HaveBrand gives teams one approved source of truth for every message, so your brand sounds consistent whether it's a sales deck, an AI email, or a founder tweet.",                      author: "Mara Holt",   initials: "MH", authorColor: "#C44B5F" },
  { id: "ep2",  category: "Elevator Pitch", status: "Approved", content: "We audit your positioning, encode your brand into an AI Brain, and check every piece of content, so the brand you built doesn't get lost in AI noise.",                                  author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "ep3",  category: "Elevator Pitch", status: "Pending",  content: "Think of us as the brand team you never had, except we work in real time.",                                                                                                              author: "Mara Holt",   initials: "MH", authorColor: "#C44B5F" },
  { id: "ob1",  category: "Objection",      status: "Approved", content: "We already have brand guidelines.",             secondary: "Guidelines in a PDF don't scale. HaveBrand makes them active, every AI asset gets checked, every time.",                      author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "ob2",  category: "Objection",      status: "Approved", content: "We don't have that problem yet.",               secondary: "You do, you just haven't caught it yet. Most teams find 4–6 brand inconsistencies in their first audit.",                     author: "Mara Holt",   initials: "MH", authorColor: "#C44B5F" },
  { id: "ob3",  category: "Objection",      status: "Approved", content: "Our team is small.",                            secondary: "Perfect. Brand drift compounds fastest in small teams using AI heavily. We set up in under a day.",                              author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "ob4",  category: "Objection",      status: "Approved", content: "Is this just a style guide?",                  secondary: "Not at all. Style guides describe. HaveBrand enforces.",                                                                         author: "Reza Tahir",  initials: "RT", authorColor: "#1A5C6A" },
  { id: "ob5",  category: "Objection",      status: "Pending",  content: "We use Notion for this.",                      secondary: "Notion holds the words. HaveBrand checks every asset against them, automatically.",                                               author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "pp1",  category: "Proof Point",    status: "Approved", content: "Reduce brand inconsistencies by 80% in 30 days.",                                                                                                                                          author: "Mara Holt",   initials: "MH", authorColor: "#C44B5F" },
  { id: "pp2",  category: "Proof Point",    status: "Approved", content: "120+ brand and marketing teams trust HaveBrand.",                                                                                                                                           author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "pp3",  category: "Proof Point",    status: "Approved", content: "Teams catch an average of 4.3 brand issues per audit in their first month.",                                                                                                               author: "Reza Tahir",  initials: "RT", authorColor: "#1A5C6A" },
  { id: "pp4",  category: "Proof Point",    status: "Approved", content: "Set up in under 60 minutes, imports from your existing docs and URLs.",                                                                                                                   author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "pp5",  category: "Proof Point",    status: "Approved", content: "Works with all major AI tools: ChatGPT, Claude, Gemini, Copilot.",                                                                                                                         author: "Reza Tahir",  initials: "RT", authorColor: "#1A5C6A" },
  { id: "pp6",  category: "Proof Point",    status: "Pending",  content: "Used by teams at Lumen AI, Archform, Stackwell, and Bravo Health.",                                                                                                                       author: "Mara Holt",   initials: "MH", authorColor: "#C44B5F" },
  { id: "cta1", category: "CTA",            status: "Approved", content: "Get early access",                                                                                                                                                                        author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "cta2", category: "CTA",            status: "Approved", content: "Start your free brand audit",                                                                                                                                                              author: "Mara Holt",   initials: "MH", authorColor: "#C44B5F" },
  { id: "cta3", category: "CTA",            status: "Approved", content: "See your clarity score",                                                                                                                                                                   author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "cta4", category: "CTA",            status: "Approved", content: "Build your Brand Brain",                                                                                                                                                                   author: "Reza Tahir",  initials: "RT", authorColor: "#1A5C6A" },
  { id: "cta5", category: "CTA",            status: "Pending",  content: "Check your content now",                                                                                                                                                                   author: "Jordan Park",  initials: "JP", authorColor: "#4A6B58" },
  { id: "cta6", category: "CTA",            status: "Approved", content: "Talk to the founders",                                                                                                                                                                     author: "Mara Holt",   initials: "MH", authorColor: "#C44B5F" },
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  { id: "a1", text: "Audit completed for archform.io",           time: "2 hours ago", color: "#C44B5F" },
  { id: "a2", text: "2 new issues flagged: /homepage, /pricing", time: "2 hours ago", color: "#D94F3D" },
  { id: "a3", text: "Jordan added 'Elevator pitch' to Library",  time: "Yesterday",   color: "#3D9A5C" },
  { id: "a4", text: "AI Brain updated with 3 new entries",       time: "Yesterday",   color: "#C44B5F" },
  { id: "a5", text: "Reza checked email copy, 1 flag",         time: "2 days ago",  color: "#E8A838" },
  { id: "a6", text: "Brand Setup completed",                     time: "1 week ago",  color: "#C44B5F" },
  { id: "a7", text: "First audit run",                           time: "1 week ago",  color: "#3D9A5C" },
];

// ─── Context definition ───────────────────────────────────────────────────────

interface DashboardCtxValue {
  // Brain
  brainEntries: BrainEntry[];
  brainSources: BrainSource[];
  updateBrainEntry: (id: string, value: string) => void;
  addBrainEntry: (entry: Omit<BrainEntry, "id">) => void;
  deleteBrainEntry: (id: string) => void;
  resyncSource: (id: string) => void;
  addSource: (name: string, type: BrainSource["type"]) => void;

  // Library
  blocks: LibraryBlock[];
  addBlock: (block: Omit<LibraryBlock, "id">) => void;
  updateBlock: (id: string, updates: Partial<LibraryBlock>) => void;
  deleteBlock: (id: string) => void;
  approveBlock: (id: string) => void;

  // Audit
  issues: AuditIssue[];
  resolveIssue: (id: string) => void;
  dismissIssue: (id: string) => void;
  reopenIssue: (id: string) => void;
  runAudit: () => void;
  auditRunning: boolean;

  // Activity
  activity: ActivityItem[];
  addActivity: (text: string, color: string) => void;

  // Toast
  toasts: ToastItem[];
  toast: (message: string, type?: ToastItem["type"]) => void;
  removeToast: (id: string) => void;
}

const DashboardCtx = createContext<DashboardCtxValue | null>(null);

export function useDashboard() {
  const ctx = useContext(DashboardCtx);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}

// ─── Toast renderer (internal) ───────────────────────────────────────────────

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  const icons = {
    success: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#3D9A5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 7l3.5 3.5L12 3" />
      </svg>
    ),
    error: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#D94F3D" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M3 3l8 8M11 3l-8 8" />
      </svg>
    ),
    info: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C44B5F" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" /><path d="M7 5v2.5M7 9h.01" />
      </svg>
    ),
  };

  const bg = { success: "rgba(61,154,92,0.12)", error: "rgba(217,79,61,0.12)", info: "rgba(196,75,95,0.12)" };
  const border = { success: "rgba(61,154,92,0.25)", error: "rgba(217,79,61,0.25)", info: "rgba(196,75,95,0.25)" };

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm"
          style={{
            backgroundColor: bg[t.type],
            borderColor: border[t.type],
            animation: "fadeUp 0.25s cubic-bezier(0.22,1,0.36,1)",
            minWidth: 240,
            maxWidth: 360,
          }}
        >
          <span className="shrink-0">{icons[t.type]}</span>
          <p className="text-ink text-sm flex-1 leading-snug">{t.message}</p>
          <button
            onClick={() => onRemove(t.id)}
            className="shrink-0 text-ink-light hover:text-ink transition-colors"
            aria-label="Dismiss"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [brainEntries, setBrainEntries] = useState<BrainEntry[]>(INITIAL_BRAIN);
  const [brainSources, setBrainSources] = useState<BrainSource[]>(INITIAL_SOURCES);
  const [blocks, setBlocks] = useState<LibraryBlock[]>(INITIAL_BLOCKS);
  const [issues, setIssues] = useState<AuditIssue[]>(INITIAL_ISSUES);
  const [activity, setActivity] = useState<ActivityItem[]>(INITIAL_ACTIVITY);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [auditRunning, setAuditRunning] = useState(false);

  const addActivity = useCallback((text: string, color: string) => {
    const item: ActivityItem = { id: Date.now().toString(), text, time: "Just now", color };
    setActivity((prev) => [item, ...prev.slice(0, 19)]);
  }, []);

  const toast = useCallback((message: string, type: ToastItem["type"] = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3500);
    return () => clearTimeout(timer);
  }, [toasts]);

  // Brain
  const updateBrainEntry = useCallback((id: string, value: string) => {
    setBrainEntries((prev) => prev.map((e) => (e.id === id ? { ...e, value } : e)));
    addActivity("AI Brain entry updated", "#C44B5F");
    toast("Entry saved");
  }, [addActivity, toast]);

  const addBrainEntry = useCallback((entry: Omit<BrainEntry, "id">) => {
    setBrainEntries((prev) => [...prev, { ...entry, id: `b${Date.now()}` }]);
    addActivity(`AI Brain: "${entry.key}" added to ${entry.section}`, "#C44B5F");
    toast("Entry added to Brain");
  }, [addActivity, toast]);

  const deleteBrainEntry = useCallback((id: string) => {
    setBrainEntries((prev) => prev.filter((e) => e.id !== id));
    toast("Entry removed", "info");
  }, [toast]);

  const resyncSource = useCallback((id: string) => {
    setBrainSources((prev) => prev.map((s) => s.id === id ? { ...s, status: "syncing" } : s));
    setTimeout(() => {
      setBrainSources((prev) => prev.map((s) => s.id === id ? { ...s, status: "active", synced: "just now" } : s));
      toast("Source re-synced");
      addActivity("AI Brain source re-synced", "#C44B5F");
    }, 1800);
  }, [toast, addActivity]);

  const addSource = useCallback((name: string, type: BrainSource["type"]) => {
    setBrainSources((prev) => [{ id: `s${Date.now()}`, type, name, synced: "just now", status: "active" }, ...prev]);
    addActivity(`Brain source imported: ${name}`, "#C44B5F");
    toast("Source imported successfully");
  }, [addActivity, toast]);

  // Library
  const addBlock = useCallback((block: Omit<LibraryBlock, "id">) => {
    setBlocks((prev) => [{ ...block, id: `blk${Date.now()}` }, ...prev]);
    addActivity(`${block.author.split(" ")[0]} added "${block.content.slice(0, 40)}…" to Library`, "#3D9A5C");
    toast("Block added to Library");
  }, [addActivity, toast]);

  const updateBlock = useCallback((id: string, updates: Partial<LibraryBlock>) => {
    setBlocks((prev) => prev.map((b) => b.id === id ? { ...b, ...updates } : b));
    toast("Block updated");
  }, [toast]);

  const deleteBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    toast("Block deleted", "info");
  }, [toast]);

  const approveBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.map((b) => b.id === id ? { ...b, status: "Approved" } : b));
    addActivity("Library block approved", "#3D9A5C");
    toast("Block approved");
  }, [addActivity, toast]);

  // Audit
  const resolveIssue = useCallback((id: string) => {
    const issue = issues.find((i) => i.id === id);
    setIssues((prev) => prev.map((i) => i.id === id ? { ...i, status: "resolved" } : i));
    addActivity(`Issue resolved: "${issue?.issue.slice(0, 40)}"`, "#3D9A5C");
    toast("Issue marked as resolved");
  }, [issues, addActivity, toast]);

  const dismissIssue = useCallback((id: string) => {
    setIssues((prev) => prev.map((i) => i.id === id ? { ...i, status: "dismissed" } : i));
    toast("Issue dismissed", "info");
  }, [toast]);

  const reopenIssue = useCallback((id: string) => {
    setIssues((prev) => prev.map((i) => i.id === id ? { ...i, status: "open" } : i));
    toast("Issue reopened", "info");
  }, [toast]);

  const runAudit = useCallback(() => {
    setAuditRunning(true);
    setTimeout(() => {
      setAuditRunning(false);
      addActivity("Audit re-run completed for archform.io", "#C44B5F");
      toast("Audit complete, 8 issues found");
    }, 2400);
  }, [addActivity, toast]);

  const value: DashboardCtxValue = {
    brainEntries, brainSources,
    updateBrainEntry, addBrainEntry, deleteBrainEntry, resyncSource, addSource,
    blocks, addBlock, updateBlock, deleteBlock, approveBlock,
    issues, resolveIssue, dismissIssue, reopenIssue, runAudit, auditRunning,
    activity, addActivity,
    toasts, toast, removeToast,
  };

  return (
    <DashboardCtx.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </DashboardCtx.Provider>
  );
}
