import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

import {
  FiHome,
  FiList,
  FiClock,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";

function Sidebar() {
  const items = [
    { label: "Dashboard", path: "/", icon: <FiHome /> },
    { label: "My Tasks", path: "/tasks", icon: <FiList /> },
    { label: "Due Tasks", path: "/due", icon: <FiClock /> },
    { label: "Completed", path: "/completed", icon: <FiCheckCircle /> },
    { label: "Trash", path: "/trash", icon: <FiTrash2 /> },
  ];

  return (
    <aside className="sidebar">
      {/* 🔥 LOGO */}
      <div className="sidebar-logo">
        <span className="logo-icon">🚀</span>
        <span className="logo-text">SmartTask</span>
      </div>

      {/* ➕ NEW TASK */}
      <button
        className="sidebar-new-task"
        type="button"
        onClick={() => window.dispatchEvent(new Event("smarttask:newtask"))}
      >
        + New Task
      </button>

      {/* 📌 NAV */}
      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
