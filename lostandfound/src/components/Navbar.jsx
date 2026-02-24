import logo from "../assets/images/lostandfoundlogo.svg"
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ openLogin, openSignup }) {

    const { user } = useAuth();
    const location = useLocation();

    // Hide navbar on these routes
    const hideNavbarOn = [
        "/report-item", 
    ];

    // Hide navbar for admin routes
    const isAdminRoute = location.pathname.startsWith("/admin");

    const knownRoutes = ["/", "/search", "/profile", "/myreports", "/report-item", "/product"];
    const isNotFoundRoute = !knownRoutes.includes(location.pathname);
    
    const showNavbar = !hideNavbarOn.includes(location.pathname) && !isAdminRoute && !isNotFoundRoute;

    if (!showNavbar) return null; 

    return (
        <div className="main w-full flex items-center justify-between h-[90px] bg-[#1F2937] fixed z-50 top-0 left-0 shadow-md text-white">
            <NavLink to="/">
                <div className="left flex items-center ml-8 gap-4">
                    <img src={logo} alt="" className="size-14"/>
                    <h1 className="text-white text-2xl font-bold">Lost&Found</h1>
                </div>
            </NavLink>

            <div className="right flex items-center gap-8 mr-8 text-white">
                <NavLink to="/" className={({ isActive }) => isActive ? "text-[#5DCEA6] font-semibold":"hover:text-[#5DCEA6] font-semibold"}>
                    Home
                </NavLink>

                {user ? (
                    <>
                        <NavLink to="/search" className={({ isActive }) => isActive ? "text-[#5DCEA6] font-semibold":"hover:text-[#5DCEA6] font-semibold"}>
                            Search
                        </NavLink>

                        <NavLink to="/myreports" className={({ isActive }) => isActive ? "text-[#5DCEA6] font-semibold" : "hover:text-[#5DCEA6] font-semibold"}>
                            My Reports
                        </NavLink>

                        <NavLink to="/profile" className={({ isActive }) => isActive ? "text-[#5DCEA6] font-semibold" : "hover:text-[#5DCEA6] font-semibold"}>
                            Profile
                        </NavLink>
                    </>
                ) : (
                    <div className="flex gap-2 items-center ml-4">
                        <button
                            className="bg-[#5DCEA6] text-[#111827] h-10 w-24 rounded-3xl font-semibold hover:bg-[#48AA87] hover:scale-105 transition-all duration-300"
                            onClick={openLogin}
                        >
                            Login
                        </button>

                        <button
                            className="bg-[#111827] text-white h-10 w-24 rounded-3xl font-semibold hover:bg-[#373737] hover:scale-105 transition-all duration-300"
                            onClick={openSignup}
                        >
                            Signup
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
