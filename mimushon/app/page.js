import HeroSection from "../components/content/HeroSection";
import HowWeHelpSection from "../components/content/HowWeHelpSection";
import ProcessSection from "../components/content/ProcessSection";
import ContactSection from "../components/content/ContactSection";
import AboutCalculatorSection from "../components/content/AboutCalculatorSection";
import CalculatorExplanation from "../components/content/CalculatorExplanation";
import FaqSection from "../components/content/FaqSection";

// Import the new Client Component we're about to create
import Calculator from "../components/Calculator";
import { getCategoriesData } from "../lib/data-fetchers";

// Function to fetch your initial data
async function getCategories() {
  try {
    const data = await getCategoriesData();
    return data;
  } catch (error) {
    console.error("Failed to fetch categories data:", error);
    return []; // Return an empty array on error
  }
}

// WebApplication structured data for the calculator itself — makes the tool
// (not just the surrounding content) eligible for Google's software/app rich
// results. No aggregateRating is included since there's no real review data
// to back one; a fabricated rating would violate Google's structured-data
// policies.
const calculatorJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "מחשבון אחוזי נכות - מימושון",
  description:
    "מחשבון אחוזי נכות חינמי המבוסס על ספר הליקויים הרשמי של ביטוח לאומי, כולל נוסחת השקלול המלאה.",
  url: "https://mimushon.co.il/",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  inLanguage: "he",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ILS",
  },
};

export default async function HomePage() {
  // 1. Fetch data on the server
  const categories = await getCategories();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }}
      />
      <main>
        <div className=" bg-gradient-to-br from-indigo-50 to-indigo-50">
          {/* Your static Hero section */}
          <div className="no-print"><HeroSection /></div>

          <div id="calculator"></div>

          {/* This is the key:
            We pass the server-fetched 'categories' as a prop
            to the Client Component.
          */}
          <Calculator initialCategories={categories} />

          {/* All your other static content.
            This is all server-rendered HTML.
          */}

          <div className="no-print">
            <HowWeHelpSection />
            <AboutCalculatorSection />
            <CalculatorExplanation />
            <ProcessSection />
            <FaqSection />
          </div>

          <div className="no-print"><ContactSection /></div>
        </div>
      </main>
    </div>
  );
}
