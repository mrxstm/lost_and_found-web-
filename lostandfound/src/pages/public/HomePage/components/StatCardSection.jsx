import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import file from "../../../../assets/images/file.png";
import returned from "../../../../assets/images/return-box.png";
import user from "../../../../assets/images/user.png";
import clock from "../../../../assets/images/clock.png";
import useApi from "../../../../hooks/useAPI";

function StatCardSection() {
    const { callApi } = useApi();
    const [stats, setStats] = useState({
        totalReports: 0,
        itemsReturned: 0,
        activeUsers: 0,
        avgResponseHours: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await callApi("GET", "/stats", {});
                setStats(res.data);
            } catch (e) {
                console.error("Failed to fetch stats:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const fmt = (num) => num.toLocaleString();

    return (
        <div className="py-10 px-4 sm:px-8 bg-[#1F2937] grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                icon={file}
                info={loading ? "..." : fmt(stats.totalReports)}
                label="Total Reports"
                color="#374151"
            />
            <StatCard
                icon={returned}
                info={loading ? "..." : fmt(stats.itemsReturned)}
                label="Items Returned"
                color="#5DCEA6"
            />
            <StatCard
                icon={user}
                info={loading ? "..." : fmt(stats.activeUsers)}
                label="Active Users"
                color="#374151"
            />
            <StatCard
                icon={clock}
                info={loading ? "..." : `${stats.avgResponseHours}h`}
                label="Avg Response"
                color="#5DCEA6"
            />
        </div>
    );
}

export default StatCardSection;