import { NextResponse } from "next/server";

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    return NextResponse.json(
      {
        error:
          "Newsletter not configured yet. Set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID env vars.",
      },
      { status: 500 }
    );
  }

  let email: string;
  try {
    const body = (await req.json()) as { email?: unknown };
    if (typeof body.email !== "string" || !EMAIL_RE.test(body.email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 }
      );
    }
    email = body.email.trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "helmquant.in",
          utm_medium: "landing",
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Beehiiv subscribe error:", res.status, detail);
      return NextResponse.json(
        { error: "Could not subscribe right now. Try again in a minute?" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe handler error:", err);
    return NextResponse.json(
      { error: "Server error. Try again?" },
      { status: 500 }
    );
  }
}
