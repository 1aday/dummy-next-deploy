import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    // Graceful fallback when no API key configured
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, type: "regular" }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    if (res.status === 409) {
      return NextResponse.json({ ok: true }); // Already subscribed
    }
    return NextResponse.json(
      { error: data.detail || "Subscription failed" },
      { status: res.status }
    );
  }

  return NextResponse.json({ ok: true });
}
