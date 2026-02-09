import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mockdata } from "../mockdata";

function Analytics() {
  // build sensor labels from mockdata parameters
  const pick = ["pH", "turbidity", "do", "tds", "temperature"]; // include temperature sensor
  const byKey = (k) => mockdata.waterQuality.find((m) => m.key.toLowerCase() === k.toLowerCase());
  const data = pick.map((k) => {
    const m = byKey(k) || { label: k, value: 0 };
    return { name: `${m.label} Sensor`, readings: Number(m.value) };
  });

  return (
    <div className="analytics-page">
      <h1>Sensor Performance</h1>

      {/* KPI cards */}
      <div className="analytics-kpis">
        <div className="kpi-card">
          <div className="kpi-label">Total Readings</div>
          <div className="kpi-value">4,894</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Response Time</div>
          <div className="kpi-value">1.2s</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Anomalies Detected</div>
          <div className="kpi-value">7</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Uptime</div>
          <div className="kpi-value">99.8%</div>
        </div>
      </div>

      <div style={{ width: "100%", height: 360 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}`, "readings"]} />
            <Legend />
            <Bar dataKey="readings" fill="#7c3aed" radius={[6, 6, 0, 0]} barSize={56} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;
