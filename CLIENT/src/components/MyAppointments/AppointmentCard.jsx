import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // start below
      animate={{ opacity: 1, y: 0 }}    // move up into place
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
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
          src="https://maps.google.com/maps?q=28.728604,77.127990&z=15&output=embed"
          className="w-full h-full"
        />
      </div>
    </div>
  </motion.div>
  );
}
