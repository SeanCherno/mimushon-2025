import express from "express";
const { pipeline, BertTokenizer } = await import("@xenova/transformers");
import fs from "fs";
import cors from "cors";

let diseasesData = {};

fs.readFile("diseases.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }
  try {
    diseasesData = JSON.parse(data);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});

// const candidate_labels = diseasesData.categories
//   .flatMap((category) => catergory.diseases)
//   .map((disease) => disease.name);

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// const allDiseasesFlat = diseasesData.categories.flatMap(
//   (category) => category.diseases
// );

// API endpoint to get the entire diseases data structure
app.get("/api/diseases", (req, res) => {
  res.json(diseasesData);
});

// API endpoint to calculate the total percentage
app.post("/api/calculate", (req, res) => {
  const { chosenDiseasesWithSeverities, currentModeDataKey } = req.body;

  if (!chosenDiseasesWithSeverities || !currentModeDataKey) {
    return res.status(400).json({
      error:
        "Missing required parameters: chosenDiseasesWithSeverities or currentModeDataKey",
    });
  }

  const sum = chosenDiseasesWithSeverities.reduce((acc, entry) => {
    if (entry.selectedSeverity && entry.selectedSeverity[currentModeDataKey]) {
      return (
        acc +
        (1 - acc / 100) *
          (entry.selectedSeverity ? entry.selectedSeverity.percentage : 0)
      );
    }
    return 0;
  }, 0);

  res.json({ totalPercentage: Math.round(sum) });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
