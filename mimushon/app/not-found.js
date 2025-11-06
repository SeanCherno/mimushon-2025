// app/not-found.js
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="text-center p-10">
      <h2 className="text-3xl font-bold">404 - הדף לא נמצא</h2>
      <p>מצטערים, לא מצאנו את הדף שחיפשת.</p>
      <Link href="/" className="text-indigo-600 hover:underline">
        חזור לדף הבית
      </Link>
    </div>
  );
}
