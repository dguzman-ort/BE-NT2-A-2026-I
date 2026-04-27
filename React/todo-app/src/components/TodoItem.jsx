function TodoItem({ tarea, onDelete, onToggle }) {
  return (
<li className="todo-container">
      <div className="flow-right">
        <input
          type="checkbox"
          checked={tarea.completada}
          onChange={() => onToggle(tarea.id)} 
        />
        <span>{tarea.texto}</span>
        <button onClick={() => onDelete(tarea.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default TodoItem;