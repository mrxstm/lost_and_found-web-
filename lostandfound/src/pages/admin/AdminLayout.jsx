import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex bg-black">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full z-40 transition-transform duration-300
                lg:static lg:translate-x-0 lg:flex-shrink-0
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto flex flex-col bg-[#111827]">

                {/* Mobile top bar */}
                <div className="lg:hidden flex items-center gap-3 bg-[#111827] px-4 h-12 sticky top-0 z-20">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-white"
                    >
                        <Menu size={20} />
                    </button>
                    <span className="text-white font-semibold text-sm">Admin Panel</span>
                </div>

                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;