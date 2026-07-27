import Link from "next/link";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "הצהרת נגישות",
  description:
    "הצהרת הנגישות של אתר מימושון — מחשבון אחוזי נכות. פירוט רמת הנגישות באתר, ההתאמות שבוצעו ודרכי פנייה בנושא נגישות.",
  alternates: {
    canonical: "https://mimushon.co.il/accessibility",
  },
  openGraph: {
    title: "הצהרת נגישות | מימושון",
    description: "הצהרת הנגישות של אתר מימושון — מחשבון אחוזי נכות.",
    url: "https://mimushon.co.il/accessibility",
    type: "website",
    images: ["/images/hero-photo.webp"],
  },
};

export default function AccessibilityPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "הצהרת נגישות", url: "https://mimushon.co.il/accessibility" },
        ]}
      />
      <div className="py-12 sm:py-16 bg-indigo-50" dir="rtl">
        <div className="container mx-auto px-6 max-w-3xl bg-white p-8 sm:p-12 rounded-lg shadow-md text-right text-gray-700 leading-relaxed">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
            הצהרת נגישות
          </h1>
          <p className="text-center text-gray-400 text-sm mb-8">עודכן לאחרונה: יולי 2026</p>

          <p className="mb-4">
            אתר מימושון (להלן: &quot;האתר&quot;) רואה חשיבות רבה במתן שירות שוויוני
            ונגיש לכלל המשתמשים, לרבות אנשים עם מוגבלות. אנו פועלים כדי שהאתר יהיה
            נגיש ונוח לשימוש עבור כמה שיותר אנשים, מתוך אמונה שלכל אדם מגיעה הזכות
            לקבל מידע באופן עצמאי, מכובד ושוויוני.
          </p>

          <h2 className="text-xl font-bold text-indigo-800 mt-8 mb-3">רמת הנגישות באתר</h2>
          <p className="mb-4">
            האתר נבנה בהתאם להנחיות מסמך הנגישות הבינלאומי{" "}
            <strong>WCAG 2.1</strong> ברמת התאמה <strong>AA</strong>, ובהתאם לתקן
            הישראלי <strong>ת&quot;י 5568</strong> ולתקנות שוויון זכויות לאנשים עם
            מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013.
          </p>

          <h2 className="text-xl font-bold text-indigo-800 mt-8 mb-3">מה כולל השירות הנגיש</h2>
          <ul className="list-disc pr-6 space-y-2 mb-4">
            <li>מבנה סמנטי תקין ותמיכה בקוראי מסך.</li>
            <li>ניווט מלא באמצעות מקלדת, ללא תלות בעכבר.</li>
            <li>טקסט חלופי (alt) לתמונות ולאייקונים בעלי משמעות.</li>
            <li>תמיכה מלאה בכיווניות מימין לשמאל (עברית).</li>
            <li>ניגודיות צבעים וגודל טקסט קריאים.</li>
            <li>
              רכיב נגישות ייעודי המאפשר, בין היתר, הגדלת טקסט, שינוי ניגודיות,
              הדגשת קישורים ועצירת אנימציות. ניתן להפעילו דרך כפתור הנגישות
              שבפינת המסך.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-indigo-800 mt-8 mb-3">מגבלות ידועות</h2>
          <p className="mb-4">
            למרות מאמצינו להנגיש את כלל הדפים והרכיבים, ייתכן שיימצאו חלקים באתר
            שטרם הונגשו במלואם, או תכנים של צד שלישי שאינם בשליטתנו המלאה. אנו
            ממשיכים לשפר את נגישות האתר באופן שוטף.
          </p>

          <h2 className="text-xl font-bold text-indigo-800 mt-8 mb-3">פנייה בנושא נגישות</h2>
          <p className="mb-4">
            נתקלתם בקושי בגלישה או בבעיית נגישות? נשמח לדעת ולתקן. ניתן לפנות אלינו
            דרך{" "}
            <Link href="/contact-us" className="text-indigo-600 underline font-medium">
              עמוד יצירת הקשר
            </Link>
            , ונטפל בפנייה בהקדם האפשרי. בפנייתכם נשמח אם תפרטו את הדף שבו נתקלתם
            בבעיה, את סוג הבעיה, ואת סוג הדפדפן והמכשיר שבהם השתמשתם.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            הצהרת נגישות זו נכתבה עבור אתר מימושון והיא נתונה לעדכון מעת לעת בהתאם
            לשיפורים המבוצעים באתר.
          </p>
        </div>
      </div>
    </>
  );
}
