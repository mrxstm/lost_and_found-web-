import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";

function ReportButtons({ status, fetchMyReports, loading }) {
    return (
        <div className="flex justify-between p-10">
            <div className="bg-[#1F2937] h-12 p-2 flex items-center justify-center rounded-3xl gap-1">

                <button
                    disabled={loading}
                    onClick={() => fetchMyReports("lost")}
                    className={`rounded-3xl h-10 w-40 text-sm font-semibold ${status === "lost" ? "bg-[#5DCEA6] text-black" : "bg-transparent text-white hover:bg-[#374151]"}`}
                >
                    My Lost Items
                </button>

                <button
                    disabled={loading}
                    onClick={() => fetchMyReports("found")}
                    className={`rounded-3xl h-10 w-40 text-sm font-semibold ${status === "found" ? "bg-[#5DCEA6] text-black" : "bg-transparent hover:bg-[#374151] text-white"}`}
                >
                    My Found Items
                </button>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
                <Link to="/my-claims">
                    <button className="border border-[#5DCEA6] text-[#5DCEA6] rounded-3xl h-8 px-4 text-sm flex items-center gap-2 hover:bg-[#5DCEA6] hover:text-black transition">
                        <ClipboardList size={15} />
                        My Claims
                    </button>
                </Link>

                <Link to="/report-item">
                    <button className="bg-[#5DCEA6] rounded-3xl h-8 w-32 text-sm">
                        + Report New
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ReportButtons;