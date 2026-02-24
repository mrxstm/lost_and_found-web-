import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI";
import { toast } from "react-toastify";

// This is for the global state to check whether the user is logged in or not
const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { callApi } = useApi();

    // logout
    const logout = async() => {
        try {
            await callApi("POST", "/auth/logout", {});
            toast.success("Logged out");
        } catch(err) {
            console.error("Logout failed : ", err);
        } finally {
            setUser(null);
        }
    }

    //restoring session on refresh
    useEffect(()=> {
        const fetchUser = async() => {
            try {
                const res = await callApi("GET", "/auth/me", {}); 
                setUser(res.user)  

            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                loading
            }}>
                {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);