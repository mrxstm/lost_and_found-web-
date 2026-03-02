import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import StatCard from "./components/StatCard";
import useApi from "../../../hooks/useAPI.js";
import PersonalInfoSection from "./components/PersonalInfoSection.jsx";
import AccountSection from "./components/AccountSection.jsx";
import { toast } from "react-toastify";

function Profile() {
    const { loading, error, callApi } = useApi();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState([]);

    async function getUserStats() {
        try {
            const res = await callApi("GET", "/user/profile/stats", {});
            setStats(res);
        } catch (error) {
            toast.error("Fetch error", error);
        }
    }

    async function getUser() {
        try {
            const res = await callApi("GET", `/user/me`, {});
            setUser(res.data);
        } catch (e) {
            console.log("Something went wrong : ", e);
        }
    }

    useEffect(() => {
        getUser();
        getUserStats();
    }, []);

    const statCards = [
        { value: stats.totalReports, label: "Total Reports" },
        { value: stats.foundItem, label: "Found Items" },
        { value: stats.lostItem, label: "Lost Items" },
        { value: `${stats.successRate}%`, label: "Resolution Rate" }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1F2937] text-white">
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1F2937] text-red-400">
                {error.message || "Something went wrong"}
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="bg-[#1F2937] mt-10 sm:mt-14">
            <div className="p-4 sm:p-10">
                <div className="mt-4">
                    <ProfileHeader
                        avatar={user.profile_pic_url}
                        full_name={user.fullname}
                        college_name={user.College.name}
                        setUser={setUser}
                    />
                </div>

                <div className="w-full h-px bg-gray-600 my-6 sm:my-8"></div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 sm:mt-10">
                    {statCards.map((stat, index) => (
                        <StatCard key={index} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>

            <div className="bg-black flex flex-col items-center justify-center p-4 sm:p-10 sm:px-40">
                <PersonalInfoSection user={user} setUser={setUser} />
                <AccountSection />
            </div>
        </div>
    );
}

export default Profile;