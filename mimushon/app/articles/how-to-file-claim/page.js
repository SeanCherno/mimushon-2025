import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata = {
  title: "המדריך המלא: איך מגישים תביעה לקצבת נכות כללית",
  description:
    "מדריך שלב אחר שלב להגשת תביעת נכות כללית בביטוח לאומי. מאיסוף מסמכים רפואיים, דרך מילוי טופס 7801 ועד ההכנה לוועדה הרפואית.",
  alternates: {
    canonical: "https://mimushon.co.il/articles/how-to-file-claim",
  },
  openGraph: {
    title: "המדריך המלא: איך מגישים תביעה לקצבת נכות כללית | מימושון",
    description: "מדריך שלב אחר שלב להגשת תביעת נכות כללית בביטוח לאומי.",
    url: "https://mimushon.co.il/articles/how-to-file-claim",
    type: "article",
  },
};

const Article1Page = () => {
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
        title="המדריך המלא: איך מגישים תביעה לקצבת נכות כללית"
        description="מדריך שלב אחר שלב להגשת תביעת נכות כללית בביטוח לאומי. מאיסוף מסמכים רפואיים, דרך מילוי טופס 7801 ועד ההכנה לוועדה הרפואית."
        url="https://mimushon.co.il/articles/how-to-file-claim"
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
              המדריך המלא: איך מגישים תביעה לקצבת נכות כללית בביטוח לאומי
            </h1>

            <p>
              תהליך הגשת תביעה לקצבת נכות כללית מול המוסד לביטוח לאומי יכול
              להיראות מורכב ומאיים. הוא כולל איסוף מסמכים, מילוי טפסים והתייצבות
              בפני ועדה רפואית. המדריך הזה נועד לפשט עבורכם את התהליך ולסדר אותו
              שלב אחר שלב.
            </p>

            <blockquote>
              <p>
                <strong>הצהרת אחריות חשובה:</strong> מדריך זה מיועד למטרות מידע
                כללי בלבד ואינו מהווה ייעוץ משפטי, רפואי או תחליף לייעוץ מקצועי.
                המידע המחייב והמלא נמצא תמיד באתר הרשמי של המוסד לביטוח לאומי.
              </p>
            </blockquote>

            <h3>שלב 1: בדיקת תנאי זכאות בסיסיים</h3>
            <p>
              לפני שצוללים לטפסים, חשוב להבין מהם תנאי הסף לקצבת נכות כללית:
            </p>
            <ul className="list-disc space-y-2">
              <li>
                <strong>גיל:</strong> אתה תושב ישראל מגיל 18 ועד גיל פרישה.
              </li>
              <li>
                <strong>נכות רפואית:</strong> רופא מטעם ביטוח לאומי קבע לך נכות
                רפואית בשיעור של 60% לפחות, או 40% לפחות אם יש לך מספר ליקויים
                ואחד מהם הוא בשיעור 25% לפחות.
              </li>
              <li>
                <strong>הכנסות:</strong> ההכנסות שלך מעבודה נמוכות מ-71% מהשכר
                הממוצע (הסכום מתעדכן).
              </li>
              <li>
                <strong>דרגת אי-כושר:</strong> נקבעה לך דרגת אי-כושר לעבוד
                בשיעור של 60%, 65%, 74% או 100%.
              </li>
            </ul>

            <h3>שלב 2: איסוף מסמכים רפואיים (השלב הקריטי)</h3>
            <p>
              זהו השלב החשוב ביותר בתביעה. הוועדה הרפואית מסתמכת *אך ורק* על
              המסמכים שתספק לה. עליך לאסוף סיכומי מחלה עדכניים, חוות דעת מרופאים
              מומחים, תוצאות בדיקות, סיכומי אשפוז וכל מסמך אחר המעיד על מצבך.
            </p>
            <p>
              <strong>טיפ זהב:</strong> אל תניחו שהוועדה תשיג מסמכים לבד. הגישו
              כל מה שיש לכם, בצורה מסודרת וברורה.
            </p>

            <h3>שלב 3: מילוי והגשת טופס התביעה (טופס 7801)</h3>
            <p>
              הדרך המומלצת והמהירה ביותר היא למלא את הטופס באופן מקוון באזור
              האישי באתר ביטוח לאומי ולצרף את כל המסמכים. ניתן גם להוריד את
              הטופס ולהגיש ידנית בסניף.
            </p>

            <h3>שלב 4: הזימון לוועדה רפואית</h3>
            <p>
              לאחר הגשת התביעה, תקבלו זימון לוועדה רפואית. חשוב להגיע מוכנים, עם
              עותקים נוספים של מסמכים רפואיים, ולהכין מראש נקודות קצרות המסבירות
              כיצד כל ליקוי משפיע על התפקוד היומיומי שלכם.
            </p>

            <h3>שלב 5: קבלת ההחלטה</h3>
            <p>
              לאחר הוועדה (ולעיתים פגישות נוספות), תקבלו החלטה מפורטת בדואר או
              לאזור האישי. ההחלטה תכלול את אחוזי הנכות הרפואית שנקבעו ואת דרגת
              אי-הכושר, שקובעת את גובה הקצבה.
            </p>

            <h3>רוצים להבין איך מחשבים את האחוזים?</h3>
            <p>
              עוד לפני הגשת התביעה או אחריה, כדאי להבין כיצד אחוזי הנכות השונים
              משתקללים. החישוב אינו חיבור פשוט (20% ועוד 10% הם לא 30%).
            </p>
            <p>
              <Link href="/">
                נסו עכשיו את מחשבון אחוזי הנכות שלנו במימושון
              </Link>{" "}
              כדי לקבל הערכה כללית של אחוזי הנכות המשוקללים שלכם.
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

export default Article1Page;
