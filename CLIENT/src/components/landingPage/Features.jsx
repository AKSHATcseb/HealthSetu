import React from "react";

// components/Features.jsx
const features = [
  {
    title: "24/7 AI Assistance",
    desc: "Instant answers and treatment guidance anytime with our medical AI agent.",
    img: "../../src/assets/images/hero.jpg",
  },
  {
    title: "High Accessibility",
    desc: "Large touch targets and high-contrast design tailored for seniors.",
    img: "../../src/assets/images/hero.jpg",
  },
  {
    title: "Clinician-Backed",
    desc: "Insights and monitoring protocols developed with nephrologists.",
    img: "../../src/assets/images/hero.jpg",
  },
];

export default function Features() {
  return (
    <section className="px-20 py-20 bg-teal-50 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Patient-Centric{" "}
          <span className="text-teal-600">Features</span>
        </h2>

        <span className="
          text-teal-600 font-medium cursor-pointer
          transition-all duration-300
          hover:underline hover:translate-x-1
        ">
          Explore all features →
        </span>
      </div>

      {/* Cards */}
      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="
              bg-white rounded-2xl overflow-hidden
              cursor-pointer
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl
            "
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {feature.desc}
              </p>

              <div className="mt-4 h-1 w-12 bg-teal-600 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
