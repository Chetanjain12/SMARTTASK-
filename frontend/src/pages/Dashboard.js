import React, { useState, useEffect } from "react";
import AddTaskForm from "../components/AddTaskForm";
import StatsCards from "../components/StatsCards";
import "../styles/pages.css";

function Dashboard({ tasks, onCreateTask }) {
  const activeTasks = tasks.filter((task) => !task.deleted);
  const recentTasks = activeTasks.slice(0, 5);

  // 🔥 NOTES STATE
  const [notes, setNotes] = useState("");

  // 🔥 LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const savedNotes = localStorage.getItem("smarttask_notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // 🔥 SAVE TO LOCAL STORAGE
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    localStorage.setItem("smarttask_notes", e.target.value);
  };

  return (
    <section className="page dashboard-page">
      <StatsCards tasks={tasks} />

      <div className="dashboard-content">
        {/* LEFT */}
        <div className="dashboard-left card">
          <h3>New Task</h3>
          <AddTaskForm onSubmit={onCreateTask} />
        </div>

        {/* RIGHT */}
        <div className="dashboard-right">
          {/* RECENT */}
          <div className="card">
            <h3>Recent Activity</h3>
            <ul className="simple-list">
              {recentTasks.length ? (
                recentTasks.map((task) => <li key={task._id}>{task.title}</li>)
              ) : (
                <li>No recent activity.</li>
              )}
            </ul>
          </div>

          {/* 🔥 NOTES (EDITABLE) */}
          <div className="card">
            <h3>Notes</h3>
            <textarea
              className="notes-input"
              placeholder="Write your notes here..."
              value={notes}
              onChange={handleNotesChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
