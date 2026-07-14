import { useContext, createContext, useEffect, useState } from "react";
export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getCurrentUser() {

        }
        getCurrentUser();


        return () => {
            subscription.unsubscribe()
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser

            }}>
            {children}
        </AuthContext.Provider>
    )

}
export default function useAuth() {
    return useContext(AuthContext)
}