import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "אחוזי נכות על דיכאון וחרדה — כמה נקבע ואיך",
  description:
    "כמה אחוזי נכות מקבלים על דיכאון, חרדה והפרעות נפשיות בביטוח לאומי? הטבלה המלאה לפי חומרת המצב, התפקוד וההשפעה של הטיפול, ואילו מסמכים להכין.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/disability-percentage-mental-health",
  },
  openGraph: {
    title: "אחוזי נכות על דיכאון וחרדה | מימושון",
    description: "איך נקבעים אחוזי נכות נפשית — לפי חומרה, תפקוד ותגובה לטיפול.",
    url: "https://mimushon.co.il/articles/disability-percentage-mental-health",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const MentalHealthPage = () => {
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
        title="אחוזי נכות על דיכאון וחרדה — כמה נקבע ואיך"
        description="הטבלה המלאה של אחוזי הנכות על דיכאון, חרדה והפרעות נפשיות לפי חומרה, תפקוד ותגובה לטיפול."
        url="https://mimushon.co.il/articles/disability-percentage-mental-health"
        datePublished="2026-08-03"
        dateModified="2026-08-03"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "אחוזי נכות על דיכאון וחרדה", url: "https://mimushon.co.il/articles/disability-percentage-mental-health" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              אחוזי נכות על דיכאון וחרדה
            </h1>

            <p>
              נכות נפשית מוכרת באופן מלא בביטוח לאומי, בדיוק כמו נכות גופנית. דיכאון, חרדה, הפרעות מצב רוח והפרעות דחק יכולים לזכות באחוזי נכות משמעותיים — אבל האחוז אינו נקבע לפי האבחנה עצמה, אלא לפי <strong>חומרת המצב, מידת הפגיעה בתפקוד, והתגובה לטיפול</strong>.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ רפואי או משפטי. הקביעה הסופית נעשית על ידי ועדה רפואית בתחום הפסיכיאטריה.</p>
            </blockquote>

            <h2>איך נקבעים אחוזי נכות נפשית?</h2>
            <p>
              המדרג עולה לפי כמה שאלות: האם המחלה בהפוגה (רמיסיה) או פעילה? כמה היא פוגעת בתפקוד היום-יומי, בעבודה ובקשרים החברתיים? האם נדרש טיפול תרופתי קבוע, ואם כן — האם הוא עוזר? האם היו אשפוזים?
            </p>

            <h2>הטבלה — הפרעות מצב רוח, חרדה ודחק</h2>
            <table className="grade-table">
              <thead>
                <tr><th>המצב</th><th>אחוז נכות</th></tr>
              </thead>
              <tbody>
                <tr><td>רמיסיה מלאה, ללא פגיעה בתפקוד</td><td>0%</td></tr>
                <tr><td>סימנים קלים שנותרו, הפרעה קלה בתפקוד</td><td>10%</td></tr>
                <tr><td>סימנים קליניים קלים פעילים, צורך בטיפול תרופתי</td><td>20%</td></tr>
                <tr><td>רמיסיה חלקית עם סימנים ברורים בדרגה בינונית</td><td>30%</td></tr>
                <tr><td>אפיזודות חוזרות, סימני דיכאון/חרדה ברורים, פגיעה ניכרת</td><td>50%</td></tr>
                <tr><td>הפרעה פעילה קשה, פגיעה חמורה בתפקוד הנפשי והחברתי</td><td>70%</td></tr>
                <tr><td>מחלה פעילה חמורה, צורך בהשגחה מתמדת או אשפוז מלא</td><td>100%</td></tr>
              </tbody>
            </table>
            <p>
              הפרעות פסיכוטיות, סכיזופרניה ומצבים נפשיים אחרים מדורגים בסולם דומה של 0%–100% לפי אותם עקרונות.
            </p>

            <div className="tip-box">
              <strong>💡 טיפ:</strong> המפתח בתביעת נכות נפשית הוא <strong>תיעוד רציף</strong>: סיכומי טיפול מפסיכיאטר, מרשמים קבועים, תיעוד אשפוזים, ומכתב שמתאר כיצד המצב פוגע בעבודה ובחיי היום-יום. ביקור חד-פעמי אינו מספיק — רצף טיפולי לאורך זמן הוא שמבסס את החומרה.
            </div>

            <h2>אילו מסמכים כדאי להכין?</h2>
            <ul className="list-disc space-y-2">
              <li>מכתב סיכום מפסיכיאטר מטפל, כולל אבחנה ומהלך הטיפול.</li>
              <li>רשימת הטיפול התרופתי והתגובה אליו.</li>
              <li>סיכומי אשפוז פסיכיאטרי, אם היו.</li>
              <li>תיאור ההשפעה על התפקוד — עבודה, לימודים, קשרים חברתיים ותפקוד יום-יומי.</li>
            </ul>

            <div className="example-box">
              <strong>🟢 רוצים הערכה מהירה?</strong> ה<Link href="/#calculator">מחשבון של מימושון</Link> כולל את הסעיפים הפסיכיאטריים — בוחרים את המצב הקרוב ביותר ומקבלים אומדן, בחינם ובדיסקרטיות.
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

export default MentalHealthPage;
