import category from "../../../../assets/images/category.png"
import date from "../../../../assets/images/date.png"
import clockgreen from "../../../../assets/images/clockgreen.png"
import location from "../../../../assets/images/loocation.png"
import InfoCard from "./InfoCard";

function ItemInfo({ item }) {

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            day: "2-digit", month: "short", year: "numeric",
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit", minute: "2-digit",
        });
    };

    return (
        <div className="mt-6 sm:mt-10 flex flex-col w-full">
            <h1 className="text-white font-bold text-lg sm:text-xl">{item?.itemName}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols:4 gap-4 sm:gap-6 mt-4 sm:mt-6">
                <InfoCard icon={category} label="Category" info={item?.category} />
                <InfoCard icon={location} label="Location" info={item?.Location.name} />
                <InfoCard icon={date} label="Date" info={formatDate(item?.date)} />
                <InfoCard icon={clockgreen} label="Time" info={formatTime(item?.createdAt)} />
            </div>
            <div className="mt-6 sm:mt-10">
                <h1 className="text-white text-sm sm:text-lg font-bold mb-2 sm:mb-4">Description</h1>
                <p className="text-[10px] sm:text-xs text-[#D1D5DB]">{item?.itemDescription}</p>
            </div>
        </div>
    );
}

export default ItemInfo;