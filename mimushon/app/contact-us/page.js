import ContactForm from "../../components/content/ContactForm";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";

export const metadata = {
  title: "צרו קשר",
  description:
    "יש לכם שאלה על מחשבון אחוזי הנכות של מימושון או על תהליך קביעת הנכות? השאירו פרטים ונחזור אליכם. השירות חינמי לחלוטין.",
  alternates: {
    canonical: "https://mimushon.co.il/contact-us",
  },
  openGraph: {
    title: "צרו קשר | מימושון",
    description:
      "יש לכם שאלה על מחשבון אחוזי הנכות או על תהליך קביעת הנכות? השאירו פרטים ונחזור אליכם.",
    url: "https://mimushon.co.il/contact-us",
    type: "website",
    images: ["/images/hero-mimushon.webp"],
  },
};

export default function ContactUsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://mimushon.co.il/" },
          { name: "צרו קשר", url: "https://mimushon.co.il/contact-us" },
        ]}
      />
      <div className="py-12 sm:py-16 bg-indigo-50" dir="rtl">
        <div className="container mx-auto px-6 max-w-2xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
            צרו קשר
          </h1>
          <p className="text-center text-gray-500 mb-8 text-sm leading-relaxed">
            מימושון הוא כלי חינמי להערכת אחוזי נכות. יש לכם שאלה על המחשבון, על
            אופן החישוב או על התהליך מול ביטוח לאומי? השאירו פרטים ונחזור אליכם.
          </p>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
