/**
 * Injects Article structured data (JSON-LD) for SEO.
 * Usage: <ArticleJsonLd title="..." description="..." url="https://..." dateModified="2025-11-07" />
 */
export default function ArticleJsonLd({ title, description, url, dateModified = "2025-11-07" }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    dateModified,
    inLanguage: "he",
    author: {
      "@type": "Organization",
      name: "מימושון",
      url: "https://mimushon.co.il",
    },
    publisher: {
      "@type": "Organization",
      name: "מימושון",
      url: "https://mimushon.co.il",
      logo: {
        "@type": "ImageObject",
        url: "https://mimushon.co.il/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
