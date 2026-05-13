import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Admin Dashboard | מימושון",
  robots: { index: false, follow: false },
};

async function getStats() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;

  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3000";

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
  // Check cookie instead of URL query param
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const envSecret = process.env.ADMIN_SECRET;

  if (!envSecret || session !== envSecret) {
    redirect("/admin/login");
  }

  const data = await getStats();
  if (!data) notFound();

  const { topDiseases, totalCalculations, leads } = data;

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">לוח בקרה — מנהל</h1>
          <p className="text-gray-500 mt-1 text-sm">סטטיסטיקות שימוש ולידים</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
            <p className="text-sm text-gray-500 mb-1">סה&quot;כ חישובים</p>
            <p className="text-4xl font-extrabold text-indigo-600">
              {totalCalculations.toLocaleString("he-IL")}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
            <p className="text-sm text-gray-500 mb-1">סה&quot;כ לידים</p>
            <p className="text-4xl font-extrabold text-green-600">
              {leads.length.toLocaleString("he-IL")}
            </p>
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">לידים אחרונים</h2>
          </div>
          {leads.length === 0 ? (
            <p className="text-gray-400 text-sm p-6 text-center">אין לידים עדיין</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-50 text-green-800">
                    <th className="px-4 py-3 text-right font-semibold">תאריך</th>
                    <th className="px-4 py-3 text-right font-semibold">שם</th>
                    <th className="px-4 py-3 text-right font-semibold">טלפון</th>
                    <th className="px-4 py-3 text-right font-semibold">נכות כללית</th>
                    <th className="px-4 py-3 text-right font-semibold">מס הכנסה</th>
                    <th className="px-4 py-3 text-right font-semibold">שירותים מיוחדים</th>
                    <th className="px-4 py-3 text-right font-semibold">הערות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead, index) => {
                    const pct = lead.percentages || {};
                    const date = new Date(lead.created_at).toLocaleDateString("he-IL", {
                      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
                    });
                    return (
                      <tr key={lead.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{date}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">{lead.name}</td>
                        <td className="px-4 py-3">
                          <a href={`tel:${lead.phone}`} className="text-indigo-600 hover:underline font-mono">{lead.phone}</a>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {pct.generalDisability != null ? (
                            <span className="bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full text-xs">
                              {Math.round(pct.generalDisability)}%
                            </span>
                          ) : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {pct.taxIncome != null ? (
                            <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full text-xs">
                              {Math.round(pct.taxIncome)}%
                            </span>
                          ) : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {pct.specialServices != null ? (
                            <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full text-xs">
                              {Math.round(pct.specialServices)}%
                            </span>
                          ) : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{lead.comment || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top diseases table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">30 המחלות הנפוצות ביותר</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-50 text-indigo-700">
                  <th className="px-6 py-3 text-right font-semibold">#</th>
                  <th className="px-6 py-3 text-right font-semibold">שם המחלה</th>
                  <th className="px-6 py-3 text-right font-semibold">מזהה</th>
                  <th className="px-6 py-3 text-right font-semibold">מספר חישובים</th>
                </tr>
              </thead>
              <tbody>
                {topDiseases.map((row, index) => (
                  <tr key={row.disease_id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-3 text-gray-400 font-mono">{index + 1}</td>
                    <td className="px-6 py-3 text-gray-800 font-medium">{row.disease_name}</td>
                    <td className="px-6 py-3 text-gray-400 font-mono text-xs">{row.disease_id}</td>
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
