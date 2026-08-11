import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "מי זכאי לקצבת נכות כללית? תנאי הזכאות המלאים (2026)",
  description:
    "מי זכאי לקצבת נכות כללית מביטוח לאומי? שלושת התנאים — סף רפואי, דרגת אי-כושר ומבחן הכנסה — מוסברים בפשטות, כולל המסלול לעקרת/עקר בית.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/disability-eligibility",
  },
  openGraph: {
    title: "מי זכאי לקצבת נכות כללית? | מימושון",
    description: "שלושת התנאים לזכאות לקצבת נכות כללית — סף רפואי, דרגת אי-כושר ומבחן הכנסה.",
    url: "https://mimushon.co.il/articles/disability-eligibility",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const EligibilityPage = () => {
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
        title="מי זכאי לקצבת נכות כללית? תנאי הזכאות המלאים (2026)"
        description="מי זכאי לקצבת נכות כללית מביטוח לאומי? שלושת התנאים — סף רפואי, דרגת אי-כושר ומבחן הכנסה — מוסברים בפשטות."
        url="https://mimushon.co.il/articles/disability-eligibility"
        datePublished="2026-08-11"
        dateModified="2026-08-11"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "מי זכאי לקצבת נכות כללית", url: "https://mimushon.co.il/articles/disability-eligibility" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              מי זכאי לקצבת נכות כללית?
            </h1>

            <p>
              זו כנראה השאלה הראשונה שכל אחד שואל: <strong>האם בכלל מגיע לי?</strong> קצבת נכות כללית אינה נקבעת רק לפי מצב רפואי — היא תלויה בשלושה תנאים נפרדים שצריכים להתקיים <strong>יחד</strong>. הרבה אנשים עומדים באחד ולא באחר, ולכן חשוב להבין את כולם. במדריך זה נפרק את שלושת התנאים בשפה פשוטה.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ רפואי או משפטי. הזכאות הסופית נקבעת על ידי ביטוח לאומי בלבד.</p>
            </blockquote>

            <h2>תנאי מקדים: מי בכלל יכול להגיש</h2>
            <ul className="list-disc space-y-2">
              <li><strong>גיל:</strong> מגיל 18 ועד גיל הפרישה. מתחת לגיל 18 ומעל גיל הפרישה יש מסלולים אחרים.</li>
              <li><strong>תושבוּת:</strong> תושב/ת ישראל.</li>
              <li>מי שכבר מקבל קצבת זקנה בדרך כלל אינו במסלול הזה.</li>
            </ul>

            <h2>שלושת התנאים המצטברים</h2>

            <h3>1. הסף הרפואי — אחוזי נכות רפואיים</h3>
            <p>
              קודם כול נקבעים אחוזי הנכות הרפואיים לפי ספר הליקויים (זה החלק ש<Link href="/#calculator">המחשבון שלנו</Link> אומד). כדי לעבור את הסף צריך:
            </p>
            <table className="grade-table">
              <thead>
                <tr><th>המצב</th><th>הסף הנדרש</th></tr>
              </thead>
              <tbody>
                <tr><td>נכות רפואית משוקללת כללית</td><td>60% ומעלה</td></tr>
                <tr><td>או — כאשר ליקוי אחד לפחות הוא 25% ומעלה</td><td>40% ומעלה</td></tr>
              </tbody>
            </table>
            <p>
              כלומר, גם מי שהגיע ל-40% בלבד יכול לעבור את הסף הרפואי — בתנאי שאחד הליקויים שלו הוא לפחות 25%. זו נקודה שרבים מפספסים.
            </p>

            <h3>2. דרגת אי-כושר — כמה הנכות פוגעת ביכולת לעבוד</h3>
            <p>
              עברתם את הסף הרפואי? זה עדיין לא מספיק. ביטוח לאומי בוחן בנפרד עד כמה הנכות <strong>פוגעת ביכולת ההשתכרות</strong> שלכם — זו <Link href="/articles/incapacity-degree">דרגת אי-הכושר</Link>. כדי לקבל קצבה נדרשת דרגת אי-כושר של <strong>50% לפחות</strong>. דרגת אי-הכושר (60%, 65%, 74% או 100%) היא גם זו שקובעת את <Link href="/articles/disability-pension-amount">גובה הקצבה בפועל</Link>.
            </p>

            <h3>3. מבחן הכנסה — כמה אתם משתכרים</h3>
            <p>
              הקצבה מיועדת למי שיכולת ההשתכרות שלו נפגעה. לכן קיים מבחן הכנסה: מי שממשיך להשתכר מעל תקרה מסוימת (המחושבת כאחוז מהשכר הממוצע במשק) עלול לא להיות זכאי, או להיות זכאי לקצבה חלקית. עצם העבודה אינה פוסלת אוטומטית — אבל גובה ההכנסה משפיע.
            </p>

            <div className="tip-box">
              <strong>💡 חשוב לזכור:</strong> שלושת התנאים הם מצטברים. אפשר להיות עם 70% נכות רפואית ועדיין לא לקבל קצבה — אם דרגת אי-הכושר נמוכה מ-50% או אם ההכנסה גבוהה מדי. הבנת שלושתם עוזרת להגיע לוועדה עם ציפיות ריאליות.
            </div>

            <h2>מסלול מיוחד: עקרת בית / עקר בית</h2>
            <p>
              למי שאינו עובד ועיקר עיסוקו הוא משק הבית קיים מסלול נפרד ("נכות עקרת בית"), שבו הבחינה מתמקדת ביכולת לתפקד במשק הבית ולא ביכולת ההשתכרות. התנאים והחישוב שונים מהמסלול הרגיל.
            </p>

            <div className="example-box">
              <strong>🟢 רוצים לבדוק את הסף הרפואי?</strong> ה<Link href="/#calculator">מחשבון אחוזי הנכות של מימושון</Link> נותן לכם אומדן משוקלל לפי ספר הליקויים — כדי לראות אם אתם עוברים את הסף של 40%/60% — בחינם וללא הרשמה. שימו לב: המחשבון אומד את החלק הרפואי בלבד; דרגת אי-הכושר ומבחן ההכנסה נקבעים בנפרד.
            </div>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/incapacity-degree">דרגת אי-כושר</Link>
              {" | "}
              <Link href="/articles/how-to-file-claim">איך מגישים תביעה</Link>
              {" | "}
              <Link href="/articles/disability-pension-amount">גובה הקצבה</Link>
            </p>
            <p><Link href="/articles">← חזרה לכל המאמרים</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EligibilityPage;
