import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";

function ReportButtons({ status, fetchMyReports, loading }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 px-4 sm:px-10 py-6">

            {/* Tab buttons */}
            <div className="bg-[#1F2937] h-6 sm:h-8 p-1 sm:p-2 flex items-center justify-center rounded-3xl gap-1 w-40 sm:w-auto">
                <button
                    disabled={loading}
                    onClick={() => fetchMyReports("lost")}
                    className={`rounded-3xl h-4 sm:h-6 w-20 sm:w-20 text-[10px] sm:text-[12px] font-semibold ${status === "lost" ? "bg-[#5DCEA6] text-black" : "bg-transparent text-white hover:bg-[#374151]"}`}
                >
                    My Lost Items
                </button>
                <button
                    disabled={loading}
                    onClick={() => fetchMyReports("found")}
                    className={`rounded-3xl h-4 sm:h-6 w-32 sm:w-20 text-[10px] sm:text-[12px] font-semibold ${status === "found" ? "bg-[#5DCEA6] text-black" : "bg-transparent hover:bg-[#374151] text-white"}`}
                >
                    My Found Items
                </button>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
                <Link to="/my-claims">
                    <button className="border border-[#5DCEA6] text-[#5DCEA6] rounded-3xl h-4 sm:h-8 px-3 sm:px-4 text-[10px] sm:text-[10px] lg:text-[14px] flex items-center gap-2 hover:bg-[#5DCEA6] hover:text-black transition">
                        <ClipboardList size={13} />
                        My Claims
                    </button>
                </Link>
                <Link to="/report-item">
                    <button className="bg-[#5DCEA6] rounded-3xl h-7  h-4 sm:h-8 px-3 sm:px-4 text-[10px] sm:text-[10px] lg:text-[14px]">
                        + Report New
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ReportButtons;