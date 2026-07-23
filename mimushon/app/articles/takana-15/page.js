import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";

export const metadata = {
  title: "תקנה 15 — איך להגדיל את אחוזי הנכות מפגיעה בעבודה",
  description:
    "מה היא תקנה 15, מי זכאי להגדלת האחוזים, כיצד מגישים בקשה, וכמה ניתן להרוויח מהתקנה הזו.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/takana-15",
  },
  openGraph: {
    title: "תקנה 15 — איך להגדיל את אחוזי הנכות | מימושון",
    description: "המדריך המלא לתקנה 15: מי זכאי, כיצד מגישים, וכמה אפשר להרוויח.",
    url: "https://mimushon.co.il/articles/takana-15",
    type: "article",
  },
};

const Takana15Page = () => {
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
  `;

  return (
    <>
      <ArticleJsonLd
        title="תקנה 15 — איך להגדיל את אחוזי הנכות מפגיעה בעבודה"
        description="מה היא תקנה 15, מי זכאי להגדלת האחוזים, כיצד מגישים בקשה, וכמה ניתן להרוויח מהתקנה הזו."
        url="https://mimushon.co.il/articles/takana-15"
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              תקנה 15 — איך להגדיל את אחוזי הנכות מפגיעה בעבודה
            </h1>

            <p>
              נפגעי עבודה רבים אינם יודעים שקיים מנגנון חוקי המאפשר להגדיל את אחוזי הנכות הרפואיים שנקבעו להם — ובכך להגדיל משמעותית את הפיצוי החודשי. המנגנון הזה נקרא <strong>תקנה 15</strong>, והוא חל אך ורק על נפגעי עבודה (לא על נכות כללית).
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ משפטי. תקנה 15 היא הליך מורכב — מומלץ מאוד לפנות לעורך דין המתמחה בנפגעי עבודה לפני הגשת בקשה.</p>
            </blockquote>

            <h2>מה היא תקנה 15?</h2>
            <p>
              תקנה 15 לתקנות הביטוח הלאומי (קביעת דרגת נכות לנפגעי עבודה) מאפשרת לוועדה הרפואית להגדיל את אחוזי הנכות הרפואיים שנקבעו לנפגע — <strong>בעד 50% נוספים</strong> — אם הוכח שהפגיעה מונעת ממנו לחזור לעבודתו הספציפית ואינו מסוגל להשתכר אחרת.
            </p>
            <p>
              במילים פשוטות: אם הפגיעה שלך פגעה לא רק בגוף אלא גם ביכולת הפרנסה הספציפית שלך — התקנה יכולה להעלות את האחוז שנקבע לך.
            </p>

            <div className="example-box">
              <strong>🟢 דוגמה:</strong> נגר שנפצע ביד ונקבעו לו 20% נכות רפואית. מכיוון שעבודתו דורשת שימוש ביד ואינו יכול לחזור לאותה מלאכה, הוועדה יכולה לקבוע שתקנה 15 חלה — ולהעלות את האחוז ל-30% (תוספת של עד 50% מ-20%). זה ההבדל בין מענק חד-פעמי לקצבה חודשית לכל החיים.
            </div>

            <h2>מי זכאי לתקנה 15?</h2>
            <p>שלושה תנאים מצטברים:</p>
            <ul className="list-disc space-y-2">
              <li><strong>הפגיעה היא פגיעת עבודה</strong> — תאונת עבודה או מחלת מקצוע שהוכרה על ידי ביטוח לאומי.</li>
              <li>
                <strong>הפגיעה מונעת חזרה לעבודה הקודמת</strong> — הנפגע אינו מסוגל לחזור לאותה עבודה שבה עסק לפני הפגיעה, או שחלה ירידה ניכרת בהכנסותיו (מעל 20%) כתוצאה מהפגיעה.
              </li>
              <li>
                <strong>הנכות הרפואית שנקבעה אינה משקפת את הנזק התעסוקתי</strong> — כלומר, האחוזים הרפואיים הרגילים לא "תופסים" את הנזק הכלכלי האמיתי.
              </li>
            </ul>

            <h2>מי לא זכאי?</h2>
            <ul className="list-disc space-y-2">
              <li>מי שחזר לעבודתו הקודמת ללא ירידה בהכנסות.</li>
              <li>מי שיכול לעבוד בעבודה חלופית בהכנסה דומה.</li>
              <li>תקנה 15 לא חלה על <strong>נכות כללית</strong> (רק על נפגעי עבודה).</li>
            </ul>

            <h2>כמה ניתן להוסיף?</h2>
            <p>
              הוועדה יכולה להוסיף <strong>עד מחצית (50%) מהאחוז הרפואי שנקבע</strong>. לדוגמה:
            </p>
            <ul className="list-disc space-y-2">
              <li>נקבעו 20% → תקנה 15 יכולה להעלות ל-30% (תוספת 10%).</li>
              <li>נקבעו 10% → תקנה 15 יכולה להעלות ל-15% (תוספת 5%).</li>
              <li>נקבעו 14% → תקנה 15 יכולה להעלות לכל היותר ל-19% — לא מעבר לכך.</li>
            </ul>

            <div className="tip-box">
              <strong>⚠️ חשוב לדעת:</strong> כאשר האחוז שנקבע הוא <strong>פחות מ-20%</strong>, התקנה קובעת מפורשות שהתוספת לא יכולה להעלות את הדרגה מעבר ל-19% — כלומר, תקנה 15 <strong>אינה יכולה</strong> לשמש כדי לחצות את סף ה-20% ולעבור ממענק חד-פעמי לקצבה חודשית. חציית סף זה אפשרית רק דרך הקביעה הרפואית/תעסוקתית הרגילה, לא דרך המנגנון הזה. הסף לקצבה חודשית לנפגעי עבודה הוא 20%, ותקנה 15 משמעותית בעיקר עבור מי שכבר נמצא בטווח ה-20% ומעלה, או עבור מי שרוצה למקסם את האחוז בתוך ה"תקרה" של 19%.
            </div>

            <h2>איך מגישים בקשה לתקנה 15?</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>הגש בקשה לוועדת עררים</strong> — לאחר קבלת ההחלטה הראשונית על אחוזי הנכות, ניתן לבקש שתינתן תשומת לב לתקנה 15. הבקשה מוגשת לפקיד תביעות נפגעי עבודה בביטוח לאומי.
              </li>
              <li>
                <strong>הצג ראיות לנזק תעסוקתי</strong> — תלושי שכר לפני ואחרי, מכתב ממעסיק, תיאור עבודתך הספציפית ומדוע אינך יכול לחזור אליה.
              </li>
              <li>
                <strong>הוועדה שוקלת</strong> — בדרך כלל מתייעצת עם "רשות מייעצת" הכוללת פקיד שיקום ומומחה תעסוקה.
              </li>
            </ol>

            <h2>מתי מומלץ לפנות לעורך דין?</h2>
            <p>
              כמעט תמיד. תקנה 15 היא הליך שבו הנטל להוכיח את הנזק התעסוקתי מוטל עליך — ביטוח לאומי לא יחפש מיוזמתו אם אתה זכאי. עורך דין המתמחה בנפגעי עבודה יידע לנסח את הטענות ולהציג את הראיות הנדרשות.
            </p>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/medical-committee-guide">מה קורה בוועדה הרפואית</Link>
              {" | "}
              <Link href="/articles/disability-percentage-appeal">ערעור על אחוזי נכות</Link>
              {" | "}
              <Link href="/glossary">מילון מונחים</Link>
            </p>
            <p><Link href="/articles">← חזרה לכל המאמרים</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Takana15Page;
