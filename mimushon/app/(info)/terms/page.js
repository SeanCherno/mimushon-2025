import TermsPage from "../../../components/content/TermsPage"; // Adjust path

// Page-specific SEO
export const metadata = {
  title: "תנאי שימוש | מימושון",
};

export default function Page() {
  // We wrap it so it's a Server Component by default
  return <TermsPage />;
}
