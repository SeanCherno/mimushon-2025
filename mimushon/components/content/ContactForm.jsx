'use client'

import { useState } from "react";

const FILING_OPTIONS = [
    { value: '',           label: '— בחר/י —',                      disabled: true  },
    { value: 'not_filed',  label: 'טרם הגשתי תביעה'                               },
    { value: 'in_process', label: 'הגשתי — ממתין/ה לתשובה'                        },
    { value: 'rejected',   label: 'נדחיתי על ידי ביטוח לאומי'                     },
    { value: 'approved',   label: 'קיבלתי החלטה / מקבל/ת קצבה כבר'               },
];

const ContactForm = ({ variant = "default", percentages = null, claimType = null }) => {
    const [userInfo, setUserInfo] = useState({ name: '', phone: '', email: '', hearot: '', filingStatus: '' });
    const [consent, setConsent] = useState(false);
    const [consentError, setConsentError] = useState('');
    const [errors, setErrors] = useState({ name: '', phone: '', email: '', filingStatus: '' });
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return !value.trim() ? '*שם מלא הוא שדה חובה' : '';
            case 'phone':
                if (!value.trim()) return '*טלפון הוא שדה חובה';
                return !/^\d{9,10}$/.test(value) ? 'נא להזין מספר טלפון ישראלי תקין (9-10 ספרות)' : '';
            case 'email':
                if (!value.trim()) return ''; // optional
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? 'כתובת אימייל לא תקינה' : '';
            case 'filingStatus':
                return !value ? '*יש לבחור סטטוס תביעה' : '';
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

        const nameError        = validateField('name',         userInfo.name);
        const phoneError       = validateField('phone',        userInfo.phone);
        const emailError       = validateField('email',        userInfo.email);
        const filingStatusError = validateField('filingStatus', userInfo.filingStatus);
        setErrors({ name: nameError, phone: phoneError, email: emailError, filingStatus: filingStatusError });

        if (!consent) {
            setConsentError('יש לאשר את הסכמתך לפני שליחת הטופס');
            return;
        }
        setConsentError('');

        if (nameError || phoneError || emailError || filingStatusError) return;

        setLoading(true);
        try {
            const response = await fetch('/api/user-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name:         userInfo.name,
                    phone:        userInfo.phone,
                    email:        userInfo.email || null,
                    hearot:       userInfo.hearot,
                    filingStatus: userInfo.filingStatus,
                    consent,
                    percentages,
                    claimType,
                }),
            });

            const data = await response.json();
            setSuccess(data.result);

            if (data.result === true) {
                setUserInfo({ name: '', phone: '', email: '', hearot: '', filingStatus: '' });
                setErrors({ name: '', phone: '', email: '', filingStatus: '' });
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

            {/* Name + Phone */}
            <div className={isCompact ? "grid grid-cols-2 gap-3 mb-3" : "space-y-4 mb-4"}>
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

            {/* Filing status */}
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">*האם הגשת תביעה לביטוח לאומי?</label>
                <select
                    name="filingStatus"
                    value={userInfo.filingStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white ${errors.filingStatus ? 'border-red-400' : 'border-gray-300'}`}
                >
                    {FILING_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {errors.filingStatus && <p className="text-red-500 text-xs mt-1">{errors.filingStatus}</p>}
            </div>

            {/* Email — optional */}
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    אימייל <span className="font-normal text-gray-400">(אופציונלי)</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="israel@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
