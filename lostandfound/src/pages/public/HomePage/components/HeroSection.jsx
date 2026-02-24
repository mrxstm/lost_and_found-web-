import searchorg from "../../../../assets/images/searchorg.png"
import check from "../../../../assets/images/check-mark.png"

import ReportButton from "./ReportButton";
import { Link } from "react-router-dom";
function HeroSection() {
    return(
        <div className="h-[500px] bg-[#111827] flex flex-col items-center justify-center gap-10 mt-16">
            <h1 className="font-bold text-white text-5xl">Lost Something? <span className="text-[#5DCEA6]">We're Here to Help</span></h1>
          
            <p className="text-[#D1D5DB]">Connect with us to report and find lost items quickly and easily</p>

            <div className="flex gap-4">
                <Link to="/report-item">     
                    <ReportButton
                    icon = {searchorg}
                    label = "Report Lost Item"
                    color = "#5DCEA6"
                    labelcolor="#111827"
                    />
                </Link>
                
                <Link to="/report-item">  
                    <ReportButton
                    icon = {check}
                    label = "Report Found Item"
                    color = "#1F2937"
                    labelcolor="#ffff"
                    />
                </Link>
            </div>
            
        </div>
    );
}

export default HeroSection;