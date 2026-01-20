import React from "react";

// components/Hero.jsx
export default function Hero() {
  return (
    <section className="px-20 py-16 grid md:grid-cols-2 gap-6 items-center bg-green-50">
      <div className="">
        <span className="text-sm bg-teal-100 text-teal-600 px-3 py-1 rounded-full cursor-pointer">
          ⚡ Powered by Care-AI
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
          AI-Powered Dialysis Care <br />
          at Your <span className="text-teal-600">Fingertips</span>
        </h1>

        <p className="mt-4 text-gray-600 max-w-lg">
          Revolutionizing dialysis management with proactive monitoring
          and seamless care coordination designed for patients and families.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          {/* Primary CTA */}
          <button
            className="
              bg-teal-600 text-white px-6 py-3 rounded-full
              cursor-pointer
              transition-all duration-300
              hover:bg-teal-700 hover:scale-105 hover:shadow-lg
              active:scale-95
            "
          >
            Start Free Trial
          </button>

          {/* Secondary CTA */}
          <button
            className="
              border border-gray-300 px-6 py-3 rounded-full
              cursor-pointer
              transition-all duration-300
              hover:bg-gray-100 hover:border-teal-600 hover:text-teal-600
              active:scale-95
            "
          >
            See how it works
          </button>
        </div>
      </div>

      <img
        src="../../src/assets/images/hero.jpg"
        alt="Care"
        className="rounded-2xl shadow-lg w-full"
      />
    </section>
  );
}
