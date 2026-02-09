import React from "react";
import { mockdata } from "../mockdata";
import { RadialBarChart, RadialBar, Legend } from "recharts";

function Monitoring() {
  const { devices, alerts, waterQuality } = mockdata;

  return (
    <div className="monitoring-page">
      <h1>Water Quality Monitoring</h1>

      {/* Metrics row (compact cards) */}
      <div className="metric-grid">
        {(() => {
          const pick = ["ph", "temperature", "turbidity", "do", "tds"];
          const byKey = (k) => waterQuality.find((m) => m.key.toLowerCase() === k.toLowerCase());
          const icons = { ph: "🧪", temperature: "🌡️", turbidity: "👁️", do: "💧", tds: "🧂" };
          return pick.map((k) => {
            const m = byKey(k);
            if (!m) return null;
            const cls = `metric-card metric-${k.toLowerCase()}`;
            return (
              <div className={cls} key={m.key}>
                <div className="metric-icon">{icons[k.toLowerCase()] || "•"}</div>
                <div className="metric-title">{m.label}</div>
                <div className="metric-value">{m.value} <span className="metric-unit">{m.unit}</span></div>
              </div>
            );
          });
        })()}
      </div>

      {/* Devices Section */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Active Devices</h3>
          <p>{devices.active}</p>
        </div>
        <div className="card">
          <h3>Total Devices</h3>
          <p>{devices.total}</p>
        </div>
        <div className="card">
          <h3>Uptime</h3>
          <p>{devices.uptime}</p>
        </div>
        <div className="card">
          <h3>Last Updated</h3>
          <p>{devices.lastUpdated}</p>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="dashboard-cards">
        {alerts.details.map(alert => (
          <div className="card" key={alert.id}>
            <h3>{alert.type}</h3>
            <p>{alert.message}</p>
            <small>{alert.severity} — {alert.timestamp}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Monitoring;
