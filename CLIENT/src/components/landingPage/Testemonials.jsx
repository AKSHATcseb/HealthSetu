import React from 'react'

// components/Testimonials.jsx
export default function Testimonials() {
  return (
    <section className="px-20 py-16 text-center bg-white">
      <h2 className="text-3xl font-bold">Trusted by Families</h2>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {[
          "HealthSetu has given my family peace of mind.",
          "Simple, readable, and incredibly helpful."
        ].map((text, i) => (
          <div key={i} className="bg-teal-50 p-6 rounded-xl shadow">
            <p className="italic text-gray-700">“{text}”</p>
            <p className="mt-3 font-semibold">★★★★★</p>
          </div>
        ))}
      </div>
    </section>
  );
}

