function InfoCard({icon, label, info}) {
    return(
        <div className="flex gap-4">
            <div className="bg-[#3d636c] flex items-center justify-center rounded-xl h-14 w-14">
                <img src={icon} alt="" className="size-6"/>
            </div>
            <div>
                <h3 className="text-[#D1D5DB] text-sm">{label}</h3>
                <h3 className="text-xl text-white font-semibold">{info}</h3>
            </div>
        </div>
    );
}

export default InfoCard;