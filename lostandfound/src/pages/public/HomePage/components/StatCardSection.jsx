import StatCard from "./StatCard";
import file from "../../../../assets/images/file.png";
import returned from "../../../../assets/images/return-box.png"
import user from "../../../../assets/images/user.png"
import clock from "../../../../assets/images/clock.png"




function StatCardSection() {
    return(
        <div className="p-[40px] h-[350px] flex justify-around bg-[#1F2937]">
                <StatCard
                    icon={file}
                    info="1,247"
                    label="Total Reports"
                    color="#374151"
                />
                 <StatCard
                    icon={returned}
                    info="892"
                    label="Items Returned"
                    color="#5DCEA6"
                />
                 <StatCard
                    icon={user}
                    info="1,000"
                    label="Active Users"
                    color="#374151"
                />
                 <StatCard
                    icon={clock}
                    info="24h"
                    label="Avg Response"
                    color="#5DCEA6"
                />
        </div>
    );

}
export default StatCardSection