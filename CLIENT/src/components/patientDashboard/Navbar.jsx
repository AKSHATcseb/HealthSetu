import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
      <h1 className="text-xl font-bold text-teal-700">HealthSetu</h1>

      <div className="flex gap-8 text-gray-600 font-medium">
        <span className="text-teal-700 border-b-2 border-teal-700">
          Dashboard
        </span>
        <span>Appointments</span>
        <span>Profile</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-500">🔔</button>
        <button className="px-4 py-2 border rounded-lg">Logout</button>
      </div>
    </nav>
  );
}
