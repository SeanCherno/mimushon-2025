import React, { useState } from "react";
import InfoCard from "./InfoCard";

const HowWeHelpSection = () => {
    return (
    <section className="py-8 md:py-8 bg-indigo-50">
        <div className="container mt-6 mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">הליווי שלנו, השקט הנפשי שלך</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <InfoCard 
                    title="הערכה ראשונית (חינם)"
                    icon={<svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>}
                >
                    השתמש במחשבון שלנו כדי לקבל מושג ראשוני על היקף זכויותיך. זהו הצעד הראשון והחשוב ביותר.
                </InfoCard>
                <InfoCard 
                    title="הבנת התהליך"
                    icon={<svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
                >
                    אנו נסביר לך בפשטות על השלבים השונים בתהליך התביעה, מהגשת המסמכים ועד להתנהלות מול הוועדה הרפואית.
                </InfoCard>
                <InfoCard 
                    title="חיבור לעורכי דין מומחים"
                    icon={<svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
                >
                    אנו עובדים עם רשת של עורכי דין שנבחרו בקפידה, בעלי ניסיון מוכח בתביעות מול ביטוח לאומי וחברות ביטוח.
                </InfoCard>
            </div>
        </div>
    </section>
);}

export default HowWeHelpSection;