import { notFound } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard | מימושון",
  robots: { index: false, follow: false },
};

async function getStats() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;

  const origin =
    process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3000";

  try {
    const res = await fetch(`${origin}/api/admin/stats`, {
      headers: { "x-admin-secret": secret },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function AdminPage() {
  const data = await getStats();

  if (!data) {
    notFound();
  }

  const { topDiseases, totalCalculations } = data;

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">
            לוח בקרה — מנהל
          </h1>
          <p className="text-gray-500 mt-1 text-sm">סטטיסטיקות שימוש</p>
        </div>

        {/* Total counter */}
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 mb-8 inline-block">
          <p className="text-sm text-gray-500 mb-1">סה&quot;כ חישובים</p>
          <p className="text-4xl font-extrabold text-indigo-600">
            {totalCalculations.toLocaleString("he-IL")}
          </p>
        </div>

        {/* Top diseases table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">
              30 המחלות הנפוצות ביותר
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-50 text-indigo-700">
                  <th className="px-6 py-3 text-right font-semibold">#</th>
                  <th className="px-6 py-3 text-right font-semibold">
                    שם המחלה
                  </th>
                  <th className="px-6 py-3 text-right font-semibold">
                    מזהה
                  </th>
                  <th className="px-6 py-3 text-right font-semibold">
                    מספר חישובים
                  </th>
                </tr>
              </thead>
              <tbody>
                {topDiseases.map((row, index) => (
                  <tr
                    key={row.disease_id}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }
                  >
                    <td className="px-6 py-3 text-gray-400 font-mono">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 text-gray-800 font-medium">
                      {row.disease_name}
                    </td>
                    <td className="px-6 py-3 text-gray-400 font-mono text-xs">
                      {row.disease_id}
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-block bg-indigo-100 text-indigo-700 font-semibold px-3 py-0.5 rounded-full">
                        {row.count.toLocaleString("he-IL")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
