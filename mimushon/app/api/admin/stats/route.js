import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const secret = request.headers.get("x-admin-secret");

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [topDiseasesResult, totalResult, leadsResult] = await Promise.all([
      pool.query(`
        SELECT
          d->'disease'->>'id'   AS disease_id,
          d->'disease'->>'name' AS disease_name,
          COUNT(*)::int         AS count
        FROM disease_calculations,
          jsonb_array_elements((calculation_data->>'diseases')::jsonb) AS d
        GROUP BY disease_id, disease_name
        ORDER BY count DESC
        LIMIT 30
      `),
      pool.query(`
        SELECT COUNT(*)::int AS total FROM disease_calculations
      `),
      pool.query(`
        SELECT id, name, phone, email, comment, filing_status, percentages, claim_type, created_at
        FROM contact_us_users
        ORDER BY created_at DESC
        LIMIT 100
      `),
    ]);

    return NextResponse.json({
      topDiseases: topDiseasesResult.rows,
      totalCalculations: totalResult.rows[0]?.total ?? 0,
      leads: leadsResult.rows,
    });
  } catch (err) {
    console.error("[admin/stats] DB error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
