// app/not-found.js
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="text-center p-10">
      <h2 className="text-3xl font-bold">404 - הדף לא נמצא</h2>
      <p className="mb-6 mt-3">מצטערים, לא מצאנו את הדף שחיפשת.</p>
      <Link
        href="/"
        className="bg-indigo-600 text-white rounded-lg hover:underline p-3"
      >
        חזור לדף הבית
      </Link>
    </div>
  );
}
