import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { secret } = body ?? {};
  const envSecret = process.env.ADMIN_SECRET;

  if (!envSecret || !secret || secret !== envSecret) {
    // Delay response to slow down brute force attempts
    await new Promise(r => setTimeout(r, 1000));
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
