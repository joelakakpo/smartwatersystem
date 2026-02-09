
import React from "react";
import "./header.css";

function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="top-left-brand" role="banner" aria-label="AquaGuard">
      <div className="brand-link">
        <div className="brand-icon" aria-hidden="true">
          {/* SVG logo with viewBox for proper scaling */}
          <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 70 70"
  preserveAspectRatio="xMidYMid meet"
  className="brand-icon-svg"
>

          
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#0ea5c9" />
                <stop offset="1" stopColor="#0369a1" />
              </linearGradient>
              <filter id="s" x="-20%" y="-20%" width="1190%" height="190%">
                <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.12" />
              </filter>
            </defs>
            <g filter="url(#s)">
              <path
                fill="url(#g1)"
                d="M32 4s14 12 14 20a14 14 0 1 1-28 0C18 16 32 4 32 4z"
              />
              <circle cx="32" cy="36" r="4" fill="#a7f3d0" opacity="0.95" />
            </g>
          </svg>
        </div>

        <div className="brand-text">
          <div className="brand-title">AquaGuard Ghana Water</div>
          <div className="brand-subtitle">
            Real-time monitoring and water quality detection
          </div>
        </div>
      </div> 

      <div className="header-right">
        <div className="brand-date">{formattedDate}</div>
        <div className="profile-block">
          <div className="profile-icon">DJA</div>
          <div className="profile-text">
            <div className="profile-name">Dr. Joel Akakpo</div>
            <div className="profile-role">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}


export default Header;
