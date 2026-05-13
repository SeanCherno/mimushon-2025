'use client'

import React, { useState } from "react";

const ContactSection = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        hearot: ''
    });

    const [consent, setConsent] = useState(false);
    const [consentError, setConsentError] = useState('');

    const [errors, setErrors] = useState({
        name: '',
        phone: ''
    });

    const [success, setSuccess] = useState(null);

    // --- Validation Logic ---
    const validateField = (name, value) => {
        let errorMsg = '';
        switch (name) {
            case 'name':
                if (!value.trim()) {
                    errorMsg = '*שם מלא הוא שדה חובה';
                }
                break;
            case 'phone':
                const phoneRegex = /^\d{9,10}$/; // Simple regex for 9-10 digits (Israeli numbers)
                if (!value.trim()) {
                    errorMsg = '*טלפון הוא שדה חובה';
                } else if (!phoneRegex.test(value)) {
                    errorMsg = 'נא להזין מספר טלפון ישראלי תקין (9-10 ספרות)';
                }
                break;
            default:
                break;
        }
        return errorMsg;
    };

    // --- Handlers ---

    const handleUserInfoChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Optionally, validate as they type (or clear error)
        if (errors[name]) {
            const error = validateField(name, value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: error,
            }));
        }
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const error = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleUserInfoSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null); // Reset success message on new submission

        // --- Run Full Validation ---
        const nameError = validateField('name', userInfo.name);
        const phoneError = validateField('phone', userInfo.phone);

        setErrors({
            name: nameError,
            phone: phoneError,
        });

        // --- Check consent ---
        if (!consent) {
            setConsentError('יש לאשר את הסכמתך לפני שליחת הטופס');
            return;
        }
        setConsentError('');

        // --- Check if any errors exist ---
        if (nameError || phoneError) {
            return;
        }

        try {
            const response = await fetch(`/api/user-info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userInfo, consent }),
            });

            if (!response.ok) {
                // Handle HTTP errors (like 404, 500)
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            setSuccess(data.result);

            // If successful, clear the form
            if (data.result === true) {
                setUserInfo({ name: '', phone: '', hearot: '' });
                setErrors({ name: '', phone: '' });
                setConsent(false);
                setConsentError('');
            }

        } catch (error) {
            console.error("Failed to store user data:", error);
            setSuccess(false); // Set to false on any fetch/network error
        }
    };

    return (
        <section id="contact" className="bg-indigo-700 text-white py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">אל תתמודדו עם זה לבד.</h2>
                <p className="mt-4 text-lg max-w-3xl mx-auto">הבירוקרטיה יכולה להיות מכשול, אבל היא לא צריכה לעצור אותך מלקבל את מה שמגיע לך. שיחת ייעוץ ראשונית עם המומחים שלנו היא ללא עלות וללא כל התחייבות.</p>

                <div className="max-w-xl mx-auto mt-10">
                    <form className="bg-white p-8 rounded-lg shadow-xl text-right">
                        {success === true && (
                            <div className="bg-green-200 border-l-4 border-green-500 text-green-800 font-semibold p-4 rounded-lg mb-3 text-center" role="alert">
                                פרטייך התקבלו בהצלחה. נציג יחזור אליך בהקדם!
                            </div>
                        )}
                        {success === false && (
                            <div className="bg-red-200 border-l-4 border-red-500 text-red-800 font-semibold p-4 rounded-lg mb-3 text-center" role="alert">
                                אירעה שגיאה בעת השארת הפרטים. אנא נסה שוב.
                            </div>
                        )}

                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">השאירו פרטים ונחזור אליכם עוד היום</h3>

                        {/* Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">*שם מלא</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userInfo.name}
                                onChange={handleUserInfoChange}
                                onBlur={handleBlur}
                                className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                required
                                aria-invalid={!!errors.name}
                                aria-describedby="name-error"
                            />
                            {errors.name && <p id="name-error" className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
                        </div>

                        {/* Phone Field */}
                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">*טלפון</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleUserInfoChange}
                                onBlur={handleBlur}
                                className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
                                required
                                aria-invalid={!!errors.phone}
                                aria-describedby="phone-error"
                            />
                            {errors.phone && <p id="phone-error" className="text-red-500 text-xs italic mt-1">{errors.phone}</p>}
                        </div>

                        {/* Hearot Field */}
                        <div className="mb-6">
                            <label htmlFor="hearot" className="block text-gray-700 text-sm font-bold mb-2">הערות</label>
                            <textarea
                                id="hearot"
                                name="hearot"
                                value={userInfo.hearot}
                                onChange={handleUserInfoChange}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Consent Checkbox */}
                        <div className="mb-6">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={consent}
                                    onChange={(e) => {
                                        setConsent(e.target.checked);
                                        if (e.target.checked) setConsentError('');
                                    }}
                                    className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded shrink-0"
                                />
                                <span className="text-sm text-gray-600">
                                    אני מסכים/ה שעורך דין או נציג מטעם מימושון ייצור איתי קשר לצורך ייעוץ ראשוני חינמי, וכי פרטיי יועברו לגורם המטפל בפנייתי.
                                </span>
                            </label>
                            {consentError && <p className="text-red-500 text-xs italic mt-1">{consentError}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                id="user-info-submit"
                                onClick={handleUserInfoSubmit}
                                className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg w-full transition duration-300"
                                type="submit"
                            >
                                שלח/י וקבל/י שיחת ייעוץ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
