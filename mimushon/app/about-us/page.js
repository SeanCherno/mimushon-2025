import Link from "next/link";

export const metadata = {
  title: "אודות מימושון | מי אנחנו, המטרה והחזון",
  description:
    'מה עומד מאחורי מחשבון אחוזי הנכות "מימושון"? הכירו את המטרה שלנו: לפשט תהליכי ביטוח לאומי ולהנגיש מידע חשוב על זכויות רפואיות.',
  alternates: {
    canonical: "https://mimushon.co.il/about-us",
  },
  // Replaces Open Graph (og:) tags
  openGraph: {
    title: "אודות מימושון | מי אנחנו, המטרה והחזון",
    description: 'מה עומד מאחורי מחשבון אחוזי הנכות "מימושון"?',
    url: "https://mimushon.co.il/about-us",
    type: "website",
  },
};

const AboutPage = () => {
  // סגנונות זהים לעמודי המאמרים
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
            {/* --- כותרת העמוד --- */}
            <h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center"
              style={{ lineHeight: "1.4" }}
            >
              אודות "מימושון"
            </h1>

            <p>
              ברוכים הבאים למימושון. הקמנו את האתר הזה מתוך מטרה אחת פשוטה:
              **לפשט תהליך אחד, מורכב ומתסכל - חישוב אחוזי נכות.**
            </p>
            <p>
              ההתמודדות מול גופים כמו המוסד לביטוח לאומי יכולה להיות מבלבלת,
              טכנית ומלחיצה. מושגים כמו "ספר הליקויים" או "חישוב משוקלל" לא תמיד
              ברורים, ורבים מוצאים את עצמם אבודים בתוך הבירוקרטיה, עוד לפני
              שהתחילו.
            </p>
            <p>
              אנחנו מאמינים שלכל אדם מגיעה הזכות להבין את מצבו ולקבל מידע נגיש
              וברור.
            </p>

            <h3>מה אנחנו עושים?</h3>
            <p>
              "מימושון" הוא בראש ובראשונה כלי עזר דיגיטלי, חינמי ונגיש. הליבה של
              האתר היא{" "}
              <Link href="/">
                <strong>מחשבון אחוזי נכות</strong>
              </Link>{" "}
              פשוט ומהיר.
            </p>
            <p>
              המחשבון שלנו לוקח את הנוסחה הרשמית והמורכבת של "חישוב משוקלל" (שבה
              20% ועוד 10% הם לא 30%, אלא 28%) והופך אותה לפעולה פשוטה של הקלדת
              מספרים וקבלת תוצאה מיידית.
            </p>

            <h3>איך אנחנו עוזרים?</h3>
            <p>המטרה שלנו היא להעניק לכם בהירות וכוח בתהליך:</p>
            <ul className="list-disc space-y-2">
              <li>
                <strong>לתת לכם הערכה ראשונית:</strong> כדי שתבינו איפה אתם
                עומדים, בין אם לפני הגשת תביעה או אחריה.
              </li>
              <li>
                <strong>לעזור לכם להבין את התוצאה:</strong> אם קיבלתם החלטה
                מביטוח לאומי, תוכלו להזין את המספרים במחשבון ולוודא שהחישוב
                המשוקלל תואם את מה שקיבלתם.
              </li>
              <li>
                <strong>לספק מידע נגיש:</strong> דרך{" "}
                <Link href="/articles">
                  <strong>עמוד המאמרים</strong>
                </Link>{" "}
                שלנו, אנו שואפים לפרק נושאים מורכבים (כמו ערעורים, ספר הליקויים
                ועוד) להסברים פשוטים וברורים.
              </li>
            </ul>

            <blockquote>
              <p>
                <strong>חשוב להדגיש: מה אנחנו לא</strong>
                <br />
                "מימושון" הוא כלי אינפורמטיבי בלבד. אנחנו לא עורכי דין, לא
                רופאים, ולא נציגים רשמיים של המוסד לביטוח לאומי.
                <br />
                <br />
                המידע והחישובים באתר אינם מהווים ייעוץ משפטי, רפואי או פיננסי,
                ואינם תחליף לייעוץ מקצועי פרטני. התוצאות במחשבון הן **הערכה
                בלבד** ואינן מחייבות שום גורם רשמי.
              </p>
            </blockquote>

            <p>
              אנחנו כאן כדי להיות השלב הראשון והפשוט במסע שלכם להבנת זכויותיכם.
            </p>
            <p>אנו מקווים שהכלים והמידע באתר יסייעו לכם.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
