import { NextResponse } from "next/server";
import pool from "../../../lib/db"; // ייבוא ה-pool המשותף

export async function POST(request) {
  try {
    const { name, phone, hearot } = await request.json();

    const queryText =
      "INSERT INTO contact_us_users(name, phone, comment) VALUES($1, $2, $3)";
    const values = [name, phone, hearot];

    await pool.query(queryText, values);

    console.log(`Contact info for "${name}" saved to database successfully.`);
    return NextResponse.json({ result: true });
  } catch (err) {
    console.error("Error inserting into database:", err);
    // החזרת שגיאת שרת 500, זהו נוהג תקין יותר
    return NextResponse.json(
      { result: false, error: err.message },
      { status: 500 }
    );
  }
}
