import Link from "next/link";

export const metadata = {
  title: "מילון מונחים — נכות, ביטוח לאומי וזכויות רפואיות",
  description:
    "הסבר פשוט למונחים הנפוצים: נכות רפואית, דרגת אי-כושר, ספר הליקויים, ועדה רפואית, תקנה 15, שר\"מ ועוד.",
  alternates: {
    canonical: "https://mimushon.co.il/glossary",
  },
  openGraph: {
    title: "מילון מונחים — נכות וביטוח לאומי | מימושון",
    description: "הסבר פשוט לכל המונחים בתחום הנכות וביטוח לאומי.",
    url: "https://mimushon.co.il/glossary",
    type: "website",
  },
};

const TERMS = [
  {
    term: "נכות רפואית (אחוזי נכות)",
    anchor: "nevut-refu'it",
    explanation:
      "מדד רפואי-משפטי הקובע עד כמה ליקוי גופני או נפשי מסוים חורג מהנורמה הבריאה. נקבע לפי ספר הליקויים — רשימה ממשלתית קבועה. הוא אינו מודד כאב סובייקטיבי, אלא משקף פגיעה תפקודית לפי קריטריונים אובייקטיביים. מספר ליקויים משוקללים יחד בנוסחת 'ירידה נצברת' — לא בחיבור פשוט.",
    related: ["shikhlul", "sefer-likyuim"],
  },
  {
    term: "שקלול / נוסחת ירידה נצברת",
    anchor: "shikhlul",
    explanation:
      "כאשר קיימים מספר ליקויים, ביטוח לאומי אינו מחבר את האחוזים אלא משתמש בנוסחה: כל ליקוי מחסיר מה'יכולת הנותרת' — לא מ-100%. לדוגמה: ליקוי ראשון של 50% משאיר 50% יכולת נותרת. ליקוי שני של 30% חל על 50% הנותרים: 30% × 50% = 15%. סה\"כ: 65% (לא 80%). המחשבון של מימושון מבצע חישוב זה אוטומטית.",
    related: ["nevut-refu'it"],
  },
  {
    term: "ספר הליקויים",
    anchor: "sefer-likyuim",
    explanation:
      "המסמך הממשלתי הרשמי הקובע כמה אחוזים מקבל כל ליקוי רפואי. פורסם מכוח תקנות הביטוח הלאומי ומהווה את הבסיס החוקי לכל קביעת נכות. הספר מחלק את הגוף לפרקים (עיניים, אוזניים, מערכת שלד, לב, נפשי וכו') ומפרט את האחוז לכל מצב בהתאם לחומרתו.",
    related: ["nevut-refu'it", "vaada-refuit"],
  },
  {
    term: "ועדה רפואית",
    anchor: "vaada-refuit",
    explanation:
      "גוף של רופא אחד או יותר מטעם ביטוח לאומי הבודק את מצבו הרפואי של המבוטח ומעיין במסמכים שהוגשו. הוועדה קובעת את אחוזי הנכות הרפואיים לפי ספר הליקויים. היא אינה קובעת את דרגת אי-הכושר (זה נעשה בנפרד). ניתן לערער על החלטתה תוך 90 יום לוועדת עררים.",
    related: ["vaada-arrarim", "sefer-likyuim"],
  },
  {
    term: "ועדת עררים",
    anchor: "vaada-arrarim",
    explanation:
      "ועדה רפואית גבוהה יותר שדנה בערעורים על החלטות הוועדה הרפואית הראשונה. מורכבת בדרך כלל ממומחים בתחום הרלוונטי. ניתן לפנות אליה תוך 90 ימים מקבלת ההחלטה המקורית. על החלטת ועדת העררים ניתן לערער לבית הדין לעבודה בשאלות משפטיות בלבד.",
    related: ["vaada-refuit", "beit-din-lavoda"],
  },
  {
    term: "דרגת אי-כושר",
    anchor: "darga-ai-kusher",
    explanation:
      "מדד נפרד מהנכות הרפואית, הנקבע על ידי פקיד תביעות של ביטוח לאומי. בוחן עד כמה הנכות הרפואית פוגעת ביכולת ההשתכרות — בהתחשב בגיל, השכלה, ניסיון תעסוקתי ויכולת ביצוע עבודה חלופית. קיימות 4 דרגות: 60%, 65%, 74%, 100%. הדרגה — לא הנכות הרפואית — קובעת את גובה הקצבה החודשית.",
    related: ["nevut-refu'it", "kitzba-nevut"],
  },
  {
    term: "קצבת נכות כללית",
    anchor: "kitzba-nevut",
    explanation:
      "קצבה חודשית הניתנת למי שעמד בסף הנכות הרפואית (60% כללי, או 40% עם ליקוי בודד של 25%+) ונקבעה לו דרגת אי-כושר. סכומי 2026: 60% אי-כושר = ₪2,718 | 65% = ₪2,894 | 74% = ₪3,211 | 100% = ₪4,711. ניתן לעבוד בחלקיות ולשמור על חלק מהקצבה עד לתקרה מסוימת.",
    related: ["darga-ai-kusher", "sharm"],
  },
  {
    term: 'שירותים מיוחדים (שר"מ)',
    anchor: "sharm",
    explanation:
      'קצבה חודשית נפרדת המיועדת למי שזקוק לעזרה בפעולות יומיום (רחצה, הלבשה, אכילה, ניידות — ADL). ניתנת למי שמקבל קצבת נכות כללית ועמד בסף של 60%+ נכות, או למי שאינו מקבל קצבה כללית אך עמד בסף של 75%+. גובה הקצבה נקבע לפי מבחן תלות. סכומי 2026 נעים בין ₪1,943 ל-₪9,126 לפי דרגת התלות.',
    related: ["kitzba-nevut"],
  },
  {
    term: "פטור ממס הכנסה",
    anchor: "ptor-mas",
    explanation:
      "פטור ממס על הכנסה מעבודה עד לתקרה שנתית, הניתן למי שנקבעו לו 90% נכות רפואית ומעלה לצמיתות — או לתקופה זמנית של לפחות 185 ימים. אינו מחייב דרגת אי-כושר — האחוזים הרפואיים בלבד קובעים. הוועדה לפטור ממס של ביטוח לאומי היא הגורם הקובע.",
    related: ["nevut-refu'it"],
  },
  {
    term: "תקנה 15",
    anchor: "takana-15",
    explanation:
      "מנגנון חוקי בענף נפגעי עבודה המאפשר להגדיל את הנכות הרפואית בעד 50% נוספים, אם הפגיעה מונעת מהנפגע לחזור לעבודתו הספציפית ואין לו יכולת השתכרות חלופית. חל אך ורק על נפגעי עבודה — לא על נכות כללית. יכול להפוך מענק חד-פעמי לקצבה חודשית לכל החיים.",
    related: ["takana-18"],
  },
  {
    term: "תקנה 18 / נכה נזקק",
    anchor: "takana-18",
    explanation:
      "מנגנון בענף נפגעי עבודה המאפשר לוועדה לקבוע 100% נכות זמנית לתקופה של עד 4 חודשים — גם אם האחוז הרפואי הקבוע נמוך — בתנאי שהנפגע אינו מסוגל לעבוד בשום עבודה ואין לו הכנסה. מיועד לתקופות החלמה. לאחר 4 חודשים נדרשת הערכה מחדש.",
    related: ["takana-15"],
  },
  {
    term: "פוסק רפואי",
    anchor: "posek-refui",
    explanation:
      "רופא מוסמך מטעם ביטוח לאומי הקובע את אחוזי הנכות הרפואית. שמו מופיע ברשימה רשמית שקבע משרד העבודה. בניגוד לרופא המשפחה שלך, הפוסק הרפואי הוא גורם ממוסד — החלטתו ניתנת לערעור.",
    related: ["vaada-refuit"],
  },
  {
    term: "בית הדין לעבודה",
    anchor: "beit-din-lavoda",
    explanation:
      "הערכאה המשפטית לערעור על החלטות ועדת העררים. ניתן לפנות אליו בשאלות משפטיות בלבד — לא לבחינה מחדש של הממצאים הרפואיים. הייצוג על ידי עורך דין מומלץ מאוד.",
    related: ["vaada-arrarim"],
  },
];

export default function GlossaryPage() {
  return (
    <div className="py-12 sm:py-16 bg-indigo-50" dir="rtl">
      <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
          מילון מונחים
        </h1>
        <p className="text-center text-gray-500 mb-10 text-sm">
          הסבר פשוט למונחים הנפוצים בתחום הנכות, ביטוח לאומי וזכויות רפואיות
        </p>

        {/* Quick-jump index */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TERMS.map((t) => (
            <a
              key={t.anchor}
              href={`#${t.anchor}`}
              className="text-xs px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition"
            >
              {t.term}
            </a>
          ))}
        </div>

        <div className="space-y-6">
          {TERMS.map((t) => (
            <div
              key={t.anchor}
              id={t.anchor}
              className="bg-white rounded-xl border border-indigo-100 shadow-sm p-5 scroll-mt-6"
            >
              <h2 className="text-lg font-bold text-indigo-800 mb-2">{t.term}</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{t.explanation}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 text-sm text-gray-500 text-center">
          <p>
            <Link href="/articles" className="text-indigo-600 hover:underline">מאמרים נוספים</Link>
            {" · "}
            <Link href="/" className="text-indigo-600 hover:underline">חזרה למחשבון</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
