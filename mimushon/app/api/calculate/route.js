import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { modes, findDiseasesById } from "../../../lib/data";

export async function POST(request) {
  const { chosenDiseasesWithSeverities } = await request.json();

  if (!chosenDiseasesWithSeverities) {
    return NextResponse.json(
      {
        error: "Missing required parameters: chosenDiseasesWithSeverities",
      },
      { status: 400 }
    );
  }

  const newTotals = {
    generalDisability: 0,
    taxIncome: 0,
    specialServices: 0,
  };

  // --- לוגיקת החישוב שלך (העתק-הדבק) ---
  chosenDiseasesWithSeverities.forEach((entry) => {
    const fullDisease = findDiseasesById(entry.disease.id);
    if (!fullDisease) return; // הגנה מפני מחלה לא קיימת

    const foundSeverity = fullDisease.severities.find(
      (sev) => sev.severityId === entry.selectedSeverity.severityId
    );

    if (foundSeverity) {
      modes.forEach((mode) => {
        if (foundSeverity[mode.dataKey]) {
          newTotals[mode.id] +=
            (1 - newTotals[mode.id] / 100) *
            (foundSeverity ? foundSeverity.percentage : 0);
        }
      });
    }
  });
  // --- סוף לוגיקת החישוב ---

  // --- לוגיקת התיעוד למסד הנתונים ---
  try {
    const logQueryText =
      "INSERT INTO disease_calculations(calculation_data) VALUES($1)";
    const logValues = [
      {
        diseases: JSON.stringify(
          chosenDiseasesWithSeverities.map((disease) => ({
            disease: {
              id: disease.disease.id,
              name: disease.disease.name,
            },
            selectedSeverity: disease.selectedSeverity,
          }))
        ),
        totals: newTotals,
      },
    ];

    await pool.query(logQueryText, logValues);
    console.log("Calculation logged to database successfully.");
  } catch (logErr) {
    console.error("Error logging calculation to database:", logErr);
    // אנחנו לא עוצרים את הבקשה אם התיעוד נכשל
  }
  // --- סוף לוגיקת התיעוד ---

  // המרת ה-setTimeout ל-Promise תואם async/await
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json({ newTotals });
}
