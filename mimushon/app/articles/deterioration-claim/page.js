import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";
import BreadcrumbJsonLd from "../../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "תביעת החמרת מצב — איך מבקשים בדיקה מחדש (2026)",
  description:
    "מצבכם החמיר אחרי שנקבעו אחוזי הנכות? מדריך לתביעת החמרה: מתי אפשר להגיש, המתנה של 6 חודשים, הסיכון שהאחוז דווקא יירד, ואיך מתכוננים.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/deterioration-claim",
  },
  openGraph: {
    title: "תביעת החמרת מצב | מימושון",
    description: "איך מגישים תביעה לבדיקה מחדש של אחוזי הנכות עקב החמרה במצב הרפואי.",
    url: "https://mimushon.co.il/articles/deterioration-claim",
    type: "article",
    images: ["/images/hero-mimushon.webp"],
  },
};

const DeteriorationPage = () => {
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
    .warn-box { background: #fef2f2; border: 1px solid #fecaca; padding: 1rem 1.25rem; border-radius: 12px; margin: 1.5rem 0; }
  `;

  return (
    <>
      <ArticleJsonLd
        title="תביעת החמרת מצב — איך מבקשים בדיקה מחדש (2026)"
        description="מצבכם החמיר אחרי שנקבעו אחוזי הנכות? מדריך לתביעת החמרה: מתי אפשר, ההמתנה, והסיכון שהאחוז יירד."
        url="https://mimushon.co.il/articles/deterioration-claim"
        datePublished="2026-08-11"
        dateModified="2026-08-11"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "מאמרים", url: "https://mimushon.co.il/articles" },
          { name: "תביעת החמרת מצב", url: "https://mimushon.co.il/articles/deterioration-claim" },
        ]}
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              תביעת החמרת מצב
            </h1>

            <p>
              אחוזי הנכות שנקבעו לכם אינם בהכרח סופיים. אם המצב הרפואי שלכם <strong>הידרדר</strong> מאז הקביעה האחרונה — או שנוסף ליקוי חדש — אתם יכולים להגיש <strong>תביעת החמרה</strong>: בקשה שביטוח לאומי יבדוק אתכם מחדש ויעדכן את האחוז. במדריך זה נסביר מתי כדאי, מתי מותר, ומה הסיכון שכדאי להכיר לפני שמגישים.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ רפואי או משפטי. הקביעה הסופית נעשית על ידי ביטוח לאומי.</p>
            </blockquote>

            <h2>מה זה תביעת החמרה, ובמה היא שונה מערעור?</h2>
            <p>
              חשוב לא להתבלבל בין השניים:
            </p>
            <ul className="list-disc space-y-2">
              <li><strong>ערעור</strong> — טוענים שהוועדה <em>טעתה</em> בקביעה שלה על סמך המצב שהיה באותה עת. יש חלון זמן קצר להגשה.</li>
              <li><strong>תביעת החמרה</strong> — לא טוענים שהייתה טעות, אלא שהמצב <em>השתנה לרעה</em> מאז. אפשר להגיש גם הרבה אחרי הקביעה המקורית.</li>
            </ul>
            <p>
              אם קיבלתם אחוז שנראה לכם שגוי מלכתחילה — ראו את המדריך ל<Link href="/articles/disability-percentage-appeal">ערעור</Link>. אם המצב פשוט החמיר — המשיכו כאן.
            </p>

            <h2>מתי אפשר להגיש?</h2>
            <p>
              ככלל, ניתן להגיש תביעת החמרה כאשר חלה החמרה של ממש במצב הרפואי, המגובה במסמכים. יש גם מגבלת זמן: בדרך כלל לא ניתן להגיש תוך <strong>6 חודשים</strong> מהקביעה הקודמת — אלא אם רופא מאשר שחלה החמרה משמעותית שמצדיקה בדיקה מוקדמת יותר.
            </p>

            <h2>איך מגישים — שלב אחר שלב</h2>
            <ul className="list-disc space-y-2">
              <li>אוספים מסמכים רפואיים <strong>עדכניים</strong> שמראים את ההחמרה (סיכומי מומחים, בדיקות חדשות, אשפוזים).</li>
              <li>מגישים טופס תביעה לבדיקה מחדש עקב החמרת מצב לביטוח לאומי.</li>
              <li>מוזמנים לוועדה רפואית, בדומה לתהליך המקורי. שווה לקרוא שוב את המדריך ל<Link href="/articles/medical-committee-guide">ועדה הרפואית</Link>.</li>
            </ul>

            <div className="warn-box">
              <strong>⚠️ הסיכון שחייבים להכיר:</strong> כשמגישים תביעת החמרה, הוועדה בוחנת את מצבכם מחדש — והיא רשאית להעלות את האחוז, להשאיר אותו כפי שהוא, <strong>או אפילו להוריד אותו</strong> אם תתרשם שהמצב השתפר. לכן חשוב להגיש רק כשיש החמרה אמיתית ומתועדת היטב, ולא "לנסות מזל".
            </div>

            <div className="tip-box">
              <strong>💡 טיפ:</strong> ההחמרה צריכה להיות מגובה בתיעוד רפואי מהתקופה האחרונה. תלונה בעל פה בוועדה, ללא מסמכים שתומכים בה, כמעט אף פעם לא מספיקה. אספו את המסמכים <em>לפני</em> שאתם מגישים.
            </div>

            <div className="example-box">
              <strong>🟢 לא בטוחים אם ההחמרה משנה את האחוז?</strong> נסו את ה<Link href="/#calculator">מחשבון של מימושון</Link> עם המצב המעודכן שלכם והשוו לאחוז הקיים — כדי לראות אם בכלל שווה להגיש. בחינם וללא הרשמה.
            </div>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/disability-percentage-appeal">ערעור על אחוזי נכות</Link>
              {" | "}
              <Link href="/articles/medical-committee-guide">מה קורה בוועדה הרפואית</Link>
              {" | "}
              <Link href="/articles/how-to-file-claim">איך מגישים תביעה</Link>
            </p>
            <p><Link href="/articles">← חזרה לכל המאמרים</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeteriorationPage;
