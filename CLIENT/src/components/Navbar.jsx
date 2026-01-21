import React from "react";

// components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="w-full px-20 py-4 flex items-center justify-between bg-white shadow-sm">
      <div className="flex justify-center items-center gap-2">
      <img className="w-10" src="src\assets\images\logo.jpg" alt="" />
      <h1 className="text-2xl font-bold text-teal-700 cursor-pointer">
        HealthSetu
      </h1>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-8 text-gray-600">
        <li className="cursor-pointer hover:text-teal-600">Home</li>
        <li className="cursor-pointer hover:text-teal-600">Services</li>
        <li className="cursor-pointer hover:text-teal-600">Pricing</li>
        <li className="cursor-pointer hover:text-teal-600">About Us</li>
      </ul>

      {/* Actions */}
      <div className="flex gap-4">
        <button className="hidden sm:block text-gray-600 cursor-pointer hover:text-teal-600">
          Log in
        </button>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-teal-700">
          Get Started
        </button>
      </div>
    </nav>
  );
}
