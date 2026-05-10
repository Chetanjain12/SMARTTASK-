import React from "react";
import { FiCheckCircle, FiClock, FiLayers, FiTrendingUp } from "react-icons/fi";
import "../styles/cards.css";

function StatsCards({ tasks }) {
  const activeTasks = tasks.filter((task) => !task.deleted);

  const total = activeTasks.length;
  const pending = activeTasks.filter((task) => task.status === "pending").length;
  const completed = activeTasks.filter((task) => task.status === "completed").length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  const cards = [
    { label: "Total", value: total, icon: <FiLayers />, color: "blue" },
    { label: "Pending", value: pending, icon: <FiClock />, color: "orange" },
    { label: "Completed", value: completed, icon: <FiCheckCircle />, color: "green" },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <div className={`stat-icon ${card.color}`}>{card.icon}</div>
          <div className="stat-content">
            <p>{card.label}</p>
            <h3>{card.value}</h3>
          </div>
        </div>
      ))}

      <div className="stat-card progress-stat-card">
        <div className="stat-icon purple">
          <FiTrendingUp />
        </div>
        <div className="stat-content stat-progress-content">
          <p>Progress</p>
          <h3>{progress}%</h3>
        </div>
        <div className="progress-ring" style={{ "--progress": `${progress}%` }}>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
