import backarrow from "../../../../assets/images/backarrow.png"
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="bg-[#1F2937] h-12 sm:h-16 w-full z-50 fixed top-0 left-0 flex items-center px-4 sm:px-12 gap-4 sm:gap-10">
            <Link to="/myreports">
                <img src={backarrow} alt="" className="w-4 sm:w-6" />
            </Link>
            <h1 className="text-white text-sm sm:text-lg font-medium">Report lost or found item</h1>
        </div>
    );
}

export default Header;