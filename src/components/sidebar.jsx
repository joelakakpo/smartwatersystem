import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaTools, FaChartLine, FaTint, FaBell, FaFileAlt, FaUsers } from "react-icons/fa";
import "./sidebar.css";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { label: "Monitoring", icon: <FaTools />, path: "/monitoring" },
  { label: "Analytics", icon: <FaChartLine />, path: "/analytics" },
  { label: "Water Quality", icon: <FaTint />, path: "/water-quality" },
  { label: "Alerts", icon: <FaBell />, path: "/alerts" },
  { label: "Reports", icon: <FaFileAlt />, path: "/reports" },
  { label: "Team", icon: <FaUsers />, path: "/team" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
