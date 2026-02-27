import { useEffect, useState } from "react";
import { Users, ClipboardList, CheckCircle, Clock } from "lucide-react";
import useApi from "../../../hooks/useAPI";

function StatBox({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-[#111827] rounded-2xl p-3 sm:p-6 flex items-center gap-3 sm:gap-4">
            <div className={`p-2 sm:p-3 rounded-xl shrink-0 ${color}`}>
                <Icon size={18} className="text-white sm:size-6" />
            </div>
            <div>
                <p className="text-[#9ca3af] text-[10px] sm:text-sm">{label}</p>
                <h2 className="text-white text-lg sm:text-2xl font-bold">{value ?? "..."}</h2>
            </div>
        </div>
    );
}

function Dashboard() {
    const { callApi } = useApi();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await callApi("GET", "/stats", {});
                setStats(res.data);
            } catch (e) {
                console.error("Failed to fetch stats:", e);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-4 sm:p-10 bg-[#1F2937] min-h-screen">
            <h1 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Dashboard</h1>
            <p className="text-[#9ca3af] text-xs sm:text-sm mb-4 sm:mb-8">Platform overview</p>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <StatBox icon={ClipboardList} label="Total Reports"  value={stats?.totalReports}                          color="bg-blue-600" />
                <StatBox icon={CheckCircle}   label="Items Returned" value={stats?.itemsReturned}                         color="bg-[#5DCEA6]" />
                <StatBox icon={Users}         label="Active Users"   value={stats?.activeUsers}                           color="bg-purple-600" />
                <StatBox icon={Clock}         label="Avg Response"   value={stats ? `${stats.avgResponseHours}h` : "..."} color="bg-orange-500" />
            </div>
        </div>
    );
}

export default Dashboard;