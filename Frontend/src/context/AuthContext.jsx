import { useContext, createContext, useEffect, useState } from "react";
import API from "../api/axios";
export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authChecked, setAuthChecked] = useState(false)
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await API.get("/auth/profile");
                setUser(response.data.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    try {
                        await API.post("/auth/refresh-token");

                        const response = await API.get("/auth/profile");
                        setUser(response.data.data);
                    } catch (refreshError) {
                        if (refreshError.response?.status === 401) {
                            setUser(null);
                        } else {
                            console.error(
                                "Failed to refresh authentication",
                                refreshError
                            );
                        }
                    }
                } else { 
                    console.error(
                        "Failed to restore authentication",
                        error
                    );
                }
            } finally {
                setAuthChecked(true);
            }
        };

        getCurrentUser();
    }, []);
console.log(user);

    const logout = async () => {
        try {
            await API.post("/auth/logout")
            setUser(null)
        } catch (error) {
            console.log("Error while logging out User", error.message);

        }
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
                authChecked
            }}>
            {children}
        </AuthContext.Provider>
    )

}
export default function useAuth() {
    return useContext(AuthContext)
}