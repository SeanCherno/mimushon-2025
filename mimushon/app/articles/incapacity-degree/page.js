import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "דרגת אי-כושר — המדד שקובע את גובה קצבת הנכות הכללית",
  description:
    "אחוזי הנכות הרפואיים הם רק חצי מהסיפור. דרגת אי-הכושר היא שקובעת אם וכמה קצבה תקבלו — הסבר מלא על הסף, על 60%, 65%, 74% ו-100%, ואיך היא נקבעת.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/incapacity-degree",
  },
  openGraph: {
    title: "דרגת אי-כושר — המדד שקובע את הקצבה | מימושון",
    description: "ההבדל בין אחוזי נכות רפואיים לדרגת אי-כושר, ואיך היא קובעת את גובה הקצבה.",
    url: "https://mimushon.co.il/articles/incapacity-degree",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const IncapacityPage = () => {
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
    .grade-table td:first-child { font-weight: 700; color: #4f46e5; white-space: nowrap; }
  `;

  return (
    <>
      <ArticleJsonLd
        title="דרגת אי-כושר — המדד שקובע את גובה קצבת הנכות הכללית"
        description="ההבדל בין אחוזי נכות רפואיים לדרגת אי-כושר, ואיך היא קובעת אם וכמה קצבה תקבלו."
        url="https://mimushon.co.il/articles/incapacity-degree"
        datePublished="2026-08-02"
        dateModified="2026-08-02"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "דרגת אי-כושר", url: "https://mimushon.co.il/articles/incapacity-degree" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              דרגת אי-כושר — המדד שקובע את הקצבה
            </h1>

            <p>
              זו אחת הנקודות המבלבלות ביותר בתביעת נכות כללית: אנשים רבים חושבים שאחוזי הנכות הרפואיים קובעים את גובה הקצבה — אבל זה לא מדויק. בנכות כללית יש <strong>שני מדדים נפרדים</strong>, ורק השני שבהם קובע כמה כסף תקבלו בפועל.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ משפטי. דרגת אי-הכושר נקבעת על ידי פקיד תביעות בביטוח לאומי לפי נסיבותיו של כל אדם.</p>
            </blockquote>

            <h2>שני מדדים, לא אחד</h2>
            <p>קצבת נכות כללית נקבעת בשני שלבים נפרדים:</p>
            <ul className="list-disc space-y-2">
              <li><strong>1. אחוזי נכות רפואיים</strong> — נקבעים על ידי הוועדה הרפואית לפי ספר הליקויים (זה מה שה<Link href="/#calculator">מחשבון שלנו</Link> מעריך). המדד הזה בלבד קובע רק את <em>הזכאות להיכנס לתהליך</em>.</li>
              <li><strong>2. דרגת אי-כושר</strong> — נקבעת על ידי פקיד תביעות (לא רופא), ובוחנת עד כמה הנכות פוגעת ב<em>יכולת ההשתכרות</em> שלכם. <strong>זו הדרגה שקובעת את גובה הקצבה.</strong></li>
            </ul>

            <h2>השלב הראשון: הסף הרפואי</h2>
            <p>כדי בכלל להיבחן לדרגת אי-כושר, צריך לעבור סף רפואי מינימלי:</p>
            <ul className="list-disc space-y-2">
              <li><strong>60% נכות רפואית</strong> — הסף הכללי, או</li>
              <li><strong>40% נכות רפואית</strong> — אם אחד הליקויים לפחות עומד על <strong>25% ומעלה</strong>.</li>
            </ul>
            <p>מתחת לספים אלו אין בסיס לקצבת נכות כללית (אך ייתכנו הטבות אחרות, כמו נקודות זיכוי במס).</p>

            <h2>השלב השני: דרגות אי-הכושר</h2>
            <p>
              אם עברתם את הסף הרפואי, פקיד התביעות קובע את דרגת אי-הכושר. כדי לקבל קצבה, דרגת אי-הכושר צריכה להיות <strong>50% לפחות</strong>. הדרגות המזכות בקצבה מלאה הן:
            </p>

            <table className="grade-table">
              <thead>
                <tr><th>דרגת אי-כושר</th><th>המשמעות</th></tr>
              </thead>
              <tbody>
                <tr><td>60%</td><td>דרגת הכניסה לקצבה מלאה.</td></tr>
                <tr><td>65%</td><td>אי-כושר בשיעור גבוה.</td></tr>
                <tr><td>74%</td><td>אי-כושר גבוה מאוד.</td></tr>
                <tr><td>100%</td><td>אובדן כושר עבודה מלא — הקצבה המקסימלית.</td></tr>
              </tbody>
            </table>

            <p>
              ככל שדרגת אי-הכושר גבוהה יותר, כך הקצבה החודשית גבוהה יותר. בין 60% ל-74% משולמת קצבה חלקית יחסית לדרגה, ו-75% ומעלה מזכה בדרגת אי-כושר מלאה (100%) — הקצבה המקסימלית.
            </p>

            <div className="tip-box">
              <strong>💡 חשוב:</strong> אפשר לקבל אחוזי נכות רפואיים גבוהים (למשל 70%) ועדיין לקבל דרגת אי-כושר נמוכה — אם הפקיד סבור שעדיין ניתן להשתכר. וההפך: מצב רפואי שנראה "בינוני" יכול להצדיק אי-כושר גבוה אם הוא פוגע קשות בעבודה הספציפית שלכם. לכן חשוב לתעד היטב כיצד הנכות משפיעה על העבודה היומיומית.
            </div>

            <h2>מה שוקל פקיד התביעות?</h2>
            <ul className="list-disc space-y-2">
              <li>הגיל, ההשכלה והמקצוע שלכם.</li>
              <li>סוג העבודה שעסקתם בה וכושרכם לחזור אליה.</li>
              <li>האם ניתן להכשיר אתכם מחדש לעבודה אחרת (שיקום מקצועי).</li>
              <li>מגבלות תפקודיות בפועל בחיי היומיום.</li>
            </ul>

            <h2>במה זה שונה מנפגעי עבודה?</h2>
            <p>
              בפגיעת עבודה <strong>אין</strong> מדד נפרד של דרגת אי-כושר — שם אחוזי הנכות הרפואיים (בתוספת אפשרית לפי <Link href="/articles/takana-15">תקנה 15</Link>) קובעים ישירות את הגמלה. מנגנון שני-השלבים של דרגת אי-כושר קיים רק בנכות כללית.
            </p>

            <div className="example-box">
              <strong>🟢 רוצים להעריך היכן אתם עומדים?</strong> ה<Link href="/#calculator">מחשבון של מימושון</Link> מעריך את האחוז הרפואי וגם כולל שאלון קצר שנותן אומדן לדרגת אי-הכושר — בחינם.
            </div>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/how-to-file-claim">איך מגישים תביעה</Link>
              {" | "}
              <Link href="/articles/medical-committee-guide">מה קורה בוועדה הרפואית</Link>
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

export default IncapacityPage;
