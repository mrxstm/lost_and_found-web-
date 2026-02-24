import logo from "../../assets/images/lostandfoundlogo.svg"
import dashboard from "../../assets/images/dashboard.png"
import user from "../../assets/images/user.png"
import { NavLink, useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
function Sidebar() {

    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
        navigate("/");
    }
    return(
        <div className="h-screen w-64">
            <div>
                <img src={logo} alt="" className="size-14"/>
                <div>
                    <h1>Lost&Found</h1>
                    <h3>Admin Panel</h3>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center">
                    <NavLink to="/admin/dashboard" className={({isActive}) => isActive?"bg-[#5DCEA6] rounded-xl" :"hover:bg-[#DCEA6]"}>
                        <div className="flex items-center justify-around w-48 h-14">
                            <img src={dashboard} alt="" className="size-6"/>
                            <h3 className="text-white mr-10">Dashboard</h3>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/users" className={({isActive}) => isActive?"bg-[#5DCEA6] rounded-xl" :"hover:bg-[#DCEA6]"}>
                        <div className="flex items-center justify-around w-48 h-14">
                            <img src={user} alt="" className="size-8"/>
                            <h3 className="text-white mr-10">Users</h3>
                        </div>
                    </NavLink>

                    <button onClick={logout} className="text-white">
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;