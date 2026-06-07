import { useState, useEffect, useRef } from "react"
import { useIniciado } from "../../hooks/useIniciado"

const Cronometro = () => {
    const { isRunning } = useIniciado()
    const [time, setTime] = useState(0)

    const interval = useRef(null)

    useEffect(() => {
        console.log('isRunning', isRunning)
        if (isRunning) {
            interval.current = setInterval(() => {
                // console.log('time', time)
                setTime((val) => val + 1)
                // setTime((prev) => {
                //     console.log('time', prev)
                //     return prev + 1
                // })
                
            }, 1000)
        }else{
            console.log('limpiar intervalo', interval.current)
            clearInterval(interval.current)
        }
        
    }, [isRunning])
    return (
        <div className="cronometro card">
            <h1>{time}</h1>
        </div>
    )
}

export default Cronometro