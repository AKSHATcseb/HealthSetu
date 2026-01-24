import { useState, useMemo } from "react";

/* Utility: format minutes → 12hr time */
function formatTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hour12 = h % 12 || 12;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

/* Utility: HH:MM → minutes */
function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export default function SlotSelector({
  openingTime = "09:00",
  closingTime = "17:00",
  slotDuration = 60,
  onSelect,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const categories = [
    "General Dialysis (4 hrs)",
    "Extended Dialysis (6 hrs)",
    "Emergency Dialysis",
  ];

  /* Generate slots only once */
  const slots = useMemo(() => {
    const start = toMinutes(openingTime);
    const end = toMinutes(closingTime);

    const result = [];
    for (let t = start; t + slotDuration <= end; t += slotDuration) {
      result.push(formatTime(t));
    }
    return result;
  }, [openingTime, closingTime, slotDuration]);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-6">
      {/* Category Selection */}
      <div>
        <h2 className="font-semibold text-lg mb-4">
          Select Category
        </h2>

        <div className="grid sm:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSlot(null); // reset slot
              }}
              className={`
                py-3 rounded-xl bg-gray-200 text-sm font-medium transition
                ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white border-teal-600"
                    : "hover:border-teal-600 hover:bg-teal-50"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div>
        <h2 className="font-semibold text-lg mb-4">
          Select Time Slot
        </h2>

        {!selectedCategory ? (
          <p className="text-sm text-gray-500">
            Please select a patient category first.
          </p>
        ) : (
          <div className="grid sm:grid-cols-3 gap-3">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => {
                  setSelectedSlot(slot);
                  onSelect?.({
                    category: selectedCategory,
                    time: slot,
                  });
                }}
                className={`
                  py-3 rounded-xl border text-sm font-medium transition
                  ${
                    selectedSlot === slot
                      ? "bg-teal-600 text-white border-teal-600"
                      : "hover:border-teal-600 hover:bg-teal-50"
                  }
                `}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
