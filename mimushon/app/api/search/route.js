import { safeStructure } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  if (q.length < 2) {
    return Response.json([]);
  }

  const term = q.toLowerCase();
  const results = [];

  for (const category of safeStructure) {
    // Search direct diseases on the category
    if (Array.isArray(category.diseases)) {
      for (const disease of category.diseases) {
        if (
          disease.name?.toLowerCase().includes(term) ||
          disease.description?.toLowerCase().includes(term)
        ) {
          results.push({
            id: disease.id,
            name: disease.name,
            description: disease.description || "",
            categoryName: category.name,
          });
        }
      }
    }
    // Search diseases inside subcategories
    if (Array.isArray(category.subcategories)) {
      for (const sub of category.subcategories) {
        if (Array.isArray(sub.diseases)) {
          for (const disease of sub.diseases) {
            if (
              disease.name?.toLowerCase().includes(term) ||
              disease.description?.toLowerCase().includes(term)
            ) {
              results.push({
                id: disease.id,
                name: disease.name,
                description: disease.description || "",
                categoryName: category.name,
              });
            }
          }
        }
      }
    }
    if (results.length >= 10) break;
  }

  return Response.json(results.slice(0, 10));
}
