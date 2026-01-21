export default function ClinicHeader() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      {/* LEFT */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
            🤖 Recommended by AI
          </span>
          <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            ⭐ 4.8 (210 Reviews)
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900">
          City Care Dialysis Center
        </h1>

        <p className="mt-2 text-gray-600">
          📍 123 Health Ave, Andheri West, Mumbai
          <span className="ml-2 text-teal-600 cursor-pointer">
            View on Map
          </span>
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>24/7 Service</span>
          <span>Nephrologist On-Call</span>
          <span>Wheelchair Access</span>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="rounded-3xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
          alt="clinic"
          className="w-full h-64 object-cover"
        />
      </div>
    </div>
  );
}
