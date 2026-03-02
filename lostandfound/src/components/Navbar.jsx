import { useState } from "react";
import logo from "../assets/images/lostandfoundlogo.svg"
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function Navbar({ openLogin, openSignup }) {

    const { user } = useAuth();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const hideNavbarOn = ["/report-item"];
    const isAdminRoute = location.pathname.startsWith("/admin");
    const knownRoutes = ["/", "/search", "/profile", "/myreports", "/report-item", "/product"];
    const isNotFoundRoute = !knownRoutes.includes(location.pathname);
    const showNavbar = !hideNavbarOn.includes(location.pathname) && !isAdminRoute && !isNotFoundRoute;

    if (!showNavbar) return null;

    const navLinkClass = ({ isActive }) =>
        isActive ? "text-[#5DCEA6] font-semibold text-xs" : "text-xs hover:text-[#5DCEA6] font-semibold";

    return (
        <div className="w-full bg-[#1F2937] fixed z-50 top-0 left-0 shadow-md text-white">
            <div className="flex items-center justify-between h-[80px] sm:h-[80px] px-4 sm:px-8">

                {/* Logo */}
                <NavLink to="/">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="" className="size-8 sm:size-10" />
                        <h1 className="text-white text-sm sm:text-lg font-bold">Lost&Found</h1>
                    </div>
                </NavLink>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>

                    {user ? (
                        <>
                            <NavLink to="/search" className={navLinkClass}>Search</NavLink>
                            <NavLink to="/myreports" className={navLinkClass}>My Reports</NavLink>
                            <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                        </>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <button
                                className="bg-[#5DCEA6] text-[#111827] h-5 w-14 text-[10px] sm:h-7 sm:w-20 sm:text-xs rounded-3xl font-semibold hover:bg-[#48AA87] hover:scale-105 transition-all duration-300"
                                onClick={openLogin}
                            >
                                Login
                            </button>
                            <button
                                className="bg-[#111827] text-white h-5 w-14 text-[10px] sm:h-7 sm:w-20 sm:text-xs rounded-3xl font-semibold hover:bg-[#373737] hover:scale-105 transition-all duration-300"
                                onClick={openSignup}
                            >
                                Signup
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#1F2937] flex flex-col px-6 pb-6 gap-4 border-t border-[#374151]">
                    <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>

                    {user ? (
                        <>
                            <NavLink to="/search" className={navLinkClass} onClick={() => setMenuOpen(false)}>Search</NavLink>
                            <NavLink to="/myreports" className={navLinkClass} onClick={() => setMenuOpen(false)}>My Reports</NavLink>
                            <NavLink to="/profile" className={navLinkClass} onClick={() => setMenuOpen(false)}>Profile</NavLink>
                        </>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                className="bg-[#5DCEA6] text-[#111827] h-10 w-24 rounded-3xl font-semibold"
                                onClick={() => { openLogin(); setMenuOpen(false); }}
                            >
                                Login
                            </button>
                            <button
                                className="bg-[#111827] text-white h-10 w-24 rounded-3xl font-semibold border border-white"
                                onClick={() => { openSignup(); setMenuOpen(false); }}
                            >
                                Signup
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar;