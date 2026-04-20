import './App.css'
import { useState } from 'react'


function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");


  const agregarTarea = () => {
  setTareas([...tareas, { texto: nuevaTarea, completada: false }]);
  setNuevaTarea("");
  };

  return (
    <>
      <div className="container center">
        <h1 className="center title">TODO App</h1>

        <div className="todo-stats" role="status" aria-live="polite">
          <span>Total de tareas: {tareas.length}</span>
          <span>Tareas completadas: {tareas.filter((t) => t.completada).length}</span>
        </div>
        <div className="controls flow-right">
          <input type="text" placeholder="Nueva tarea" value={nuevaTarea} onChange={(e) => setNuevaTarea(e.target.value)} aria-label="Título de la tarea" />
          <button type="button" className="button" onClick={agregarTarea}>
            Agregar
          </button>
        </div>
        <ul>
          {tareas.map((tarea, index) => (
            <li className="todo-container" data-id={index}>
            <div className="flow-right">
              <input
                type="checkbox"
                className="todo-checkbox"
                onChange={(e) => {
                  const nuevasTareas = tareas.map((t, i) =>
                  i === index
                    ? { ...t, completada: e.target.checked }
                    : t
                  );
                  setTareas(nuevasTareas);
                }}   
                aria-label="Pendiente: Revisar correo"
              />
              <span>{tarea.texto}</span>
              <button 
                type="button" 
                className="button todo-delete" 
                onClick={() => setTareas([
                  ...tareas.slice(0, index),
                  ...tareas.slice(index + 1)
                ])
              }>
                Eliminar
              </button>
            </div>
          </li>
          ))}
        </ul>
      </div>
      
    </>
    
  )
}

export default App
