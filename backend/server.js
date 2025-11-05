import express from "express";
import fs from "fs";
import cors from "cors";
import "dotenv/config"; // <-- MODIFIED: Load environment variables
import { Pool } from "pg"; // <-- MODIFIED: Import the pg Pool

// <-- MODIFIED: Set up the database connection pool
// This automatically uses the .env file variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const modes = [
  {
    id: "generalDisability",
    name: "נכות כללית",
    dataKey: "countForDisability",
    content:
      "קצבה חודשית המשולמת למי שכושר העבודה שלו נפגע עקב מצבו הרפואי. גובה הקצבה נקבע לפי אחוזי הנכות ודרגת אי-הכושר שנקבעה.",
  },
  {
    id: "taxIncome",
    name: "מס הכנסה",
    dataKey: "countForTax",
    content:
      "נכות רפואית בשיעור של 90% ומעלה (או במקרים מסוימים, פחות מכך) עשויה לזכות בפטור מלא מתשלום מס הכנסה על הכנסות מיגיעה אישית, עד לתקרה שנתית.",
  },
  {
    id: "specialServices",
    name: "שירותים מיוחדים",
    dataKey: "countForSpecial",
    content:
      "מיועדת לאנשים הזקוקים לעזרה משמעותית בביצוע פעולות יומיומיות (כמו הלבשה, רחצה, אכילה). הקצבה נועדה לסייע במימון מטפל/ת.",
  },
];

let diseasesData = {};
let safeStructure;

fs.readFile("diseases.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }
  try {
    diseasesData = JSON.parse(data);
    safeStructure = createSafeDataStructure(diseasesData.categories);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});

function findDiseasesById(targetId, returnCategory = false) {
  for (const category of diseasesData.categories) {
    // 1. Check for standalone diseases directly under the category
    // (Assuming they are in a 'diseases' array)
    if (Array.isArray(category.diseases)) {
      const found = category.diseases.find((disease) => {
        return disease.id == targetId;
      });
      if (found) {
        if (!returnCategory) {
          return found;
        } else {
          return {
            disease: found,
            category: category,
          };
        }
      }
    }

    // 2. Check within this category's subcategories
    if (Array.isArray(category.subcategories)) {
      // Loop through each subcategory
      for (const subCategory of category.subcategories) {
        // Check for diseases within the subcategory
        if (Array.isArray(subCategory.diseases)) {
          const found = subCategory.diseases.find((disease) => {
            return disease.id == targetId;
          });
          if (found) {
            if (!returnCategory) {
              return found;
            } else {
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
  }
}

function filterSeverityPercentages(disease) {
  const safeData = { ...disease };

  if (Array.isArray(safeData.severities)) {
    safeData.severities = safeData.severities.map((severity) => {
      const { percentage, ...safeSeverity } = severity;
      return safeSeverity;
    });
  }
  return safeData;
}

function createDiseaseIndex(category) {
  const index = {};

  if (Array.isArray(category.diseases)) {
    for (const disease of category.diseases) {
      // **USE THE CLEANER HERE**
      const safeData = filterSeverityPercentages(disease);
      index[disease.id] = safeData;
    }
  }

  // 2. Process diseases in subcategories (as you pointed out)
  if (Array.isArray(category.subCategories)) {
    for (const subCategory of category.subCategories) {
      if (Array.isArray(subCategory.diseases)) {
        for (const disease of subCategory.diseases) {
          // **USE THE CLEANER HERE AGAIN**
          const safeData = filterSeverityPercentages(disease);
          index[disease.id] = safeData;
        }
      }
    }
  }
  return index; // This index now contains ONLY safe data
}

function createSafeDataStructure(originalData) {
  // Use .map() to create a new array of categories
  return originalData.map((category) => {
    // 1. Create a shallow copy of the category
    const safeCategory = { ...category };

    // 2. Filter standalone 'diseases'
    if (Array.isArray(safeCategory.diseases)) {
      // Create a new array of *filtered* disease objects
      safeCategory.diseases = safeCategory.diseases.map(
        filterSeverityPercentages
      );
    }

    // 3. Filter 'subCategories' and their nested diseases
    if (Array.isArray(safeCategory.subcategories)) {
      // Create a new array of subcategories
      safeCategory.subcategories = safeCategory.subcategories.map(
        (subCategory) => {
          // Create a shallow copy of the subcategory
          const safeSubCategory = { ...subCategory };

          // Filter this subcategory's diseases
          if (Array.isArray(safeSubCategory.diseases)) {
            safeSubCategory.diseases = safeSubCategory.diseases.map(
              filterSeverityPercentages
            );
          }

          return safeSubCategory; // Return the safe subcategory
        }
      );
    }

    return safeCategory; // Return the safe category
  });
}

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// API endpoint to get the entire diseases data structure
app.get("/api/diseases", (req, res) => {
  res.json(diseasesData);
});

// GET CATEGORIES NAMES

app.get("/api/categories", (req, res) => {
  res.json(
    diseasesData.categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        svg: category.svg,
      };
    })
  );
});

// GET ALL DISEASES IN A CATEGORY

app.get("/api/categories/:categoryId", (req, res) => {
  const { categoryId } = req.params;

  const categoryData = safeStructure.find(
    (category) => category.id === categoryId
  );

  if (!categoryData) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(categoryData);
});

// GET A CATEGORY BASED ON A LINKED DISEASE

app.get("/api/diseases/:linkedDiseaseId", (req, res) => {
  const targetId = req.params.linkedDiseaseId;

  const { disease, subCategory, category } = findDiseasesById(targetId, true);

  if (!disease && !subCategory && !category)
    return res.status(404).json({ message: "Disease not found" });

  const newDisease = filterSeverityPercentages(disease);
  const newSubCategory = subCategory?.diseases.map(filterSeverityPercentages);
  const newCategory = createSafeDataStructure([category])[0];

  return res.json({
    disease: newDisease,
    subCategory: newSubCategory,
    category: newCategory,
  });
});

// POST USER INFO FROM BOTTOM OF PAGE FORM
// <-- MODIFIED: This entire function is changed to use the database
app.post("/api/user-info", async (req, res) => {
  const { name, phone, hearot } = req.body;

  // Assumes your table is 'contact_messages' and has columns: name, phone, message
  const queryText =
    "INSERT INTO contact_us_users(name, phone, comment) VALUES($1, $2, $3)";
  const values = [name, phone, hearot]; // 'hearot' is mapped to the 'message' column

  try {
    await pool.query(queryText, values);
    res.json({ result: true });
    console.log(`Contact info for "${name}" saved to database successfully.`);
  } catch (err) {
    console.error("Error inserting into database:", err);
    res.json({ result: false });
  }
});

// <-- MODIFIED: Corrected '/api/calculate' to be async to handle logging
app.post("/api/calculate", async (req, res) => {
  // <-- MODIFIED: Added async
  const { chosenDiseasesWithSeverities } = req.body;

  if (!chosenDiseasesWithSeverities) {
    return res.status(400).json({
      error:
        "Missing required parameters: chosenDiseasesWithSeverities or currentModeDataKey",
    });
  }

  const newTotals = {
    generalDisability: 0,
    taxIncome: 0,
    specialServices: 0,
  };

  chosenDiseasesWithSeverities.forEach((entry) => {
    const fullDisease = findDiseasesById(entry.disease.id);

    // console.log(fullDisease);

    const foundSeverity = fullDisease.severities.find((sev) => {
      return sev.severityId === entry.selectedSeverity.severityId;
    });

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

  // <-- MODIFIED: Add logging to the 'disease_calculations' table
  try {
    const logQueryText =
      "INSERT INTO disease_calculations(calculation_data) VALUES($1)";
    const logValues = [
      {
        diseases: JSON.stringify(chosenDiseasesWithSeverities).map(
          (disease) => {
            return {
              disease: disease.disease,
              selectedSeverity: disease.selectedSeverity,
              totals: newTotals,
            };
          }
        ),
      },
    ];

    // Now we can safely 'await' the query
    await pool.query(logQueryText, logValues);
    console.log("Calculation logged to database successfully.");
  } catch (logErr) {
    console.error("Error logging calculation to database:", logErr);
    // Do not stop; continue to send response to user
  }
  // <-- END MODIFICATION

  // The 2-second timeout is still here as in your original file
  setTimeout(() => {
    res.json({ newTotals });
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
