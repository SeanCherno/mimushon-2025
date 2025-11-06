import diseasesData from "./diseases.json"; // ייבוא ישיר של ה-JSON

// העתקת המערך modes
export const modes = [
  {
    id: "generalDisability",
    name: "נכות כללית",
    dataKey: "countForDisability",
    content: "...",
  },
  {
    id: "taxIncome",
    name: "מס הכנסה",
    dataKey: "countForTax",
    content: "...",
  },
  {
    id: "specialServices",
    name: "שירותים מיוחדים",
    dataKey: "countForSpecial",
    content: "...",
  },
];

// --- העתקת כל פונקציות העזר ---

export function filterSeverityPercentages(disease) {
  const safeData = { ...disease };
  if (Array.isArray(safeData.severities)) {
    safeData.severities = safeData.severities.map((severity) => {
      const { percentage, ...safeSeverity } = severity;
      return safeSeverity;
    });
  }
  return safeData;
}

export function createSafeDataStructure(originalData) {
  return originalData.map((category) => {
    const safeCategory = { ...category };
    if (Array.isArray(safeCategory.diseases)) {
      safeCategory.diseases = safeCategory.diseases.map(
        filterSeverityPercentages
      );
    }
    if (Array.isArray(safeCategory.subcategories)) {
      safeCategory.subcategories = safeCategory.subcategories.map(
        (subCategory) => {
          const safeSubCategory = { ...subCategory };
          if (Array.isArray(safeSubCategory.diseases)) {
            safeSubCategory.diseases = safeSubCategory.diseases.map(
              filterSeverityPercentages
            );
          }
          return safeSubCategory;
        }
      );
    }
    return safeCategory;
  });
}

// יצירת המבנה המאובטח וייצוא שלו
export const safeStructure = createSafeDataStructure(diseasesData.categories);

export function findDiseasesById(targetId, returnCategory = false) {
  for (const category of diseasesData.categories) {
    if (Array.isArray(category.diseases)) {
      const found = category.diseases.find((disease) => disease.id == targetId);
      if (found) {
        if (!returnCategory) return found;
        return { disease: found, category: category };
      }
    }
    if (Array.isArray(category.subcategories)) {
      for (const subCategory of category.subcategories) {
        if (Array.isArray(subCategory.diseases)) {
          const found = subCategory.diseases.find(
            (disease) => disease.id == targetId
          );
          if (found) {
            if (!returnCategory) return found;
            return {
              disease: found,
              subCategory: subCategory,
              category: category,
            };
          }
        }
      }
    }
  }
  // החזר אובייקט ריק אם לא נמצא כלום כדי למנוע שגיאות
  return {};
}
