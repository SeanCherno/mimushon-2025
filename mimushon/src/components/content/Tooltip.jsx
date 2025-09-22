const Tooltip = ({ content }) => (
    // Mobile: closer to corner. Desktop: slightly more padding.
    <div className="absolute top-1 right-1 sm:top-1 sm:right-1 group" tabIndex="0">
        {/* Mobile: smaller icon. Desktop: larger icon. */}
        <svg className="w-4 h-4 sm:w-4 sm:h-4 text-slate-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-28 sm:w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 z-10 text-center pointer-events-none">
            {content}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-8 border-b-gray-800"></div>
        </div>
    </div>
);

export default Tooltip