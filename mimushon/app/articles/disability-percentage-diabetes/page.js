import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "אחוזי נכות על סוכרת — כמה נקבע ואיך (מדריך 2026)",
  description:
    "כמה אחוזי נכות מקבלים על סוכרת בביטוח לאומי? הטבלה המלאה לפי סוג הטיפול והסיבוכים, מה הם 'איברי מטרה', ואיך סיבוכי הסוכרת מעלים את האחוז.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/disability-percentage-diabetes",
  },
  openGraph: {
    title: "אחוזי נכות על סוכרת — המדריך המלא | מימושון",
    description: "הטבלה המלאה של אחוזי הנכות על סוכרת לפי טיפול וסיבוכים, לפי ספר הליקויים.",
    url: "https://mimushon.co.il/articles/disability-percentage-diabetes",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const DiabetesPage = () => {
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
        title="אחוזי נכות על סוכרת — כמה נקבע ואיך (מדריך 2026)"
        description="כמה אחוזי נכות מקבלים על סוכרת בביטוח לאומי? הטבלה המלאה לפי סוג הטיפול והסיבוכים."
        url="https://mimushon.co.il/articles/disability-percentage-diabetes"
        datePublished="2026-08-02"
        dateModified="2026-08-02"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "אחוזי נכות על סוכרת", url: "https://mimushon.co.il/articles/disability-percentage-diabetes" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              אחוזי נכות על סוכרת — כמה נקבע ואיך
            </h1>

            <p>
              סוכרת היא אחת המחלות הנפוצות ביותר שבגינן נקבעים אחוזי נכות בביטוח לאומי. האחוז אינו נקבע לפי עצם קיום המחלה, אלא לפי <strong>סוג הטיפול</strong> שאתם מקבלים ולפי <strong>נוכחות סיבוכים</strong> באיברי הגוף. במדריך זה נסביר בדיוק כיצד נקבע האחוז, ונציג את הטבלה המלאה מתוך ספר הליקויים (פרט 4).
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ רפואי או משפטי. הקביעה הסופית והמחייבת נעשית על ידי הוועדה הרפואית של ביטוח לאומי.</p>
            </blockquote>

            <h2>איך נקבעים אחוזי הנכות על סוכרת?</h2>
            <p>
              ספר הליקויים מדרג את הסוכרת לפי מדרג עולה של חומרת הטיפול והאיזון — מסוכרת המאוזנת בתזונה בלבד ועד סוכרת לא יציבה עם סיבוכים קשים. ככל שהטיפול אינטנסיבי יותר והמחלה פחות מאוזנת — האחוז גבוה יותר.
            </p>

            <table className="grade-table">
              <thead>
                <tr><th>המצב</th><th>אחוז נכות</th></tr>
              </thead>
              <tbody>
                <tr><td>היפרגליקמיה או סוכרת ללא צורך בטיפול תרופתי (תזונה ופעילות בלבד)</td><td>0%</td></tr>
                <tr><td>טיפול בכדורים או בזריקות ממשפחת GLP-1 (כמו אוזמפיק/ריבלסוס), מאוזנת</td><td>10%</td></tr>
                <tr><td>טיפול באינסולין, או בשילוב אינסולין וכדורים</td><td>20%</td></tr>
                <tr><td>טיפול אינטנסיבי (4+ זריקות ביום או משאבה), הסוכרת אינה מאוזנת</td><td>40%</td></tr>
                <tr><td>סוכרת לא יציבה עם אירועים קשים (חוסר נוירולוגי, חמצת, אובדן הכרה, או שני אירועי היפוגליקמיה קשים בשנתיים)</td><td>50%</td></tr>
                <tr><td>סיבוך חמור באיבר מטרה אחד (30%+) או שני סיבוכים (20%+ כל אחד)</td><td>65%</td></tr>
                <tr><td>שלושה סיבוכים חמורים לפחות (30%+ כל אחד) באיברי מטרה</td><td>100%</td></tr>
              </tbody>
            </table>

            <h2>מה הם "איברי מטרה"?</h2>
            <p>
              המונח "איברי מטרה" הוא לב העניין בסוכרת, ולעיתים גורם לבלבול. אלו הם האיברים שהסוכרת פוגעת בהם לאורך זמן:
            </p>
            <ul className="list-disc space-y-2">
              <li><strong>עיניים</strong> — רטינופתיה סוכרתית (פגיעה ברשתית).</li>
              <li><strong>כליות</strong> — נפרופתיה סוכרתית, חלבון בשתן (פרוטאינוריה).</li>
              <li><strong>מערכת העצבים</strong> — נוירופתיה (נימול, כאב, חולשה בגפיים).</li>
              <li><strong>כלי דם גדולים וקטנים</strong> — כולל הלב ומערכת כלי הדם (מחלת כלי דם היקפית או כלילית).</li>
            </ul>
            <p>
              חומרת כל סיבוך נמדדת לפי הסעיף הספציפי של אותו איבר בספר הליקויים. חשוב לדעת: לפי התקנות, לא נקבעת נכות נפרדת בעד ליקוי באיבר מטרה שחומרתו 50% או פחות — הסיבוך כבר "מגולם" בתוך דרגת הסוכרת של 65% או 100%.
            </p>

            <div className="tip-box">
              <strong>💡 טיפ:</strong> אם יש לכם סיבוכי סוכרת — הקפידו להביא לוועדה תיעוד מרופא מומחה לאותו איבר (רופא עיניים, נפרולוג, נוירולוג, קרדיולוג). סיבוכים לא מתועדים לא ייחשבו, וזה בדיוק מה שמעלה את האחוז מ-20% ל-65% ומעלה.
            </div>

            <h2>סוכרת הריון (גסטציונלית)</h2>
            <p>
              סוכרת הריון מטופלת כמצב זמני. לאחר הלידה, אחוזי הנכות בדרך כלל חוזרים ל-0%, אלא אם נותרו סיבוכים מתמשכים.
            </p>

            <h2>אילו מסמכים כדאי להכין?</h2>
            <ul className="list-disc space-y-2">
              <li>מכתב סיכום מרופא אנדוקרינולוג.</li>
              <li>תוצאות מעבדה — סוכר בדם והמוגלובין מסוכר (HbA1C).</li>
              <li>אם יש סיבוכים: צילום קרקעית העין, בדיקת שדה ראייה, איסוף שתן ל-24 שעות (מיקרואלבומין), ומכתבי סיכום מהמומחים הרלוונטיים.</li>
            </ul>

            <div className="example-box">
              <strong>🟢 רוצים הערכה מהירה?</strong> ה<Link href="/#calculator">מחשבון אחוזי הנכות של מימושון</Link> כולל שאלון אינטראקטיבי לסוכרת שמוביל אתכם דרך סוג הטיפול והסיבוכים ומגיע לאחוז המשוער — בחינם וללא הרשמה.
            </div>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/how-the-calculation-works">איך עובד החישוב המשוקלל</Link>
              {" | "}
              <Link href="/articles/medical-committee-guide">מה קורה בוועדה הרפואית</Link>
              {" | "}
              <Link href="/articles/about-book-of-impairments">ספר הליקויים</Link>
            </p>
            <p><Link href="/articles">← חזרה לכל המאמרים</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiabetesPage;
