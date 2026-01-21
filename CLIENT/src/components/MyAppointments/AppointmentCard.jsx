import React from "react";

const statusStyles = {
  upcoming: {
    label: "Upcoming",
    badge: "bg-teal-100 text-teal-700",
    ring: "ring-teal-200",
    animation: "animate-pulse",
  },
  pending: {
    label: "Pending Confirmation",
    badge: "bg-amber-100 text-amber-700",
    ring: "ring-amber-200",
    animation: "animate-pulse",
  },
};

export default function AppointmentCard({
  status = "upcoming",
}) {
  const s = statusStyles[status];

  return (
    <div
      className={`
       my-5 bg-white rounded-3xl p-6
        flex flex-col lg:flex-row gap-6
        shadow-md ring-1 ${s.ring}
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      `}
    >
      {/* LEFT CONTENT */}
      <div className="flex-1">
        {/* Status Badges */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`
              px-4 py-1 rounded-full text-sm font-semibold
              ${s.badge} ${s.animation}
            `}
          >
            {s.label}
          </span>

          <span className="px-3 py-1 rounded-full text-sm bg-teal-50 text-teal-600">
            🤖 AI Scheduled
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">
          Apollo Dialysis Center
        </h2>

        {/* Details */}
        <div className="mt-4 space-y-2 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            📅 <span>Oct 24, 2023</span>
          </div>

          <div className="flex items-center gap-2">
            ⏰ <span>09:00 AM</span>
          </div>

          <div className="flex items-center gap-2">
            📍 <span>123 Health Ave, New York, NY10001</span>
          </div>
        </div>

        {/* Action */}
        <button
          className="
            mt-6 inline-flex items-center gap-2
            bg-teal-600 text-white px-6 py-2.5 rounded-full
            font-medium cursor-pointer
            transition-all duration-300
            hover:bg-teal-700 hover:scale-105
            active:scale-95
          "
        >
          View Details →
        </button>
      </div>

      {/* MAP PREVIEW */}
      <div className="w-full lg:w-80 h-48 rounded-2xl overflow-hidden border">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26604.674007382077!2d77.12799016065016!3d28.72860421432223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01ea1adeaa4d%3A0x6adf0aec6fc00a2c!2sJahangirpuri%2C%20Delhi%2C%20India!5e1!3m2!1sen!2sus!4v1769014323597!5m2!1sen!2sus"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
