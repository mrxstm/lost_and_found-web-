import logo from "../../assets/images/lostandfoundlogo.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Users, ClipboardList, LogOut, MapPin, FileText, X } from "lucide-react";
import { useState } from "react";

function Sidebar({ onClose }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = async () => {
        await logout();
        setShowLogoutModal(false);
        navigate("/");
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 w-full h-10 sm:h-12 px-4 rounded-xl transition text-sm font-medium
        ${isActive ? "bg-[#5DCEA6] text-black" : "text-white hover:bg-[#1F2937]"}`;

    return (
        <>
            <div className="h-screen w-64 bg-[#111827] flex flex-col px-4 sm:px-6 py-4 sm:py-6 gap-6 sm:gap-8 shadow-[4px_0_6px_rgba(0,0,0,0.5)]">

                {/* Logo + close button on mobile */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="" className="size-8 sm:size-10" />
                        <div>
                            <h1 className="text-white font-bold text-xs sm:text-sm">Lost&Found</h1>
                            <h3 className="text-[#9ca3af] text-[10px] sm:text-xs">Admin Panel</h3>
                        </div>
                    </div>
                    {/* Close button — mobile only */}
                    <button
                        onClick={onClose}
                        className="lg:hidden text-white hover:text-gray-300 transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-1 sm:gap-2 flex-1">
                    <NavLink to="/admin/dashboard" className={navLinkClass} onClick={onClose}>
                        <LayoutDashboard size={16} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/admin/users" className={navLinkClass} onClick={onClose}>
                        <Users size={16} />
                        <span>Users</span>
                    </NavLink>

                    <NavLink to="/admin/pending-items" className={navLinkClass} onClick={onClose}>
                        <ClipboardList size={16} />
                        <span>Pending Items</span>
                    </NavLink>

                    <NavLink to="/admin/locations" className={navLinkClass} onClick={onClose}>
                        <MapPin size={16} />
                        <span>Locations</span>
                    </NavLink>

                    <NavLink to="/admin/claims" className={navLinkClass} onClick={onClose}>
                        <FileText size={16} />
                        <span>Claims</span>
                    </NavLink>
                </div>

                {/* Logout */}
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-3 text-red-400 hover:text-red-300 transition px-4 text-sm font-medium"
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#1F2937] p-4 sm:p-6 rounded-2xl w-full max-w-xs sm:max-w-sm flex flex-col gap-3 sm:gap-4">
                        <h2 className="text-white text-sm sm:text-lg font-semibold">Logout</h2>
                        <p className="text-[#9ca3af] text-[10px] sm:text-sm">
                            Are you sure you want to log out of the admin panel?
                        </p>
                        <div className="flex justify-end gap-2 sm:gap-3">
                            <button
                                className="bg-gray-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-sm"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-sm"
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