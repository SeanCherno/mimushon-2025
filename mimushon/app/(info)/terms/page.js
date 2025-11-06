import TermsPage from "../../../components/content/TermsPage"; // Adjust path

// Page-specific SEO
export const metadata = {
  title: "תנאי שימוש | מימושון",
  description: "קרא את תנאי השימוש עבור מחשבון אחוזי הנכות של מימושון.",
  robots: "noindex",
};

export default function Page() {
  // We wrap it so it's a Server Component by default
  return <TermsPage />;
}
