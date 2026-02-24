import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

function AdminRoutes() {

    const {user, loading} = useAuth();

    if(loading) return <div>Loading........</div>

    if(!user || user.role !== "admin") {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;

}

export default AdminRoutes;