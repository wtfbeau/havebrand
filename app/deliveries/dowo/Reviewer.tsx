"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Board, Block } from "./copy";

type Boards = Record<string, Board>;
type Notes = Record<string, string>;
const KEY = "dowo-notes-v1";
const DOC = "dowo-scripts";
// Hand edits to the script text: same store, own doc, value = the block's edited HTML.
const EDIT_DOC = "dowo-scripts-edits";
const EDIT_KEY = "dowo-edits-v1";
type Sync = "local" | "syncing" | "synced" | "error";
const BOARD_W = 760;
const GAP = 280;

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
    if (cl.contains("line")) out.push(`<p>${el.querySelector(".who")?.textContent ? `<b>${el.querySelector(".who")?.textContent}:</b> ` : ""}${inline(el.querySelector(".say") ?? el)}</p>`);
    else if (cl.contains("dir")) out.push(`<p><i>${Array.from(el.childNodes).map((c) => c.textContent?.trim()).filter(Boolean).join(". ")}</i></p>`);
    else if (cl.contains("os")) out.push(`<p><b>${el.querySelector(".oslab")?.textContent ?? ""}:</b><br>${el.querySelector(".ostx")?.innerHTML ?? ""}</p>`);
    else if (cl.contains("quote")) out.push(`<blockquote>${inline(el)}</blockquote>`);
    else if (cl.contains("fmt")) out.push(`<p><b>${el.querySelector("span")?.textContent ?? ""}. ${el.querySelector("b")?.textContent ?? ""}</b> ${el.querySelector("div")?.lastChild?.textContent ?? ""}</p>`);
    else if (cl.contains("spec")) out.push(`<p><b>${el.querySelector(".lab")?.textContent ?? ""}</b></p>`, ...Array.from(el.querySelectorAll(".p")).map((x) => `<p>${x.innerHTML}</p>`));
    else if (cl.contains("h1")) out.push(`<h1>${inline(el)}</h1>`);
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
// One video prompt per script, built from the board as it stands (hand edits included). Format that worked best:
// scene and people as sentences, speech quoted ("The fitter says: ..."), actions written into the line, and the
// full no-text line. Titles, on-screen text, captions and end cards are CapCut's job, so they never reach the prompt.
type Said = { who: string; cue: string; say: string };
const NO_TEXT = "No captions, no subtitles and no text of any kind on screen. No writing on vans, signs, shops or clothes.";
const clean = (s: string) => s.replace(/\s+/g, " ").trim();
const sentence = (s: string) => {
  const x = clean(s);
  return x ? x[0].toUpperCase() + x.slice(1) + (/[.?!]$/.test(x) ? "" : ".") : "";
};
const sceneOf = (s: string) =>
  clean(s.replace(/About \d+ seconds\.?/gi, "").replace(/,\s*no music, no text on screen\./gi, ".").replace(/No music, no text on screen\.?/gi, "").replace(/no text on screen\.?/gi, "").replace(/No music\.?/gi, ""));

function speak({ who, cue, say }: Said) {
  const w = `The ${who.toLowerCase()}`;
  const q = `"${say.replace(/"/g, "'")}"`;
  if (!cue) return `${w} says: ${q}`;
  return /\b(asks|says|replies|answers)\b/.test(cue) ? `${w} ${cue}: ${q}` : `${w} ${cue} and says: ${q}`;
}

// Opening for an Arcads/Seedance extend: the same scene, people and voices restated, so G can paste whichever
// script lines come next underneath it.
const CONTINUE =
  "Continue this video from its last frame. Keep everything exactly as it is: same setting, same camera, same light, same people, same voices and accents. Carry straight on from where the last clip ended, unless the lines below start a new shot. Do not repeat anything already said or shown, and play only the lines below, in order.";
function buildContinuation(htmls: string[]): string {
  const head = buildPrompt(htmls).split("\n")[0];
  return `${CONTINUE} ${head}\nThe next lines are:`;
}

function buildPrompt(htmls: string[]): string {
  const root = document.createElement("div");
  root.innerHTML = htmls.join("");
  const t = (el: Element | null | undefined) => clean(el?.textContent ?? "");
  let scene = "";
  let voice = "";
  const chars: string[] = [];
  const body: string[] = [];
  let lastWho = "";
  let pending: Said | null = null;
  const flush = () => {
    if (pending) body.push(speak(pending));
    pending = null;
  };
  Array.from(root.children).forEach((el) => {
    const cl = el.classList;
    if (cl.contains("spec")) {
      const lab = t(el.querySelector(".lab"));
      const ps = Array.from(el.querySelectorAll(".p"));
      if (lab === "Video") scene = sceneOf(ps.map((x) => t(x)).join(" "));
      if (lab === "Voice") voice = ps.map((x) => t(x)).join(" ");
      if (lab === "Characters")
        ps.forEach((x) => {
          const name = t(x.querySelector("b")).replace(/:$/, "");
          const desc = clean(t(x).slice(t(x.querySelector("b")).length));
          if (name) chars.push(`The ${name.toLowerCase()} is ${/^British (man|woman)\b/.test(desc) ? "a " : ""}${desc}`);
        });
    } else if (cl.contains("dir")) {
      flush();
      const head = t(el.querySelector("b"));
      const c = el.cloneNode(true) as HTMLElement;
      c.querySelectorAll("b,.cap").forEach((x) => x.remove());
      const rest = t(c);
      if (head === "Drawing") body.push(/^(the hand|on |under |in )/i.test(rest) ? sentence(rest) : `The hand draws ${rest.replace(/[.]$/, "")}.`);
      else body.push(/^no speech/i.test(rest) ? `${head}, no one speaks: ${sentence(rest.replace(/^no speech:?\s*/i, ""))}` : `${head}: ${sentence(rest)}`);
    } else if (cl.contains("line")) {
      const who = t(el.querySelector(".who")) || lastWho;
      lastWho = who;
      const said = { who, cue: t(el.querySelector(".cue")), say: t(el.querySelector(".say")) };
      if (!said.say) return;
      // A speaker's back-to-back lines (a monologue) become one quote.
      if (pending && pending.who === who && !said.cue) pending.say = `${pending.say} ${said.say}`;
      else {
        flush();
        pending = said;
      }
    }
  });
  flush();
  const head = clean([scene, voice && `The voiceover is a ${voice}`, chars.join(" "), "No music.", NO_TEXT].filter(Boolean).join(" "));
  return `${head}\n${body.join("\n")}`;
}

// Notes and edits are stored as "<signature of the original block>|<value>". When the block's text changes in the
// source, the signature no longer matches and the old note or edit drops off instead of landing on the new text.
function sig(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
const isRow = (b: Block) => /^<div class="wrow"/.test(b.html);
const isSilent = (b: Block) => b.text.length === 0;

export default function Reviewer({ boards }: { boards: Boards }) {
  const [stored, setNotes] = useState<Notes>({});
  const [storedEdits, setEdits] = useState<Notes>({});
  const sigs = useMemo(() => {
    const m: Notes = {};
    Object.keys(boards).forEach((k) => boards[k].blocks.forEach((bl) => (m[`${k}:${bl.id}`] = sig(bl.html))));
    return m;
  }, [boards]);
  const unpack = useCallback(
    (raw: Notes) => {
      const o: Notes = {};
      Object.entries(raw).forEach(([id, v]) => {
        const pre = `${sigs[id]}|`;
        if (sigs[id] && v.startsWith(pre)) o[id] = v.slice(pre.length);
      });
      return o;
    },
    [sigs],
  );
  const pack = (id: string, v: string) => `${sigs[id]}|${v}`;
  const notes = useMemo(() => unpack(stored), [stored, unpack]);
  const edits = useMemo(() => unpack(storedEdits), [storedEdits, unpack]);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [view, setView] = useState({ x: 40, y: 40, s: 0.5 });
  const [space, setSpace] = useState(false);
  const [sync, setSync] = useState<Sync>("local");
  const [showList, setShowList] = useState(false);
  // The prompt builders need the DOM, so the continuation boxes fill in after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const vp = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(EDIT_KEY);
      if (raw) setEdits(JSON.parse(raw));
    } catch {}
    fetch(`/api/deliveries/notes?doc=${EDIT_DOC}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.ok) {
          setEdits(j.notes);
          try {
            localStorage.setItem(EDIT_KEY, JSON.stringify(j.notes));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const saveEdit = (id: string, html: string | null) => {
    setEdits((prev) => {
      const n = { ...prev };
      if (html === null) delete n[id];
      else n[id] = pack(id, html);
      try {
        localStorage.setItem(EDIT_KEY, JSON.stringify(n));
      } catch {}
      return n;
    });
    fetch("/api/deliveries/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doc: EDIT_DOC, id, text: html === null ? "" : pack(id, html) }),
    })
      .then((r) => setSync(r.status === 503 ? "local" : r.ok ? "synced" : "error"))
      .catch(() => setSync("error"));
  };
  const htmlOf = (k: string, bl: Block) => edits[`${k}:${bl.id}`] ?? bl.html;
  const editCount = Object.keys(edits).length;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setNotes(JSON.parse(raw));
    } catch {}
    fetch(`/api/deliveries/notes?doc=${DOC}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.ok) {
          setNotes(j.notes);
          setSync("synced");
          try {
            localStorage.setItem(KEY, JSON.stringify(j.notes));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const push = (id: string, text: string) => {
    clearTimeout(timers.current[id]);
    timers.current[id] = setTimeout(async () => {
      setSync((s) => (s === "local" ? s : "syncing"));
      try {
        const r = await fetch("/api/deliveries/notes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doc: DOC, id, text }),
        });
        if (r.status === 503) setSync("local");
        else setSync(r.ok ? "synced" : "error");
      } catch {
        setSync("error");
      }
    }, 600);
  };

  const save = (n: Notes, changed?: string) => {
    const raw: Notes = {};
    Object.entries(n).forEach(([id, v]) => (raw[id] = pack(id, v)));
    setNotes(raw);
    try {
      localStorage.setItem(KEY, JSON.stringify(raw));
    } catch {}
    if (changed) push(changed, n[changed] === undefined ? "" : raw[changed]);
  };
  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 1400);
  };
  const noteCount = useMemo(() => Object.values(notes).filter((v) => v.trim()).length, [notes]);

  const n = Object.keys(boards).length;
  const worldW = BOARD_W * n + GAP * (n - 1) + 80;

  const fit = useCallback(() => {
    const el = vp.current;
    if (!el) return;
    const s = Math.min(1, Math.max(0.5, (el.clientWidth - 48) / worldW));
    setView({ x: 24, y: 24, s });
  }, [worldW]);

  useEffect(() => {
    fit();
  }, [fit]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" && !(e.target as HTMLElement)?.closest("textarea,input,[contenteditable=true]")) {
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
  const boardHtml = (k: keyof Boards) => boards[k].blocks.map((b) => htmlOf(k as string, b));

  const pct = Math.round(view.s * 100);

  return (
    <div className="fixed inset-0 flex flex-col bg-[#3f3a34] text-[#1c1814]" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <header className="z-30 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#55504a] bg-[#3f3a34] px-4 py-2.5 text-[#f3efe6]">
        <div className="mr-auto">
          <div className="text-[10px] font-bold uppercase tracking-[.14em] text-[#b8b0a2]">DOWO · Windows and doors</div>
          <div className="text-[15px] font-bold leading-tight">New Meta scripts · 8 video scripts</div>
        </div>
        <div className="hidden text-[12px] text-[#b8b0a2] md:block">
          Drag the background to move · ⌘ or Ctrl + scroll to zoom · Hover a block to copy or note ·{" "}
          {sync === "synced" && "Notes save as you type and are shared"}
          {sync === "syncing" && "Saving…"}
          {sync === "local" && "Notes save in this browser; send them with Copy all notes"}
          {sync === "error" && "Notes saved in this browser; sharing failed"}
        </div>
        <button
          onClick={() => setEditing((v) => !v)}
          className={`rounded-full px-4 py-1.5 text-[12px] font-semibold ${editing ? "bg-[#f0d95a] text-[#1c1814] hover:bg-[#f6e27a]" : "border border-[#6a645c] text-[#f3efe6] hover:bg-[#4a453e]"}`}
        >
          {editing ? "Done editing" : "Edit text"}
          {editCount ? ` (${editCount} edited)` : ""}
        </button>
        {editCount > 0 && (
          <button
            onClick={async () => {
              const out: string[] = [];
              Object.keys(boards).forEach((k) =>
                boards[k].blocks.forEach((bl) => {
                  const h = edits[`${k}:${bl.id}`];
                  if (h !== undefined) out.push(`${boards[k].title} · block ${bl.id}`, `WAS: ${bl.text}`, `NOW: ${textOf(h).replace(/\s+/g, " ")}`, "");
                }),
              );
              flash((await copy(out.join("\n").trim())) ? "All edits copied" : "Copy failed");
            }}
            className="rounded-full border border-[#6a645c] px-3 py-1.5 text-[12px] font-semibold text-[#f3efe6] hover:bg-[#4a453e]"
          >
            Copy all edits
          </button>
        )}
        {noteCount > 0 && (
          <button
            onClick={() => setShowList((v) => !v)}
            className="rounded-full border border-[#6a645c] px-3 py-1.5 text-[12px] font-semibold text-[#f3efe6] hover:bg-[#4a453e]"
          >
            {showList ? "Back to canvas" : "List notes"}
          </button>
        )}
        <div className="flex items-center gap-1 rounded-full border border-[#6a645c] bg-[#4a453e] p-0.5 text-[12px] font-semibold text-[#f3efe6]">
          <button onClick={() => zoomBy(1 / 1.25)} className="h-7 w-7 rounded-full hover:bg-[#5a544c]">−</button>
          <button onClick={fit} className="h-7 min-w-[52px] rounded-full px-2 hover:bg-[#5a544c]">{pct}%</button>
          <button onClick={() => zoomBy(1.25)} className="h-7 w-7 rounded-full hover:bg-[#5a544c]">+</button>
        </div>
        {noteCount > 0 && (
          <button
            onClick={() => {
              Object.keys(stored).forEach((id) => push(id, ""));
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
                    onClick={async () => flash((await copy(buildPrompt(boardHtml(k)))) ? "Prompt copied" : "Copy failed")}
                    className="rounded-full border border-[#8a8074] px-2.5 py-1 text-[11px] font-semibold text-[#f3efe6] hover:bg-[#f3efe6] hover:text-[#1c1814]"
                  >
                    Copy prompt
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
                          <div
                            key={`${id}:${edits[id] === undefined ? "o" : "e"}:${editing}`}
                            contentEditable={editing && !silent}
                            suppressContentEditableWarning
                            spellCheck={editing}
                            onPaste={(e) => {
                              e.preventDefault();
                              document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Escape") (e.target as HTMLElement).blur();
                            }}
                            onBlur={(e) => {
                              if (!editing) return;
                              const h = e.currentTarget.innerHTML;
                              if (h === htmlOf(k as string, bl)) return;
                              saveEdit(id, h === bl.html ? null : h);
                            }}
                            className={`rounded-sm ${editing && !silent ? "cursor-text outline-none focus:bg-[#fffbe6] focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-[#e4531d]" : ""} ${edits[id] !== undefined ? "border-l-4 border-[#e4531d] -ml-[14px] pl-[10px]" : ""} ${showNote ? "outline outline-2 outline-offset-4 outline-[#f0d95a]" : "group-hover:outline group-hover:outline-1 group-hover:outline-offset-4 group-hover:outline-[#c4b39a]"}`}
                            dangerouslySetInnerHTML={{ __html: htmlOf(k as string, bl) }}
                          />
                          {!silent && (
                            <div className="absolute right-0 top-0 z-10 flex w-[68px] flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                              <button
                                onClick={async () => flash((await copyRich([htmlOf(k as string, bl)])) ? "Copied" : "Copy failed")}
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
                              {edits[id] !== undefined && (
                                <button
                                  onClick={() => {
                                    saveEdit(id, null);
                                    flash("Back to the original");
                                  }}
                                  className="rounded bg-white px-2 py-1 text-[11px] font-semibold text-[#9c3d22] shadow hover:bg-[#fbeee6]"
                                >
                                  Undo edit
                                </button>
                              )}
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
                                    onChange={(e) => save({ ...notes, [id]: e.target.value }, id)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Escape" || (e.key === "Enter" && (e.metaKey || e.ctrlKey))) setOpen(null);
                                    }}
                                    onBlur={() => {
                                      if (!note.trim()) {
                                        const n = { ...notes };
                                        delete n[id];
                                        save(n, id);
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
                                        save(n, id);
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
                <div className="mt-4 rounded-sm border-2 border-dashed border-[#8a8074] bg-[#2f2b26] p-5 text-[#f3efe6]">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-[12px] font-bold uppercase tracking-[.12em] text-[#e4b89a]">Continuation prompt · for extends</div>
                    <button
                      onClick={async () => flash((await copy(buildContinuation(boardHtml(k)))) ? "Continuation copied" : "Copy failed")}
                      className="rounded-full border border-[#8a8074] px-2.5 py-1 text-[11px] font-semibold text-[#f3efe6] hover:bg-[#f3efe6] hover:text-[#1c1814]"
                    >
                      Copy continuation
                    </button>
                  </div>
                  <div className="mb-3 text-[13px] text-[#b8b0a2]">Paste this, then paste the script lines from where your last clip stopped.</div>
                  <div className="whitespace-pre-wrap text-[15px] leading-relaxed">{mounted ? buildContinuation(boardHtml(k)) : ""}</div>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {showList && (
        <div className="absolute inset-x-0 bottom-0 top-[52px] z-20 overflow-auto bg-[#f3efe6] px-6 py-6 text-[#1c1814]">
          <div className="mx-auto max-w-[820px]">
            {(Object.keys(boards) as (keyof Boards)[]).map((k) => {
              const b = boards[k];
              const mine = b.blocks.filter((bl) => notes[`${k}:${bl.id}`]?.trim());
              if (!mine.length) return null;
              return (
                <section key={k} className="mb-8">
                  <h2 className="mb-3 text-[13px] font-bold uppercase tracking-[.12em] text-[#8a7a62]">{b.title}</h2>
                  {mine.map((bl) => (
                    <div key={bl.id} className="mb-3 rounded-md border border-[#d9d2c5] bg-white p-4">
                      <div className="mb-2 text-[12px] text-[#6b6358]">
                        <span className="font-bold text-[#1c1814]">{bl.id}</span> · {bl.text.length > 140 ? bl.text.slice(0, 140) + "…" : bl.text}
                      </div>
                      <div className="whitespace-pre-wrap text-[15px] leading-snug">{notes[`${k}:${bl.id}`]}</div>
                    </div>
                  ))}
                </section>
              );
            })}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-[#1c1814] px-4 py-2 text-[13px] font-semibold text-white shadow-lg">{toast}</div>
      )}
    </div>
  );
}

