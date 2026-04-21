import { useIniciado } from "../../hooks/useIniciado"

const Control = () => {
  const { isRunning, setIsRunning } = useIniciado()

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  return (
    <div className="control card">
      <button type="button" onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
      <button type="button">Reset</button>
    </div>
  )
}

export default Control