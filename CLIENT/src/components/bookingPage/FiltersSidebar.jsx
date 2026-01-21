import { useState } from "react";

export default function FiltersSidebar({ onChange }) {
  const [filters, setFilters] = useState({
    availableOnly: true,
    date: "2023-10-05",
    distance: 5,
    price: 1500,
  });

  const update = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange?.(updated);
  };

  const resetFilters = () => {
    const reset = {
      availableOnly: true,
      date: "",
      distance: 5,
      price: 1500,
    };
    setFilters(reset);
    onChange?.(reset);
  };

  return (
    <aside className="w-full lg:w-80  rounded-3xl p-5 sticky top-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          ☰ Filters
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-teal-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Availability */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">
              Availability
            </p>
            <p className="text-xs text-gray-400">
              Show available only
            </p>
          </div>

          <button
            onClick={() =>
              update("availableOnly", !filters.availableOnly)
            }
            className={`
              w-12 h-7 rounded-full transition
              ${
                filters.availableOnly
                  ? "bg-teal-600"
                  : "bg-gray-300"
              }
            `}
          >
            <div
              className={`
                w-5 h-5 bg-white rounded-full shadow
                transition-transform
                ${
                  filters.availableOnly
                    ? "translate-x-6"
                    : "translate-x-1"
                }
              `}
            />
          </button>
        </div>
      </div>

      {/* Select Date (UI Only) */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <p className="font-medium text-gray-800 mb-3">
          Select Date
        </p>

        <div className="flex justify-between items-center text-sm mb-3">
          <button className="text-gray-400">‹</button>
          <span className="font-semibold">October 2023</span>
          <button className="text-gray-400">›</button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <span key={d} className="text-gray-400">
              {d}
            </span>
          ))}

          {[...Array(30)].map((_, i) => {
            const day = i + 1;
            const selected = day === 5;

            return (
              <button
                key={day}
                onClick={() =>
                  update("date", `2023-10-${day}`)
                }
                className={`
                  w-8 h-8 rounded-full text-sm
                  ${
                    selected
                      ? "bg-teal-600 text-white"
                      : "text-gray-600 hover:bg-teal-50"
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Distance */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <div className="flex justify-between mb-2">
          <p className="font-medium text-gray-800">
            Max Distance
          </p>
          <span className="text-sm bg-teal-50 text-teal-700 px-2 py-0.5 rounded-lg">
            {filters.distance} km
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="50"
          value={filters.distance}
          onChange={(e) =>
            update("distance", Number(e.target.value))
          }
          className="w-full accent-teal-600"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 km</span>
          <span>50 km</span>
        </div>
      </div>

      {/* Price */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between mb-2">
          <p className="font-medium text-gray-800">
            Max Price
          </p>
          <span className="text-sm bg-teal-50 text-teal-700 px-2 py-0.5 rounded-lg">
            ₹{filters.price}
          </span>
        </div>

        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={filters.price}
          onChange={(e) =>
            update("price", Number(e.target.value))
          }
          className="w-full accent-teal-600"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹500</span>
          <span>₹5000+</span>
        </div>
      </div>
    </aside>
  );
}
