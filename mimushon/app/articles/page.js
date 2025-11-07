// pages/articles/index.js
import Link from "next/link";
import { allArticles } from "../../lib/articles"; // ייבוא של רשימת המאמרים

export const metadata = {
  title: "מאמרים ומידע על זכויות רפואיות",
  description:
    "מאגר מידע וכתבות על תהליכי ביטוח לאומי, אחוזי נכות, הגשת תביעות, ערעורים, ספר הליקויים ושימוש נכון במחשבון אחוזי הנכות.",
  alternates: {
    canonical: "https://mimushon.co.il/articles",
  },
  openGraph: {
    title: "מאמרים ומידע על זכויות רפואיות | מימושון",
    description:
      "מאגר מידע וכתבות על תהליכי ביטוח לאומי, אחוזי נכות, הגשת תביעות ועוד.",
    url: "https://mimushon.co.il/articles",
    type: "website",
  },
};

// זוהי הקומפוננטה של הדף. היא מקבלת את המאמרים כ-props
const ArticlesIndexPage = ({ articles }) => {
  // הסטייל נשאר כפי שהיה, אבל התאמתי אותו לתיאור
  const customStyles = `
        .article-link {
            display: block;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem; /* rounded-lg */
            margin-bottom: 1rem;
            transition: background-color 0.2s, box-shadow 0.2s;
        }
        .article-link:hover {
            box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.05); /* shadow-md */
        }
        .article-title {
            font-size: 1.25rem; /* 20px */
            font-weight: 600;
            color: #4f46e5; /* text-indigo-600 */
            margin-bottom: 0.25rem;
        }
        .article-description {
            font-size: 1rem; /* 16px */
            color: #4b5563; /* text-gray-600 */
        }
    `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="py-12 sm:py-16 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            מאמרים ומידע בנושא זכויות רפואיות
          </h1>

          <div className="max-w-none text-right">
            <ul className="list-none p-0 m-0 space-y-4">
              {/* כאן קורה הקסם:
                                אנו רצים בלולאה על המערך 'articles' שקיבלנו כ-props
                                ויוצרים קישור לכל אחד מהם באופן דינמי.
                            */}
              {allArticles.map((article) => (
                <li key={article.slug}>
                  <Link
                    className="article-link bg-gray-200 hover:bg-gray-100"
                    href={`/articles/${article.slug}`}
                  >
                    <div className="article-title">{article.title}</div>
                    <p className="article-description">{article.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesIndexPage;
