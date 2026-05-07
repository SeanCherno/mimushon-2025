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

export default async function HomePage() {
  // 1. Fetch data on the server
  const categories = await getCategories();

  return (
    <div className="assistant-400">
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
            <FaqSection />
            <ProcessSection />
          </div>

          <div className="no-print"><ContactSection /></div>
        </div>
      </main>
    </div>
  );
}
