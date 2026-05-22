import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "../../../../lib/rateLimit";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  // 5 attempts per IP per 15 minutes — lockout after that
  const ip = getClientIp(request);
  const { allowed, resetAt } = rateLimit(`admin-login:${ip}`, {
    windowMs: 15 * 60_000,
    max: 5,
  });

  if (!allowed) {
    const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
    return NextResponse.json(
      { error: "יותר מדי ניסיונות. נסה שוב מאוחר יותר." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { secret } = body ?? {};
  const envSecret = process.env.ADMIN_SECRET;

  if (!envSecret || !secret || secret !== envSecret) {
    // Constant-time-ish delay to slow brute force even within the rate limit window
    await new Promise(r => setTimeout(r, 1000));
    return NextResponse.json({ error: "סיסמה שגויה" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", envSecret, {
    httpOnly: true,
    sameSite: "strict",
    path: "/admin",
    maxAge: 60 * 60 * 8, // 8 hours
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
