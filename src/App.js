import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";      // make sure file name + casing matches
import Sidebar from "./components/sidebar";    // same here
import Dashboard from "./pages/dashboard";     // must be `export default Dashboard` in Dashboard.jsx
import Monitoring from "./pages/monitoring";   // must be `export default Monitoring` in Monitoring.jsx
import Analytics from "./pages/analytics";
import WaterQuality from "./pages/water-quality";
import Alerts from "./pages/alerts";
import Team from "./pages/team";
import Reports from "./pages/reports";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Top header */}
        <Header />

        {/* Main layout: sidebar + content */}
        <div className="app-layout">
          <Sidebar />
          <main className="app-content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/water-quality" element={<WaterQuality />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/team" element={<Team />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
