import globalContext from "./globalContext"
import { useState, useContext } from "react"
/**
 * Provider del contexto global para el estado de inicio del cronometro
 */
export const IniciadoProvider = ({ children }) => {
    const [isRunning, setIsRunning] = useState(false)

    const toggleIsRunning = () => {
        setIsRunning(!isRunning)
    }

    return (
        <globalContext.Provider value={{ isRunning, toggleIsRunning }}>
            {children}
        </globalContext.Provider>
    )
    
}


export function useIniciado() {
    const estaIniciado = useContext(globalContext)

    if (!estaIniciado) {
        throw new Error('useIniciado debe ser usado dentro de un IniciadoProvider')
    }

    return estaIniciado
}