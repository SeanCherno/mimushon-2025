import { NextResponse } from "next/server";
import {
  findDiseasesById,
  filterSeverityPercentages,
  createSafeDataStructure,
} from "../../../../lib/data";

export async function GET(request, { params }) {
  const { linkedDiseaseId } = await params;

  const { disease, subCategory, category } = findDiseasesById(
    linkedDiseaseId,
    true
  );

  if (!disease && !subCategory && !category) {
    return NextResponse.json({ message: "Disease not found" }, { status: 404 });
  }

  // משכפל את הלוגיקה המקורית שלך ליצירת מבנים מאובטחים
  const newDisease = filterSeverityPercentages(disease);
  const newSubCategoryDiseases = createSafeDataStructure([subCategory])[0];
  const newCategory = createSafeDataStructure([category])[0];

  return NextResponse.json({
    disease: newDisease,
    // שים לב: המפתח כאן הוא 'subCategory' אבל הערך הוא מערך של מחלות
    // זה תואם לקוד המקורי שלך.
    subCategory: newSubCategoryDiseases,
    category: newCategory,
  });
}
