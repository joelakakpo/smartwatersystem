import React from 'react';
import '../index.css';

const members = [
  {
    name: 'Joel Akakpo',
    role: 'Administrator',
    email: 'joel.akakpo@aquamonitor.com',
    phone: '+1 234-567-8900',
    status: 'active',
  },
  {
    name: 'Hanif Chitou',
    role: 'Lead Engineer',
    email: 'hanif.chitou@aquamonitor.com',
    phone: '+1 234-567-8901',
    status: 'active',
  },
  {
    name: 'Michael Chen',
    role: 'Data Analyst',
    email: 'michael.chen@aquamonitor.com',
    phone: '+1 234-567-8902',
    status: 'active',
  },
  {
    name: 'Kwesi Crankson',
    role: 'Quality Specialist',
    email: 'kwesi.crankson@aquamonitor.com',
    phone: '+1 234-567-8903',
    status: 'offline',
  },
];

export default function TeamMembers() {
  return (
    <div className="team-container">
      <h2>Team Members</h2>
      <div className="cards">
        {members.map((member, index) => (
          <div key={index} className={`card ${member.status}`}>
            <h3>{member.name}</h3>
            <p><strong>Role:</strong> {member.role}</p>
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Phone:</strong> {member.phone}</p>
            <span className="status">{member.status}</span>
          </div>
        ))}
      </div>

      <div className="roles-section">
        <h3>Roles & Permissions</h3>
        <ul>
          <li><strong>Administrator:</strong> Full system access</li>
          <li><strong>Engineer:</strong> Technical configuration and monitoring</li>
        </ul>
      </div>
    </div>
  );
}
