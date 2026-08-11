import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "אילו הטבות מגיעות לפי אחוזי נכות? מדריך הזכויות (2026)",
  description:
    "מעבר לקצבה — אילו הטבות וזכויות מגיעות לבעלי אחוזי נכות? הנחה בארנונה, פטור ממס הכנסה ב-90%+, תג נכה, הנחות בתחבורה ועוד, לפי רמת האחוזים.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/disability-benefits",
  },
  openGraph: {
    title: "הטבות וזכויות לפי אחוזי נכות | מימושון",
    description: "מדריך להטבות ולזכויות שמגיעות לבעלי אחוזי נכות — מעבר לקצבה עצמה.",
    url: "https://mimushon.co.il/articles/disability-benefits",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const BenefitsPage = () => {
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
        title="אילו הטבות מגיעות לפי אחוזי נכות? מדריך הזכויות (2026)"
        description="מעבר לקצבה — אילו הטבות וזכויות מגיעות לבעלי אחוזי נכות? הנחה בארנונה, פטור ממס הכנסה, תג נכה ועוד."
        url="https://mimushon.co.il/articles/disability-benefits"
        datePublished="2026-08-11"
        dateModified="2026-08-11"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "הטבות לפי אחוזי נכות", url: "https://mimushon.co.il/articles/disability-benefits" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              אילו הטבות מגיעות לפי אחוזי נכות?
            </h1>

            <p>
              אחוזי הנכות אינם רק תנאי לקצבה — הם גם <strong>מפתח למגוון הטבות וזכויות</strong> ברשויות שונות. חשוב להבין נקודה מבלבלת: לא כל ההטבות תלויות באותו מספר. חלקן נקבעות לפי אחוזי הנכות <em>הרפואיים</em>, חלקן לפי עצם קבלת <em>הקצבה</em>, וחלקן לפי מבחנים נפרדים לגמרי. במדריך זה נסקור את העיקריות.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ משפטי או פיננסי. הזכאות המדויקת, התנאים והסכומים נקבעים על ידי הגורם המעניק (ביטוח לאומי, רשות המסים, הרשות המקומית וכו').</p>
            </blockquote>

            <h2>1. פטור והנחה במס הכנסה</h2>
            <p>
              אחת ההטבות המשמעותיות ביותר: מי שנקבעה לו נכות רפואית של <strong>90% ומעלה</strong> (או משוקללת בתנאים מסוימים), לתקופה של 185 ימים לפחות, עשוי להיות זכאי ל<strong>פטור ממס הכנסה</strong> על הכנסה מיגיעה אישית, עד לתקרה שנתית. זהו פטור שיכול לשנות מהותית את ההכנסה נטו, ורבים אינם מודעים לו.
            </p>

            <h2>2. הנחה בארנונה</h2>
            <p>
              הרשויות המקומיות מעניקות הנחה בארנונה לבעלי אחוזי נכות ולמקבלי קצבת נכות כללית. שיעור ההנחה והתנאים משתנים בין רשות לרשות ולפי רמת האחוזים, ולכן כדאי לבדוק מול העירייה או המועצה המקומית שלכם.
            </p>

            <h2>3. תג נכה וחניה</h2>
            <p>
              <strong>תג נכה</strong> (המונפק דרך משרד התחבורה) אינו תלוי ישירות באחוז הנכות הכללי, אלא במבחנים ספציפיים — למשל מוגבלות ניידות ברגליים באחוז מסוים, או ליקויים מסוימים בלב/ריאות. הוא מאפשר חניה בהסדרים ייעודיים.
            </p>

            <h2>4. הנחות בתחבורה ובשירותים</h2>
            <ul className="list-disc space-y-2">
              <li>הנחות בתחבורה ציבורית לזכאים.</li>
              <li>הנחה בתשלום אגרת טלוויזיה/רדיו ובשירותים נוספים, בהתאם לזכאות.</li>
              <li>הנחות והטבות שמעניקים גופים שונים למחזיקי תעודת נכה.</li>
            </ul>

            <h2>5. קצבאות ומענקים נלווים (מבחן נפרד)</h2>
            <p>
              מעבר לקצבת הנכות הכללית, קיימות הטבות שנקבעות במסלול נפרד ובתנאים משלהן:
            </p>
            <table className="grade-table">
              <thead>
                <tr><th>ההטבה</th><th>לפי מה נקבעת</th></tr>
              </thead>
              <tbody>
                <tr><td>קצבת שירותים מיוחדים (שר"מ)</td><td>מבחן תלות בעזרת הזולת בפעולות היום-יום (ADL)</td></tr>
                <tr><td>גמלת ניידות</td><td>מבחן ליקוי בניידות ברגליים (ועדה ייעודית)</td></tr>
                <tr><td>גמלת ילד נכה</td><td>מבחנים ייעודיים לילדים עם מוגבלות</td></tr>
              </tbody>
            </table>

            <div className="tip-box">
              <strong>💡 טיפ:</strong> אל תניחו שההטבה "תגיע מעצמה". חלק מהזכויות ניתנות אוטומטית עם קביעת האחוזים, אך רבות אחרות דורשות <strong>הגשת בקשה נפרדת</strong> לגורם הרלוונטי (רשות המסים, העירייה, משרד התחבורה). שווה לעשות רשימה ולבדוק כל אחת.
            </div>

            <div className="example-box">
              <strong>🟢 לא בטוחים מה האחוז שלכם?</strong> רוב ההטבות מתחילות מהמספר. ה<Link href="/#calculator">מחשבון של מימושון</Link> נותן אומדן משוקלל לפי ספר הליקויים — נקודת פתיחה טובה כדי להבין לאילו הטבות ייתכן שאתם קרובים. בחינם וללא הרשמה.
            </div>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/disability-eligibility">מי זכאי לקצבת נכות</Link>
              {" | "}
              <Link href="/articles/disability-pension-amount">גובה קצבת הנכות</Link>
              {" | "}
              <Link href="/articles/incapacity-degree">דרגת אי-כושר</Link>
            </p>
            <p><Link href="/articles">← חזרה לכל המאמרים</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BenefitsPage;
