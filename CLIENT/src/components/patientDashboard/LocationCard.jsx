import React from "react";

export default function LocationCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center">
        📍 Mumbai, India
      </div>
      <p className="text-sm text-gray-500 mt-3">
        12 Centers nearby
      </p>
      <button className="text-teal-600 text-sm mt-2">
        View Map →
      </button>
    </div>
  );
}
