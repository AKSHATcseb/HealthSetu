import React from "react";

export default function RecommendationCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex gap-6">
      <img
        src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
        alt="dialysis"
        className="w-40 h-28 object-cover rounded-xl"
      />

      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Sunrise Dialysis Center</h3>
          <span className="text-green-600 text-sm font-medium">
            AVAILABLE TOMORROW
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">⭐⭐⭐⭐⭐ (128 reviews)</p>

        <div className="flex gap-6 text-sm text-gray-600 mt-3">
          <span>📍 2.4 km away</span>
          <span>💉 Hemodialysis</span>
          <span>💰 ₹1200 / session</span>
        </div>

        <div className="mt-5 flex gap-4">
          <button className="px-4 py-2 border rounded-lg">
            View Details
          </button>
          <button className="px-5 py-2 bg-teal-600 text-white rounded-lg">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
