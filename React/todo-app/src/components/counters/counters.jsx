const Counters = ({ tasks }) => {

  const totalTasks = tasks.length
  const remainingTasks = tasks.filter((task) => !task.completed).length
  return (
    <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-low p-6 rounded-[24px] min-w-[160px] flex flex-col justify-between">
        <span className="text-on-surface-variant text-sm font-label uppercase tracking-widest font-semibold mb-4">
            Total Tasks
        </span>
        <span className="text-3xl font-extrabold text-on-surface">{totalTasks}</span>
        </div>
        <div className="bg-primary text-on-primary p-6 rounded-[24px] min-w-[160px] flex flex-col justify-between shadow-lg">
        <span className="text-on-primary/70 text-sm font-label uppercase tracking-widest font-semibold mb-4">
            Remaining
        </span>
        <span className="text-3xl font-extrabold">{remainingTasks}</span>
        </div>
    </div>
  )
}

export default Counters