import { Assistant } from "next/font/google"; // 1. The new way to import Google Fonts
import Script from "next/script"; // 2. The new way to add 3rd-party scripts
import "./global.css"; // Your global styles
import Header from "../components/content/Header"; // Assuming this is your header
import Footer from "../components/content/Footer"; // Assuming this is your footer
import PageTransitionWrapper from "../components/PageTransitionWrapper";
import CookieConsent from "../components/content/CookieConsent";

// Analytics IDs — read from environment so they can be rotated without code changes.
// Set NEXT_PUBLIC_GTM_ID and NEXT_PUBLIC_GA_ID in .env.local / your deployment env.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-N4TBR9S8";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-M68N1KQEZG";

// 3. Replaces your commented-out Google Font link
const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-assistant", // Optional: for use with Tailwind
});

const SITE_URL = "https://mimushon.co.il";
const SITE_NAME = "מימושון";
const DEFAULT_DESCRIPTION =
  "רוצים להעריך את אחוזי הנכות שלכם מביטוח לאומי? מחשבון אחוזי הנכות של מימושון יעזור לכם להבין את זכויותיכם. חישוב מהיר, פשוט וללא עלות.";
// Used as the fallback social-share image (og:image / twitter:image) on any
// page that doesn't define its own — real photography already used in the
// hero, not a placeholder.
const DEFAULT_OG_IMAGE = {
  url: "/images/hero-mimushon.webp",
  width: 1774,
  height: 887,
  alt: SITE_NAME,
};

// 4. The new "metadata" object (replaces most of your <head> tags)
export const metadata = {
  // Required for relative OG/Twitter image URLs (and next/og) to resolve to
  // absolute URLs. Without this Next.js warns and social crawlers can fail
  // to fetch the preview image.
  metadataBase: new URL(SITE_URL),

  // <title>מימושון - מחשבון אחוזי נכות</title>
  // `template` brands every child page's <title> consistently ("X | מימושון");
  // `default` is used only when a page (like the homepage) sets no title.
  title: {
    default: "מימושון - מחשבון אחוזי נכות",
    template: `%s | ${SITE_NAME}`,
  },

  // <meta name="description" content="..." />
  description: DEFAULT_DESCRIPTION,

  // <link rel="canonical" href="https://mimushon.co.il/" />
  alternates: {
    canonical: SITE_URL,
  },

  // <meta name="google-site-verification" content="..." />
  // Prefer setting NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in env to avoid
  // committing this token to source control.
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "CHkK81Ymof4xC5mffpgvoBWk8evHtJBOe8odmen_gy0",
  },

  // <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  manifest: "/manifest.json", // Assumes manifest.json is in your /public folder

  // <link rel="preload" as="image" href="/images/hero-mimushon.webp" ... />
  // (was pointing at a .jpg that doesn't exist on disk — a dead preload
  // hint that wasted an early request without ever warming the real asset)
  links: [
    {
      rel: "preload",
      href: "/images/hero-mimushon.webp",
      as: "image",
      fetchPriority: "high",
    },
  ],

  // <meta name="מימושון" content="..." />
  // This was a non-standard tag. 'application-name' is better.
  applicationName: SITE_NAME,

  // Favicon: `/favicon.png` and `/logo192.png` were never present in
  // /public (404s). No explicit `icons` override needed at all — Next.js's
  // app/favicon.ico file-convention route already serves the real icon with
  // correct sizing and cache-busting; an explicit override here would just
  // duplicate that <link rel="icon"> tag.

  // Sitewide Open Graph — previously entirely absent, so every shared link
  // (WhatsApp/Facebook/LinkedIn are how this audience actually shares URLs)
  // rendered as a bare link with no title/description/image card.
  openGraph: {
    title: "מימושון - מחשבון אחוזי נכות",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "he_IL",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },

  // Sitewide Twitter Card fallback — inherited by every page that doesn't
  // declare its own `twitter` block (all of them, today).
  twitter: {
    card: "summary_large_image",
    title: "מימושון - מחשבון אחוזי נכות",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

// Sitewide Organization structured data — establishes the entity behind the
// site for Google's Knowledge Graph / sitelinks search box eligibility.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
};

// 5. NEW: The viewport object, as requested by the error
// This replaces <meta name="viewport" ...> and <meta name="theme-color" ...>
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5", // brand indigo — was #000000 (CRA boilerplate default)
};

// This is your main App component
export default function RootLayout({ children }) {
  return (
    // 6. Your <html> tag
    <html lang="he" dir="rtl" className={assistant.className} suppressHydrationWarning>
      {/* The <head> is now automatically managed by Next.js */}

      {/* 7. Your <body> tag */}
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Google Tag Manager (noscript) - must be first in <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Your <noscript> tag */}
        <noscript>You need to enable JavaScript to run this app.</noscript>

        {/* Your old <div id="root"> is replaced by {children} */}
        {/* We add your Header/Footer here to make them global */}
        <Header />
        <main className="flex-1"><PageTransitionWrapper>{children}</PageTransitionWrapper></main>
        <Footer />
        <CookieConsent />

        {/* 8. All your 3rd-party scripts go here, using <Script> */}

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />

        {/* Sienna Accessibility — pinned to exact version + SRI hash to guard
            against supply-chain attacks. To upgrade: bump the version in the
            src URL, fetch the new hash from
            https://data.jsdelivr.com/v1/package/npm/sienna-accessibility@<ver>/flat
            and update the integrity attribute below. */}
        <Script
          strategy="afterInteractive"
          src="https://cdn.jsdelivr.net/npm/sienna-accessibility@2.2.331/dist/sienna-accessibility.umd.js"
          integrity="sha256-BiwjmW+jnAqCHj2W44s7SbdyVsot1+09q0uoF+/9Rqk="
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
