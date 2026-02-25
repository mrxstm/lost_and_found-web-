import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import StatCard from "./components/StatCard";
import useApi from "../../../hooks/useAPI.js";
import PersonalInfoSection from "./components/PersonalInfoSection.jsx";
import AccountSection from "./components/AccountSection.jsx";
import { toast } from "react-toastify";


function Profile() {

    const {loading, error, callApi} = useApi();
    const[user, setUser] = useState(null);
    const[stats, setStats] = useState([]);


    //getting the user stats (items found, reported, success rate)
    async function getUserStats() {
        try {
            const res = await callApi("GET", "/user/profile/stats", {});
            setStats(res);            
        } catch (error) {
            toast.error("Fetch error", error);
            console.log(error);
            
        }
    }
    
    // get the user who is logged in
    async function getUser() {
        try {
            const res = await callApi("GET", `/user/me`, {})
            console.log(res);
            setUser(res.data);            
        } catch(e) {
            console.log("Something went wrong : ", e);
        }
    } 
    useEffect(()=> {
        getUser();
        getUserStats();
    }, []);

    // stats cards to map
    const statCards = [
        { value: stats.totalReports, label: "Total Reports" },
        { value: stats.foundItem, label: "Found Items" },
        { value: stats.lostItem, label: "Lost Items" },
        { value: `${stats.successRate}%`, label: "Resolution Rate" }
    ];


    //loading state
    if(loading) {
        return(
            <div className="min-h-screen flex items-center justify-center bg-[#1F2937] text-white">
                Loading profile...
            </div>
        );
    }

    //error state
     if (error) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-[#1F2937] text-red-400">
            {error.message || "Something went wrong"}
        </div>
        );
      }

    if (!user) return null;

    return(

    <div className="bg-[#1F2937] mt-10">

        <div className="p-10">
            <div className="mt-10">
                <ProfileHeader
                    avatar={user.profile_pic_url}
                    full_name={user.fullname}
                    college_name={user.College.name}   
                    setUser={setUser}     
                />
            </div>

            <div className="w-full h-px bg-gray-600 my-8"></div>

            <div className="flex gap-16 mt-20 justify-center"> 
                {statCards.map((stat, index)=> {
                    return(
                        <StatCard
                            key={index}
                            value={stat.value}
                            label={stat.label}
                        />
                    )
                })
            }
            </div>

        </div>
        
        <div className="bg-black flex flex-col items-center justify-center p-10 px-40">
            <PersonalInfoSection user={user} setUser={setUser}/>
            <AccountSection/>   
        </div>
    </div>
    );
}

export default Profile;