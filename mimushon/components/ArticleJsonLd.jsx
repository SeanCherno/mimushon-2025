/**
 * Injects Article structured data (JSON-LD) for SEO.
 * Usage: <ArticleJsonLd title="..." description="..." url="https://..." datePublished="2025-11-07" dateModified="2025-11-07" />
 *
 * `datePublished` should reflect when the article first went live; pass the
 * real date per article rather than relying on a shared default — a wrong
 * publish date is a worse freshness signal to Google than no date at all.
 */
export default function ArticleJsonLd({
  title,
  description,
  url,
  image = "https://mimushon.co.il/images/hero-mimushon.webp",
  datePublished,
  dateModified,
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image,
    datePublished: datePublished || dateModified,
    dateModified: dateModified || datePublished,
    inLanguage: "he",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
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
