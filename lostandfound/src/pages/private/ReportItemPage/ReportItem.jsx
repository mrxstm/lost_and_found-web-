import Header from "./components/Header";
import Reportform from "./components/Reportform";

function ReportItem() {
    return (
        <div className="min-h-screen pb-10 bg-[#111827] flex flex-col items-center">
            <Header />
            <div className="mt-16 sm:mt-20 w-full px-4 sm:px-8 flex justify-center">
                <Reportform />
            </div>
        </div>
    );
}

export default ReportItem;