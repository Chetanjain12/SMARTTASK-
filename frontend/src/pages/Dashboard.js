import React, { useMemo, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import StatsCards from "../components/StatsCards";
import "../styles/pages.css";

function Dashboard({ tasks, onCreateTask, user }) {
  const activeTasks = tasks.filter((task) => !task.deleted);
  const pendingTasks = activeTasks.filter((task) => task.status === "pending");
  const recentTasks = [...activeTasks].slice(0, 4);
  const completedCount = activeTasks.filter((task) => task.status === "completed").length;
  const progress = activeTasks.length ? Math.round((completedCount / activeTasks.length) * 100) : 0;

  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("smarttask_notes_v2");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const addNote = () => {
    const trimmed = noteInput.trim();
    if (!trimmed) return;
    const next = [{ text: trimmed, createdAt: Date.now() }, ...notes].slice(0, 5);
    setNotes(next);
    localStorage.setItem("smarttask_notes_v2", JSON.stringify(next));
    setNoteInput("");
  };

  const overdueCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return pendingTasks.filter((task) => {
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      due.setHours(0, 0, 0, 0);
      return due < today;
    }).length;
  }, [pendingTasks]);

  const high = pendingTasks.filter((task) => task.priority === "high").length;
  const medium = pendingTasks.filter((task) => task.priority === "medium").length;
  const low = pendingTasks.filter((task) => task.priority === "low").length;
  const totalPriority = high + medium + low || 1;

  return (
    <section className="page dashboard-page">
      <StatsCards tasks={tasks} />

      <div className="dashboard-content">
        <div className="dashboard-left card">
          <h3>New Task</h3>
          <AddTaskForm onSubmit={onCreateTask} />
        </div>

        <div className="dashboard-right">
          <div className="card dashboard-recent-card">
            <h3>Recent Activity</h3>
            <div className="recent-table">
              <div className="recent-head">
                <span>Task</span>
                <span>Status</span>
                <span>Created</span>
                <span>Creator</span>
              </div>
              {recentTasks.length ? (
                recentTasks.map((task) => (
                  <div className="recent-row" key={task._id}>
                    <span>{task.title}</span>
                    <span className={`status-${task.status}`}>{task.status}</span>
                    <span>{new Date(task.createdAt || Date.now()).toLocaleDateString()}</span>
                    <span className="creator-chip">{(user?.name || "U").slice(0, 1).toUpperCase()}</span>
                  </div>
                ))
              ) : (
                <div className="recent-empty">No recent activity.</div>
              )}
            </div>
          </div>

          <div className="card dashboard-notes-card">
            <h3>Notes</h3>
            <div className="notes-list">
              {notes.length ? (
                notes.map((note) => (
                  <div className="note-item" key={note.createdAt}>
                    <span>{note.text}</span>
                    <time>{new Date(note.createdAt).toLocaleTimeString()}</time>
                  </div>
                ))
              ) : (
                <div className="note-empty">Add quick notes here.</div>
              )}
            </div>
            <div className="note-input-row">
              <input
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Type recent note..."
              />
              <button type="button" onClick={addNote}>Add</button>
            </div>
          </div>

          <div className="dashboard-bottom-grid">
            <div className="card priority-breakdown-card">
              <h3>Task Priority Breakdown</h3>
              <div
                className="priority-donut"
                style={{
                  "--p-high": `${(high / totalPriority) * 100}%`,
                  "--p-medium": `${(medium / totalPriority) * 100}%`,
                }}
              />
              <div className="priority-legend">
                <span><i className="dot high" />High {high}</span>
                <span><i className="dot medium" />Medium {medium}</span>
                <span><i className="dot low" />Low {low}</span>
              </div>
            </div>

            <div className="card overdue-card">
              <h3>Overdue Tasks</h3>
              <p>{overdueCount}</p>
              <small>Progress: {progress}%</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
