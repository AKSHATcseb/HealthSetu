import React from "react";

export default function HeroSearch() {
  return (
    <section className="px-8 py-14 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="text-5xl font-extrabold leading-tight">
          Find Dialysis Nearby,
          <span className="text-teal-600 block">Fast & Affordable</span>
        </h1>

        <p className="text-gray-500 mt-4 max-w-xl">
          Our AI helps you navigate availability, compare prices, and book
          the best care in seconds. No waiting, just care.
        </p>

        <div className="mt-8 flex items-center bg-white shadow-lg rounded-xl p-2 max-w-xl">
          <input
            type="text"
            placeholder="I need dialysis tomorrow, cheap and nearby..."
            className="flex-1 px-4 py-3 outline-none"
          />
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg">
            Search →
          </button>
        </div>
      </div>
    </section>
  );
}
