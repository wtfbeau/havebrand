"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Board, Block } from "./copy";

type Boards = Record<"advertorial" | "sales", Board>;
type Notes = Record<string, string>;
const KEY = "aa-tw-notes-v2";
const BOARD_W = 860;
const GAP = 300;
const RULES_W = 760;

function textOf(html: string) {
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.innerText || el.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
}
async function copy(s: string) {
  try {
    await navigator.clipboard.writeText(s);
    return true;
  } catch {
    return false;
  }
}

// Turn a block's wireframe markup into plain semantic HTML so a paste into Google Docs keeps headings, bold and lists.
function toRich(html: string): string {
  const root = document.createElement("div");
  root.innerHTML = html;
  const inline = (el: Element) => {
    const c = el.cloneNode(true) as HTMLElement;
    c.querySelectorAll(".fill").forEach((f) => {
      const b = document.createElement("b");
      b.innerHTML = f.innerHTML;
      f.replaceWith(b);
    });
    c.querySelectorAll("span,div").forEach((x) => {
      if (x.children.length === 0) x.replaceWith(document.createTextNode(x.textContent ?? ""));
    });
    return c.innerHTML.trim();
  };
  const out: string[] = [];
  const walk = (el: Element) => {
    const cl = el.classList;
    if (cl.contains("h1")) out.push(`<h1>${inline(el)}</h1>`);
    else if (cl.contains("sh")) out.push(`<h2>${inline(el)}</h2>`);
    else if (cl.contains("dek")) out.push(`<p><b>${inline(el)}</b></p>`);
    else if (cl.contains("lab") || cl.contains("strip") || cl.contains("cta")) out.push(`<p><b>${inline(el)}</b></p>`);
    else if (cl.contains("q")) out.push(`<p><b>${inline(el)}</b></p>`);
    else if (cl.contains("p") || cl.contains("small")) out.push(`<p>${inline(el)}</p>`);
    else if (cl.contains("bul")) out.push(`<ul>${Array.from(el.children).map((c) => `<li>${inline(c)}</li>`).join("")}</ul>`);
    else if (cl.contains("num")) {
      const t = el.querySelector(".numt"), d = el.querySelector(".numd"), n = el.querySelector(".numn"), tag = el.querySelector(".lab");
      out.push(`<p><b>${n?.textContent?.trim() ?? ""} ${t ? inline(t) : ""}</b><br>${d ? inline(d) : ""}${tag ? `<br><i>${inline(tag)}</i>` : ""}</p>`);
    } else if (cl.contains("wrow")) out.push(`<p>${Array.from(el.children).map((c) => inline(c)).filter(Boolean).join(" · ")}</p>`);
    else if (cl.contains("stat")) out.push(`<p>${Array.from(el.children).map((c) => `${c.querySelector(".statlab")?.textContent ?? ""}: ${c.querySelector(".statval")?.textContent ?? ""}`).join(" · ")}</p>`);
    else if (cl.contains("tst")) out.push(`<blockquote>${inline(el.querySelector(".tstq") ?? el)}<br><b>${el.querySelector(".tstn")?.textContent ?? ""}</b></blockquote>`);
    else if (cl.contains("img") || cl.contains("avatar")) return;
    else if (cl.contains("tstbox") || cl.contains("pen") || cl.contains("band") || cl.contains("byline")) Array.from(el.children).forEach(walk);
    else if (el.children.length && !el.classList.contains("rule")) Array.from(el.children).forEach(walk);
    else if (el.textContent?.trim()) out.push(`<p>${inline(el)}</p>`);
  };
  Array.from(root.children).forEach(walk);
  return out.join("\n");
}

async function copyRich(htmls: string[]) {
  const html = htmls.map(toRich).filter(Boolean).join("\n");
  const text = htmls.map(textOf).filter(Boolean).join("\n\n");
  try {
    if (typeof ClipboardItem !== "undefined") {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      return true;
    }
  } catch {}
  return copy(text);
}
const isRow = (b: Block) => /^<div class="wrow"/.test(b.html);
const isSilent = (b: Block) => b.text.length === 0;

export default function Reviewer({ boards }: { boards: Boards }) {
  const [notes, setNotes] = useState<Notes>({});
  const [open, setOpen] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [view, setView] = useState({ x: 40, y: 40, s: 0.5 });
  const [space, setSpace] = useState(false);
  const vp = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setNotes(JSON.parse(raw));
    } catch {}
  }, []);

  const save = (n: Notes) => {
    setNotes(n);
    try {
      localStorage.setItem(KEY, JSON.stringify(n));
    } catch {}
  };
  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 1400);
  };
  const noteCount = useMemo(() => Object.values(notes).filter((v) => v.trim()).length, [notes]);

  const worldW = BOARD_W * 2 + RULES_W + GAP * 2 + 80;

  const fit = useCallback(() => {
    const el = vp.current;
    if (!el) return;
    const s = Math.min(1, (el.clientWidth - 48) / worldW);
    setView({ x: (el.clientWidth - worldW * s) / 2 + 20, y: 24, s });
  }, [worldW]);

  useEffect(() => {
    fit();
  }, [fit]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" && !(e.target as HTMLElement)?.closest("textarea,input")) {
        setSpace(true);
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => e.code === "Space" && setSpace(false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    const el = vp.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left, my = e.clientY - r.top;
        setView((v) => {
          const s = Math.min(2, Math.max(0.15, v.s * Math.exp(-e.deltaY * 0.01)));
          return { s, x: mx - ((mx - v.x) * s) / v.s, y: my - ((my - v.y) * s) / v.s };
        });
      } else {
        setView((v) => ({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const zoomBy = (f: number) => {
    const el = vp.current;
    if (!el) return;
    const mx = el.clientWidth / 2, my = el.clientHeight / 2;
    setView((v) => {
      const s = Math.min(2, Math.max(0.15, v.s * f));
      return { s, x: mx - ((mx - v.x) * s) / v.s, y: my - ((my - v.y) * s) / v.s };
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const t = e.target as HTMLElement;
    const onBoard = t.closest("[data-board]");
    if (onBoard && !space) return;
    if (t.closest("button,textarea")) return;
    drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const d = drag.current;
    setView((v) => ({ ...v, x: d.vx + (e.clientX - d.x), y: d.vy + (e.clientY - d.y) }));
  };
  const onPointerUp = () => (drag.current = null);

  const allNotes = () => {
    const lines: string[] = [];
    (Object.keys(boards) as (keyof Boards)[]).forEach((k) => {
      const b = boards[k];
      const mine = b.blocks.filter((bl) => notes[`${k}:${bl.id}`]?.trim());
      if (!mine.length) return;
      lines.push(b.title.toUpperCase(), "");
      mine.forEach((bl) => {
        const ex = bl.text.length > 90 ? bl.text.slice(0, 90) + "…" : bl.text;
        lines.push(`${bl.id} · "${ex}"`, notes[`${k}:${bl.id}`].trim(), "");
      });
      lines.push("");
    });
    return lines.join("\n").trim();
  };
  const boardHtml = (k: keyof Boards) => boards[k].blocks.map((b) => b.html);

  const pct = Math.round(view.s * 100);

  return (
    <div className="fixed inset-0 flex flex-col bg-[#3f3a34] text-[#1c1814]" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <header className="z-30 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#55504a] bg-[#3f3a34] px-4 py-2.5 text-[#f3efe6]">
        <div className="mr-auto">
          <div className="text-[10px] font-bold uppercase tracking-[.14em] text-[#b8b0a2]">Abstract Astro</div>
          <div className="text-[15px] font-bold leading-tight">Transformation Window Report · advertorial and sales page</div>
        </div>
        <div className="hidden text-[12px] text-[#b8b0a2] md:block">
          Drag the background to move · ⌘ or Ctrl + scroll to zoom · Hover a block to copy or note · Notes save as you type; send them with Copy all notes
        </div>
        <div className="flex items-center gap-1 rounded-full border border-[#6a645c] bg-[#4a453e] p-0.5 text-[12px] font-semibold text-[#f3efe6]">
          <button onClick={() => zoomBy(1 / 1.25)} className="h-7 w-7 rounded-full hover:bg-[#5a544c]">−</button>
          <button onClick={fit} className="h-7 min-w-[52px] rounded-full px-2 hover:bg-[#5a544c]">{pct}%</button>
          <button onClick={() => zoomBy(1.25)} className="h-7 w-7 rounded-full hover:bg-[#5a544c]">+</button>
        </div>
        {noteCount > 0 && (
          <button
            onClick={() => {
              save({});
              setOpen(null);
              flash("Notes cleared");
            }}
            className="rounded-full border border-[#6a645c] px-3 py-1.5 text-[12px] font-semibold text-[#f3efe6] hover:bg-[#4a453e]"
          >
            Clear notes
          </button>
        )}
        <button
          onClick={async () => {
            if (!noteCount) return flash("No notes yet");
            flash((await copy(allNotes())) ? "All notes copied" : "Copy failed");
          }}
          className="rounded-full bg-[#e4531d] px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-[#f0622b]"
        >
          Copy all notes{noteCount ? ` (${noteCount})` : ""}
        </button>
      </header>

      <div
        ref={vp}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`relative flex-1 overflow-hidden ${space ? "cursor-grab" : ""} ${drag.current ? "cursor-grabbing" : ""}`}
        style={{
          backgroundImage: "radial-gradient(#5a544c 1px, transparent 1px)",
          backgroundSize: `${24 * view.s}px ${24 * view.s}px`,
          backgroundPosition: `${view.x}px ${view.y}px`,
          touchAction: "none",
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`, width: worldW }}
        >
          {(Object.keys(boards) as (keyof Boards)[]).map((k, bi) => {
            const b = boards[k];
            return (
              <div key={k} className="absolute top-0" style={{ left: bi * (BOARD_W + GAP), width: BOARD_W }}>
                <div className="mb-2 flex items-end justify-between px-0.5">
                  <div>
                    <div className="text-[14px] font-bold text-[#f3efe6]">{b.title}</div>
                    <div className="text-[12px] text-[#b8b0a2]">{b.sub}</div>
                  </div>
                  <button
                    onClick={async () => flash((await copyRich(boardHtml(k))) ? `${b.title} copied with formatting` : "Copy failed")}
                    className="rounded-full border border-[#8a8074] px-2.5 py-1 text-[11px] font-semibold text-[#f3efe6] hover:bg-[#f3efe6] hover:text-[#1c1814]"
                  >
                    Copy full text
                  </button>
                </div>
                <div data-board data-page={k} className="wf rounded-sm shadow-[0_6px_30px_rgba(0,0,0,.45)]" style={{ pointerEvents: space ? "none" : "auto" }}>
                  <div className="sheet">
                    {b.blocks.map((bl, i) => {
                      const id = `${k}:${bl.id}`;
                      const note = notes[id] ?? "";
                      const tight = isRow(bl) && i > 0 && isRow(b.blocks[i - 1]);
                      const silent = isSilent(bl);
                      const showNote = (open === id || note.trim()) && !silent;
                      return (
                        <div key={bl.id} className={`blk group relative -mr-[76px] pr-[76px] ${tight ? "-mt-[22px]" : ""}`}>
                          <div className={`rounded-sm ${showNote ? "outline outline-2 outline-offset-4 outline-[#f0d95a]" : "group-hover:outline group-hover:outline-1 group-hover:outline-offset-4 group-hover:outline-[#c4b39a]"}`} dangerouslySetInnerHTML={{ __html: bl.html }} />
                          {!silent && (
                            <div className="absolute right-0 top-0 z-10 flex w-[68px] flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                              <button
                                onClick={async () => flash((await copyRich([bl.html])) ? "Copied" : "Copy failed")}
                                className="rounded bg-[#1c1814] px-2 py-1 text-[11px] font-semibold text-white shadow hover:bg-[#3a322b]"
                              >
                                Copy
                              </button>
                              <button
                                onClick={() => setOpen(open === id ? null : id)}
                                className="rounded bg-[#f0d95a] px-2 py-1 text-[11px] font-semibold text-[#1c1814] shadow hover:bg-[#f6e27a]"
                              >
                                {note.trim() ? "Edit note" : "Note"}
                              </button>
                            </div>
                          )}
                          {showNote && (
                            <div
                              className={`absolute top-0 z-20 w-[230px] rotate-[-1deg] bg-[#fff3a6] p-3 shadow-[2px_4px_14px_rgba(60,45,20,.22)] ${open === id ? "" : "cursor-text"}`}
                              style={{ left: BOARD_W - 56 + 40 }}
                              onClick={() => open !== id && setOpen(id)}
                            >
                              {open === id ? (
                                <>
                                  <textarea
                                    autoFocus
                                    value={note}
                                    onChange={(e) => save({ ...notes, [id]: e.target.value })}
                                    onKeyDown={(e) => {
                                      if (e.key === "Escape" || (e.key === "Enter" && (e.metaKey || e.ctrlKey))) setOpen(null);
                                    }}
                                    onBlur={() => {
                                      if (!note.trim()) {
                                        const n = { ...notes };
                                        delete n[id];
                                        save(n);
                                      }
                                      setOpen(null);
                                    }}
                                    placeholder="Your note on this block"
                                    rows={Math.max(3, Math.min(10, note.split("\n").length + 1))}
                                    className="w-full resize-none bg-transparent leading-snug text-[#3b3128] outline-none placeholder:text-[#a89f6a]"
                                    style={{ fontFamily: "Caveat, var(--font-inter), cursive", fontSize: 19 }}
                                  />
                                  <div className="mt-1 flex items-center justify-between text-[11px] font-semibold" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                                    <span className="text-[#a89f6a]">Saves as you type</span>
                                    <button
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const n = { ...notes };
                                        delete n[id];
                                        save(n);
                                        setOpen(null);
                                      }}
                                      className="text-[#8a7a62] hover:text-[#9c3d22]"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="whitespace-pre-wrap leading-snug text-[#3b3128]" style={{ fontFamily: "Caveat, var(--font-inter), cursive", fontSize: 19 }}>
                                  {note}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute top-0" style={{ left: 2 * (BOARD_W + GAP), width: RULES_W }}>
            <div className="mb-2 px-0.5">
              <div className="text-[14px] font-bold text-[#f3efe6]">Placeholders</div>
              <div className="text-[12px] text-[#b8b0a2]">Rust words on the pages are filled in for each reader.</div>
            </div>
            <div data-board className="rounded-sm bg-white p-8 shadow-[0_6px_30px_rgba(0,0,0,.45)]" style={{ pointerEvents: space ? "none" : "auto" }}>
              <Placeholders />
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-[#1c1814] px-4 py-2 text-[13px] font-semibold text-white shadow-lg">{toast}</div>
      )}
    </div>
  );
}

const windowStates: { page: string; where: string; before: string; open: string }[] = [
  { page: "Advertorial", where: "Headline", before: "it goes off in N days", open: "it's going off right now" },
  { page: "Advertorial", where: "Window table, Jupiter row", before: "IN N DAYS", open: "OPEN NOW" },
  { page: "Advertorial", where: "Jupiter section", before: "It opens in N days", open: "It's open now" },
  { page: "Advertorial", where: "$39 block", before: "It opens in N days", open: "It's open now" },
  { page: "Advertorial", where: "Closing heading", before: "opens in N days", open: "is open now" },
  { page: "Sales page", where: "Header strip", before: "OPENS IN N DAYS", open: "IS OPEN NOW" },
  { page: "Sales page", where: "Opening paragraph", before: "opens in N days", open: "is open now" },
  { page: "Sales page", where: "Stat row, WINDOW", before: "Opens in N days", open: "Open now" },
  { page: "Sales page", where: "\"The 2 weeks a year\" section, last line", before: "opens in N days", open: "is open now" },
  { page: "Sales page", where: "\"August 12\" section, last line", before: "opens in N days", open: "is open now" },
  { page: "Sales page", where: "Window table, Jupiter row", before: "IN N DAYS", open: "OPEN NOW" },
  { page: "Sales page", where: "Report item 01 tag", before: "OPENS IN N DAYS", open: "OPEN NOW" },
  { page: "Sales page", where: "Closing heading", before: "opens in N days", open: "is open now" },
];

function Placeholders() {
  const th = "px-2.5 py-1.5 text-left text-[10px] font-bold uppercase tracking-[.1em] text-[#8a7a62]";
  const td = "px-2.5 py-1.5 align-top text-[13px] leading-snug";
  const code = "rounded bg-[#f3efe6] px-1.5 py-0.5 text-[12px] font-mono text-[#9c3d22]";
  return (
    <div className="text-[#1c1814]">
      <p className="text-[13px] text-[#6b6358]">The sample values shown on the pages (Sarah, March 4, 1979, 59, Venus) are examples only.</p>

      <h3 className="mt-6 text-[15px] font-bold"><span className={code}>WINDOW_STATE</span> · both pages</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-snug">
        <li>The Jupiter window runs <strong>September 28 to October 10, 2026</strong>, with the peak on October 3. Use US Eastern time. No other date on either page changes.</li>
        <li>Before September 28, N is the number of days until September 28. On September 27, write <em>tomorrow</em> instead of <em>in 1 days</em>.</li>
        <li>From September 28 through October 10, use the <em>open</em> column.</li>
        <li>After October 10, the pages move on to the next window. The next planet to cross the spot is Mars (November 2 to 6), then Jupiter again (February 19 to March 8, 2027). Those versions swap the planet, the length and the dates; the placeholder logic stays the same. Copy for them is a separate delivery.</li>
        <li>The placeholder always carries its own verb. Only the rust words change; the text around them never does.</li>
      </ul>
      <div className="mt-3 overflow-hidden rounded border border-[#e5ddd0]">
        <table className="w-full border-collapse">
          <thead className="border-b border-[#e5ddd0] bg-[#faf8f3]">
            <tr><th className={th}>Page</th><th className={th}>Where</th><th className={th}>Before Sep 28</th><th className={th}>Sep 28 to Oct 10</th></tr>
          </thead>
          <tbody>
            {windowStates.map((r, i) => (
              <tr key={i} className="border-b border-[#efe9dd] last:border-0">
                <td className={`${td} whitespace-nowrap text-[#6b6358]`}>{r.page}</td>
                <td className={`${td} text-[#6b6358]`}>{r.where}</td>
                <td className={td}>{r.before}</td>
                <td className={td}>{r.open}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-[15px] font-bold">Sales page only</h3>
      <div className="mt-3 overflow-hidden rounded border border-[#e5ddd0]">
        <table className="w-full border-collapse">
          <thead className="border-b border-[#e5ddd0] bg-[#faf8f3]">
            <tr><th className={th}>Placeholder</th><th className={th}>Value</th><th className={th}>If missing</th></tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#efe9dd]">
              <td className={td}><span className={code}>NAME</span></td>
              <td className={td}>First name from signup, first letter capitalized. Used 3 times: header strip, opening paragraph, "a smaller window" heading.</td>
              <td className={td}>Drop the header strip. Start the other two sentences at "A Transformation Window…" and "A smaller window…".</td>
            </tr>
            <tr className="border-b border-[#efe9dd]">
              <td className={td}><span className={code}>BIRTH_DATE</span></td>
              <td className={td}>Birth date from signup, written as <em>March 4, 1979</em>. Used once, in "built from your birth date, March 4, 1979".</td>
              <td className={td}>Remove ", March 4, 1979" and keep the rest of the sentence.</td>
            </tr>
            <tr className="border-b border-[#efe9dd]">
              <td className={td}><span className={code}>AGE_2038</span></td>
              <td className={td}>Her age on September 14, 2038, the day Jupiter next reaches the spot. Used twice: "until 2038, when you'll be N" and "until you're N".</td>
              <td className={td}>Cut ", when you'll be N" from the first. Write "until 2038" for the second.</td>
            </tr>
            <tr>
              <td className={td}><span className={code}>CONTACT_LINE</span></td>
              <td className={td}>
                One sentence, built from her birth chart. Take the ten bodies in her chart (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto) and measure how far each one sits from <strong>20°02′ Leo</strong>, going around the zodiac. A body counts if that distance is within 3° of 0°, 90°, 120° or 180°. If more than one counts, use the one closest to an exact angle. Write its name into the matching sentence:
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  <li><strong>0°</strong> · Your Venus sits almost exactly on the spot the eclipse marked, which is why this window lands harder on you than on most people.</li>
                  <li><strong>180°</strong> · Your Venus sits directly across the sky from the spot the eclipse marked, so this window pulls on you from both sides.</li>
                  <li><strong>90°</strong> · Your Venus sits at a right angle to the spot the eclipse marked, which is the kind of contact that makes a window impossible to ignore.</li>
                  <li><strong>120°</strong> · Your Venus sits in easy reach of the spot the eclipse marked, so this window opens for you more smoothly than for most.</li>
                </ul>
                About 2 readers in 3 get a sentence.
              </td>
              <td className={td}>Remove the whole paragraph. Never print a substitute sentence.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
