import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/myappointments" },
    { name: "Booking", path: "/bookappointment" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="flex items-center justify-between px-12 py-4 border-b border-teal-100 bg-white font-Outfit">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img
          className="w-10"
          src="/src/assets/images/logo.jpg"
          alt="HealthSetu"
        />
        <h1 className="text-2xl font-bold text-teal-700">
          HealthSetu
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex gap-8 text-gray-600 font-medium">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `pb-1 transition-all cursor-pointer ${
                isActive
                  ? "text-teal-700 border-b-2 border-teal-700"
                  : "hover:text-teal-600"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500 cursor-pointer hover:text-teal-600 transition">
          🔔
        </button>

        <button
          onClick={() => navigate("/logout")}
          className="px-4 py-2 border rounded-lg cursor-pointer hover:border-teal-600 hover:text-teal-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
