'use client'

import React, { useState } from "react";

const UserInfoForm = ({ onFormSubmit, onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [showBenefits, setShowBenefits] = useState(false); // New state for toggling benefits

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    // Basic email validation
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onFormSubmit({ name, phone, email });
    }
  };

  const handleNoUserInfo = () => {
    onFormSubmit({})
  }

  return (
    <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200">
      <h2 className="text-xl font-bold text-indigo-800 mb-2">✋ מעוניינ/ת להשאיר פרטים להמשך ליווי אישי מקצועי?</h2>
      <h4 className="font-bold text-indigo-800">
        אם קיבלת הערכה לתחילת הליך קביעת אחוזי נכות – אנו כאן כדי ללוות אותך צעד אחר צעד!
        <br />
      </h4>
      <div className="my-4">
        <button
          type="button"
          onClick={() => setShowBenefits(!showBenefits)}
          className="w-full flex items-center justify-between p-3 bg-indigo-200 text-indigo-800 rounded-lg font-semibold hover:bg-indigo-300 transition duration-200 ease-in-out"
        >
          <span>💼 מה תקבל/י בכפוף להשארת פרטיך?</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${showBenefits ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {showBenefits && (
          <div className="mt-3 p-4 bg-indigo-100 rounded-lg border border-indigo-200 text-sm text-indigo-700">
            {/* <p className="mb-2">By providing your contact details, you'll receive:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>A summary of your selected diseases and their calculated percentages.</li>
              <li>Updates on new features or relevant information regarding disease assessment.</li>
              <li>Occasional helpful tips for managing health-related data.</li>
            </ul>
            <p className="mt-2">Your data will be kept confidential and used only for the purposes outlined here.</p> */}
            {/* <p className="font-bold text-indigo-800 mb-4">💼 מה תקבל/י בכפוף להשארת פרטיך?</p> */}
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-bold text-indigo-800">בדיקת המקרה שלך – </span>האם השלמת כל המסמכים הנדרשים (למשל תלושי שכר, טפסים רפואיים, אישורים מיוחדים)
              </li>
              <li>
                <span className="font-bold text-indigo-800">הכנה אישית לקראת הוועדה – </span> כולל עזרה באסטרטגיית הצגה עצמית, סדר תיעוד ודרכי טיפול בשאלות רפואיות
              </li>
              <li>
                <span className="font-bold text-indigo-800">סיוע בזמן הוועדה – </span>הכוונה לגבי זכויותיך (לדוגמה, הבאת מלווה), ביטוח הזכויות והתגובה על החלטות
              </li>
              <li>
                <span className="font-bold text-indigo-800">ליווי גם לאחר קבלת ההחלטה –</span>  הסברים על זכויות, ערעורים, רטרואקטיביות ותנאי קצבה
              </li>
            </ul>
            <br />
            <p className="text-indigo-800 mb-4">
              ✅ השארת הפרטים דרך טופס זה תחסוך ממך זמן ואנרגיה – ותבטיח שהליך קביעת אחוזי הנכות יתבצע בצורה הוגנת ונכונה יותר.
              <br /><br />
              🔔 לא בטוח/ה אם זה רלוונטי לתיק שלך? אין בעיה, תמיד אפשר להתייעץ ונשמח לעזור.
            </p>
            {/* <p className="font-bold text-indigo-800 mb-4">
                
                    <br /><br />
	                1.	בדיקת המקרה שלך – האם השלמת כל המסמכים הנדרשים (למשל תלושי שכר, טפסים רפואיים, אישורים מיוחדים)
                    <br /><br />
	                2.	הכנה אישית לקראת הוועדה – כולל עזרה באסטרטגיית הצגה עצמית, סדר תיעוד ודרכי טיפול בשאלות רפואיות
                    <br /><br />
	                3.	סיוע בזמן הוועדה – הכוונה לגבי זכויותיך (לדוגמה, הבאת מלווה), ביטוח הזכויות והתגובה על החלטות
                    <br /><br />
	                4.	ליווי גם לאחר קבלת ההחלטה – הסברים על זכויות, ערעורים, רטרואקטיביות ותנאי קצבה
                <br /><br />
                ✅ השארת הפרטים דרך טופס זה תחסוך ממך זמן ואנרגיה – ותבטיח שהליך קביעת אחוזי הנכות יתבצע בצורה הוגנת ונכונה יותר.
                <br /><br />
                🔔 לא בטוח/ה אם זה רלוונטי לתיק שלך? אין בעיה, תמיד אפשר להתייעץ ונשמח לעזור.   
            </p> */}
            <h4 className="font-bold text-indigo-800">🔒 הפרטים יישמרו בסודיות מוחלטת ולא יועברו לצד שלישי.</h4>
          </div>
        )}
      </div>
      <h4 className="font-bold text-indigo-800 mb-4">אנא מלא/י את פרטיך וניצור קשר בהקדם:</h4>
      <form onSubmit={handleSubmit} id="user-info" name="user-info" className="space-y-4">
        <div>
          <label htmlFor="user-name" className="block text-base font-medium text-indigo-600 mb-1">
            שם מלא
          </label>
          <input
            type="text"
            id="user-name"
            className={`bg-white w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out text-gray-700 ${errors.name ? 'border-red-500' : 'border-indigo-300'}`}
            placeholder="הכנס שם מלא..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="user-phone" className="block text-base font-medium text-indigo-600 mb-1">
            מספר טלפון ליצירת קשר
          </label>
          <input
            type="tel" // Use type="tel" for phone numbers
            id="user-phone"
            className={`bg-white w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out text-gray-700 ${errors.phone ? 'border-red-500' : 'border-indigo-300'}`}
            placeholder="123-456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="user-email" className="block text-base font-medium text-indigo-600 mb-1">
            אי-מייל (אופציונלי)
          </label>
          <input
            type="email"
            id="user-email"
            className={`bg-white w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out text-gray-700 ${errors.email ? 'border-red-500' : 'border-indigo-300'}`}
            placeholder="הכנס כתובת אי-מייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>


        <div className="flex flex-col sm:flex-row gap-4">
          <button type="button" onClick={onBack} className="flex-1 p-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition">חזרה</button>
          <button type="submit" className="flex-1 p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">שלח וצפה בתוצאות</button>
          <button onClick={handleNoUserInfo} className="flex-1 border border-indigo-300 bg-white text-indigo-600 p-3 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out shadow-md">
            המשך ללא השארת פרטים
          </button>
        </div>
      </form>
    </div>
  );

}

export default UserInfoForm;