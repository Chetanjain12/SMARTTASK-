import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

function Layout({ children, user, tasks, onLogout, searchTerm, setSearchTerm }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Topbar user={user} tasks={tasks} onLogout={onLogout} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="app-content">{children}</div>
      </main>
    </div>
  );
}

export default Layout;