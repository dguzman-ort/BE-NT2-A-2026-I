import { useState, useEffect } from "react"
import { useIniciado } from "../../hooks/useIniciado"

const Cronometro = () => {
    const { isRunning } = useIniciado()
    const [time, setTime] = useState(0)

    useEffect(() => {
        if (isRunning) {
            setTime(time + 1)
        }
    }, [isRunning])
    return (
        <div className="cronometro card">
            <h1>{time}</h1>
        </div>
    )
}

export default Cronometro