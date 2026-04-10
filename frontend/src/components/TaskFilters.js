import React from "react";
import "../styles/cards.css";

function TaskFilters({ priorityFilter, setPriorityFilter, sortBy, setSortBy, view, setView }) {
  return (
    <div className="filters">
      <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">By Date</option>
        <option value="priority">By Priority</option>
        <option value="title">By Title</option>
      </select>
      <div className="view-toggle">
        <button type="button" className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
          List
        </button>
        <button type="button" className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>
          Grid
        </button>
      </div>
    </div>
  );
}

export default TaskFilters;