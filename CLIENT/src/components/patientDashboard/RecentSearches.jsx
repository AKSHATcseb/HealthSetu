import React from "react";

export default function RecentSearches() {
  const searches = [
    "Dialysis near me under...",
    "NephroPlus Dadar availability",
    "Weekend appointments",
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-bold mb-4">Recent Searches</h3>

      <ul className="space-y-3 text-sm text-gray-600">
        {searches.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            🔍 {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
