import { NextResponse } from "next/server";
import { safeStructure } from "../../../../lib/data";

export async function GET(request, { params }) {
  const { categoryId } = await params;

  const categoryData = safeStructure.find(
    (category) => category.id === categoryId
  );

  if (!categoryData) {
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 }
    );
  }

  // מחזיר את המבנה המאובטח (ללא אחוזים) עבור הקטגוריה
  return NextResponse.json(categoryData);
}
