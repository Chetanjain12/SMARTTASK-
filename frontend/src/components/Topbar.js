import React from "react";
import "../styles/topbar.css";

function Topbar({ onLogout, searchTerm, setSearchTerm }) {
  return (
    <header className="topbar">
      {/* 🔍 SEARCH */}
      <input
        type="text"
        className="topbar-search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🔥 RIGHT SECTION */}
      <div className="topbar-right">
        <span className="topbar-dev">Developer: Chetan Jain</span>

        <button className="topbar-logout" onClick={onLogout} type="button">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;
