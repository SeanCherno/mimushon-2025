import React from "react";

const InfoCard = ({ icon, title, children }) => (
    <div className="flex flex-col items-center text-center">
        <div className="bg-indigo-200 p-5 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

export default InfoCard;