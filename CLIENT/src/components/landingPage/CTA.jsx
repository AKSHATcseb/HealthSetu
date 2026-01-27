import React from "react";
import { useNavigate } from "react-router-dom";

// components/CTA.jsx
export default function CTA() {
  const navigate = useNavigate()
  return (
    <section className="py-20 px-20">
      <div
        className="
          bg-linear-to-r from-teal-600 to-teal-700
          rounded-3xl text-white py-10 md:p-14
          text-center
          shadow-xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to transform your dialysis care?
        </h2>

        <p className="mt-3 text-teal-100 max-w-2xl mx-auto">
          Join thousands of families managing care with confidence using
          AI-powered monitoring and coordination.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {/* Primary CTA */}
          <button
          onClick={() => navigate("/dashboard")}
            className="
              bg-white text-teal-700 px-8 py-3 rounded-full
              font-semibold
              cursor-pointer
              transition-all duration-300
              hover:bg-teal-50 hover:scale-105 hover:shadow-lg
              active:scale-95
            "
          >
            Get Started Now
          </button>

          {/* Secondary CTA */}
          <button
            className="
              border border-white px-8 py-3 rounded-full
              font-semibold
              cursor-pointer
              transition-all duration-300
              hover:bg-white hover:text-teal-700
              active:scale-95
            "
          >
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
}
