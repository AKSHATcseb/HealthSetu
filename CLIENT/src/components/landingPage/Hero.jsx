import React from "react";
import { useNavigate } from "react-router-dom";

// components/Hero.jsx
export default function Hero() {
  const navigate = useNavigate();
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
      </div>

      <img
        src="../../src/assets/images/hero.jpg"
        alt="Care"
        className="rounded-2xl shadow-lg w-full"
      />
    </section>
  );
}
