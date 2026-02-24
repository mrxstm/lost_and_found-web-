import security from "../../../../assets/images/security.png"
import checked from "../../../../assets/images/checked.png"
function SafetyTips() {
    return(
        <div className="flex flex-col p-6 bg-[#1F2937] rounded-2xl flex-1 px-10 py-10 mt-10 gap-10 text-[#D1D5DB]">
           <div className="flex gap-2">
            <img src={security} alt="" className="size-8"/>
             <h1 className="font-bold text-xl">Safety Tips</h1>
            </div>
            <ul>
                <div className="flex gap-2 items-center">
                    <img src={checked} alt="" className="size-4"/>
                    <li>Meet in public campus locations</li>
                </div>
                
                <div className="flex gap-2 mt-2 items-center">
                    <img src={checked} alt="" className="size-4"/>
                    <li>Verify item details before claiming</li>
                </div>
                
                <div className="flex gap-2 mt-2 items-center">
                    <img src={checked} alt="" className="size-4"/>
                    <li>Never share sensitive personal info</li>
                </div>
                
                <div className="flex gap-2 mt-2 items-center">
                    <img src={checked} alt="" className="size-4"/>
                    <li>Report suspicious activity</li>
                </div>
            </ul>                
        </div>
    );
}

export default SafetyTips;