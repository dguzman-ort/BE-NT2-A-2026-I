import { createContext, useContext, useState } from "react"
const authContext = createContext()

export const useAuth = () => {
    return useContext(authContext)
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    return (
        <authContext.Provider value={{ auth, setAuth }}>
            {children}
        </authContext.Provider>
    )
}