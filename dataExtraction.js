const fs = require("fs");

// --- Helper Function to Extract Data ---
// This function now extracts both the description and the percentage for each severity.
const extractDiseaseSeverities = (jsonData) => {
  if (!jsonData || !Array.isArray(jsonData.categories)) {
    console.error("Invalid JSON format: 'categories' array not found.");
    return [];
  }
  const extracted = [];
  const processDiseases = (diseases) => {
    if (!Array.isArray(diseases)) return;
    diseases.forEach((disease) => {
      if (disease.name && Array.isArray(disease.severities)) {
        // Capture both description and percentage
        const severities = disease.severities.map((s) => ({
          description: s.description,
          percentage: s.percentage,
        }));
        extracted.push({
          diseaseName: disease.name,
          severities: severities,
        });
      }
    });
  };
  jsonData.categories.forEach((category) => {
    if (category.diseases) processDiseases(category.diseases);
    if (Array.isArray(category.subcategories)) {
      category.subcategories.forEach((sub) => {
        if (sub.diseases) processDiseases(sub.diseases);
      });
    }
  });
  return extracted;
};

// --- Main Script Logic ---
try {
  // Load the JSON file
  const rawData = fs.readFileSync("./backend/diseases.json");
  const jsonData = JSON.parse(rawData);

  const extractedData = extractDiseaseSeverities(jsonData);

  // Format the extracted data into a single text string.
  let fileContent = "";
  extractedData.forEach((item) => {
    fileContent += `${item.diseaseName}\n`;
    fileContent += "-".repeat(item.diseaseName.length) + "\n";

    // Updated loop to include the percentage
    item.severities.forEach((severity) => {
      fileContent += `\t• ${severity.description} (${severity.percentage}%)\n`;
    });

    // Add blank lines for spacing
    fileContent += "\n\n";
  });

  // Write the final string to the .txt file.
  fs.writeFileSync("diseases_list.txt", fileContent.trim());
  console.log("✅ Successfully created diseases_list.txt with percentages.");
} catch (err) {
  console.error("❌ Failed to load, process, or write file:", err);
}
