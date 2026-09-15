import { NextResponse } from "next/server";

// Notes for the delivery pages, stored in Redis (Upstash via the Vercel Marketplace).
// One hash per document: field = block id, value = note text.
const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const DOC = /^[a-z0-9-]{1,40}$/;
const ID = /^[a-z]+:\d{2}$/;

async function redis(cmd: (string | number)[]) {
  const r = await fetch(URL_!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json()).result;
}

export async function GET(req: Request) {
  if (!URL_ || !TOKEN) return NextResponse.json({ ok: false, reason: "no-store" }, { status: 503 });
  const doc = new URL(req.url).searchParams.get("doc") ?? "";
  if (!DOC.test(doc)) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    const flat: string[] = (await redis(["HGETALL", `notes:${doc}`])) ?? [];
    const notes: Record<string, string> = {};
    for (let i = 0; i < flat.length; i += 2) notes[flat[i]] = flat[i + 1];
    return NextResponse.json({ ok: true, notes }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}

export async function PUT(req: Request) {
  if (!URL_ || !TOKEN) return NextResponse.json({ ok: false, reason: "no-store" }, { status: 503 });
  let body: { doc?: string; id?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const { doc = "", id = "", text = "" } = body;
  if (!DOC.test(doc) || !ID.test(id) || typeof text !== "string" || text.length > 4000) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  try {
    if (text.trim()) await redis(["HSET", `notes:${doc}`, id, text]);
    else await redis(["HDEL", `notes:${doc}`, id]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
