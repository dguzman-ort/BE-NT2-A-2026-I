import { useState } from 'react'

import Counters from './components/counters/counters'
import QuickAdd from './components/quick-add/quick-add'
import EmptyState from './components/empty-state/empty-state'
import Task from './components/task/task'

function App() {

  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   title: 'Task 1',
    //   completed: false,
    // },
    // {
    //   id: 2,
    //   title: 'Task 2',
    //   completed: false,
    // },
    // {
    //   id: 3,
    //   title: 'Task 3',
    //   completed: true,
    // }
  ])

  const addTask = (task) => {
    setTasks([...tasks, task])
  }

  const updateTask = (id, task) => {
    setTasks(tasks.map((item) => item.id === id ? task : item))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(item => item.id !== id))
  }

  const isEmpty = tasks.length === 0

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-8">
      <main className="pt-6 px-6 max-w-5xl mx-auto">
        {/* Dashboard Summary Header */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
                Good morning.
              </h1>
              <p className="text-on-surface-variant font-body text-lg">
                Your focus is your most valuable asset.
              </p>
            </div>
            {/* Stats Bento Grid-ish Layout */}
            <Counters tasks={tasks} />
          </div>
        </section>

        {/* Quick Add Section */}
        <QuickAdd handleAddTask={addTask} />
        {/* Task List Area */}
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-on-surface px-2">List of Tasks</h2>
            <div className="flex gap-2">
              <span className="bg-surface-container-high text-on-surface-variant text-xs px-3 py-1 rounded-full font-semibold">
                Priority
              </span>
              <span className="bg-surface-container-low text-on-surface-variant text-xs px-3 py-1 rounded-full font-semibold">
                Timeline
              </span>
            </div>
          </div>

          {isEmpty ? <EmptyState /> : (
            <div className="space-y-4">
              {
                tasks.map((task) => ( 
                  <Task key={task.id} task={task} handleUpdateTask={updateTask} handleDelete={deleteTask} />
                ))
              }
            </div>
          )}
        </section>

        {/* Inspiration Card / Asymmetric Element */}
        <section className="mt-16 mb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 relative h-48 rounded-[32px] overflow-hidden group">
            <img
              alt="Minimalist study space"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDktZ7BHhzpwQpdAOhHLuoPeKX1To8OcAHrqzntWu7eP1bavDJjDo7wyPrIajlkPJP4iryRf94W5AoKKKCluE4BCZgw8vQt_sldAHk0-2IvZs0VDhkYMO49VpJjjGyou2Lg4v6zq-C8nzrje8c-SvwZf14p6Rckxcr6SMAsSc20H00b2HzXzj9EnpKPg10C86bYNAbG-XYLKLVGo1Ff8QQ2UqF7RFzzqSYtZOU8J4Hn7Duc4U4vKIQyeywaNnNTliaMO7qkWPFIDUs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent flex flex-col justify-end p-8">
              <p className="text-on-primary font-headline text-xl font-bold">
                &ldquo;Focus is the art of saying no.&rdquo;
              </p>
              <p className="text-on-primary/80 text-sm">Steve Jobs</p>
            </div>
          </div>
          <div className="bg-secondary-container p-8 rounded-[32px] flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-4xl text-on-secondary-container mb-4">
              auto_awesome
            </span>
            <h4 className="text-on-secondary-container font-bold mb-2">Weekly Summary</h4>
            <p className="text-on-secondary-container/70 text-sm">
              You were 15% more productive than last week.
            </p>
          </div>
        </section>
      </main>

      {/* Contextual FAB */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-br from-primary to-primary-container text-on-primary w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all md:hidden">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  )
}

export default App
