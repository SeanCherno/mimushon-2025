import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  // Clear the session cookie (must match the path it was set with)
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/admin',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
