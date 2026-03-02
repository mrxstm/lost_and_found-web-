import searchorg from "../../../../assets/images/searchorg.png"
import check from "../../../../assets/images/check-mark.png"
import ReportButton from "./ReportButton";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <div className="min-h-[400px] bg-[#111827] flex flex-col items-center justify-center gap-6 mt-16 px-4 py-10 text-center">
            <h1 className="font-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Lost Something? <span className="text-[#5DCEA6]">We're Here to Help</span>
            </h1>

            <p className="text-[#D1D5DB] text-sm sm:text-sm max-w-xl">
                Connect with us to report and find lost items quickly and easily
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/report-item">
                    <ReportButton
                        icon={searchorg}
                        label="Report Lost Item"
                        color="#5DCEA6"
                        labelcolor="#111827"
                    />
                </Link>

                <Link to="/report-item">
                    <ReportButton
                        icon={check}
                        label="Report Found Item"
                        color="#1F2937"
                        labelcolor="#ffff"
                    />
                </Link>
            </div>
        </div>
    );
}

export default HeroSection;