const fs = require("fs");

const jsonFilePath = "./mimushon/src/data/diseases.json"; // Replace with your JSON file name

fs.readFile(jsonFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    let categories = JSON.parse(data);

    // Iterate through each category object
    categories = categories.categories.map((category) => {
      // Add new attributes to the 'category' object
      //   category.newCategoryAttribute = "This is a new category property";
      //   category.lastModifiedCategory = new Date().toISOString();

      // Check if 'diseases' array exists and iterate through it
      if (category.diseases && Array.isArray(category.diseases)) {
        category.diseases = category.diseases.map((disease) => {
          // Add new attributes to the 'disease' object
          //   disease.newDiseaseAttribute = "This is a new disease property";
          //   disease.isActive = true;

          // Check if 'severities' array exists and iterate through it
          if (disease.severities && Array.isArray(disease.severities)) {
            disease.severities = disease.severities.map((severity) => {
              // Add new attributes to the 'severity' object
              severity.countForDisability = true;
              severity.countForTax = true;
              severity.countForSpecial = true;
              // Example: Add a unique ID if needed
              severity.severityId = `${category.id}_${
                disease.id
              }_${Math.random().toString(36).substring(7)}`;

              return severity;
            });
          }
          return disease;
        });
      }
      return category;
    });

    // Write the modified data back to the JSON file, formatted with 2 spaces
    fs.writeFile(
      jsonFilePath,
      JSON.stringify(categories, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("JSON file successfully updated with new attributes!");
        }
      }
    );
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
  }
});
