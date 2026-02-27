import { useLocation, useNavigate } from "react-router-dom";
import backarrow from "../../../../assets/images/backarrow.png";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || "search";
    const backLink = from === "myReports" ? "/myreports" : "/search";
    const backText = from === "myReports" ? "Back to My Reports" : "Back to Search";

    return (
        <div className="bg-[#1F2937] h-12 sm:h-16 w-full z-50 fixed top-0 left-0 flex items-center px-4 sm:px-12 gap-4 sm:gap-10">
            <button onClick={() => navigate(backLink)}>
                <img src={backarrow} alt="Back" className="w-4 sm:w-6" />
            </button>
            <h1 className="text-white text-sm sm:text-lg font-medium">{backText}</h1>
        </div>
    );
}

export default Header;