import { NextResponse } from "next/server";
import { safeStructure } from "../../../lib/data";

export async function GET(request) {
  try {
    // safeStructure is already the array of (percentage-stripped) categories.
    const categories = safeStructure.map((category) => ({
      id: category.id,
      name: category.name,
      svg: category.svg,
    }));
    return NextResponse.json(categories);
  } catch (error) {
    // Log server-side only — never leak the raw error to the client.
    console.error("[categories] Failed to build categories response:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
