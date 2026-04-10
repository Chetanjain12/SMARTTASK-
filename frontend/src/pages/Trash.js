import React from "react";
import TaskCard from "../components/TaskCard";
import "../styles/pages.css";

function Trash({ tasks, onRestoreTask, onPermanentDelete }) {
  const trashed = tasks.filter((task) => task.deleted);

  return (
    <section className="page">
      <h2>Trash</h2>
      <div className="tasks-wrap grid">
        {trashed.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            tone="trash"
            extraActions={
              <>
                <button type="button" onClick={() => onRestoreTask(task._id)}>
                  Restore
                </button>
                <button type="button" className="danger" onClick={() => onPermanentDelete(task._id)}>
                  Delete Permanently
                </button>
              </>
            }
          />
        ))}
      </div>
    </section>
  );
}

export default Trash;