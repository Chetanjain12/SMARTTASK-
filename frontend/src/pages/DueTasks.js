import React from "react";
import TaskCard from "../components/TaskCard";
import "../styles/pages.css";

function DueTasks({ tasks, onUpdateTask, onDeleteTask }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueTasks = tasks.filter((task) => !task.deleted && task.status !== "completed" && task.dueDate);

  const isPastDue = (dueDate) => {
    const d = new Date(dueDate);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isToday = (dueDate) => {
    const d = new Date(dueDate);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  };

  return (
    <section className="page">
      <h2>Due Tasks</h2>
      <div className="tasks-wrap grid">
        {dueTasks.map((task) => (
          <div key={task._id} className={isPastDue(task.dueDate) ? "due-overdue" : ""}>
            <div className="due-label">{isPastDue(task.dueDate) ? "Past Due" : isToday(task.dueDate) ? "Due Today" : "Upcoming"}</div>
            <TaskCard
              task={task}
              onComplete={() => onUpdateTask(task._id, { status: "completed" })}
              onEdit={(t) => {
                const title = window.prompt("Edit title", t.title);
                if (!title) return;
                onUpdateTask(t._id, { title });
              }}
              onDelete={() => onDeleteTask(task._id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default DueTasks;