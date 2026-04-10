import React from "react";
import "../styles/cards.css";

function TaskCard({ task, onComplete, onDelete, onEdit, compact = false, tone = "default", extraActions }) {
  const priorityClass = `badge badge-${task.priority}`;
  const taskDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date Set";

  return (
    <article className={`task-card ${compact ? "compact" : ""} ${tone}`}>
      <div className="task-card-top">
        <span className={priorityClass}>{task.priority}</span>
      </div>
      <h4>{task.title}</h4>
      {task.description ? <p>{task.description}</p> : null}
      <div className="task-date">{taskDate}</div>
      <div className="task-actions">
        {onComplete ? (
          <button type="button" onClick={() => onComplete(task)}>
            {task.status === "completed" ? "Undo" : "Complete"}
          </button>
        ) : null}
        {onEdit ? (
          <button type="button" onClick={() => onEdit(task)}>
            Edit
          </button>
        ) : null}
        {onDelete ? (
          <button type="button" className="danger" onClick={() => onDelete(task)}>
            Delete
          </button>
        ) : null}
        {extraActions}
      </div>
    </article>
  );
}

export default TaskCard;