import React from "react";

export default function Filters() {
  return (
    <div className="flex gap-4 px-8 mt-2">
      {["Any Date", "Within 5km", "Under ₹2000"].map((item) => (
        <button
          key={item}
          className="px-4 py-2 border rounded-full text-sm text-gray-600"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
