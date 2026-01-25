import React from "react";
import { useNavigate } from "react-router-dom";


// components/Navbar.jsx
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full px-20 py-4 flex items-center justify-between bg-white shadow-sm">
      <span className="text-2xl font-bold">Hello, welcome</span>
      <div className="flex justify-center items-center gap-2">
      <img className="w-10" src="src\assets\images\logo.jpg" alt="" />
      <h1 className="text-3xl font-bold text-teal-700 cursor-pointer">
        HealthSetu
      </h1>
      </div>
      {/* Actions */}
      <div className="flex gap-4">
        <button
        onClick={() => navigate("/login")}
        className="bg-teal-600 text-white py-2 rounded-full cursor-pointer hover:bg-teal-700 px-10">
          Log in
        </button>
      </div>
    </nav>
  );
}
