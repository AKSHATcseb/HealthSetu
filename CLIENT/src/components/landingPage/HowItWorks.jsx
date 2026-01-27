import React from "react";

// components/HowItWorks.jsx
const steps = [
  {
    title: "AI Monitoring",
    desc: "Real-time tracking of health vitals and dialysis data.",
    icon: "📊",
  },
  {
    title: "Seamless Scheduling",
    desc: "Manage appointments, labs, and coordination.",
    icon: "📅",
  },
  {
    title: "Access Management",
    desc: "Specialized tracking and long-term visibility.",
    icon: "🔐",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-20 py-20 text-center bg-white">
      <h2 className="text-3xl md:text-4xl font-bold">
        How It <span className="text-teal-600">Works</span>
      </h2>

      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
        Our platform simplifies dialysis management into three intuitive,
        patient-friendly steps.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8 ">
        {steps.map((step, i) => (
          <div
            key={i}
            className="
              bg-green-50 p-8 rounded-2xl
              cursor-pointer
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl
            "
          >
            <div className="text-4xl mb-4">{step.icon}</div>

            <h3 className="text-xl font-semibold text-gray-800">
              {step.title}
            </h3>

            <p className="mt-2 text-gray-600 leading-relaxed">
              {step.desc}
            </p>

            <div className="mt-4 h-1 w-12 mx-auto bg-teal-600 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
