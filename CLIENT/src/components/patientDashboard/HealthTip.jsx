import React from "react";

export default function HealthTip() {
  return (
    <div className="bg-teal-700 text-white rounded-2xl p-6">
      <h4 className="font-bold mb-2">💡 Health Tip</h4>
      <p className="text-sm opacity-90">
        Staying within your fluid allowance helps keep your heart healthy
        between dialysis sessions.
      </p>

      <button className="mt-4 bg-white text-teal-700 px-4 py-2 rounded-lg">
        View Daily Guidelines
      </button>
    </div>
  );
}
