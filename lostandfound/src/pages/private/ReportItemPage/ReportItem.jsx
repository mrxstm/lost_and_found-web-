import Header from "./components/Header";
import Reportform from "./components/Reportform";

function ReportItem() {
    return(
        
        <div className="min-h-screen pb-10 inset-0 bg-[#1F2937]/80 flex flex-col items-center justify-center">
            <Header/>  
            <div className="mt-20">
                <Reportform/>   
            </div>
            
        </div>
        
    );
}

export default ReportItem;