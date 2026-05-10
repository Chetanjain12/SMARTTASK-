import React from "react";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

function Layout({ children, user, tasks, onLogout, searchTerm, setSearchTerm }) {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Topbar
          user={user}
          tasks={tasks}
          onLogout={onLogout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showDashboardMeta={isDashboard}
        />
        <div className={`app-content ${isDashboard ? "is-dashboard" : ""}`.trim()}>{children}</div>
        <MobileNav />
      </main>
    </div>
  );
}

export default Layout;
