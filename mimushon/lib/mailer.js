import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587
  family: 4, // force IPv4 — prevents ENETUNREACH on servers without IPv6
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send a lead notification email to the site owner.
 */
export async function sendLeadNotification({ name, phone, comment, percentages }) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.NOTIFICATION_EMAIL) {
    console.warn("[mailer] Email not configured — skipping notification.");
    return;
  }

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
