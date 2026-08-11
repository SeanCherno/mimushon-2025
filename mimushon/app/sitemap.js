import { allArticles } from "../lib/articles";

const SITE_URL = "https://mimushon.co.il";

// Real per-page last-modified dates, carried over from the previous static
// sitemap.xml (not "now" for everything — an honest freshness signal is
// worth more to Google than a sitemap that always claims today).
const LAST_MODIFIED = {
  home: "2025-11-07",
  "about-us": "2026-07-25",
  articles: "2025-11-07",
  "about-book-of-impairments": "2025-11-07",
  "what-is-the-calculator": "2025-11-07",
  "how-the-calculation-works": "2025-11-07",
  "how-to-file-claim": "2025-11-07",
  "disability-percentage-appeal": "2025-11-07",
  "medical-committee-guide": "2026-05-21",
  "takana-15": "2026-05-21",
  glossary: "2026-05-21",
  "contact-us": "2026-07-27",
  accessibility: "2026-07-27",
  "disability-percentage-diabetes": "2026-08-02",
  "incapacity-degree": "2026-08-02",
  "disability-pension-amount": "2026-08-03",
  "disability-percentage-back": "2026-08-03",
  "disability-percentage-mental-health": "2026-08-03",
  "disability-eligibility": "2026-08-11",
  "disability-percentage-hearing": "2026-08-11",
  "disability-percentage-fibromyalgia": "2026-08-11",
  "deterioration-claim": "2026-08-11",
  "disability-benefits": "2026-08-11",
};

// Sourced from lib/articles.js so a new article automatically appears here
// without anyone having to remember to hand-edit a static XML file.
export default function sitemap() {
  const staticPages = [
    { path: "", key: "home", priority: 1.0 },
    { path: "about-us", key: "about-us", priority: 0.8 },
    { path: "articles", key: "articles", priority: 0.8 },
    { path: "glossary", key: "glossary", priority: 0.8 },
    { path: "contact-us", key: "contact-us", priority: 0.5 },
    { path: "accessibility", key: "accessibility", priority: 0.3 },
  ];

  const entries = staticPages.map(({ path, key, priority }) => ({
    url: path ? `${SITE_URL}/${path}` : `${SITE_URL}/`,
    lastModified: LAST_MODIFIED[key],
    priority,
  }));

  for (const article of allArticles) {
    entries.push({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: LAST_MODIFIED[article.slug] || LAST_MODIFIED.articles,
      priority: 0.8,
    });
  }

  return entries;
}
