import React from "react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "./navigationItems";
import "../styles/mobile-nav.css";

function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile Navigation">
      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
        >
          <item.Icon />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileNav;
