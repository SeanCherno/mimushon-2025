'use client'

import { useState } from "react";

const ContactForm = ({ variant = "default" }) => {
    const [userInfo, setUserInfo] = useState({ name: '', phone: '', hearot: '' });
    const [consent, setConsent] = useState(false);
    const [consentError, setConsentError] = useState('');
    const [errors, setErrors] = useState({ name: '', phone: '' });
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return !value.trim() ? '*שם מלא הוא שדה חובה' : '';
            case 'phone':
                if (!value.trim()) return '*טלפון הוא שדה חובה';
                return !/^\d{9,10}$/.test(value) ? 'נא להזין מספר טלפון ישראלי תקין (9-10 ספרות)' : '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);

        const nameError = validateField('name', userInfo.name);
        const phoneError = validateField('phone', userInfo.phone);
        setErrors({ name: nameError, phone: phoneError });

        if (!consent) {
            setConsentError('יש לאשר את הסכמתך לפני שליחת הטופס');
            return;
        }
        setConsentError('');

        if (nameError || phoneError) return;

        setLoading(true);
        try {
            const response = await fetch('/api/user-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...userInfo, consent }),
            });

            const data = await response.json();
            setSuccess(data.result);

            if (data.result === true) {
                setUserInfo({ name: '', phone: '', hearot: '' });
                setErrors({ name: '', phone: '' });
                setConsent(false);
                setConsentError('');
            }
        } catch {
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const isCompact = variant === "compact";

    return (
        <form onSubmit={handleSubmit} className="text-right" dir="rtl">
            {success === true && (
                <div className="bg-green-100 border border-green-400 text-green-800 font-semibold p-4 rounded-lg mb-4 text-center">
                    ✅ פרטייך התקבלו בהצלחה! נציג יחזור אליך בהקדם.
                </div>
            )}
            {success === false && (
                <div className="bg-red-100 border border-red-400 text-red-800 font-semibold p-4 rounded-lg mb-4 text-center">
                    אירעה שגיאה. אנא נסה שוב.
                </div>
            )}

            <div className={isCompact ? "grid grid-cols-2 gap-3 mb-3" : "space-y-4 mb-4"}>
                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">*שם מלא</label>
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                        placeholder="ישראל ישראלי"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">*טלפון</label>
                    <input
                        type="tel"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                        placeholder="0501234567"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
            </div>

            {/* Comment — hidden in compact mode */}
            {!isCompact && (
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">הערות (אופציונלי)</label>
                    <textarea
                        name="hearot"
                        value={userInfo.hearot}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="תאר/י בקצרה את מצבך..."
                    />
                </div>
            )}

            {/* Consent */}
            <div className="mb-4">
                <label className="flex items-start gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => { setConsent(e.target.checked); if (e.target.checked) setConsentError(''); }}
                        className="mt-0.5 h-4 w-4 text-indigo-600 border-gray-300 rounded shrink-0"
                    />
                    <span className="text-xs text-gray-500 leading-relaxed">
                        אני מסכים/ה שעורך דין או נציג מטעם מימושון ייצור איתי קשר לצורך ייעוץ ראשוני חינמי, וכי פרטיי יועברו לגורם המטפל בפנייתי.
                    </span>
                </label>
                {consentError && <p className="text-red-500 text-xs mt-1">{consentError}</p>}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg text-base transition duration-200"
            >
                {loading ? 'שולח...' : 'קבל/י ייעוץ חינמי ←'}
            </button>
        </form>
    );
};

export default ContactForm;
