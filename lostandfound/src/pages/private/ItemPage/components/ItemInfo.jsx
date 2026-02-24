import category from "../../../../assets/images/category.png"
import date from "../../../../assets/images/date.png"
import clockgreen from "../../../../assets/images/clockgreen.png"
import location from "../../../../assets/images/loocation.png"
import InfoCard from "./InfoCard";

function ItemInfo({item}) {

    //date in proper format
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    //time in proper format
    const formatTime = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    return(
        <div className="mt-10 flex flex-col justify-center mt-20 ml-10 w-fit">
            <h1 className="text-white font-bold text-3xl">Car</h1>
            <div className="grid grid-cols-2 gap-8 mt-6 gap-x-80">
                <InfoCard 
                    icon={category}
                    label = "Category"
                    info = {item?.category}
                />
                <InfoCard
                    icon={location}
                    label = "Location"
                    info = {item?.Location.name}

                />
                <InfoCard
                    icon={date}
                    label = "Date"
                    info = {formatDate(item?.date)}


                />
                <InfoCard
                    icon={clockgreen}
                    label = "Time"
                    info = {formatTime(item?.createdAt)}

                />
            </div>
            <div className="mt-20">
                <h1 className="text-white text-2xl font-bold mb-6">Description</h1>
                <p className="text-md text-[#D1D5DB]">{item?.itemDescription}</p>
            </div>
        </div>
    );
}

export default ItemInfo;