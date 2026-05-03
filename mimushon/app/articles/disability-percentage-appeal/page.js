import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";

export const metadata = {
  title: "קיבלתי אחוזי נכות נמוכים? המדריך לערעור",
  description:
    "מה עושים אם ביטוח לאומי קבע אחוזי נכות נמוכים מדי? המדריך המלא לאפשרויות הפעולה: ערעור לוועדה לעררים, ערעור לבית הדין והגשת תביעה להחמרת מצב.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/disability-percentage-appeal",
  },
  openGraph: {
    title: "קיבלתי אחוזי נכות נמוכים? המדריך לערעור | מימושון",
    description:
      "מה עושים אם ביטוח לאומי קבע אחוזי נכות נמוכים מדי? המדריך המלא לאפשרויות הפעולה.",
    url: "https://mimushon.co.il/articles/disability-percentage-appeal",
    type: "article",
  },
};

const Article2Page = () => {
  const customStyles = `
        .prose h2 {
            font-size: 1.8rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.25rem;
            border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;
        }
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
      <ArticleJsonLd
        title="קיבלתי אחוזי נכות נמוכים? המדריך לערעור"
        description="מה עושים אם ביטוח לאומי קבע אחוזי נכות נמוכים מדי? המדריך המלא לאפשרויות הפעולה: ערעור לוועדה לעררים, ערעור לבית הדין והגשת תביעה להחמרת מצב."
        url="https://mimushon.co.il/articles/disability-percentage-appeal"
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
              קיבלתי אחוזי נכות נמוכים מדי, מה עושים? המדריך לערעור
            </h1>

            <p>
              קיבלתם את ההחלטה מהמוסד לביטוח לאומי וגיליתם שנקבעו לכם אחוזי נכות
              נמוכים ממה שציפיתם. זוהי תחושה מתסכלת, אך חשוב לדעת: זו לא בהכרח
              סוף התהליך.
            </p>

            <blockquote>
              <p>
                <strong>הצהרת אחריות:</strong> מדריך זה מיועד למטרות מידע כללי
                בלבד ואינו מהווה ייעוץ משפטי. תהליכי ערעור יכולים להיות מורכבים,
                ולעיתים מומלץ בחום להסתייע בייעוץ משפטי מקצועי.
              </p>
            </blockquote>

            <h3>אפשרות 1: ערעור לוועדה רפואית לעררים</h3>
            <p>
              אם אתם חולקים על הקביעה של הוועדה הרפואית מדרג ראשון, אתם רשאים
              לערער בפני "ועדה רפואית לעררים".
            </p>
            <ul className="list-disc space-y-2">
              <li>
                <strong>מה מגישים?</strong> יש להגיש "הודעת ערר" (טופס 7808)
                בכתב ומנומקת.
              </li>
              <li>
                <strong>החשיבות של מסמכים חדשים:</strong> הסיכוי הטוב ביותר
                לשנות את ההחלטה הוא לצרף מסמכים רפואיים חדשים שלא עמדו בפני
                הוועדה הקודמת.
              </li>
              <li>
                <strong>המועד:</strong> <strong>חשוב מאוד!</strong> יש להגיש את
                הערר תוך 60 יום מקבלת ההחלטה הכתובה.
              </li>
            </ul>
            <p>
              <strong>שימו לב:</strong> בסמכותה של ועדת הערר גם להפחית את אחוזי
              הנכות, אך הדבר נדיר יחסית.
            </p>

            <h3>אפשרות 2: ערעור לבית הדין האזורי לעבודה</h3>
            <p>
              אם אינכם מרוצים מהחלטת ועדת העררים, או אם אתם סבורים שנפלה טעות{" "}
              <strong>משפטית</strong> בהחלטה (למשל, הוועדה התעלמה ממסמך רפואי),
              ניתן להגיש ערעור לבית הדין האזורי לעבודה.
            </p>
            <p>
              בית הדין אינו רופא. הוא לא יקבע אחוזי נכות, אך הוא יכול להחזיר את
              התיק שלכם לדיון מחודש בוועדה. בשלב זה, מומלץ מאוד להיעזר בעורך
              דין.
            </p>

            <h3>אפשרות 3: הגשת תביעה להחמרת מצב</h3>
            <p>
              אפשרות זו רלוונטית אם <strong>חלה החמרה במצבכם הרפואי</strong> מאז
              הבדיקה האחרונה. ניתן להגיש תביעה כזו רק אם חלפו 6 חודשים לפחות
              מההחלטה הקודמת, ויש לצרף אישור רפואי המעיד על ההחמרה.
            </p>

            <h3>רוצים לבדוק מחדש את החישוב?</h3>
            <p>
              לפני שאתם נכנסים לתהליך ערעור, ודאו שאתם מבינים כיצד אחוזי הנכות
              שלכם חושבו.
            </p>
            <p>
              <Link href="/">השתמשו במחשבון אחוזי הנכות של מימושון</Link> כדי
              להזין את הנתונים ולראות אם החישוב תואם את מה שאתם חושבים שמגיע
              לכם.
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

export default Article2Page;
