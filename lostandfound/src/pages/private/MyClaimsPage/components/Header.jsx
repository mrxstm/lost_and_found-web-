import { useNavigate } from "react-router-dom";
import backarrow from "../../../../assets/images/backarrow.png";

function Header() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#1F2937] flex flex-col gap-4 h-60">
            
            <button
                onClick={() => navigate("/myreports")}
                className="flex items-center gap-2 mt-8 ml-8 text-[#9ca3af] hover:text-white transition w-fit"
            >
                <img src={backarrow} alt="Back" className="w-6" />
                <span className="text-[10px] sm:text-xs">Back to My Reports</span>
            </button>

            <h1 className='text-lg sm:text-xl font-bold text-white ml-12 mt-2'>My Claims</h1>
            <p className="text-[#9ca3af] ml-12 text-[10px] sm:text-xs">Track claims you've made and review claims on your reported items</p>
            <div className="w-full h-px bg-gray-600 my-4"></div>
        </div>
    );
}

export default Header;