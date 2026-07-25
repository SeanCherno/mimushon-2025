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
};

// Sourced from lib/articles.js so a new article automatically appears here
// without anyone having to remember to hand-edit a static XML file.
export default function sitemap() {
  const staticPages = [
    { path: "", key: "home", priority: 1.0 },
    { path: "about-us", key: "about-us", priority: 0.8 },
    { path: "articles", key: "articles", priority: 0.8 },
    { path: "glossary", key: "glossary", priority: 0.8 },
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
