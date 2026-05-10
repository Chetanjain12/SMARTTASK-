import React from "react";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import "../styles/topbar.css";

function Topbar({ user, onLogout, searchTerm, setSearchTerm, showDashboardMeta = false }) {
  return (
    <header className={`topbar ${showDashboardMeta ? "" : "topbar-search-only"}`.trim()}>
      <div className="topbar-mobile-brand" aria-hidden="true">
        <span className="topbar-mobile-logo"><FaRocket /></span>
        <span className="topbar-mobile-title">SmartTask</span>
      </div>

      <div className="topbar-main-row">
        <label className="topbar-search-wrap" aria-label="Search tasks">
          <FiSearch />
          <input
            type="text"
            className="topbar-search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        {showDashboardMeta ? (
          <div className="topbar-right">
            <div className="topbar-avatar" aria-hidden="true">
              {(user?.name || "U").slice(0, 1).toUpperCase()}
            </div>
            <button className="topbar-logout" onClick={onLogout} type="button">
              <FiLogOut />
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Topbar;
