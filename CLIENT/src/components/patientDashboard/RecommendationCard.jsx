import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function RecommendationCard() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-2xl p-6 flex gap-6
                 shadow-md hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
        alt="dialysis"
        className="w-40 object-cover rounded-xl"
      />

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">
            Sunrise Dialysis Center
          </h3>

          <span className="text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full">
            AVAILABLE TOMORROW
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          ⭐⭐⭐⭐⭐ <span className="text-gray-400">(128 reviews)</span>
        </p>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-3">
          <span>📍 2.4 km away</span>
          <span>💉 Hemodialysis</span>
          <span>💰 ₹1200 / session</span>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-4 justify-end">
          <motion.button
            onClick={() => navigate("/center/1")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-gray-200 rounded-lg
                       cursor-pointer transition font-medium"
          >
            View Details
          </motion.button>

          <motion.button
            onClick={() => {
              navigate("/bookappointment");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-20 py-2 bg-teal-600 text-white rounded-lg
                       cursor-pointer hover:bg-teal-700 transition font-medium"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
