import { createContext, useContext, useState, useEffect } from "react"
import storageService from "../services/asyncStorage"
import authService from "../services/authService"
const authContext = createContext()

export const useAuth = () => {
    return useContext(authContext)
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    
    useEffect(() => {
        storageService.getData(authService.AUTH_KEY)
        .then((auth) => {
            console.log('Tengo data en cache? -> ', auth)
            if (auth) {
                setAuth(auth)
            }
        })
    }, [])

    useEffect(()=>{
        console.log('auth', auth)
        if (auth) {
            storageService.storeData(authService.AUTH_KEY, auth)
        } else {    
            storageService.clearData()
        }
    }, [auth])

    return (
        <authContext.Provider value={{ auth, setAuth }}>
            {children}
        </authContext.Provider>
    )
}