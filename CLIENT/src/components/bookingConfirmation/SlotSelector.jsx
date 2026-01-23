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
  const [selectedSlot, setSelectedSlot] = useState(null);

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
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="font-semibold text-lg mb-4">
        Select Date & Time
      </h2>

      <div className="grid sm:grid-cols-3 gap-3">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => {
              setSelectedSlot(slot);
              onSelect?.(slot);
            }}
            className={`
              py-3 rounded-xl border text-sm font-medium
              transition cursor-pointer
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
    </div>
  );
}
