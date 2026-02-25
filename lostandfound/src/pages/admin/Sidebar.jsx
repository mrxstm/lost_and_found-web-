import logo from "../../assets/images/lostandfoundlogo.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Users, ClipboardList, LogOut, MapPin } from "lucide-react";
import { useState } from "react";

function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);  // 👈 new

    const handleLogout = async () => {
        await logout();
        setShowLogoutModal(false);
        navigate("/");
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 w-48 h-12 px-4 rounded-xl transition ${isActive ? "bg-[#5DCEA6] text-black" : "text-white hover:bg-[#1F2937]"}`;

    return (
        <>
            <div className="h-screen w-64 bg-[#111827] flex flex-col px-6 py-6 gap-8 shadow-[4px_0_6px_rgba(0,0,0,0.5)]">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="" className="size-10" />
                    <div>
                        <h1 className="text-white font-bold text-sm">Lost&Found</h1>
                        <h3 className="text-[#9ca3af] text-xs">Admin Panel</h3>
                    </div>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-2 flex-1">
                    <NavLink to="/admin/dashboard" className={navLinkClass}>
                        <LayoutDashboard size={18} />
                        <span className="text-sm font-medium">Dashboard</span>
                    </NavLink>

                    <NavLink to="/admin/users" className={navLinkClass}>
                        <Users size={18} />
                        <span className="text-sm font-medium">Users</span>
                    </NavLink>

                    <NavLink to="/admin/pending-items" className={navLinkClass}>
                        <ClipboardList size={18} />
                        <span className="text-sm font-medium">Pending Items</span>
                    </NavLink>

                    <NavLink to="/admin/locations" className={navLinkClass}>
                        <MapPin size={18} />
                        <span className="text-sm font-medium">Locations</span>
                    </NavLink>
                </div>

                {/* Logout button — now opens modal */}
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-3 text-red-400 hover:text-red-300 transition px-4"
                >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] p-6 rounded-2xl w-80 flex flex-col gap-4">
                        <h2 className="text-white text-lg font-semibold">Logout</h2>
                        <p className="text-[#9ca3af] text-sm">
                            Are you sure you want to log out of the admin panel?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-xl text-sm"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;