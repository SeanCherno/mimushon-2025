import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata = {
  title: "איך עובד חישוב אחוזי נכות משוקלל (הנוסחה)",
  description:
    "למה 20% + 10% הם 28%? ההסבר המלא מאחורי נוסחת החישוב המשוקלל הרשמית של ביטוח לאומי, כולל דוגמאות מספריות מפורטות.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/how-the-calculation-works",
  },
  openGraph: {
    title: "איך עובד חישוב אחוזי נכות משוקלל (הנוסחה) | מימושון",
    description:
      "למה 20% + 10% הם 28%? ההסבר המלא מאחורי נוסחת החישוב המשוקלל הרשמית.",
    url: "https://mimushon.co.il/articles/how-the-calculation-works",
    type: "article",
  },
};

const Article5Page = () => {
  const customStyles = `
        .prose h3 {
            font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem;
        }
        .prose p, .prose ul, .prose li {
            margin-bottom: 1rem; line-height: 1.75;
        }
        .prose ul {
            list-style-position: inside; padding-right: 0.5rem;
        }
        .prose strong { font-weight: 600; }
        .prose blockquote {
            border-right: 4px solid #d1d5db; padding-right: 1rem; margin-right: 0.5rem;
            font-style: italic; color: #4b5563; background-color: #f9fafb; border-radius: 0 8px 8px 0;
        }
        .prose a { color: #4f46e5; font-weight: 500; text-decoration: none; }
        .prose a:hover { text-decoration: underline; }
        .math-example {
            background-color: #f8fafc; /* bg-slate-50 */
            border: 1px solid #e2e8f0; /* border-slate-200 */
            border-radius: 0.5rem;
            padding: 1rem 1.5rem;
            direction: rtl; /* Ensure RTL */
        }
        .math-example ul {
            list-style-type: decimal;
            padding-right: 1.5rem;
            margin-top: 1rem;
        }
    `;

  return (
    <>
      <ArticleJsonLd
        title="איך עובד חישוב אחוזי נכות משוקלל (הנוסחה)"
        description="למה 20% + 10% הם 28%? ההסבר המלא מאחורי נוסחת החישוב המשוקלל הרשמית של ביטוח לאומי, כולל דוגמאות מספריות מפורטות."
        url="https://mimushon.co.il/articles/how-the-calculation-works"
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            {/* --- כותרת המאמר --- */}
            <h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center"
              style={{ lineHeight: "1.4" }}
            >
              איך עובד חישוב אחוזי נכות משוקלל? (הנוסחה נחשפת)
            </h1>

            <p>
              אחת השאלות הנפוצות ביותר בתחום הזכויות הרפואיות היא: "יש לי 20%
              נכות על הגב ו-10% על סוכרת, למה קבעו לי רק 28% נכות ולא 30%?".
            </p>
            <p>
              התשובה הקצרה היא שהחוק בישראל לא מחבר אחוזי נכות, אלא **משקלל**
              אותם. במאמר זה נפרק את הנוסחה המדויקת שבה משתמש ביטוח לאומי, נסביר
              את ההיגיון מאחוריה, וניתן דוגמה מספרית מלאה.
            </p>

            <h3>הטעות הנפוצה: חיבור אריתמטי (חיבור רגיל)</h3>
            <p>האינסטינקט הראשוני הוא פשוט לחבר את האחוזים. 20% + 10% = 30%.</p>
            <p>
              הבעיה בשיטה זו פשוטה: מה קורה אם אדם סובל מליקוי של 60% ועוד ליקוי
              של 50%? לפי חיבור רגיל, הוא יגיע ל-110% נכות, מה שלא הגיוני. לכן,
              השיטה המשפטית רואה את הנכות כאחוז מתוך יכולת התפקוד (הבריאות)
              שנותרה.
            </p>

            <h3>השיטה הנכונה: נוסחת החישוב המשוקלל</h3>
            <p>
              העיקרון המנחה הוא שכל ליקוי נוסף מחושב כאחוז מתוך מה שנותר *לאחר*
              שהפחתנו את הליקוי הקודם.
            </p>
            <p>
              התהליך תמיד מתחיל ב-100% (בריאות מלאה) ופועל לפי השלבים הבאים:
            </p>
            <ul className="list-disc space-y-2">
              <li>תמיד מתחילים מהליקוי בעל אחוז הנכות **הגבוה ביותר**.</li>
              <li>מפחיתים את האחוז הזה מ-100% "בריאות".</li>
              <li>
                לוקחים את הליקוי הבא בתור (השני בגובהו) ומחשבים את האחוז שלו
                **מתוך היתרה** שנותרה.
              </li>
              <li>
                ממשיכים בתהליך זה עבור כל ליקוי נוסף, תמיד על היתרה החדשה.
              </li>
            </ul>

            <h3>דוגמה מספרית מלאה</h3>
            <p>נניח שאדם סובל משלושה ליקויים:</p>
            <ul className="list-disc space-y-2">
              <li>
                בעיית גב: <strong>30%</strong>
              </li>
              <li>
                סוכרת: <strong>20%</strong>
              </li>
              <li>
                לחץ דם גבוה: <strong>10%</strong>
              </li>
            </ul>

            <div className="math-example">
              <p>
                <strong>כך יתבצע החישוב המשוקלל:</strong>
              </p>
              <ul>
                <li>
                  <strong>שלב 1 (הליקוי הגבוה):</strong> לוקחים את הליקוי הגבוה
                  ביותר, <strong>30%</strong>.<br />
                  אחוז נכות נוכחי: <strong>30%</strong>.<br />
                  בריאות שנותרה: 100% - 30% = <strong>70%</strong>.
                </li>
                <li>
                  <strong>שלב 2 (הליקוי הבא):</strong> לוקחים את הליקוי הבא,{" "}
                  <strong>20%</strong>.<br />
                  מחשבים 20% *מתוך* ה-70% שנותרו: (20 / 100) * 70 ={" "}
                  <strong>14%</strong>.<br />
                  אחוז נכות נוכחי (מצטבר): 30% + 14% = <strong>44%</strong>.
                  <br />
                  בריאות שנותרה: 70% - 14% = <strong>56%</strong>.
                </li>
                <li>
                  <strong>שלב 3 (הליקוי האחרון):</strong> לוקחים את הליקוי
                  האחרון, <strong>10%</strong>.<br />
                  מחשבים 10% *מתוך* ה-56% שנותרו: (10 / 100) * 56 ={" "}
                  <strong>5.6%</strong>.<br />
                  אחוז נכות נוכחי (מצטבר): 44% + 5.6% = <strong>49.6%</strong>.
                </li>
                <li>
                  <strong>שלב 4 (עיגול):</strong> ביטוח לאומי מעגל את התוצאה
                  הסופית.
                  <br />
                  תוצאה סופית: <strong>50%</strong> (מעגלים 49.6% כלפי מעלה).
                </li>
              </ul>
            </div>

            <h3>למה להסתבך? בשביל זה בנינו את "מימושון"</h3>
            <p>
              כפי שאתם רואים, החישוב ידני הוא מסורבל, ארוך, וקל מאוד לטעות בו.
            </p>
            <p>
              מחשבון אחוזי הנכות שלנו עושה בדיוק את הפעולה הזו עבורכם באופן
              אוטומטי, מיידי וללא טעויות. אתם מזינים את המספרים (30, 20, 10)
              והוא מבצע את כל שלבי החישוב המשוקלל ברקע ומציג לכם את התוצאה
              הסופית (49.6%, או 50% לאחר עיגול).
            </p>
            <p>
              <Link href="/">
                <strong>רוצים לדלג על המתמטיקה? לחצו כאן לשימוש במחשבון</strong>
              </Link>
            </p>

            <hr className="my-8" />
            <p>
              <Link href="/articles">← חזרה לכל המאמרים</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article5Page;
