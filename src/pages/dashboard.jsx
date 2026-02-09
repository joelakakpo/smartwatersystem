// src/pages/Dashboard.jsx
import React from "react";
import { mockdata } from "../mockdata";
import "../index.css";
import ChartSection from "../components/chartsection";
import GaugeCard from "../components/gaugecard";


const Dashboard = () => {
  const { devices, alerts, waterQuality } = mockdata;
  const wqi = waterQuality.find((m) => m.key === "wqi") || waterQuality.find((m) => m.key === "waterQualityIndex");
  const wqiPercent = Number(wqi.value);
  return (
    <div className="dashboard">
      <h1>Water Quality Monitoring Dashboard</h1>

      <div className="top-grid">
        <div className="gauges-row">
          <div className="big-gauge-wrapper">
          {/* Large top-left gauge (use Water Quality Index if available) */}
          {(() => {
            const wqi = waterQuality.find((m) => m.key === "wqi") || waterQuality[waterQuality.length - 1];
            const percent = Math.round(Number(wqi.value));
            let category = "";
            let status = "";
            if (percent >= 90) {
              category = "Excellent";
              status = "safe";
            } else if (percent >= 70) {
              category = "Good";
              status = "safe";
            } else if (percent >= 50) {
              category = "Fair";
              status = "warning";
            } else if (percent >= 25) {
              category = "Poor";
              status = "critical";
            } else {
              category = "Very poor / Unsafe";
              status = "critical";
            }
            const color = status === "safe" ? "#10b981" : status === "warning" ? "#f59e0b" : "#ef4444";

            return (
              <div className="card">
                <GaugeCard className="large" title={wqi.label} value={wqi.value} unit={wqi.unit} percent={percent} color={color} status={status} note={category} />
                <div style={{ borderTop: "1px solid #eef2f6", marginTop: 12, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Safe (Good / Excellent)</div>
                    <div style={{ fontSize: 12, color: "#10b981" }}>71 - 100</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Warning (Fair)</div>
                    <div style={{ fontSize: 12, color: "#f59e0b" }}>51 - 70</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Critical (Poor / Very Poor)</div>
                    <div style={{ fontSize: 12, color: "#ef4444" }}>0 - 50</div>
                  </div>
                </div>
              </div>
            );
          })()}
          </div>

          {/* Row of small gauges placed on the same horizontal line as the main gauge */}
          <div className="small-gauges-row">
            {(() => {
              const pick = ["pH", "turbidity", "do", "tds"];
              const byKey = (k) => waterQuality.find((m) => m.key.toLowerCase() === k.toLowerCase());
              const notes = {
                pH: "6.5–8.5 units (ideal)",
                turbidity: "< 5 NTU (WHO)",
                do: ">= 6 mg/L (ecological)",
                tds: "≤ 1,000 mg/L (taste)",
                conductivity: "~300–1,000 µS/cm typical",
              };
              const norms = {
                pH: (v) => Math.round((Number(v) / 14) * 100),
                turbidity: (v) => Math.round(Math.min(100, (Number(v) / 100) * 100)),
                chlorine: (v) => Math.round(Math.min(100, (Number(v) / 100) * 100)),
                do: (v) => Math.round(Math.min(100, Number(v))),
                temperature: (v) => Math.round(Math.min(100, (Number(v) / 50) * 100)),
                conductivity: (v) => Math.round(Math.min(100, (Number(v) / 1000) * 100)),
                tds: (v) => Math.round(Math.min(100, (Number(v) / 1200) * 100)),
              };
              const getStatus = (k, v) => {
                const val = Number(v);
                switch (k) {
                  case "pH":
                    if (val >= 6.5 && val <= 8.5) return "safe";
                    if ((val >= 6.0 && val < 6.5) || (val > 8.5 && val <= 9.0)) return "warning";
                    return "critical";
                  case "turbidity":
                    if (val <= 5) return "safe";
                    if (val <= 50) return "warning";
                    return "critical";
                  case "chlorine":
                    if (val <= 3) return "safe";
                    if (val <= 5) return "warning";
                    return "critical";
                  case "do":
                    // dissolved oxygen: interpret value as a percent-like score in this dataset
                    if (val >= 60) return "safe";
                    if (val >= 40) return "warning";
                    return "critical";
                  case "temperature":
                    // Comfortable drinking-water temperatures often ~20-25°C
                    if (val >= 20 && val <= 25) return "safe";
                    if ((val >= 15 && val < 20) || (val > 25 && val <= 30)) return "warning";
                    return "critical";
                  case "conductivity":
                    if (val <= 500) return "safe";
                    if (val <= 1500) return "warning";
                    return "critical";
                  case "tds":
                    // TDS (mg/L) thresholds (approx): <=300 safe, <=600 warning, >600 critical
                    if (val <= 1000) return "safe";
                    if (val <= 600) return "warning";
                    return "critical";
                  default:
                    return "safe";
                }
              };
              return pick.map((k) => {
                const m = byKey(k);
                if (!m) return null;
                const percent = norms[k] ? norms[k](m.value) : 0;
                const status = getStatus(k, m.value);
                const color = status === "safe" ? "#10b981" : status === "warning" ? "#f59e0b" : "#ef4444";
                return (
                  <GaugeCard key={m.key} title={m.label} value={m.value} unit={m.unit} percent={percent} color={color} status={status} note={notes[k.toLowerCase()] || notes[k] || ""} />
                );
              });
            })()}
          </div>

          {/* Temperature gauge rendered on its own row under the small gauges */}
          {(() => {
            const temp = waterQuality.find((m) => m.key === "temperature");
            if (!temp) return null;
            const tempPercent = Math.round(Math.min(100, (Number(temp.value) / 50) * 100));
            const tempStatus = Number(temp.value) >= 20 && Number(temp.value) <= 25
              ? "safe"
              : (Number(temp.value) >= 15 && Number(temp.value) < 20) || (Number(temp.value) > 25 && Number(temp.value) <= 30)
                ? "warning"
                : "critical";
            const tempColor = tempStatus === "safe" ? "#10b981" : tempStatus === "warning" ? "#f59e0b" : "#ef4444";
            const tempNote = "No strict WHO limit (often ~20–25 °C comfortable)";
            return (
              <div className="temperature-row">
                <GaugeCard key={temp.key} title={temp.label} value={temp.value} unit={temp.unit} percent={tempPercent} color={tempColor} status={tempStatus} note={tempNote} />
              </div>
            );
          })()}
        </div>

        {/* Trend chart moved below gauges, spanning full width */}
        <div className="trend-row">
          <ChartSection data={waterQuality} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
