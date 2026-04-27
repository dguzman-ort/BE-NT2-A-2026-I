import './App.css'
import { useState } from 'react'
import TodoItem from './components/TodoItem'

function App() {

const [tareas, setTareas] = useState([
    { id: 1, texto: ' lol', completada: false },
    { id: 2, texto: 'Revisar correo', completada: false }
  ]);

  // LÓGICA 1: Eliminar
  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter(t => t.id !== id);
    setTareas(nuevasTareas);
  };

  // LÓGICA 2: Marcar como completada/pendiente
  const toggleTarea = (id) => {
    const tareasActualizadas = tareas.map(t => 
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    setTareas(tareasActualizadas);
  };

  // LÓGICA 3: Cálculos para los contadores
  const total = tareas.length;
  const completadas = tareas.filter(t => t.completada).length;


  return (
    <>
      <div className="container center">
        <h1 className="center title">TO-DO App</h1>

        <div className="todo-stats" role="status" aria-live="polite">
          <span>Total de tareas: {total}</span>
          <span>Tareas completadas: {completadas}</span>
        </div>
        <div className="controls flow-right">
          <input type="text" placeholder="Nueva tarea" aria-label="Título de la tarea" />
          <button type="button" className="button">
            Agregar
          </button>
        </div>


        <ul id="todoList" className="todo-list">
         {/*  <li className="todo-container" data-id="1">
            <div className="flow-right">
              <input
                type="checkbox"
                className="todo-checkbox"
                defaultChecked
                aria-label="Completada: xd leche"
              />
              <span>Comprar leche</span>
              <button type="button" className="button todo-delete">
                Eliminar
              </button>
            </div>
          </li>
          <li className="todo-container" data-id="2">
            <div className="flow-right">
              <input
                type="checkbox"
                className="todo-checkbox"
                aria-label="Pendiente: Revisar correo"
              />
              <span>Revisar correo</span>
              <button type="button" className="button todo-delete">
                Eliminar
              </button>
            </div>
          </li> */}
          {tareas.map(t => (
          <TodoItem 
            key={t.id} 
            tarea={t} 
            onDelete={eliminarTarea} 
            onToggle={toggleTarea} 
          />
        ))}
          
        </ul>
      </div>
    </>
  
)
}

export default App
