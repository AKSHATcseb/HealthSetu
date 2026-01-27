import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-slate-50">

      <div className="mx-auto max-w-7xl px-8 pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl lg:text-6xl font-extrabold leading-tight text-slate-800"
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
            className="mt-6 max-w-xl text-lg text-slate-500 leading-relaxed"
          >
            Our AI helps you discover real-time availability, compare costs,
            and book trusted dialysis centers instantly — no waiting, just care.
          </motion.p>

          {/* SEARCH BAR */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
            className="mt-10 flex items-center bg-white rounded-2xl p-2 max-w-xl
                     shadow-lg border border-slate-200"
          >
            <input
              type="text"
              placeholder="Find affordable dialysis near me..."
              className="flex-1 px-4 py-3 text-slate-700 outline-none rounded-xl"
            />

            <button
              onClick={() => navigate("/bookappointment")}
              className="bg-teal-600 hover:bg-teal-700 transition
                       text-white px-7 py-3 rounded-xl font-semibold"
            >
              Search
            </button>
          </motion.div> */}

          {/* TRUST TAGS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-8 text-sm text-slate-500"
          >
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">
              ✔ Verified Centers
            </span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">
              ✔ Transparent Pricing
            </span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">
              ✔ Instant Booking
            </span>
          </motion.div>

        </div>

        {/* RIGHT VISUAL (OPTIONAL EMPTY FOR NOW) */}
        <div className="hidden lg:flex justify-center">
          <div className=" rounded-3xl bg-linear-to-br from-teal-100 to-emerald-100 flex items-center justify-center shadow-xl">
            <img src="../src/assets/images/hero.jpg" alt="" />
          </div>
        </div>

      </div>

    </section>
  );

}
