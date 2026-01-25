import { useState } from "react";

export default function FiltersSidebar({ onChange }) {

  const [filters, setFilters] = useState({
    date: "",              // 👈 mandatory first
    availableOnly: true,
    distance: 5,
    price: 1500,
  });

  const update = (key, value) => {

    // 🚫 Block other filters if date not chosen
    if (key !== "date" && !filters.date) return;

    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange?.(updated);
  };

  const resetFilters = () => {
    const reset = {
      date: "",
      availableOnly: true,
      distance: 5,
      price: 1500,
    };
    setFilters(reset);
    onChange?.(reset);
  };

  const dateChosen = Boolean(filters.date);

  return (
    <aside className="w-full lg:w-80 rounded-3xl p-5 sticky top-24">

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

      {/* DATE (MANDATORY) */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border-2 border-teal-500">

        <p className="font-medium text-gray-800 mb-3">
          Select Appointment Date *
        </p>

        <div className="grid grid-cols-7 gap-2 text-xs text-center">

          {[...Array(30)].map((_, i) => {
            const day = i + 1;
            const selected =
              filters.date === `2023-10-${day.toString().padStart(2, "0")}`;

            return (
              <button
                key={day}
                onClick={() =>
                  update(
                    "date",
                    `2023-10-${day.toString().padStart(2, "0")}`
                  )
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

        {!dateChosen && (
          <p className="text-xs text-red-500 mt-2">
            Please select a date to see available hospitals
          </p>
        )}
      </div>

      {/* AVAILABILITY */}
      <div
        className={`bg-white rounded-2xl p-4 mb-4 shadow-sm transition
          ${!dateChosen ? "opacity-40 pointer-events-none" : ""}
        `}
      >
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
            className={`w-12 h-7 rounded-full
              ${filters.availableOnly ? "bg-teal-600" : "bg-gray-300"}
            `}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform
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

      {/* DISTANCE */}
      <div
        className={`bg-white rounded-2xl p-4 mb-4 shadow-sm transition
          ${!dateChosen ? "opacity-40 pointer-events-none" : ""}
        `}
      >
        <div className="flex justify-between mb-2">
          <p className="font-medium text-gray-800">
            Max Distance
          </p>
          <span className="text-sm bg-teal-50 text-teal-700 px-2 rounded-lg">
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
      </div>

      {/* PRICE */}
      <div
        className={`bg-white rounded-2xl p-4 shadow-sm transition
          ${!dateChosen ? "opacity-40 pointer-events-none" : ""}
        `}
      >
        <div className="flex justify-between mb-2">
          <p className="font-medium text-gray-800">
            Max Price
          </p>
          <span className="text-sm bg-teal-50 text-teal-700 px-2 rounded-lg">
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
      </div>

    </aside>
  );
}
