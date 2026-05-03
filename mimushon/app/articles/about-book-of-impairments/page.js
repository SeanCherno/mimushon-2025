import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata = {
  title: "מהו ספר הליקויים של ביטוח לאומי?",
  description:
    'הסבר על "ספר הליקויים" (תקנות הנכות) של ביטוח לאומי. איך הוא בנוי, כיצד רופאים משתמשים בו כדי לקבוע אחוז נכות, ומה ההבדל בין ליקוי בודד לחישוב משוקלל.',
  alternates: {
    canonical: "https://mimushon.co.il/articles/about-book-of-impairments",
  },
  openGraph: {
    title: "מהו ספר הליקויים של ביטוח לאומי? | מימושון",
    description:
      'הסבר על "ספר הליקויים" (תקנות הנכות) של ביטוח לאומי. איך הוא בנוי וכיצד משתמשים בו.',
    url: "https://mimushon.co.il/articles/about-book-of-impairments",
    type: "article",
  },
};

const Article3Page = () => {
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
        title="מהו ספר הליקויים של ביטוח לאומי?"
        description='הסבר על "ספר הליקויים" (תקנות הנכות) של ביטוח לאומי. איך הוא בנוי, כיצד רופאים משתמשים בו כדי לקבוע אחוז נכות, ומה ההבדל בין ליקוי בודד לחישוב משוקלל.'
        url="https://mimushon.co.il/articles/about-book-of-impairments"
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
              מהו ספר הליקויים של ביטוח לאומי?
            </h1>

            <p>
              כל מי שהתעניין או הגיש תביעה לנכות מול המוסד לביטוח לאומי שמע את
              המונח "ספר הליקויים". אבל מהו בעצם הספר הזה, מי קובע מה כתוב בו,
              ואיך הוא משפיע על אחוזי הנכות שלכם? בואו נעשה סדר.
            </p>

            <h3>מהו "ספר הליקויים" באופן רשמי?</h3>
            <p>
              "ספר הליקויים" הוא למעשה כינוי נפוץ ל
              <strong>
                תקנות הביטוח הלאומי (קביעת דרגת נכות לנפגעי עבודה)
              </strong>
              . אף ששמו מתייחס לנפגעי עבודה, תקנון זה משמש כבסיס לקביעת אחוזי
              נכות רפואית גם בתביעות לנכות כללית, שירותים מיוחדים ועוד.
            </p>
            <p>
              זהו למעשה ה"מחירון" הרשמי של מדינת ישראל לפגיעות גופניות ונפשיות.
            </p>

            <h3>מה מטרתו של ספר הליקויים?</h3>
            <p>
              מטרתו העיקרית של ספר הליקויים היא ליצור{" "}
              <strong>אחידות, עקביות ואובייקטיביות</strong> בקביעת אחוזי נכות.
            </p>
            <p>
              במקום שכל רופא בוועדה רפואית יחליט "לפי הרגש" כמה אחוזים שווה
              ליקוי מסוים, הספר קובע כללים ברורים. הוא מקשר בין אבחנה רפואית
              ספציפית לבין מספר (אחוז נכות) התואם את חומרת הליקוי.
            </p>

            <h3>איך בנוי ספר הליקויים?</h3>
            <p>
              הספר מחולק לפרקים, כאשר כל פרק מוקדש למערכת אחרת בגוף האדם: מערכת
              הנשימה, מחלות לב, מערכת העיכול, אורתופדיה, נוירולוגיה, פסיכיאטריה
              ועוד.
            </p>

            <h3>ההבדל החשוב: ליקוי בודד מול חישוב משוקלל</h3>
            <p>
              כאן נכנס לתמונה החלק המבלבל ביותר. ספר הליקויים קובע את האחוז ל
              <strong>כל ליקוי בנפרד</strong>. אך מה קורה כשיש לאדם מספר
              ליקויים?
            </p>
            <p>
              <strong>טעות נפוצה:</strong> לחבר את האחוזים. אם נקבעו לכם 20% על
              בעיית גב ו-10% על סוכרת, אין זה אומר שיש לכם 30% נכות.
            </p>
            <p>
              <strong>השיטה הנכונה:</strong> חישוב משוקלל (או "מצטבר").
            </p>
            <blockquote>
              <p>
                <strong>דוגמה לחישוב משוקלל:</strong>
                <br />
                לוקחים את הליקוי הגבוה (20%) מתוך 100% בריאות. נותרו 80%
                "בריאות".
                <br />
                לאחר מכן, לוקחים את הליקוי הבא (10%) ומחשבים 10%{" "}
                <strong>מתוך</strong> 80% הנותרים (כלומר 8%).
                <br />
                התוצאה המשוקללת תהיה 20% + 8% = <strong>28% נכות</strong>.
              </p>
            </blockquote>

            <h3>אז איך ספר הליקויים מתחבר למחשבון שלנו?</h3>
            <p>
              ספר הליקויים נותן את חומרי הגלם (האחוזים לכל בעיה), אבל החישוב
              המשוקלל הוא מה שקובע את התוצאה הסופית. בדיוק בשביל זה קיים
              "מימושון".
            </p>
            <p>
              במקום להסתבך עם הנוסחה,{" "}
              <Link href="/">מחשבון אחוזי הנכות שלנו</Link> עושה עבורכם את
              העבודה. אתם מזינים את אחוזי הנכות לכל ליקוי, והמחשבון מבצע את
              החישוב המשוקלל באופן אוטומטי.
            </p>

            <blockquote>
              <p>
                <strong>הצהרת אחריות:</strong> זכרו, קביעת הסעיף המדויק בספר
                הליקויים נמצאת בסמכותה הבלעדית של הוועדה הרפואית. המחשבון הוא
                כלי עזר להערכה בלבד.
              </p>
            </blockquote>

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

export default Article3Page;
