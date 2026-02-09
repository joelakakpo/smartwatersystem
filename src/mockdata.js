// src/data/mockData.js
export const mockdata = {
  devices: {
    active: 8,
    total: 12,
    uptime: "95%",
    lastUpdated: "2026-01-30 12:30 GMT",
    list: [
      { id: "Device-01", status: "Active", uptime: "99%" },
      { id: "Device-02", status: "Active", uptime: "97%" },
      { id: "Device-03", status: "Inactive", uptime: "0%" },
      { id: "Device-04", status: "Active", uptime: "96%" },
      { id: "Device-05", status: "Active", uptime: "94%" },
      { id: "Device-06", status: "Inactive", uptime: "0%" },
      { id: "Device-07", status: "Active", uptime: "92%" },
      { id: "Device-08", status: "Active", uptime: "95%" },
      { id: "Device-09", status: "Inactive", uptime: "0%" },
      { id: "Device-10", status: "Active", uptime: "98%" },
      { id: "Device-11", status: "Active", uptime: "97%" },
      { id: "Device-12", status: "Inactive", uptime: "0%" },
    ],
  },

  alerts: {
    count: 3,
    status: "Mixed",
    details: [
      {
        id: "Alert-001",
        type: "Connectivity",
        severity: "Critical",
        message: "Device-03 not responding",
        timestamp: "2026-01-19 15:20 GMT",
      },
      {
        id: "Alert-002",
        type: "Performance",
        severity: "Warning",
        message: "Device-05 showing high CPU usage",
        timestamp: "2026-01-28 09:45 GMT",
      },
      {
        id: "Alert-003",
        type: "Connectivity",
        severity: "Resolved",
        message: "Device-07 connection restored",
        timestamp: "2026-01-29 18:10 GMT",
      },
    ],
  },

  waterQuality: [
    { key: "flowRate", label: "Flow Rate", value: 52.4, unit: "L/min" },
    { key: "temperature", label: "Temperature", value: 36, unit: "°C" },
    { key: "pH", label: "pH Level", value: 7.1, unit: "pH" },
    { key: "turbidity", label: "Turbidity", value: 12, unit: "NTU" },
    { key: "conductivity", label: "Conductivity", value: 42, unit: "µS/cm" },
    { key: "tds", label: "Total Dissolved Solids", value: 410, unit: "mg/L" },
    { key: "do", label: "Dissolved Oxygen", value: 68, unit: "mg/L" },
    { key: "wqi", label: "Water Quality Index", value: 78, unit: "%" },
  ],
};
