import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {

     const {user, loading} = useAuth();

    if(user) {
        <Navigate to="/search" replace/>
    }
    return <Outlet/>;

}

export default PublicRoute;