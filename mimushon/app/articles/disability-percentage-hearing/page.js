import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "אחוזי נכות על ירידה בשמיעה וטינטון — איך נקבע (2026)",
  description:
    "כמה אחוזי נכות מקבלים על ירידה בשמיעה ועל טינטון (רעש באוזניים)? איך האודיוגרם קובע את האחוז, ההבדל בין אוזן אחת לשתיים, ואילו מסמכים להכין.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/disability-percentage-hearing",
  },
  openGraph: {
    title: "אחוזי נכות על שמיעה וטינטון | מימושון",
    description: "איך נקבעים אחוזי נכות על ירידה בשמיעה וטינטון לפי ספר הליקויים והאודיוגרם.",
    url: "https://mimushon.co.il/articles/disability-percentage-hearing",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const HearingPage = () => {
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
        title="אחוזי נכות על ירידה בשמיעה וטינטון — איך נקבע (2026)"
        description="כמה אחוזי נכות מקבלים על ירידה בשמיעה ועל טינטון? איך האודיוגרם קובע את האחוז וההבדל בין אוזן אחת לשתיים."
        url="https://mimushon.co.il/articles/disability-percentage-hearing"
        datePublished="2026-08-11"
        dateModified="2026-08-11"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "אחוזי נכות על שמיעה וטינטון", url: "https://mimushon.co.il/articles/disability-percentage-hearing" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              אחוזי נכות על ירידה בשמיעה וטינטון
            </h1>

            <p>
              ליקויי שמיעה הם מהתביעות הנפוצות ביותר — במיוחד בקרב מי שנחשף לרעש ממושך בעבודה. בניגוד למחלות רבות, כאן האחוז נקבע לפי <strong>מדידה אובייקטיבית</strong>: בדיקת שמיעה (אודיוגרם). במדריך זה נסביר איך המדידה מתורגמת לאחוזים, מה קורה כשרק אוזן אחת נפגעת, ואיך טינטון נכנס לתמונה.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ רפואי או משפטי. הקביעה הסופית נעשית על ידי הוועדה הרפואית של ביטוח לאומי.</p>
            </blockquote>

            <h2>איך נמדדת ירידת השמיעה?</h2>
            <p>
              האחוז מבוסס על <strong>האודיוגרם</strong> — בדיקה שמודדת את סף השמיעה (בדציבלים, dB) בכל אוזן בנפרד, בתדרים שונים. מחשבים את הירידה הממוצעת בתדרים המרכזיים לדיבור. ככל שהירידה הממוצעת בדציבלים גדולה יותר — האחוז גבוה יותר. עיקרון חשוב: המשקל ניתן בעיקר ל<strong>אוזן הטובה יותר</strong>, מפני שהיא זו שקובעת את תפקוד השמיעה בפועל.
            </p>

            <table className="grade-table">
              <thead>
                <tr><th>מצב השמיעה (המחשה)</th><th>טווח אחוזים</th></tr>
              </thead>
              <tbody>
                <tr><td>ירידה קלה, בעיקר באוזן אחת</td><td>0%–10%</td></tr>
                <tr><td>ירידה בינונית בשתי האוזניים, נעזרים במכשירי שמיעה</td><td>10%–25%</td></tr>
                <tr><td>ירידה קשה בשתי האוזניים</td><td>25%–50%</td></tr>
                <tr><td>חירשות כמעט מוחלטת / מלאה בשתי האוזניים</td><td>50% ומעלה</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              הטבלה להמחשה בלבד. האחוז המדויק נגזר מערכי הדציבלים באודיוגרם לפי פרט הליקוי הרלוונטי (פרט 72), ולא מהתיאור המילולי.
            </p>

            <h2>אוזן אחת מול שתי אוזניים</h2>
            <p>
              פגיעה בשמיעה באוזן אחת בלבד, כשהשנייה תקינה, מזכה בדרך כלל באחוז נמוך יחסית — כי היכולת לשמוע ולתקשר נשמרת ברובה. לעומת זאת, ירידה דו-צדדית משמעותית מעלה את האחוז באופן ניכר, במיוחד כשנדרשים מכשירי שמיעה בשתי האוזניים.
            </p>

            <h2>טינטון (רעש/צפצוף באוזניים)</h2>
            <p>
              טינטון מוכר כליקוי, אך ההכרה בו מותנית בתנאים: בדרך כלל נדרש שהטינטון יופיע <strong>יחד עם ירידת שמיעה מתועדת</strong>, שיתועד בתלונות חוזרות לאורך זמן במסמכים רפואיים, ולעיתים שיהיה קשר לחשיפה לרעש. כשהוא מוכר, הוא מוסיף בדרך כלל אחוז נמוך וקבוע (בסביבות 10%) על גבי ליקוי השמיעה.
            </p>

            <div className="tip-box">
              <strong>💡 טיפ:</strong> אם הפגיעה קשורה לרעש בעבודה — ייתכן שמדובר ב<strong>נכות מעבודה</strong> ולא בנכות כללית, מה שמשנה את כל התהליך. בכל מקרה, הביאו אודיוגרם עדכני ממכון מוכר ותיעוד של תלונות על טינטון לאורך זמן — טינטון שלא תועד קודם קשה מאוד להוכיח בוועדה.
            </div>

            <h2>אילו מסמכים כדאי להכין?</h2>
            <ul className="list-disc space-y-2">
              <li>אודיוגרם עדכני (בדיקת שמיעה) ממכון מוכר.</li>
              <li>מכתב סיכום מרופא אף-אוזן-גרון (א.א.ג).</li>
              <li>תיעוד של תלונות על טינטון לאורך זמן, ואם רלוונטי — תיעוד חשיפה לרעש בעבודה.</li>
            </ul>

            <div className="example-box">
              <strong>🟢 רוצים אומדן מהיר?</strong> ה<Link href="/#calculator">מחשבון אחוזי הנכות של מימושון</Link> מאפשר לבחור את ליקוי השמיעה ולראות איך הוא משתלב עם ליקויים נוספים בחישוב המשוקלל — בחינם וללא הרשמה.
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

export default HearingPage;
