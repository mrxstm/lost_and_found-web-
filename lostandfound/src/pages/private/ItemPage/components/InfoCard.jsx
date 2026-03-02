function InfoCard({ icon, label, info }) {
    return (
        <div className="flex gap-2 sm:gap-4 items-center">
            <div className="bg-[#3d636c] flex items-center justify-center rounded-xl h-8 w-8 sm:h-12 sm:w-12 shrink-0">
                <img src={icon} alt="" className="size-4 sm:size-5" />
            </div>
            <div>
                <h3 className="text-[#D1D5DB] text-[10px] lg:text-[12px]">{label}</h3>
                <h3 className="text-[10px] lg:text-xs text-white font-semibold">{info}</h3>
            </div>
        </div>
    );
}

export default InfoCard;