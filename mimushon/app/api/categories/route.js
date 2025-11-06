import { NextResponse } from "next/server";
import { safeStructure } from "../../../lib/data";

export async function GET(request) {
  try {
    const categories = safeStructure.categories.map((category) => ({
      id: category.id,
      name: category.name,
      svg: category.svg,
    }));
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch categories, ${error}`,
      },
      { status: 500 }
    );
  }
}
