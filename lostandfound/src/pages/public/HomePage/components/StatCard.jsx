function StatCard({ icon, info, label, color, page = "default" }) {

    const infoClass = page === "howitworks" ? "text-xs sm:text-xs" : "text-xl sm:text-md";
    const labelClass = page === "howitworks" ? "text-center text-sm" : "text-xs sm:text-xs";

    return (
        <div className="flex flex-col w-full items-center justify-center gap-2 p-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 lg:w-18 lg:h-18 flex items-center justify-center rounded-2xl" style={{ background: color }}>
                <img src={icon} alt="" className="size-4 sm:size-6 lg:size-8" />
            </div>
            <h1 className={`font-bold text-white ${infoClass}`}>{info}</h1>
            <h3 className={`text-[12px] text-[#D1D5DB] ${labelClass}`}>{label}</h3>
        </div>
    );
}

export default StatCard;