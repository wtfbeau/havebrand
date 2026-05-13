"use client";

import { useState } from "react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

interface Integration {
  name: string;
  description: string;
  connected: boolean;
}

const INITIAL_INTEGRATIONS: Integration[] = [
  { name: "Notion",      description: "Import brand docs and knowledge bases directly", connected: true  },
  { name: "Slack",       description: "Get flagged copy alerts in your workspace",       connected: true  },
  { name: "HubSpot",     description: "Check CRM email templates against your Brain",   connected: false },
  { name: "Salesforce",  description: "Sync brand-approved messaging to CRM sequences", connected: false },
];

const TEAM = [
  { name: "Mara Holt",  role: "Admin",  initials: "MH", color: "#C44B5F", email: "mara@archform.io"   },
  { name: "Reza Tahir", role: "Editor", initials: "RT", color: "#1A5C6A", email: "reza@archform.io"   },
  { name: "Jordan Park", role: "Viewer", initials: "JP", color: "#4A6B58", email: "jordan@archform.io" },
];

const ROLE_COLORS: Record<string, string> = {
  Admin:  "rgba(196,75,95,0.15)",
  Editor: "rgba(61,154,92,0.12)",
  Viewer: "rgba(107,99,88,0.10)",
};
const ROLE_TEXT: Record<string, string> = {
  Admin:  "#8B2337",
  Editor: "#2D7A4A",
  Viewer: "#5A5248",
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 transition-colors duration-200 focus:outline-none"
      style={{
        backgroundColor: checked ? "#C44B5F" : "transparent",
        borderColor: checked ? "#C44B5F" : "#D5CCC0",
      }}
    >
      <span
        className="pointer-events-none block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: checked ? "translateX(16px)" : "translateX(1px)", marginTop: "1px" }}
      />
    </button>
  );
}

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="bg-cream-panel border border-cream-border rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-cream-border">
        <h2 className="text-ink font-semibold text-base">{title}</h2>
        {description && <p className="text-ink-light text-sm mt-0.5">{description}</p>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  const { toast } = useDashboard();

  // Brand profile
  const [brandName, setBrandName] = useState("Archform");
  const [website, setWebsite] = useState("archform.io");
  const [industry, setIndustry] = useState("B2B SaaS / Brand Technology");
  const [saving, setSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Integrations
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);

  // Notifications
  const [notifs, setNotifs] = useState({
    auditEmail:    true,
    weeklyDigest:  true,
    slackAlerts:   false,
    newIssueAlert: true,
  });

  // Danger zone
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveBrand = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setProfileSaved(true);
      toast("Brand profile updated");
      setTimeout(() => setProfileSaved(false), 2500);
    }, 900);
  };

  const toggleIntegration = (name: string) => {
    const current = integrations.find((i) => i.name === name);
    setIntegrations((prev) => prev.map((i) => i.name === name ? { ...i, connected: !i.connected } : i));
    toast(current?.connected ? `${name} disconnected` : `${name} connected`, current?.connected ? "info" : "success");
  };

  const handleInvite = () => {
    toast("Invite link copied to clipboard", "info");
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl text-ink mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
          Settings
        </h1>
        <p className="text-ink-light text-sm">
          Manage your brand workspace, team, and integrations.
        </p>
      </div>

      {/* Brand Profile */}
      <SectionCard title="Brand Profile" description="How your workspace is identified across HaveBrand.">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink-light mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-cream-bg border border-cream-border rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink-light mb-1.5">
                Website
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-cream-bg border border-cream-border rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink-light mb-1.5">
              Industry / Category
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-cream-bg border border-cream-border rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            {profileSaved && (
              <span className="text-[#3D9A5C] text-sm font-medium">Saved ✓</span>
            )}
            <button
              onClick={handleSaveBrand}
              disabled={saving}
              className="flex items-center gap-2 bg-gold hover:bg-gold-dark disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              {saving ? (
                <>
                  <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M6.5 1.5A5 5 0 1111.5 6.5" />
                  </svg>
                  Saving…
                </>
              ) : "Save changes"}
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Team */}
      <SectionCard title="Team" description="Members with access to this workspace.">
        <div className="space-y-1 -mx-1">
          {TEAM.map((member) => (
            <div
              key={member.email}
              className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-cream-bg/60 transition-colors duration-100"
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                style={{ backgroundColor: member.color }}
              >
                {member.initials}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-ink text-sm font-medium">{member.name}</p>
                <p className="text-ink-light text-xs">{member.email}</p>
              </div>
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: ROLE_COLORS[member.role], color: ROLE_TEXT[member.role] }}
              >
                {member.role}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-cream-border">
          <button
            onClick={handleInvite}
            className="flex items-center gap-2 text-gold text-sm font-medium hover:text-gold-dark transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6.5 2v9M2 6.5h9" />
            </svg>
            Invite team member
          </button>
        </div>
      </SectionCard>

      {/* Integrations */}
      <SectionCard title="Integrations" description="Connect external tools to your Brand Brain.">
        <div className="space-y-1 -mx-1">
          {integrations.map((int) => (
            <div
              key={int.name}
              className="flex items-center gap-4 px-3 py-4 rounded-lg hover:bg-cream-bg/60 transition-colors duration-100"
            >
              <div className="w-9 h-9 rounded-lg border border-cream-border bg-cream-bg flex items-center justify-center shrink-0">
                <span className="text-ink-mid text-xs font-semibold" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  {int.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-ink text-sm font-medium">{int.name}</p>
                <p className="text-ink-light text-xs leading-relaxed">{int.description}</p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs" style={{ color: int.connected ? "#3D9A5C" : "#A89F93" }}>
                  {int.connected ? "Connected" : "Not connected"}
                </span>
                <Toggle checked={int.connected} onChange={() => toggleIntegration(int.name)} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard title="Notifications" description="Choose when and how you hear about brand activity.">
        <div className="space-y-5">
          {[
            { key: "auditEmail"    as const, label: "Audit complete",        description: "Email me when a brand audit finishes" },
            { key: "weeklyDigest"  as const, label: "Weekly digest",         description: "A summary of brand health every Monday" },
            { key: "slackAlerts"   as const, label: "Slack alerts",          description: "Post flagged content to your Slack channel" },
            { key: "newIssueAlert" as const, label: "New issue detected",    description: "Notify me when a new high-severity issue is found" },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-ink text-sm font-medium">{label}</p>
                <p className="text-ink-light text-xs">{description}</p>
              </div>
              <Toggle
                checked={notifs[key]}
                onChange={(v) => {
                  setNotifs((prev) => ({ ...prev, [key]: v }));
                  toast(v ? `${label} notifications enabled` : `${label} notifications disabled`, "info");
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Danger Zone */}
      <section className="border border-[rgba(217,79,61,0.25)] rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[rgba(217,79,61,0.15)]" style={{ backgroundColor: "rgba(217,79,61,0.04)" }}>
          <h2 className="text-[#C0341D] font-semibold text-base">Danger Zone</h2>
          <p className="text-[#C0341D]/70 text-sm mt-0.5">These actions are irreversible. Proceed with caution.</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-ink text-sm font-medium">Reset all data</p>
              <p className="text-ink-light text-xs">Clears all Brain entries, Library blocks, and Audit issues. Cannot be undone.</p>
            </div>
            {showResetConfirm ? (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { setShowResetConfirm(false); toast("Reset cancelled", "info"); }}
                  className="text-ink-mid text-sm hover:text-ink transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setShowResetConfirm(false); toast("Workspace data reset", "info"); }}
                  className="px-4 py-2 rounded-full text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: "#D94F3D" }}
                >
                  Yes, reset
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                style={{ color: "#D94F3D", borderColor: "rgba(217,79,61,0.3)", backgroundColor: "rgba(217,79,61,0.05)" }}
              >
                Reset data
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-cream-border">
            <div>
              <p className="text-ink text-sm font-medium">Delete workspace</p>
              <p className="text-ink-light text-xs">Permanently deletes this workspace and all associated data.</p>
            </div>
            <button
              onClick={() => toast("Contact support to delete your workspace", "info")}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
              style={{ color: "#D94F3D", borderColor: "rgba(217,79,61,0.3)", backgroundColor: "rgba(217,79,61,0.05)" }}
            >
              Delete workspace
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
