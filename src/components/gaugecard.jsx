import React from "react";
import "./gaugecard.css";

function GaugeCard({ title, value, unit, percent = 0, color = "#10b981", status = null, note = null }) {
  const radius = 44;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="gauge-card card">
      <div className="gauge-inner">
        <svg className="gauge-svg" width="110" height="110" viewBox="0 0 110 110">
          <g transform="translate(55,55)">
            <circle
              className="gauge-track"
              r={normalizedRadius}
              fill="transparent"
              stroke="#eef2f7"
              strokeWidth={stroke}
            />
            <circle
              className="gauge-fill"
              r={normalizedRadius}
              fill="transparent"
              stroke={color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 800ms ease" }}
            />
          </g>
        </svg>

        <div className="gauge-center">
          <div className="gauge-value">{value}</div>
          <div className="gauge-unit">{unit}</div>
        </div>
      </div>
      <div className="gauge-title">
        {title}
        {status && (
          <span className={`gauge-status ${status}`} title={status}>
            <span className="gauge-status-dot" /> {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
      </div>
      {note && <div className="gauge-note">{note}</div>}
    </div>
  );
}

export default GaugeCard;
