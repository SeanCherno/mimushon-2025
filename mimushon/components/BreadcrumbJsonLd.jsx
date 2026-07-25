/**
 * Injects BreadcrumbList structured data (JSON-LD) for SEO.
 * Usage: <BreadcrumbJsonLd items={[{ name: "בית", url: "https://..." }, { name: "מאמרים", url: "https://..." }]} />
 */
export default function BreadcrumbJsonLd({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
