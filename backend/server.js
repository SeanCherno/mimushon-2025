import express from "express";
import fs from "fs";
import cors from "cors";

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
    if (entry.selectedSeverity) {
      modes.forEach((mode) => {
        if (entry.selectedSeverity[mode.dataKey]) {
          newTotals[mode.id] +=
            (1 - newTotals[mode.id] / 100) *
            (entry.selectedSeverity ? entry.selectedSeverity.percentage : 0);
        }
      });
    }
  });

  res.json({ newTotals });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
