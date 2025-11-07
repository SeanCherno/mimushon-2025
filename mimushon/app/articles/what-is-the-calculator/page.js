import Link from "next/link";

export const metadata = {
  title: 'מחשבון אחוזי נכות "מימושון": מדריך למשתמש',
  description:
    "איך להשתמש במחשבון אחוזי הנכות שלנו? מדריך משתמש פשוט ומהיר שמסביר כיצד להזין ליקויים, איך לקרוא את התוצאה המשוקללת ומה המשמעות שלה.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/what-is-the-calculator",
  },
  openGraph: {
    title: 'מחשבון אחוזי נכות "מימושון": מדריך למשתמש | מימושון',
    description: "איך להשתמש במחשבון אחוזי הנכות שלנו? מדריך משתמש פשוט ומהיר.",
    url: "https://mimushon.co.il/articles/what-is-the-calculator",
    type: "article",
  },
};

const Article4Page = () => {
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
    `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            {/* --- כותרת המאמר --- */}
            <h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center"
              style={{ lineHeight: "1.4" }}
            >
              מחשבון אחוזי נכות "מימושון": מה הוא עושה ואיך משתמשים בו?
            </h1>

            <p>
              חישוב אחוזי נכות יכול להיות עניין מבלבל. אם יש לכם יותר מליקוי
              רפואי אחד, סביר להניח שגיליתם שהחישוב אינו חיבור פשוט. מחשבון
              אחוזי הנכות של "מימושון" נועד בדיוק בשביל זה: לפשט עבורכם את
              התהליך ולתת לכם הערכה מהירה, אנונימית ובחינם.
            </p>
            <p>
              במדריך זה נסביר מה הכלי שלנו עושה, איך להשתמש בו נכון, ומה המשמעות
              של התוצאה שתקבלו.
            </p>

            <h3>מה המחשבון עושה (ומה לא)?</h3>
            <p>
              התפקיד המרכזי של המחשבון הוא לבצע **חישוב אחוזי נכות משוקלל**
              (נקרא גם "חישוב מצטבר"). זוהי הנוסחה הרשמית שבה משתמש המוסד לביטוח
              לאומי כדי לקבוע את אחוז הנכות הכולל של אדם הסובל ממספר ליקויים.
            </p>
            <ul className="list-disc space-y-2">
              <li>
                <strong>מה הוא כן עושה:</strong> לוקח מספרים (אחוזי נכות לכל
                ליקוי) ומבצע עליהם את הנוסחה המשוקללת המדויקת.
              </li>
              <li>
                <strong>מה הוא לא עושה:</strong> המחשבון אינו קובע אילו אחוזי
                נכות מגיעים לכם על כל ליקוי בנפרד (את זה קובעים "ספר הליקויים"
                והוועדה הרפואית).
              </li>
            </ul>

            <h3>מדריך שימוש: שלב אחר שלב</h3>
            <p>השימוש במחשבון פשוט מאוד וכולל שלושה שלבים:</p>
            <ul
              className="list-decimal space-y-2"
              style={{ listStyleType: "decimal", paddingRight: "1.5rem" }}
            >
              <li>
                <strong>הזנת הליקוי הראשון:</strong> בשדה "הזן אחוז נכות",
                הקלידו את אחוז הנכות של הליקוי הראשון שלכם (למשל, "20" עבור 20%)
                ולחצו על "הוסף".
              </li>
              <li>
                <strong>הזנת ליקויים נוספים:</strong> חזרו על הפעולה עבור כל
                ליקוי נוסף. בכל פעם שתלחצו "הוסף", תראו את הליקוי מצטרף לרשימה
                למטה, והתוצאה הסופית מתעדכנת אוטומטית.
              </li>
              <li>
                <strong>קריאת התוצאה:</strong> ה"תוצאה המשוקללת" המוצגת בגדול
                היא אחוז הנכות הכולל שלכם, לאחר הפעלת הנוסחה.
              </li>
            </ul>

            <h3>למה התוצאה שלי נראית נמוכה?</h3>
            <p>
              אם הזנתם 20% ו-10%, תגלו שהתוצאה היא 28% ולא 30%. זו לא טעות.
              הנוסחה המשוקללת מחושבת על בסיס "הבריאות הנותרת" של האדם, ולא
              כחיבור ישיר. (אנחנו מסבירים את המתמטיקה המלאה ב
              <Link href="/articles/how-the-calculation-works">
                מאמר נפרד על איך עובד החישוב
              </Link>
              ).
            </p>

            <blockquote>
              <p>
                <strong>הצהרת אחריות חשובה:</strong> התוצאה המתקבלת במחשבון
                "מימושון" הינה הערכה בלבד ואינה מהווה קביעה רשמית, ייעוץ רפואי
                או משפטי. הקביעה הסופית והמחייבת נעשית אך ורק על ידי הוועדות
                הרפואיות של המוסד לביטוח לאומי.
              </p>
            </blockquote>

            <h3>מוכנים להתחיל?</h3>
            <p>עכשיו כשאתם מבינים איך הכלי עובד, זה הזמן להשתמש בו.</p>
            <p>
              <Link href="/">
                <strong>לחצו כאן למעבר למחשבון אחוזי הנכות של מימושון</strong>
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

export default Article4Page;
