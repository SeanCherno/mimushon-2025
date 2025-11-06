"use client"; // קובץ זה חייב להיות קליינט
export default function Error({ error, reset }) {
  return (
    <div className="text-center p-10">
      <h2 className="text-3xl font-bold text-red-600">אופס! משהו השתבש</h2>
      <p>אירעה שגיאה בלתי צפויה במחשבון.</p>
      <button
        onClick={() => reset()}
        className="bg-indigo-600 text-white p-2 rounded"
      >
        נסה שוב
      </button>
    </div>
  );
}
