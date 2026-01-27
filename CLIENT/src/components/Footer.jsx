import React from 'react'

// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="px-20 py-10 text-sm text-gray-500 bg-white">
      <div className="grid md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold text-teal-600">HealthSetu</h3>
          <p>Empowering dialysis patients with AI-driven care.</p>
        </div>

        <div>
          <h4 className="font-semibold">Product</h4>
          <p>Features</p>
          <p>AI Monitoring</p>
          <p>Pricing</p>
        </div>

        <div>
          <h4 className="font-semibold">Company</h4>
          <p>About</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>

        <div>
          <h4 className="font-semibold">Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>

      <p className="mt-6 text-center">
        © 2026 HealthSetu. All rights reserved.
      </p>
    </footer>
  );
}
