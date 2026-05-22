import nodemailer from "nodemailer";
import { resolve4 } from "dns/promises";

/* ── Helpers ─────────────────────────────────────────────────────────────────
   createIPv4Transporter() explicitly resolves the SMTP hostname to an IPv4
   address before handing it to nodemailer.  This bypasses Node 17+ behaviour
   where dns.lookup() can return an IPv6 address first, causing ENETUNREACH on
   servers that have no IPv6 routing (the ":::0" local socket error).
──────────────────────────────────────────────────────────────────────────── */
async function createIPv4Transporter() {
  let host = process.env.SMTP_HOST;

  try {
    const [ipv4] = await resolve4(host); // throws if no A record
    host = ipv4;
    console.log(`[mailer] Resolved ${process.env.SMTP_HOST} → ${host}`);
  } catch (err) {
    console.warn(`[mailer] Could not resolve ${host} to IPv4, using hostname as-is:`, err.message);
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const CLAIM_TYPE_LABELS = {
  illness:      "מחלה",
  work_accident: "תאונת עבודה",
  idf_disabled: 'נכה צה"ל',
  other:        "אחר",
};

/* ── Public API ──────────────────────────────────────────────────────────────*/
export async function sendLeadNotification({ name, phone, comment, percentages, claimType }) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.NOTIFICATION_EMAIL) {
    console.warn("[mailer] Email not configured — skipping notification.");
    return;
  }

  const transporter = await createIPv4Transporter();

  await transporter.sendMail({
    from: `"מימושון" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `ליד חדש: ${name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4338ca;">ליד חדש התקבל במימושון</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">שם</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">טלפון</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${phone}</td>
          </tr>
          ${claimType ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">סוג תביעה</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${CLAIM_TYPE_LABELS[claimType] ?? claimType}</td>
          </tr>` : ""}
          ${comment ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">הערות</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${comment}</td>
          </tr>` : ""}
          ${percentages ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">נכות כללית</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; color: #4338ca;">${Math.round(percentages.generalDisability ?? 0)}%</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">מס הכנסה</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${Math.round(percentages.taxIncome ?? 0)}%</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">שירותים מיוחדים</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${Math.round(percentages.specialServices ?? 0)}%</td>
          </tr>` : ""}
        </table>
        <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">
          הודעה זו נשלחה אוטומטית ממערכת מימושון.
        </p>
      </div>
    `,
  });
}
