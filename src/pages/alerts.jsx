import React from "react";
import { mockdata } from "../mockdata";
import "../index.css";

const alertData = {
  summary: {
    active: 2,
    critical: 0,
    warnings: 0,
    resolvedToday: 2,
  },
  history: [
    {
      id: "alert-001",
      title: "Mercury Level Spike Detected",
      status: "resolved",
      description: "Sensor A detected mercury levels of 1.8 ppb, approaching threshold",
      timestamp: "2 hours ago",
    },
    {
      id: "alert-002",
      title: "pH Level Fluctuation",
      status: "resolved",
      description: "Main tank pH dropped to 6.3, outside normal range",
      timestamp: "5 hours ago",
    },
    {
      id: "alert-003",
      title: "Sensor Calibration Due",
      status: "active",
      description: "Sensor C requires calibration within 24 hours",
      timestamp: "1 day ago",
    },
  ],
};

function AlertPage() {
  const { summary, history } = alertData;

  return (
    <div className="alert-page">
      <h1>Alert Dashboard</h1>

      {/* Summary Section */}
      <div className="summary-grid">
        <div className="summary-card">Active Alerts: {summary.active}</div>
        <div className="summary-card">Critical: {summary.critical}</div>
        <div className="summary-card">Warnings: {summary.warnings}</div>
        <div className="summary-card">Resolved Today: {summary.resolvedToday}</div>
      </div>

      {/* Alert History Section */}
      <h2>Alert History</h2>
      <div className="alert-history">
        {history.map((alert) => (
          <div className={`alert-card ${alert.status}`} key={alert.id}>
            <h3>{alert.title} ({alert.status})</h3>
            <p>{alert.description}</p>
            <small>{alert.timestamp}</small>
            {alert.status === "active" && (
              <button className="resolve-button">Resolve</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertPage;
