import security from "../../../../assets/images/security.png"
import checked from "../../../../assets/images/checked.png"

function SafetyTips() {
    return (
        <div className="flex flex-col p-3 sm:p-4 bg-[#1F2937] rounded-2xl px-4 sm:px-6 mt-3 sm:mt-4 gap-3 sm:gap-4 text-[#D1D5DB]">
            <div className="flex gap-2 items-center">
                <img src={security} alt="" className="size-4 sm:size-5" />
                <h1 className="font-bold text-xs sm:text-sm">Safety Tips</h1>
            </div>
            <ul className="flex flex-col gap-1.5 sm:gap-2">
                {[
                    "Meet in public campus locations",
                    "Verify item details before claiming",
                    "Never share sensitive personal info",
                    "Report suspicious activity",
                ].map((tip, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <img src={checked} alt="" className="size-2.5 sm:size-3 shrink-0" />
                        <li className="text-[10px] sm:text-[12px] list-none">{tip}</li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default SafetyTips;