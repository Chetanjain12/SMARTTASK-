import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import { navigationItems } from "./navigationItems";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🚀</span>
        <span className="logo-text">SmartTask</span>
      </div>

      <button
        className="sidebar-new-task"
        type="button"
        onClick={() => window.dispatchEvent(new Event("smarttask:newtask"))}
      >
        + New Task
      </button>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="icon">
              <item.Icon />
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
