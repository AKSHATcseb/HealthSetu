import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="w-full">
      <div className=" mx-auto px-10 pt-16 pb-12">
        
        {/* 2/3 width container */}
        <div className="w-full lg:w-2/3">
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-extrabold leading-tight"
          >
            Find Dialysis Nearby.
            <span className="text-teal-600 block">
              Fast & Affordable
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 mt-5 max-w-xl"
          >
            Our AI helps you navigate availability, compare prices, and
            book the best care in seconds. No waiting, just care.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
            className="mt-8 flex items-center bg-white rounded-2xl p-2 max-w-xl
                       shadow-[0_10px_35px_rgba(13,148,136,0.35)]"
          >
            <input
              type="text"
              placeholder="I need dialysis tomorrow, cheap and nearby..."
              className="flex-1 px-4 py-3 text-gray-700 outline-none"
            />
            <button
            onClick={() => navigate("/bookappointment")}
            className="bg-teal-600 hover:bg-teal-700 transition-all
                               text-white px-6 py-3 rounded-xl font-medium">
              Search →
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
