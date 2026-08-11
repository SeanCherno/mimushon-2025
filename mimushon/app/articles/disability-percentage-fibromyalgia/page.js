import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "אחוזי נכות על פיברומיאלגיה — המדריך המלא (2026)",
  description:
    "כמה אחוזי נכות מקבלים על פיברומיאלגיה? למה אין לה סעיף ייעודי בספר הליקויים, איך היא נקבעת 'על דרך ההיקש', והקשר להפרעות נפשיות ולתפקוד.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/disability-percentage-fibromyalgia",
  },
  openGraph: {
    title: "אחוזי נכות על פיברומיאלגיה | מימושון",
    description: "איך נקבעים אחוזי נכות על פיברומיאלגיה, ולמה התיעוד הרפואי הוא המפתח.",
    url: "https://mimushon.co.il/articles/disability-percentage-fibromyalgia",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const FibromyalgiaPage = () => {
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
        title="אחוזי נכות על פיברומיאלגיה — המדריך המלא (2026)"
        description="כמה אחוזי נכות מקבלים על פיברומיאלגיה? למה אין לה סעיף ייעודי, ואיך היא נקבעת 'על דרך ההיקש'."
        url="https://mimushon.co.il/articles/disability-percentage-fibromyalgia"
        datePublished="2026-08-11"
        dateModified="2026-08-11"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "אחוזי נכות על פיברומיאלגיה", url: "https://mimushon.co.il/articles/disability-percentage-fibromyalgia" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              אחוזי נכות על פיברומיאלגיה
            </h1>

            <p>
              פיברומיאלגיה היא אחד הנושאים המבלבלים והמתסכלים ביותר בתחום אחוזי הנכות — לא בגלל שהיא נדירה, אלא בגלל האופן שבו היא מוערכת. אנשים מחפשים "כמה אחוזים מגיע על פיברומיאלגיה" ומגלים תשובות סותרות. במדריך זה נסביר בכנות למה זה כך, וכיצד בכל זאת ניגשים לתביעה נכון.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ רפואי או משפטי. הקביעה הסופית נעשית על ידי הוועדה הרפואית של ביטוח לאומי.</p>
            </blockquote>

            <h2>למה אין "סעיף פיברומיאלגיה" בספר הליקויים?</h2>
            <p>
              בניגוד לסוכרת או לכאבי גב, לפיברומיאלגיה <strong>אין סעיף ייעודי משלה</strong> בספר הליקויים. מדובר בתסמונת כאב כרונית שכוללת כאב מפושט, עייפות, הפרעות שינה וקשיי ריכוז — אך ללא ממצא מדידה אובייקטיבי בודד (כמו צילום או בדיקת דם) שקובע את חומרתה. לכן הוועדה נאלצת להעריך אותה <strong>"על דרך ההיקש"</strong> — כלומר, בהשוואה לסעיפים קרובים בספר הליקויים.
            </p>

            <h2>איך בכל זאת נקבע האחוז?</h2>
            <p>
              הערכת פיברומיאלגיה נשענת בדרך כלל על שילוב של כמה צירים:
            </p>
            <ul className="list-disc space-y-2">
              <li><strong>ההיבט הראומטולוגי / הכאב:</strong> מוערך בהשוואה לסעיפים של כאב כרוני והגבלות תנועה, לפי מספר הנקודות הרגישות (tender points) והשפעת הכאב על התפקוד.</li>
              <li><strong>ההיבט הנפשי:</strong> פיברומיאלגיה מלווה פעמים רבות ב<Link href="/articles/disability-percentage-mental-health">דיכאון וחרדה</Link>. לרכיב הנפשי לרוב יש משקל משמעותי בקביעת האחוז, ולעיתים הוא אף העיקרי.</li>
              <li><strong>עייפות ותפקוד יומיומי:</strong> עד כמה התסמונת פוגעת ביכולת לתפקד בעבודה ובבית.</li>
            </ul>
            <p>
              התוצאה: האחוזים על פיברומיאלגיה עצמה נוטים להיות מתונים, אך בשילוב הרכיב הנפשי והליקויים הנלווים — ה<Link href="/articles/how-the-calculation-works">חישוב המשוקלל</Link> יכול להצטבר לאחוז משמעותי יותר.
            </p>

            <div className="tip-box">
              <strong>💡 המפתח הוא התיעוד:</strong> מכיוון שאין בדיקה אובייקטיבית אחת, הכול תלוי בתיעוד רפואי רציף. אבחון מסודר מראומטולוג (כולל שלילת מחלות אחרות), מעקב לאורך זמן, ותיעוד הרכיב הנפשי מפסיכיאטר — הם ההבדל בין תביעה שמתקבלת לבין תביעה שנדחית.
            </div>

            <h2>אילו מסמכים כדאי להכין?</h2>
            <ul className="list-disc space-y-2">
              <li>אבחנה מסודרת מראומטולוג, כולל תיעוד הנקודות הרגישות ושלילת מחלות אחרות.</li>
              <li>מעקב רפואי רציף לאורך זמן (לא ביקור חד-פעמי).</li>
              <li>אם יש רכיב נפשי — סיכומי טיפול מפסיכיאטר או פסיכולוג ומרשמים קבועים.</li>
              <li>מכתב המתאר כיצד התסמונת פוגעת בעבודה ובחיי היום-יום.</li>
            </ul>

            <div className="example-box">
              <strong>🟢 רוצים לראות איך זה מצטבר?</strong> ב<Link href="/#calculator">מחשבון של מימושון</Link> תוכלו להזין את הליקויים השונים (הראומטולוגי, הנפשי ועוד) ולראות כיצד הם משתקללים יחד לאומדן כולל — בחינם וללא הרשמה.
            </div>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/disability-percentage-mental-health">אחוזי נכות על דיכאון וחרדה</Link>
              {" | "}
              <Link href="/articles/medical-committee-guide">מה קורה בוועדה הרפואית</Link>
              {" | "}
              <Link href="/articles/disability-percentage-appeal">מה עושים אם קיבלתי אחוז נמוך</Link>
            </p>
            <p><Link href="/articles">← חזרה לכל המאמרים</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FibromyalgiaPage;
