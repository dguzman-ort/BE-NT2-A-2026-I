import './App.css'

function App() {
  return (
    <>
      <div className="container center">
        <h1 className="center title">TODO App</h1>

        <div className="todo-stats" role="status" aria-live="polite">
          <span>Total de tareas: 2</span>
          <span>Tareas completadas: 1</span>
        </div>
        <div className="controls flow-right">
          <input type="text" placeholder="Nueva tarea" aria-label="Título de la tarea" />
          <button type="button" className="button">
            Agregar
          </button>
        </div>

        <ul id="todoList" className="todo-list">
          <li className="todo-container" data-id="1">
            <div className="flow-right">
              <input
                type="checkbox"
                className="todo-checkbox"
                defaultChecked
                aria-label="Completada: Comprar leche"
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
          </li>
        </ul>
      </div>
    </>
  )
}

export default App
