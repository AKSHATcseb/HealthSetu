import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  upcoming: {
    label: "Upcoming",
    badge: "bg-teal-100 text-teal-700",
    ring: "ring-teal-200",
    animation: "animate-pulse",
  },
  pending: {
    label: "Payment Pending",
    badge: "bg-amber-100 text-amber-700",
    ring: "ring-amber-200",
    animation: "animate-pulse",
  },
};

export default function AppointmentCard({ status = "upcoming" }) {
  const navigate = useNavigate();
  const s = statusStyles[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
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
        <div className="flex-1 flex flex-col justify-between">
          <div>
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
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
            
            {/* 🔴 REVIEW & PAY (ONLY FOR PAYMENT PENDING) */}
            {status === "pending" && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/bookingconfirmation")}
                className="
                  px-6 py-2 rounded-full text-sm font-semibold
                  bg-teal-600 text-white
                  hover:bg-teal-700 transition
                "
              >
                Review & Pay
              </motion.button>
            )}

            {/* Update */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/bookingconfirmation")}
              className="
                px-6 py-2 rounded-full text-sm font-semibold
                border border-teal-600 text-teal-600
                hover:bg-teal-50 transition
              "
            >
              Update
            </motion.button>

            {/* Cancel */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => console.log("Cancel appointment")}
              className="
                px-6 py-2 rounded-full text-sm font-semibold
                border border-red-500 text-red-600
                hover:bg-red-50 transition
              "
            >
              Cancel appointment
            </motion.button>
          </div>
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
