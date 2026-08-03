import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "גובה קצבת נכות כללית 2026 — כמה כסף מקבלים?",
  description:
    "הסכומים המעודכנים של קצבת נכות כללית לשנת 2026 לפי דרגת אי-כושר, התוספות לבן/בת זוג ולילדים, ומה קובע כמה תקבלו בפועל.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/disability-pension-amount",
  },
  openGraph: {
    title: "גובה קצבת נכות כללית 2026 — כמה מקבלים | מימושון",
    description: "הסכומים המעודכנים לשנת 2026 לפי דרגת אי-כושר, כולל תוספות לבני משפחה.",
    url: "https://mimushon.co.il/articles/disability-pension-amount",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const PensionAmountPage = () => {
  const customStyles = `
    .prose h2 { font-size: 1.8rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; }
    .prose h3 { font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
    .prose p, .prose ul, .prose li { margin-bottom: 1rem; line-height: 1.75; }
    .prose ul { list-style-position: inside; padding-right: 0.5rem; }
    .prose strong { font-weight: 600; }
    .prose blockquote { padding: 1rem 1.25rem; margin-right: 0; font-style: italic; color: #374151; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; }
    .prose a { color: #4f46e5; font-weight: 500; text-decoration: none; }
    .prose a:hover { text-decoration: underline; }
    .example-box { background: #dcfce7; border: 1px solid #86efac; padding: 1rem 1.25rem; border-radius: 12px; margin: 1.5rem 0; }
    .tip-box { background: #eef2ff; border: 1px solid #c7d2fe; padding: 1rem 1.25rem; border-radius: 12px; margin: 1.5rem 0; }
    .grade-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95rem; }
    .grade-table th, .grade-table td { border: 1px solid #e5e7eb; padding: 0.6rem 0.8rem; text-align: right; }
    .grade-table th { background: #eef2ff; color: #3730a3; font-weight: 600; }
    .grade-table td:last-child { font-weight: 700; color: #4f46e5; white-space: nowrap; }
  `;

  return (
    <>
      <ArticleJsonLd
        title="גובה קצבת נכות כללית 2026 — כמה כסף מקבלים?"
        description="הסכומים המעודכנים של קצבת נכות כללית לשנת 2026 לפי דרגת אי-כושר, והתוספות לבני משפחה."
        url="https://mimushon.co.il/articles/disability-pension-amount"
        datePublished="2026-08-03"
        dateModified="2026-08-03"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "גובה קצבת נכות כללית 2026", url: "https://mimushon.co.il/articles/disability-pension-amount" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              גובה קצבת נכות כללית 2026 — כמה כסף מקבלים?
            </h1>

            <p>
              זו כנראה השאלה הראשונה של כל מי שמתחיל תהליך: <strong>כמה כסף אקבל בפועל?</strong> התשובה מפתיעה רבים — הסכום אינו נקבע לפי אחוזי הנכות הרפואיים, אלא לפי <strong>דרגת אי-הכושר</strong> שנקבעת בנפרד. במדריך זה נציג את הסכומים המעודכנים לשנת 2026.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> הסכומים מעודכנים לינואר 2026 ומתעדכנים מדי שנה לפי השכר הממוצע במשק. לאימות הסכום המדויק במקרה שלכם — פנו לביטוח לאומי.</p>
            </blockquote>

            <h2>שני מדדים קובעים את הקצבה</h2>
            <ul className="list-disc space-y-2">
              <li><strong>אחוזי נכות רפואיים</strong> — קובעים רק את <em>הזכאות להיכנס לתהליך</em> (הסף הוא 60%, או 40% אם ליקוי בודד עומד על 25% ומעלה). זה מה שה<Link href="/#calculator">מחשבון שלנו</Link> מעריך.</li>
              <li><strong>דרגת אי-כושר</strong> — נקבעת על ידי פקיד תביעות, ובוחנת עד כמה הנכות פוגעת ביכולת ההשתכרות. <strong>זו הדרגה שקובעת את גובה הקצבה.</strong> קראו עוד על <Link href="/articles/incapacity-degree">דרגת אי-כושר</Link>.</li>
            </ul>

            <h2>סכומי הקצבה החודשית ליחיד — 2026</h2>
            <table className="grade-table">
              <thead>
                <tr><th>דרגת אי-כושר</th><th>קצבה חודשית</th></tr>
              </thead>
              <tbody>
                <tr><td>100% (וגם 75% ומעלה)</td><td>4,771 ₪</td></tr>
                <tr><td>74%</td><td>3,211 ₪</td></tr>
                <tr><td>65%</td><td>2,894 ₪</td></tr>
                <tr><td>60%</td><td>2,718 ₪</td></tr>
              </tbody>
            </table>
            <p>
              דרגת אי-כושר של <strong>75% ומעלה מזכה בקצבה מלאה של 100%</strong>. מתחת ל-60% אי-כושר, בדרך כלל אין זכאות לקצבה חודשית.
            </p>

            <h2>תוספות לבני משפחה</h2>
            <p>למקבל קצבה מלאה נוספות תוספות משמעותיות:</p>
            <ul className="list-disc space-y-2">
              <li><strong>תוספת לבן/בת זוג</strong> — כ-1,458 ₪, כך שקצבה מלאה עם בן/בת זוג מגיעה ל<strong>כ-6,229 ₪ בחודש</strong> (בכפוף לתנאי הכנסה).</li>
              <li><strong>תוספת לכל ילד</strong> — כ-1,214 ₪ לילד, עבור עד שני ילדים.</li>
            </ul>

            <div className="tip-box">
              <strong>💡 חשוב לדעת:</strong> קצבת הנכות הכללית אינה הזכות היחידה. מי שזקוק לעזרה בפעולות היום-יום עשוי להיות זכאי גם ל<strong>קצבת שירותים מיוחדים</strong> (סכום נוסף), ואחוזי נכות גבוהים עשויים לזכות בפטור ממס הכנסה ובהטבות נוספות.
            </div>

            <h2>איך יודעים כמה מגיע לי לפני הוועדה?</h2>
            <p>
              אי אפשר לדעת בוודאות מראש, אבל אפשר להעריך. השלב הראשון הוא לדעת את אחוזי הנכות הרפואיים המשוערים שלכם — ומשם להבין אם אתם עוברים את הסף לתהליך.
            </p>

            <div className="example-box">
              <strong>🟢 התחילו כאן:</strong> ה<Link href="/#calculator">מחשבון אחוזי הנכות של מימושון</Link> מעריך את האחוז הרפואי בחינם, ומראה אם אתם עומדים בסף לקצבת נכות כללית — צעד-אחר-צעד.
            </div>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/incapacity-degree">דרגת אי-כושר</Link>
              {" | "}
              <Link href="/articles/how-to-file-claim">איך מגישים תביעה</Link>
              {" | "}
              <Link href="/articles/medical-committee-guide">הוועדה הרפואית</Link>
            </p>
            <p><Link href="/articles">← חזרה לכל המאמרים</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PensionAmountPage;
