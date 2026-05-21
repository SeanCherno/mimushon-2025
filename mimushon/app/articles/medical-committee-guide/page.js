import Link from "next/link";
import ArticleJsonLd from "../../../components/ArticleJsonLd";

export const metadata = {
  title: "מה קורה בוועדה הרפואית של ביטוח לאומי — המדריך המלא",
  description:
    "כל מה שצריך לדעת לפני ישיבת הוועדה הרפואית: מי יושב בה, מה בודקים, איך להתכונן, ומה לעשות אחרי.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/medical-committee-guide",
  },
  openGraph: {
    title: "מה קורה בוועדה הרפואית של ביטוח לאומי | מימושון",
    description: "מדריך מפורט להתכוננות לוועדה הרפואית של ביטוח לאומי.",
    url: "https://mimushon.co.il/articles/medical-committee-guide",
    type: "article",
  },
};

const MedicalCommitteeGuidePage = () => {
  const customStyles = `
    .prose h2 { font-size: 1.8rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; }
    .prose h3 { font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
    .prose p, .prose ul, .prose li { margin-bottom: 1rem; line-height: 1.75; }
    .prose ul { list-style-position: inside; padding-right: 0.5rem; }
    .prose strong { font-weight: 600; }
    .prose blockquote { border-right: 4px solid #d1d5db; padding-right: 1rem; margin-right: 0.5rem; font-style: italic; color: #4b5563; background-color: #f9fafb; border-radius: 0 8px 8px 0; }
    .prose a { color: #4f46e5; font-weight: 500; text-decoration: none; }
    .prose a:hover { text-decoration: underline; }
    .tip-box { background: #eff6ff; border-right: 4px solid #4f46e5; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin: 1.5rem 0; }
    .warning-box { background: #fefce8; border-right: 4px solid #ca8a04; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin: 1.5rem 0; }
  `;

  return (
    <>
      <ArticleJsonLd
        title="מה קורה בוועדה הרפואית של ביטוח לאומי — המדריך המלא"
        description="כל מה שצריך לדעת לפני ישיבת הוועדה הרפואית: מי יושב בה, מה בודקים, איך להתכונן, ומה לעשות אחרי."
        url="https://mimushon.co.il/articles/medical-committee-guide"
      />
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ lineHeight: "1.4" }}>
              מה קורה בוועדה הרפואית של ביטוח לאומי — המדריך המלא
            </h1>

            <p>
              הוועדה הרפואית של ביטוח לאומי היא השלב המכריע בתהליך קביעת אחוזי הנכות. אנשים רבים מגיעים אליה לא מוכנים — ומשלמים על כך בדמות אחוזים נמוכים מהמגיע להם. מדריך זה יסביר מה בדיוק קורה שם, מי יושב בה, ואיך להגיע מוכנים.
            </p>

            <blockquote>
              <p><strong>הצהרת אחריות:</strong> מדריך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ משפטי. לפרטים מחייבים — פנה לאתר הרשמי של ביטוח לאומי או לעורך דין המתמחה בנכות.</p>
            </blockquote>

            <h2>מי יושב בוועדה?</h2>
            <p>
              הוועדה הרפואית מורכבת מרופא אחד או יותר מטעם ביטוח לאומי — בדרך כלל רופא כללי ולעיתים מומחה בתחום הרלוונטי לליקוי שלך (לדוגמה, אורתופד לבעיות שלד, נוירולוג לבעיות עצביות). הרופאים אינם הרופאים שלך — הם עצמאיים ועובדים מטעם המוסד לביטוח לאומי.
            </p>
            <p>
              חשוב להבין: <strong>הוועדה אינה שופטת אם אתה סובל</strong> — היא קובעת אחוז נכות לפי ספר הליקויים, שהוא רשימה משפטית מוגדרת מראש. הצגת הסבל האישי חשובה, אך הוועדה מחויבת לתבחינים קבועים.
            </p>

            <h2>מה בודקת הוועדה?</h2>
            <p>הוועדה עוברת על שלושה דברים:</p>
            <ul className="list-disc space-y-2">
              <li><strong>המסמכים הרפואיים</strong> שהגשת — סיכומי מחלה, בדיקות, חוות דעת מומחים.</li>
              <li><strong>בדיקה פיזית / תפקודית</strong> — בהתאם לסוג הליקוי. לדוגמה: בבעיות גב — בדיקת טווחי תנועה. בבעיות שמיעה — בדיקת שמיעה.</li>
              <li><strong>תיאור מילולי</strong> — מה אתה מסוגל ואינך מסוגל לעשות ביום-יום.</li>
            </ul>

            <h2>איך להתכונן — הרשימה המלאה</h2>

            <h3>1. הכן תיק מסמכים מסודר</h3>
            <p>הבא עותק מסודר של כל המסמכים הרפואיים הרלוונטיים:</p>
            <ul className="list-disc space-y-2">
              <li>סיכומי ביקורים מרופאים מומחים (עדכניים ככל האפשר)</li>
              <li>תוצאות בדיקות דם, הדמיה (CT, MRI, X-ray), אלקטרו-פיזיולוגיות</li>
              <li>סיכומי אשפוז ותוצאות ניתוחים</li>
              <li>מרשמים לתרופות שנוטל באופן קבוע</li>
              <li>חוות דעת מומחה פרטית — אם יש, זה כלי חשוב</li>
            </ul>

            <div className="tip-box">
              <strong>💡 טיפ חשוב:</strong> מיין את המסמכים לפי ליקוי, לא לפי תאריך. הוועדה עוברת עליהם במהירות — כל דבר שניתן למצוא בקלות — יועיל לך.
            </div>

            <h3>2. הכן תיאור תפקודי כתוב</h3>
            <p>
              לפני הוועדה, כתוב בכמה נקודות קצרות: <strong>מה אינך מסוגל לעשות</strong> שיכולת לעשות לפני הפגיעה. תמקד על דברים פיזיים קונקרטיים: "אינני מסוגל לשבת מעל 20 דקות ברצף", "אינני מסוגל להרים משאות מעל 5 ק"ג", "אינני מסוגל ללכת מעל 200 מטר ללא כאב חזק".
            </p>
            <p>הוועדה שואלת לעיתים שאלות כאלה — עדיף שתהיה מוכן עם תשובות ספציפיות ולא תנחש בזמן אמת.</p>

            <h3>3. הגע עם ליווי</h3>
            <p>
              מותר וכדאי להגיע עם בן משפחה או נציג. הם יכולים להוסיף מידע תפקודי, ולסייע אם אתה מרגיש לחוץ. עורך דין המתמחה בנכות יכול לייצג אותך ולהציג את הליקויים בצורה הטובה ביותר.
            </p>

            <h3>4. תאר מצב ממוצע — לא יום טוב</h3>
            <div className="warning-box">
              <strong>⚠️ טעות נפוצה:</strong> אנשים מגיעים לוועדה ומנסים "להרשים" את הרופאים בכך שהם מסתדרים. הוועדה בודקת את מצבך <strong>הממוצע</strong> — לא את היכולות שלך ביום שבו קמת מוקדם ונחת. אם ביום-יום אתה מתקשה, תאר את זה בכנות.
            </div>

            <h2>מה קורה בזמן הוועדה?</h2>
            <p>
              הישיבה לרוב קצרה — בין 10 ל-30 דקות. הרופא יעבור על המסמכים, ישאל מספר שאלות, ויבצע בדיקה פיזית קצרה בהתאם לליקוי. בסיום — הוא מתרשם, קובע אחוזים לפי ספר הליקויים, וכותב החלטה.
            </p>
            <p>
              ההחלטה אינה מתקבלת בחדר — היא מגיעה בדואר לאחר כמה שבועות.
            </p>

            <h2>קיבלת החלטה — מה הלאה?</h2>
            <ul className="list-disc space-y-2">
              <li>
                <strong>אם ההחלטה מקובלת עליך:</strong> ביטוח לאומי יעבור לשלב קביעת דרגת אי-הכושר (אם מדובר בנכות כללית) ויחליט על גובה הקצבה.
              </li>
              <li>
                <strong>אם ההחלטה נמוכה ממה שציפית:</strong> יש זכות ערעור. ניתן לפנות לוועדת עררים תוך 90 ימים מקבלת ההחלטה, ובמקרים מסוימים — לבית הדין לעבודה.
              </li>
              <li>
                <strong>אם מצבך הוחמר לאחר ההחלטה:</strong> ניתן להגיש תביעה להחמרת מצב בכל עת.
              </li>
            </ul>

            <hr className="my-8" />
            <p>
              <strong>קישורים קשורים:</strong>{" "}
              <Link href="/articles/disability-percentage-appeal">ערעור על אחוזי נכות</Link>
              {" | "}
              <Link href="/articles/how-to-file-claim">איך מגישים תביעה</Link>
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

export default MedicalCommitteeGuidePage;
