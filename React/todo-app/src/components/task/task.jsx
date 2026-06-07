const Task = ({ task, handleUpdateTask, handleDelete }) => {

    const handleChange = (e) => {
        const updatedTask = { ...task, completed: e.target.checked }
        handleUpdateTask(task.id, updatedTask)
    }

    return (
        <div className="group bg-surface-container-lowest p-5 rounded-[20px] flex items-center gap-6 transition-all duration-300 hover:shadow-[0_16px_32px_rgba(50,49,59,0.06)]">
            <div className="relative flex items-center justify-center">
                <input
                    className="w-6 h-6 rounded-full border-2 border-outline-variant bg-surface-container-high checked:bg-primary checked:border-primary focus:ring-offset-0 focus:ring-0 transition-all cursor-pointer appearance-none"
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleChange}
                />
            </div>
            <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-on-surface">{task.title}</h3>
                </div>
                {/* <p className="text-sm text-on-surface-variant line-clamp-1">
                    Compile the top productivity tips for the October archive.
                </p> */}
            </div>
            <button onClick={() => handleDelete(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-outline-variant hover:text-error">
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    )
}

export default Task