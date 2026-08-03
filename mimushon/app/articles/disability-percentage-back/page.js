import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "אחוזי נכות על כאבי גב ופריצת דיסק — המדריך המלא",
  description:
    "כמה אחוזי נכות מקבלים על כאבי גב, פריצת דיסק ובעיות בעמוד השדרה? למה ה-MRI לא קובע לבד, ואיך הגבלת התנועה והפגיעה העצבית נמדדות.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/disability-percentage-back",
  },
  openGraph: {
    title: "אחוזי נכות על כאבי גב ופריצת דיסק | מימושון",
    description: "איך נמדדים אחוזי הנכות על עמוד השדרה — הגבלת תנועה, קיבוע ופגיעה עצבית.",
    url: "https://mimushon.co.il/articles/disability-percentage-back",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const BackPage = () => {
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
        title="אחוזי נכות על כאבי גב ופריצת דיסק — המדריך המלא"
        description="איך נמדדים אחוזי הנכות על עמוד השדרה — הגבלת תנועה, קיבוע ופגיעה עצבית."
        url="https://mimushon.co.il/articles/disability-percentage-back"
        datePublished="2026-08-03"
        dateModified="2026-08-03"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "אחוזי נכות על כאבי גב", url: "https://mimushon.co.il/articles/disability-percentage-back" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              אחוזי נכות על כאבי גב ופריצת דיסק
            </h1>

            <p>
              בעיות גב הן מהסיבות הנפוצות ביותר לתביעת נכות בישראל — ומהמבלבלות ביותר. אנשים רבים מגיעים עם צילום MRI שמראה פריצת דיסק ומצפים לאחוזים גבוהים, ומופתעים מהתוצאה. הסיבה: ספר הליקויים <strong>לא מדרג את הממצא בהדמיה — אלא את הפגיעה התפקודית</strong>.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ רפואי או משפטי. הקביעה הסופית נעשית על ידי הוועדה הרפואית של ביטוח לאומי.</p>
            </blockquote>

            <h2>הכלל החשוב: לא ה-MRI קובע</h2>
            <p>
              פריצת דיסק כשלעצמה, אם היא התרפאה, נקבעת ל<strong>0%</strong>. האחוזים ניתנים לפי <strong>שני דברים</strong> שנותרו בעקבותיה:
            </p>
            <ul className="list-disc space-y-2">
              <li><strong>הגבלת התנועה</strong> בעמוד השדרה — כמה טווח התנועה נפגע.</li>
              <li><strong>הפגיעה העצבית</strong> — נימול, חולשה או כאב מקרין לרגל/יד (רדיקולופתיה), שנמדדת בסעיף נפרד.</li>
            </ul>
            <p>לכן שני אנשים עם אותו MRI יכולים לקבל אחוזים שונים לגמרי — לפי מידת הפגיעה בתפקוד.</p>

            <h2>אחוזי נכות לפי הגבלת תנועה בעמוד השדרה</h2>
            <table className="grade-table">
              <thead>
                <tr><th>המצב</th><th>אחוז נכות</th></tr>
              </thead>
              <tbody>
                <tr><td>הגבלה קלה (מותני / צווארי)</td><td>10%</td></tr>
                <tr><td>הגבלה בינונית</td><td>20%</td></tr>
                <tr><td>הגבלה קשה</td><td>30%</td></tr>
              </tbody>
            </table>

            <h2>אחוזי נכות על קיבוע (Ankylosis) של עמוד השדרה המותני</h2>
            <table className="grade-table">
              <thead>
                <tr><th>המצב</th><th>אחוז נכות</th></tr>
              </thead>
              <tbody>
                <tr><td>קיבוע במצב נוח (שמירה על יציבה תקינה)</td><td>30%</td></tr>
                <tr><td>קיבוע במצב לא נוח (שינוי ניכר ביציבה)</td><td>40%</td></tr>
                <tr><td>דפורמציה קשה, יציבה לא טבעית</td><td>50%</td></tr>
              </tbody>
            </table>

            <h2>שבר בגוף חוליה שהתרפא</h2>
            <table className="grade-table">
              <thead>
                <tr><th>המצב</th><th>אחוז נכות</th></tr>
              </thead>
              <tbody>
                <tr><td>התרפא ללא תזוזה וללא הגבלת תנועה</td><td>5%</td></tr>
                <tr><td>תזוזה בעצם ללא הגבלת תנועה</td><td>10%</td></tr>
                <tr><td>תזוזה עם שינויים ניווניים (ארתרוזיס)</td><td>20%</td></tr>
              </tbody>
            </table>

            <div className="tip-box">
              <strong>💡 טיפ:</strong> מה שמעלה את האחוזים בתביעת גב הוא <strong>תיעוד תפקודי</strong> — בדיקת רופא אורתופד/נוירולוג המתעדת את מגבלת טווח התנועה במעלות, ובדיקת EMG המוכיחה פגיעה עצבית אם קיימת. ממצא הדמיה לבדו לא מספיק.
            </div>

            <div className="example-box">
              <strong>🟢 רוצים הערכה מהירה?</strong> ה<Link href="/#calculator">מחשבון של מימושון</Link> כולל את סעיפי עמוד השדרה — בוחרים את מידת ההגבלה ומקבלים אומדן, בחינם.
            </div>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/how-the-calculation-works">איך עובד החישוב המשוקלל</Link>
              {" | "}
              <Link href="/articles/medical-committee-guide">הוועדה הרפואית</Link>
              {" | "}
              <Link href="/articles/disability-percentage-appeal">ערעור על אחוזי נכות</Link>
            </p>
            <p><Link href="/articles">← חזרה לכל המאמרים</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackPage;
