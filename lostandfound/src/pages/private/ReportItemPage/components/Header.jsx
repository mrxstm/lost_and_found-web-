import backarrow from "../../../../assets/images/backarrow.png"
import { Link } from "react-router-dom";

function Header() {
    return(
        <div className="bg-[#1F2937] h-20 w-full z-50 fixed top-0 left-0 flex items-center px-12 gap-10">
           <Link to="/myreports">
                <img src={backarrow} alt="" className="w-10"/>
           </Link> 
            <h1 className="text-white text-2xl font-medium">Report lost or found item</h1>
        </div>
    );
}

export default Header;