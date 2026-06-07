import { useState } from 'react'

const QuickAdd = ({ handleAddTask }) => {

    const [task, setTask] = useState('')
    const addTask = () => {
        console.log('addTask', task)
        setTask('')
        const newTask = {
            id: Date.now(),
            title: task,
            completed: false,
        }
    console.log('newTask', newTask)
    handleAddTask(newTask)
        
    }
    return (
        <section className="mb-12">
            <div className="bg-surface-container-high p-2 rounded-full flex items-center shadow-sm">
                <input
                    className="bg-transparent border-none focus:ring-0 flex-grow px-6 py-3 text-on-surface placeholder:text-on-surface-variant/50 font-body"
                    placeholder="Capture a new thought..."
                    type="text"
                    value={task}                    
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask} className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:scale-95 transition-transform">
                    <span className="material-symbols-outlined">add</span>
                    <span>Add Task</span>
                </button>
            </div>
        </section>

    )
}

export default QuickAdd