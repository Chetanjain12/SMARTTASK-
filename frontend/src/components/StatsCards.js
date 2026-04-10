import React from "react";
import "../styles/cards.css";
import { FiLayers, FiClock, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

function StatsCards({ tasks }) {
  const activeTasks = tasks.filter((task) => !task.deleted);

  const total = activeTasks.length;
  const pending = activeTasks.filter(
    (task) => task.status === "pending",
  ).length;
  const completed = activeTasks.filter(
    (task) => task.status === "completed",
  ).length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  const cards = [
    {
      label: "Total",
      value: total,
      icon: <FiLayers />,
      color: "blue",
    },
    {
      label: "Pending",
      value: pending,
      icon: <FiClock />,
      color: "orange",
    },
    {
      label: "Completed",
      value: completed,
      icon: <FiCheckCircle />,
      color: "green",
    },
    {
      label: "Progress",
      value: `${progress}%`,
      icon: <FiTrendingUp />,
      color: "purple",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <div className={`stat-icon ${card.color}`}>{card.icon}</div>

          <div className="stat-content">
            {card.label === "Progress" ? (
              <h3>
                {card.label} {card.value}
              </h3>
            ) : (
              <>
                <p>{card.label}</p>
                <h3>{card.value}</h3>
              </>
            )}

            {card.label === "Progress" && (
              <div className="progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
