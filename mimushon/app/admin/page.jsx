import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import pool from '../../lib/db';
import LogoutButton from './LogoutButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'דשבורד מנהל | מימושון',
  robots: { index: false, follow: false },
};

const CLAIM_LABELS = {
  illness:       { label: 'מחלה',         color: 'bg-indigo-100 text-indigo-700' },
  work_accident: { label: 'תאונת עבודה',  color: 'bg-amber-100 text-amber-700'  },
  idf_disabled:  { label: 'נכה צה"ל',    color: 'bg-blue-100 text-blue-700'    },
  other:         { label: 'אחר',           color: 'bg-gray-100 text-gray-600'    },
};

async function getData() {
  const [leadsRes, calcsRes, topDiseasesRes] = await Promise.all([
    pool.query(`
      SELECT id, name, phone, comment, percentages, claim_type, created_at
      FROM contact_us_users
      ORDER BY created_at DESC
      LIMIT 200
    `),
    pool.query(`
      SELECT COUNT(*)::int AS total FROM disease_calculations
    `),
    pool.query(`
      SELECT
        d->'disease'->>'id'   AS disease_id,
        d->'disease'->>'name' AS disease_name,
        COUNT(*)::int         AS count
      FROM disease_calculations,
        jsonb_array_elements((calculation_data->>'diseases')::jsonb) AS d
      GROUP BY disease_id, disease_name
      ORDER BY count DESC
      LIMIT 30
    `),
  ]);

  return {
    leads:            leadsRes.rows,
    totalCalculations: calcsRes.rows[0]?.total ?? 0,
    topDiseases:      topDiseasesRes.rows,
  };
}

function formatDate(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('he-IL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function Pct({ value, color }) {
  if (value == null) return <span className="text-gray-300">—</span>;
  return (
    <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${color}`}>
      {Math.round(value)}%
    </span>
  );
}

function ClaimBadge({ type }) {
  const c = CLAIM_LABELS[type];
  if (!c) return <span className="text-gray-300">—</span>;
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${c.color}`}>
      {c.label}
    </span>
  );
}

export default async function AdminDashboard() {
  // Auth is enforced by middleware — this is a secondary server-side check
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (!process.env.ADMIN_SECRET || session !== process.env.ADMIN_SECRET) {
    redirect('/admin/login');
  }

  const { leads, totalCalculations, topDiseases } = await getData();

  const todayLeads = leads.filter(l => {
    if (!l.created_at) return false;
    const d = new Date(l.created_at);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() &&
           d.getMonth()    === now.getMonth()    &&
           d.getDate()     === now.getDate();
  });

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">לוח בקרה — מנהל</h1>
            <p className="text-sm text-gray-400 mt-0.5">מימושון · נתונים בזמן אמת</p>
          </div>
          <LogoutButton />
        </div>

        {/* ── Stats cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-indigo-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">סה"כ חישובים</p>
            <p className="text-3xl font-extrabold text-indigo-600">{totalCalculations.toLocaleString('he-IL')}</p>
          </div>
          <div className="bg-white rounded-xl border border-green-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">סה"כ לידים</p>
            <p className="text-3xl font-extrabold text-green-600">{leads.length.toLocaleString('he-IL')}</p>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">לידים היום</p>
            <p className="text-3xl font-extrabold text-amber-500">{todayLeads.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-purple-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">מחלות ייחודיות</p>
            <p className="text-3xl font-extrabold text-purple-600">{topDiseases.length}</p>
          </div>
        </div>

        {/* ── Leads table ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-700">לידים ({leads.length})</h2>
          </div>

          {leads.length === 0 ? (
            <p className="text-gray-400 text-sm p-6 text-center">אין לידים עדיין</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <th className="px-4 py-3 text-right font-semibold">תאריך</th>
                    <th className="px-4 py-3 text-right font-semibold">שם</th>
                    <th className="px-4 py-3 text-right font-semibold">טלפון</th>
                    <th className="px-4 py-3 text-right font-semibold">סוג תביעה</th>
                    <th className="px-4 py-3 text-center font-semibold">נכות כללית</th>
                    <th className="px-4 py-3 text-center font-semibold">מס הכנסה</th>
                    <th className="px-4 py-3 text-center font-semibold">שירותים מיוחדים</th>
                    <th className="px-4 py-3 text-right font-semibold">הערות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leads.map((lead, i) => {
                    const pct = lead.percentages ?? {};
                    return (
                      <tr key={lead.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{formatDate(lead.created_at)}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{lead.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <a href={`tel:${lead.phone}`} className="text-indigo-600 hover:underline font-mono text-xs">
                            {lead.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3"><ClaimBadge type={lead.claim_type} /></td>
                        <td className="px-4 py-3 text-center">
                          <Pct value={pct.generalDisability} color="bg-indigo-100 text-indigo-700" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Pct value={pct.taxIncome} color="bg-blue-100 text-blue-700" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Pct value={pct.specialServices} color="bg-purple-100 text-purple-700" />
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs max-w-[180px] truncate">{lead.comment || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Top diseases table ──────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-700">30 המחלות הנפוצות ביותר</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3 text-right font-semibold">#</th>
                  <th className="px-6 py-3 text-right font-semibold">שם המחלה</th>
                  <th className="px-6 py-3 text-right font-semibold">מזהה</th>
                  <th className="px-6 py-3 text-right font-semibold">מספר חישובים</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topDiseases.map((row, i) => (
                  <tr key={row.disease_id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-6 py-3 text-gray-400 font-mono text-xs">{i + 1}</td>
                    <td className="px-6 py-3 font-medium text-gray-800">{row.disease_name}</td>
                    <td className="px-6 py-3 text-gray-400 font-mono text-xs">{row.disease_id}</td>
                    <td className="px-6 py-3">
                      <span className="bg-indigo-100 text-indigo-700 font-semibold px-3 py-0.5 rounded-full text-xs">
                        {row.count.toLocaleString('he-IL')}
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
