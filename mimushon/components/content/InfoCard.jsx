const InfoCard = ({ number, title, children }) => (
    <div className="flex items-start gap-6">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">
            {number}
        </div>
        <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
);

export default InfoCard;
