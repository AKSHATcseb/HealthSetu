import React, { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("Dashboard");

  const navItems = ["Dashboard", "Appointments", "Profile"];

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-teal-100 bg-white font-Outfit">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-teal-700 cursor-pointer">
        HealthSetu
      </h1>

      {/* Navigation */}
      <div className="flex gap-8 text-gray-600 font-medium">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`pb-1 transition-all cursor-pointer
              ${
                active === item
                  ? "text-teal-700 border-b-2 border-teal-700"
                  : "hover:text-teal-600"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500 cursor-pointer hover:text-teal-600 transition">
          🔔
        </button>
        <button className="px-4 py-2 border rounded-lg cursor-pointer hover:border-teal-600 hover:text-teal-600 transition">
          Logout
        </button>
      </div>
    </nav>
  );
}
