import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="h-screen flex bg-black">
      
      <aside className="w-64 flex-shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;
