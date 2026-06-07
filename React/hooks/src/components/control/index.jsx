import { useIniciado } from "../../hooks/useIniciado"

const Control = () => {
  const { isRunning, toggleIsRunning } = useIniciado()

  return (
    <div className="control card">
      <button type="button" onClick={toggleIsRunning}>{isRunning ? 'Pause' : 'Start'}</button>
      <button type="button">Reset</button>
    </div>
  )
}

export default Control