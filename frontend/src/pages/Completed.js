import React from "react";
import TaskCard from "../components/TaskCard";
import "../styles/pages.css";

function Completed({ tasks, onUpdateTask }) {
  const completedTasks = tasks.filter((task) => !task.deleted && task.status === "completed");

  return (
    <section className="page">
      <div className="page-header-inline">
        <h2>Completed Tasks</h2>
        <div className="completed-meta">Completed: {completedTasks.length}</div>
      </div>
      <div className="tasks-wrap grid">
        {completedTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            tone="completed"
            onComplete={() => onUpdateTask(task._id, { status: "pending" })}
            compact
          />
        ))}
      </div>
    </section>
  );
}

export default Completed;