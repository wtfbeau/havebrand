"use client";

import { useEffect, useState } from "react";

type Phase = "warning" | "scanning" | "approved";

// Symmetric layout: 3 cards left, 3 cards right, brain in center.
// Vertical positions: 8 / 42 / 76, middle row aligns with brain (50%), equal ~17% gaps between rows.
// SVG y anchors match card centers: top≈16, middle≈50, bottom≈84.
const ASSETS = [
  // ── Left column ──
  {
    id: "homepage",
    label: "Homepage",
    type: "Web copy",
    badCopy: '"Supercharge growth with AI synergies"',
    goodCopy: '"Brand clarity for B2B SaaS teams"',
    warning: "Unclear ICP",
    severity: "HIGH" as const,
    top: "8%",
    left: "2%",
    svgFrom: [10, 16] as [number, number],
    delay: 0.08,
    driftDur: 3.4,
    driftDelay: 0,
  },
  {
    id: "pricing",
    label: "Pricing Page",
    type: "Web copy",
    badCopy: '"Transform your workflow today"',
    goodCopy: '"Simple pricing for brand teams"',
    warning: "Tone mismatch",
    severity: "MED" as const,
    top: "42%",
    left: "2%",
    svgFrom: [10, 50] as [number, number],
    delay: 0.22,
    driftDur: 2.8,
    driftDelay: 1.2,
  },
  {
    id: "chatgpt",
    label: "ChatGPT Draft",
    type: "AI output",
    badCopy: '"All-in-one AI-powered platform"',
    goodCopy: '"Every AI output, on-brand"',
    warning: "Off-brand",
    severity: "HIGH" as const,
    top: "76%",
    left: "2%",
    svgFrom: [10, 84] as [number, number],
    delay: 0.36,
    driftDur: 3.9,
    driftDelay: 0.7,
  },
  // ── Right column ──
  {
    id: "email",
    label: "Email Campaign",
    type: "AI output",
    badCopy: '"Next-gen solutions for all your needs"',
    goodCopy: '"Precise, on-brand in every send"',
    warning: "Vague claim",
    severity: "HIGH" as const,
    top: "8%",
    left: "79%",
    svgFrom: [88, 16] as [number, number],
    delay: 0.14,
    driftDur: 3.1,
    driftDelay: 0.4,
  },
  {
    id: "salesdeck",
    label: "Sales Deck",
    type: "Deck",
    badCopy: '"We revolutionize how teams work"',
    goodCopy: '"Consistent narrative, every slide"',
    warning: "Old positioning",
    severity: "MED" as const,
    top: "42%",
    left: "79%",
    svgFrom: [88, 50] as [number, number],
    delay: 0.28,
    driftDur: 3.6,
    driftDelay: 1.8,
  },
  {
    id: "linkedin",
    label: "LinkedIn Post",
    type: "Social",
    badCopy: '"Empowering teams everywhere"',
    goodCopy: '"Say exactly what you mean"',
    warning: "Wrong tone",
    severity: "MED" as const,
    top: "76%",
    left: "79%",
    svgFrom: [88, 84] as [number, number],
    delay: 0.42,
    driftDur: 3.3,
    driftDelay: 0.9,
  },
];

const SEV_COLOR = { HIGH: "#EF4444", MED: "#F59E0B" };

const BRAIN_RULES = [
  "No vague AI claims",
  "B2B SaaS ICP only",
  "Direct, clear tone",
  "Proof points only",
];

interface BrandDriftMapProps {
  layout?: "standalone" | "column";
}

export default function BrandDriftMap({ layout = "standalone" }: BrandDriftMapProps) {
  const [phase, setPhase] = useState<Phase>("warning");
  const [linesVisible, setLinesVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function cycle() {
      setPhase("warning");
      setLinesVisible(false);
      setApprovedIds(new Set());

      // Lines draw in quickly, assets are already connected to brain
      timers.push(setTimeout(() => setLinesVisible(true), 800));
      // Brain activates: scanning begins
      timers.push(setTimeout(() => setPhase("scanning"), 3200));
      // Scanning complete: start approving cards
      timers.push(setTimeout(() => setPhase("approved"), 5500));
      // Stagger individual card approvals 260ms apart
      ASSETS.forEach((asset, i) => {
        timers.push(
          setTimeout(() => {
            setApprovedIds((prev) => new Set([...prev, asset.id]));
          }, 5600 + i * 260)
        );
      });

      timers.push(setTimeout(cycle, 11000));
    }

    // Delay cards and cycle start so hero copy has time to land before warning state appears
    const initId = setTimeout(() => {
      setMounted(true);
      cycle();
    }, 1200);

    return () => {
      clearTimeout(initId);
      timers.forEach(clearTimeout);
    };
  }, []);

  const isWarning = phase === "warning";
  const isScanning = phase === "scanning";
  const isAllApproved = approvedIds.size === ASSETS.length;
  const isCardApproved = (id: string) => approvedIds.has(id);
  // Brain continues its scan animation until every card has been approved
  const isBrainScanning = isScanning || (phase === "approved" && !isAllApproved);

  const isRightCard = (left: string) => parseFloat(left) > 50;
  const cardLeft = (left: string) =>
    layout === "column" && isRightCard(left) ? "70%" : left;
  const cardWidth = () => (layout === "column" ? 164 : 182);
  // Column mode: left card centers at ~15%, right card centers at ~83%
  const svgFromX = (x: number) =>
    layout === "column" ? (x > 50 ? 83 : 15) : x;

  return (
    <div className={layout === "column" ? "flex flex-col flex-1 min-h-0 w-full" : "w-full mt-6"}>
      {/* ──────────────────────────────────────────────────────
          Desktop layout
      ────────────────────────────────────────────────────── */}
      <div className={layout === "column" ? "hidden lg:flex flex-col flex-1 min-h-0" : "hidden md:block"}>
        {/* Live status strip */}
        <div className={`flex items-center gap-3 flex-none ${layout === "column" ? "justify-end mb-2 pr-1" : "justify-center pb-5"}`}>
          <div
            className="flex items-center gap-3 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  backgroundColor: isAllApproved
                    ? "#C44B5F"
                    : isScanning
                    ? "#F59E0B"
                    : "#EF4444",
                  boxShadow: `0 0 6px ${isAllApproved ? "rgba(196,75,95,0.7)" : isScanning ? "rgba(245,158,11,0.7)" : "rgba(239,68,68,0.7)"}`,
                  animation: isWarning
                    ? "pulse 1.8s ease-in-out infinite"
                    : undefined,
                  transition: "background-color 0.5s ease",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isAllApproved
                    ? "rgba(232,213,163,0.7)"
                    : "rgba(255,255,255,0.35)",
                  transition: "color 0.5s ease",
                }}
              >
                {isAllApproved
                  ? "Brand consistency restored"
                  : isScanning
                  ? "Auditing assets..."
                  : "Brand drift detected"}
              </span>
            </div>
            <div
              style={{
                width: "1px",
                height: "10px",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              6 assets · 4 channels
            </span>
          </div>
        </div>

        {/* Dark canvas */}
        <div
          style={{
            backgroundColor: layout === "column" ? "transparent" : "#1C1814",
            ...(layout === "column"
              ? { flex: 1, minHeight: 0 }
              : { height: "520px" }),
            position: "relative",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Dot grid, standalone only */}
          {layout === "standalone" && (
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(196,75,95,0.13) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          )}

          {/* Ambient glow at center */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none rounded-full"
            style={{
              top: "50%",
              left: "50%",
              width: "380px",
              height: "380px",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(196,75,95,0.16) 0%, transparent 68%)",
              opacity: isAllApproved ? 1 : isScanning ? 0.8 : 0.35,
              transition: "opacity 1.2s ease",
              animation: isBrainScanning
                ? "brainGlow 1.6s ease-in-out infinite"
                : undefined,
            }}
          />

          {/* Scan rings, scanning phase only; backwards fill-mode keeps delayed rings centered */}
          {isScanning &&
            [0, 0.55, 1.1, 1.65].map((delay, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="absolute pointer-events-none rounded-full border"
                style={{
                  top: "50%",
                  left: "50%",
                  width: "180px",
                  height: "180px",
                  borderColor: "rgba(196,75,95,0.3)",
                  animation: `expandRing 2.6s ease-out ${delay}s infinite backwards`,
                }}
              />
            ))}

          {/* Scan line, scanning phase only */}
          {isScanning && (
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(196,75,95,0.35) 15%, rgba(255,220,110,0.9) 50%, rgba(196,75,95,0.35) 85%, transparent 100%)",
                boxShadow: "0 0 18px 4px rgba(196,75,95,0.3)",
                animation: "scanLine 2s ease-in-out 0.2s both",
              }}
            />
          )}

          {/* SVG connector lines, shown in both standalone and column layouts */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
            style={{ zIndex: 1 }}
          >
            {ASSETS.map((a, i) => {
              const cardApproved = isCardApproved(a.id);
              const fromX = svgFromX(a.svgFrom[0]);
              return (
                <line
                  key={a.id}
                  x1={fromX}
                  y1={a.svgFrom[1]}
                  x2={50}
                  y2={50}
                  stroke={cardApproved ? "rgba(196,75,95,0.22)" : "rgba(196,75,95,0.18)"}
                  strokeWidth={layout === "column" ? "0.4" : "0.3"}
                  strokeLinecap="round"
                  strokeDasharray={isScanning ? "1.5 3" : cardApproved ? undefined : "2 5"}
                  style={{
                    opacity: linesVisible ? 1 : 0,
                    transition: "opacity 0.5s ease, stroke 0.8s ease",
                    animation: linesVisible
                      ? isScanning
                        ? `flowDash 1.4s linear ${i * 0.1}s infinite`
                        : `drawConnector 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both`
                      : undefined,
                  }}
                />
              );
            })}
          </svg>

          {/* ── Asset cards ── */}
          {mounted &&
            ASSETS.map((a) => {
              const sc = SEV_COLOR[a.severity];
              const cLeft = cardLeft(a.left);
              const cWidth = cardWidth();
              const cardApproved = isCardApproved(a.id);
              return (
                <div
                  key={a.id}
                  className="absolute"
                  style={{ top: a.top, left: cLeft, zIndex: 2 }}
                >
                  <div
                    style={{
                      animation: `fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) ${a.delay}s both`,
                    }}
                  >
                    <div
                      style={{
                        width: `${cWidth}px`,
                        background: cardApproved
                          ? "rgba(20,15,8,0.97)"
                          : "rgba(12,10,8,0.92)",
                        border: `1px solid ${cardApproved ? "rgba(196,75,95,0.3)" : "rgba(255,255,255,0.08)"}`,
                        borderRadius: "10px",
                        backdropFilter: "blur(10px)",
                        boxShadow: cardApproved
                          ? "0 0 18px rgba(196,75,95,0.1), 0 4px 18px rgba(0,0,0,0.55)"
                          : "0 4px 18px rgba(0,0,0,0.55)",
                        transition: "background 0.8s ease, border-color 0.8s ease, box-shadow 0.8s ease",
                        overflow: "hidden",
                      }}
                    >
                      {/* Severity accent strip */}
                      <div
                        style={{
                          height: "3px",
                          backgroundColor: cardApproved ? "#C44B5F" : sc,
                          opacity: cardApproved ? 0.7 : 0.85,
                          transition: "background-color 0.8s ease",
                        }}
                      />

                      <div style={{ padding: "8px 10px 9px" }}>
                        {/* Asset name + channel type */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-inter)",
                              fontSize: "11.5px",
                              fontWeight: 600,
                              color: cardApproved ? "rgba(232,213,163,0.95)" : "rgba(255,255,255,0.88)",
                              transition: "color 0.6s ease",
                              lineHeight: 1,
                            }}
                          >
                            {a.label}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-jetbrains)",
                              fontSize: "7px",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: cardApproved ? "rgba(196,75,95,0.45)" : "rgba(255,255,255,0.18)",
                              transition: "color 0.6s ease",
                              flexShrink: 0,
                              marginLeft: "4px",
                            }}
                          >
                            {a.type}
                          </span>
                        </div>

                        {/* Actual copy, cross-fades bad → good */}
                        <div
                          style={{
                            position: "relative",
                            height: "14px",
                            marginBottom: "7px",
                            overflow: "hidden",
                          }}
                        >
                          <p
                            style={{
                              position: "absolute",
                              inset: 0,
                              fontFamily: "var(--font-inter)",
                              fontSize: "9px",
                              fontStyle: "italic",
                              color: "rgba(255,255,255,0.28)",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              lineHeight: "14px",
                              margin: 0,
                              opacity: cardApproved ? 0 : 1,
                              transition: "opacity 0.45s ease",
                            }}
                          >
                            {a.badCopy}
                          </p>
                          <p
                            style={{
                              position: "absolute",
                              inset: 0,
                              fontFamily: "var(--font-inter)",
                              fontSize: "9px",
                              fontStyle: "italic",
                              color: "rgba(196,75,95,0.65)",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              lineHeight: "14px",
                              margin: 0,
                              opacity: cardApproved ? 1 : 0,
                              transition: "opacity 0.45s ease 0.25s",
                            }}
                          >
                            {a.goodCopy}
                          </p>
                        </div>

                        {/* Status row */}
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          {cardApproved ? (
                            <>
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                                <circle cx="5" cy="5" r="4.5" stroke="#C44B5F" strokeWidth="1" />
                                <path d="M2.5 5l1.7 1.7L7.5 3" stroke="#C44B5F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span
                                style={{
                                  fontFamily: "var(--font-inter)",
                                  fontSize: "10.5px",
                                  fontWeight: 600,
                                  color: "#C44B5F",
                                }}
                              >
                                On-brand
                              </span>
                            </>
                          ) : (
                            <>
                              <span
                                style={{
                                  width: "5px",
                                  height: "5px",
                                  borderRadius: "50%",
                                  backgroundColor: sc,
                                  boxShadow: `0 0 5px ${sc}99`,
                                  flexShrink: 0,
                                  display: "inline-block",
                                  animation: isScanning ? "pulse 0.8s ease-in-out infinite" : undefined,
                                }}
                              />
                              <span
                                style={{
                                  fontFamily: "var(--font-inter)",
                                  fontSize: "10.5px",
                                  fontWeight: 600,
                                  color: isScanning ? "rgba(255,255,255,0.5)" : sc,
                                  flex: 1,
                                  transition: "color 0.4s ease",
                                }}
                              >
                                {a.warning}
                              </span>
                              <span
                                style={{
                                  fontFamily: "var(--font-jetbrains)",
                                  fontSize: "7.5px",
                                  fontWeight: 700,
                                  letterSpacing: "0.08em",
                                  textTransform: "uppercase",
                                  color: `${sc}bb`,
                                  flexShrink: 0,
                                }}
                              >
                                {a.severity}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* ── HaveBrand Brain card, center ── */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: layout === "column" ? "196px" : "236px",
              background: isAllApproved
                ? "rgba(196,75,95,0.1)"
                : "rgba(15,12,10,0.94)",
              border: `1px solid ${isAllApproved ? "rgba(196,75,95,0.55)" : isBrainScanning ? "rgba(196,75,95,0.3)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "16px",
              backdropFilter: "blur(20px)",
              boxShadow: isAllApproved
                ? "0 0 56px rgba(196,75,95,0.2), 0 0 0 1px rgba(196,75,95,0.12), 0 12px 40px rgba(0,0,0,0.7)"
                : "0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
              transition: "background 0.9s ease, border-color 0.9s ease, box-shadow 0.9s ease",
              animation: isBrainScanning ? "scanPulse 1.8s ease-in-out infinite" : undefined,
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            {/* Brain header */}
            <div
              style={{
                padding: "12px 14px 10px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              <span
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  backgroundColor: isAllApproved ? "#C44B5F" : isBrainScanning ? "#F59E0B" : "rgba(255,255,255,0.2)",
                  boxShadow: isAllApproved
                    ? "0 0 12px rgba(196,75,95,0.9)"
                    : isBrainScanning
                    ? "0 0 12px rgba(245,158,11,0.9)"
                    : "none",
                  flexShrink: 0,
                  display: "inline-block",
                  transition: "background-color 0.5s ease, box-shadow 0.5s ease",
                  animation: isBrainScanning ? "pulse 0.9s ease-in-out infinite" : undefined,
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: isAllApproved ? "#EDA0AE" : "rgba(255,255,255,0.85)",
                    lineHeight: 1,
                    transition: "color 0.5s ease",
                  }}
                >
                  HaveBrand Brain
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "8px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "3px",
                    color: isAllApproved ? "rgba(196,75,95,0.7)" : "rgba(255,255,255,0.22)",
                    transition: "color 0.5s ease",
                  }}
                >
                  {isAllApproved ? "All assets aligned" : isBrainScanning ? "Scanning..." : "Rules active"}
                </p>
              </div>
            </div>

            {/* Brand rules */}
            <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {BRAIN_RULES.map((rule, i) => (
                <div
                  key={rule}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    marginBottom: i < BRAIN_RULES.length - 1 ? "7px" : 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "9px",
                      color: isAllApproved ? "#C44B5F" : "rgba(255,255,255,0.25)",
                      flexShrink: 0,
                      transition: "color 0.6s ease",
                    }}
                  >
                    {isAllApproved ? "✓" : "·"}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "10.5px",
                      color: isAllApproved ? "rgba(232,213,163,0.85)" : "rgba(255,255,255,0.5)",
                      lineHeight: 1.3,
                      transition: "color 0.6s ease",
                    }}
                  >
                    {rule}
                  </span>
                </div>
              ))}
            </div>

            {/* Status footer */}
            <div style={{ padding: "9px 14px" }}>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isAllApproved ? "#C44B5F" : isBrainScanning ? "#F59E0B" : "#EF4444",
                  transition: "color 0.5s ease",
                }}
              >
                {isAllApproved
                  ? "✓  6 / 6 assets verified"
                  : isBrainScanning
                  ? "⟳  Auditing 6 assets..."
                  : "⚠  6 issues detected"}
              </span>
            </div>
          </div>

          {/* Edge fades, standalone only */}
          {layout === "standalone" && (
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 88% 88% at 50% 50%, transparent 58%, #1C1814 100%)" }} />
          )}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────
          Mobile layout
      ────────────────────────────────────────────────────── */}
      <div
        className="md:hidden px-5 pt-8 pb-10"
        style={{ backgroundColor: "#1C1814" }}
      >
        {/* Brain card */}
        <div
          style={{
            borderRadius: "14px",
            border: `1px solid ${isAllApproved ? "rgba(196,75,95,0.45)" : "rgba(196,75,95,0.25)"}`,
            background: isAllApproved ? "rgba(196,75,95,0.07)" : "rgba(255,255,255,0.03)",
            padding: "14px",
            marginBottom: "16px",
            transition: "background 0.7s ease, border-color 0.7s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: isAllApproved ? "#C44B5F" : isScanning ? "#F59E0B" : "#EF4444",
                boxShadow: `0 0 8px ${isAllApproved ? "rgba(196,75,95,0.8)" : isScanning ? "rgba(245,158,11,0.8)" : "rgba(239,68,68,0.7)"}`,
                display: "inline-block",
                flexShrink: 0,
                animation: isWarning ? "pulse 1.8s ease-in-out infinite" : undefined,
                transition: "background-color 0.5s ease",
              }}
            />
            <div>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isAllApproved ? "#EDA0AE" : "rgba(255,255,255,0.8)",
                  transition: "color 0.5s ease",
                  display: "block",
                }}
              >
                HaveBrand Brain
              </span>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "8px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "2px",
                  color: isAllApproved ? "rgba(196,75,95,0.7)" : "rgba(255,255,255,0.25)",
                  transition: "color 0.5s ease",
                  display: "block",
                }}
              >
                {isAllApproved ? "All assets aligned" : isScanning ? "Scanning..." : "Rules active"}
              </span>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "10px",
            }}
          >
            {BRAIN_RULES.map((rule) => (
              <div
                key={rule}
                style={{
                  display: "flex",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "9px",
                    color: isAllApproved ? "#C44B5F" : "rgba(196,75,95,0.6)",
                    flexShrink: 0,
                    marginTop: "1px",
                    transition: "color 0.5s ease",
                  }}
                >
                  {isAllApproved ? "✓" : "→"}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    color: isAllApproved ? "rgba(232,213,163,0.85)" : "rgba(255,255,255,0.5)",
                    transition: "color 0.6s ease",
                  }}
                >
                  {rule}
                </span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "8px", marginTop: "8px" }}>
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: isAllApproved ? "#C44B5F" : isScanning ? "#F59E0B" : "#EF4444",
                transition: "color 0.5s ease",
              }}
            >
              {isAllApproved ? "✓  6 / 6 assets verified" : isScanning ? "⟳  Auditing 6 assets..." : "⚠  6 issues detected"}
            </span>
          </div>
        </div>

        {/* Asset cards 2-col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {ASSETS.map((a) => {
            const sc = SEV_COLOR[a.severity];
            const cardApproved = isCardApproved(a.id);
            return (
              <div
                key={a.id}
                style={{
                  borderRadius: "10px",
                  background: cardApproved ? "rgba(196,75,95,0.06)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${cardApproved ? "rgba(196,75,95,0.2)" : "rgba(255,255,255,0.07)"}`,
                  borderLeft: `3px solid ${cardApproved ? "#C44B5F" : sc}`,
                  padding: "10px 10px 10px 9px",
                  transition: "background 0.7s ease, border-color 0.7s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: cardApproved ? "rgba(232,213,163,0.9)" : "rgba(255,255,255,0.75)",
                    marginBottom: "4px",
                    transition: "color 0.6s ease",
                  }}
                >
                  {a.label}
                </p>
                {/* Cross-fading copy */}
                <div style={{ position: "relative", height: "28px", marginBottom: "6px" }}>
                  <p
                    style={{
                      position: "absolute",
                      inset: 0,
                      fontFamily: "var(--font-inter)",
                      fontSize: "9.5px",
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.3)",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      opacity: cardApproved ? 0 : 1,
                      transition: "opacity 0.5s ease",
                    }}
                  >
                    {a.badCopy}
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      inset: 0,
                      fontFamily: "var(--font-inter)",
                      fontSize: "9.5px",
                      color: "#EDA0AE",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      opacity: cardApproved ? 1 : 0,
                      transition: "opacity 0.5s ease 0.15s",
                    }}
                  >
                    {a.goodCopy}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {cardApproved ? (
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "8px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#C44B5F",
                      }}
                    >
                      ✓ Approved
                    </span>
                  ) : (
                    <>
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          backgroundColor: sc,
                          display: "inline-block",
                          flexShrink: 0,
                          animation: isScanning ? "pulse 0.7s ease-in-out infinite" : undefined,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "8px",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {a.warning}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
