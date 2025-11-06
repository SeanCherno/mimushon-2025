import { safeStructure } from "./data";

/*
 This function provides the category data.
 Your Server Component (app/page.js) will call this.
 Your API Route (app/api/categories/route.js) will also call this.
 This keeps your logic in one place (D.R.Y. - Don't Repeat Yourself).
*/
export async function getCategoriesData() {
  // This is the same logic from your API route
  const categories = safeStructure.map((category) => ({
    id: category.id,
    name: category.name,
    svg: category.svg,
  }));
  return categories;
}
