import React, { useMemo, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import "../styles/pages.css";

function Tasks({ tasks, onUpdateTask, onDeleteTask }) {
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [view, setView] = useState("grid");

  const activeTasks = useMemo(() => {
    const filtered = tasks.filter((task) => !task.deleted && task.status === "pending");
    const byPriority = priorityFilter === "all" ? filtered : filtered.filter((task) => task.priority === priorityFilter);

    return [...byPriority].sort((a, b) => {
      if (sortBy === "priority") {
        const order = { high: 3, medium: 2, low: 1 };
        return order[b.priority] - order[a.priority];
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      return dateA - dateB;
    });
  }, [tasks, priorityFilter, sortBy]);

  const handleComplete = (task) => {
    onUpdateTask(task._id, { status: "completed" });
  };

  const handleEdit = (task) => {
    const title = window.prompt("Edit title", task.title);
    if (!title) return;

    const description = window.prompt("Edit description", task.description || "") || "";
    onUpdateTask(task._id, { title, description });
  };

  return (
    <section className="page">
      <h2>My Tasks</h2>
      <TaskFilters
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        view={view}
        setView={setView}
      />
      <div className={`tasks-wrap ${view}`}>
        {activeTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onComplete={handleComplete}
            onEdit={handleEdit}
            onDelete={() => onDeleteTask(task._id)}
          />
        ))}
      </div>
    </section>
  );
}

export default Tasks;