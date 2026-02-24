function StatCard({icon, info, label, color, page = "default"}) {

    const infoClass = page === "howitworks" ? "text-sm" : "text-3xl";
    const labelClass = page === "howitworks" ? "text-center text-sm" : "text-3xl";


    return(

        
        
        <div className="flex flex-col w-[350px] items-center justify-center gap-2">
            <div className="h-20 w-20 flex items-center justify-center rounded-2xl"  style={{background : color}}>
                <img src={icon} alt="" className="size-10"/>
            </div>

            <h1 className={`font-bold text-3xl text-white ${infoClass}`}>{info}</h1>
            <h3 className={`text-sm text-[#D1D5DB] ${labelClass}`}>{label}</h3>
        </div>
    );
}

export default StatCard;