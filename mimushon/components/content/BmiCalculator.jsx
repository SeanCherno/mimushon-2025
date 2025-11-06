'use client'

import React, { useState, useMemo } from 'react';

/**
 * A component to calculate and display Body Mass Index (BMI).
 */
const BMICalculator = () => {
    // State for weight in kg and height in cm
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    // State to hold the calculated BMI result
    const [bmi, setBmi] = useState(null);

    /**
     * Calculates BMI and determines the corresponding category and color.
     * useMemo is used to re-calculate only when BMI changes.
     */
    const bmiResult = useMemo(() => {
        if (!bmi) return null;

        if (bmi < 18.5) {
            return {
                category: 'תת משקל',
                colorClass: 'bg-blue-100 text-blue-800',
            };
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return {
                category: 'משקל תקין',
                colorClass: 'bg-green-100 text-green-800',
            };
        } else if (bmi >= 25 && bmi <= 29.9) {
            return {
                category: 'עודף משקל',
                colorClass: 'bg-yellow-100 text-yellow-800',
            };
        } else {
            return {
                category: 'השמנת יתר',
                colorClass: 'bg-red-100 text-red-800',
            };
        }
    }, [bmi]);

    /**
     * Handles the calculation when the form is submitted.
     */
    const handleCalculate = (e) => {
        e.preventDefault();
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        // Validate inputs
        if (weightNum > 0 && heightNum > 0) {
            // Convert height from cm to meters for the formula
            const heightInMeters = heightNum / 100;
            // BMI formula: weight (kg) / [height (m)]^2
            const bmiValue = weightNum / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(1)); // Round to one decimal place
        } else {
            setBmi(null); // Reset if inputs are invalid
        }
    };

    return (
        <div className="p-6 sm:p-8 rounded-xl mb-8 bg-white border border-indigo-300 shadow-lg max-w-md mx-auto" dir="rtl">
            <h2 className="text-2xl font-bold text-indigo-800 text-center mb-6">מחשבון BMI</h2>
            <form onSubmit={handleCalculate}>
                <div className="mb-4">
                    <label htmlFor="weight" className="block text-indigo-700 text-sm font-bold mb-2">
                        משקל (ק״ג)
                    </label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="לדוגמה: 70"
                        className="shadow-sm appearance-none border border-indigo-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="height" className="block text-indigo-700 text-sm font-bold mb-2">
                        גובה (ס״מ)
                    </label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="לדוגמה: 175"
                        className="shadow-sm appearance-none border border-indigo-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
                >
                    חשב BMI
                </button>
            </form>

            {/* Result Display Section */}
            {bmiResult && (
                <div className={`mt-6 p-4 rounded-lg text-center ${bmiResult.colorClass}`}>
                    <p className="font-bold text-lg">ה-BMI שלך הוא: {bmi}</p>
                    <p className="text-md">קטגוריה: {bmiResult.category}</p>
                </div>
            )}
        </div>
    );
};

export default BMICalculator