import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export const dynamic = "force-dynamic";

/* GET /api/health — lightweight liveness + DB readiness probe.
   Used by deploy.sh to verify a fresh build is actually serving (and can reach
   Postgres) before considering a deploy successful. Returns 200 when healthy,
   503 when the database is unreachable. */
export async function GET() {
  const body = { status: "ok", time: new Date().toISOString() };
  try {
    const res = await pool.query("SELECT 1 AS ok");
    body.db = res.rows[0]?.ok === 1 ? "ok" : "unexpected";
  } catch (err) {
    return NextResponse.json(
      { ...body, status: "error", db: "down", error: err.message },
      { status: 503 }
    );
  }
  return NextResponse.json(body);
}
