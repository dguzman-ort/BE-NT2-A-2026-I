import globalContext from "./globalContext"
import { useState, useContext } from "react"
/**
 * Provider del contexto global para el estado de inicio del cronometro
 */
export const IniciadoProvider = ({ children }) => {
    const [isRunning, setIsRunning] = useState(false)

    return (
        <globalContext.Provider value={{ isRunning, setIsRunning }}>
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