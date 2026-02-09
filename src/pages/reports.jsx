import React from 'react';
import '../index.css';
import { useState } from "react";

export default function Reports() {
  const [reports] = useState([
    {
      title: "Monthly Water Quality Report",
      subtitle: "Quality Assessment - November 2025",
      size: "2.4 MB",
    },
    {
      title: "Sensor Performance Report",
      subtitle: "Technical - October 2025",
      size: "1.2 MB",
    },
    {
      title: "Compliance Summary",
      subtitle: "Compliance - Q3 2025",
      size: "3.1 MB",
    },
  ]);

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <p>
        Generate and view various reports
        related to water quality and system performance.
      </p>

      {/* Report Generation Section */}
      <div className="report-generation">
        <h3>Generate Reports</h3>
        <div className="report-options">
          {/* Only Daily Summary remains */}
          <button className="report-btn">Daily Summary</button>
        </div>
      </div>

      {/* Recent Reports Section */}
      <div className="recent-reports">
        <h3>Recent Reports</h3>
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <div className="report-info">
              <h4>{report.title}</h4>
              <p>{report.subtitle}</p>
              <span>{report.size}</span>
            </div>
            <button className="download-btn">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
