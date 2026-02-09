import React from "react";
import { mockdata } from "../mockdata";
import "../index.css";

function scoreParam(key, value) {
  const v = Number(value);
  switch (key) {
    case "pH":
      // ideal ~7.5 center, scale linearly to 0..14
      return Math.max(0, Math.round(100 - (Math.abs(v - 7.5) / 7.5) * 100));
    case "turbidity":
      // lower is better
      return Math.max(0, Math.round(100 - (v / 100) * 100));
    case "tds":
      return Math.max(0, Math.round(100 - (v / 1200) * 100));
    case "do":
      // higher is better; assume 10 mg/L is 100%
      return Math.min(100, Math.round((v / 10) * 100));
    case "temperature":
      // comfortable ~22.5 C center
      return Math.max(0, Math.round(100 - (Math.abs(v - 22.5) / 22.5) * 100));
    default:
      return Math.max(0, Math.min(100, Math.round(Number(v) || 0)));
  }
}

function WaterQuality() {
  const { waterQuality } = mockdata;

  const keys = ["pH", "turbidity", "tds", "do", "temperature"];
  const params = keys
    .map((k) => {
      const m = waterQuality.find((x) => x.key.toLowerCase() === k.toLowerCase());
      return m ? { key: k, label: m.label, value: m.value, unit: m.unit } : null;
    })
    .filter(Boolean);

  const scored = params.map((p) => ({ ...p, percent: scoreParam(p.key, p.value) }));
  const overall = Math.round(scored.reduce((s, p) => s + p.percent, 0) / (scored.length || 1));

  const getStatus = (pct) => {
    if (pct >= 90) return "Excellent";
    if (pct >= 70) return "Good";
    if (pct >= 50) return "Fair";
    if (pct >= 25) return "Poor";
    return "Very poor / Unsafe";
  };

  return (
    <div className="water-quality-page">
      <h1>Water Quality Summary</h1>

      <div className="wqi-top">
        <div className="wqi-card">
          <div className="wqi-label">Overall Water Quality Score</div>
          <div className="wqi-value">{overall}%</div>
          <div className="wqi-status">{getStatus(overall)}</div>
        </div>
        <div className="wqi-circle">
          <div className="wqi-circle-inner">{overall}%</div>
        </div>
      </div>

      <div className="wqi-rows">
        {scored.map((p) => (
          <div className="wqi-row" key={p.key}>
            <div className="wqi-row-left">
              <div className="wqi-row-title">{p.label}</div>
              <div className="wqi-row-sub">{p.value} {p.unit} — {p.percent}%</div>
            </div>
            <div className="wqi-row-right">
              <div className="wqi-track">
                <div className="wqi-fill" style={{ width: `${p.percent}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WaterQuality;
