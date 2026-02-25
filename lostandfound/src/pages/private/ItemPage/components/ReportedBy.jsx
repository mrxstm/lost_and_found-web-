import car from "../../../../assets/images/car.jpg"
import claim from "../../../../assets/images/claim.png"
import message from "../../../../assets/images/message.png"
import SafetyTips from "./SafetyTips";

function ReportedBy({reporter, stats}) {
    
  if (!reporter) {
    return <div className="text-white">Loading reporter info...</div>;
}


    return(
        <div className="">
            <div className="h-60 flex flex-col p-6 bg-[#1F2937] rounded-2xl flex-1 px-12">
                <h1 className="font-bold text-2xl text-white">Reported By</h1>
                <div className="flex mt-6 items-center gap-5">
                    <img src={car} alt="" className="rounded-full size-20"/>
                    <div className="flex flex-col">
                        <p className="font-semibold text-2xl text-white">{reporter.fullname}</p>
                        <p className="text-sm text-[#D1D5DB]">{reporter.email}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-6 bg-[#1F2937] rounded-2xl flex-1 px-10 py-10 mt-10 gap-10">
                <button className="bg-[#5DCEA6] h-14 rounded-xl font-semibold flex gap-10 items-center">
                    <img src={claim} alt="" className="size-10"/>
                    Claim this item
                </button>  
                              
                <button className="h-14 rounded-xl border border-[#5DCEA6] text-white flex items-center justify-center gap-2">
                    <img src={message} alt="" className="size-6"/>
                    Contact Reporter
                </button>                
            </div>

            <SafetyTips/>
         
        </div>
    );
}

export default ReportedBy;