import { motion } from "framer-motion";

export default function AppointmentCard({
  status,
  ai,
  name,
  date,
  time,
  location,
  map,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow p-6 flex flex-col lg:flex-row gap-6"
    >
      {/* Left Content */}
      <div className="flex-1">
        <div className="flex flex-wrap gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${status === "Confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"}
          `}>
            {status}
          </span>

          {ai && (
            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
              🤖 AI Scheduled
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900">
          {name}
        </h3>

        <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
          <div>📅 {date}</div>
          <div>⏰ {time}</div>
          {location && <div className="sm:col-span-2">📍 {location}</div>}
        </div>

        <div className="mt-6">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            View Details →
          </button>
        </div>
      </div>

      {/* Map */}
      {map && (
        <div className="w-full lg:w-72 h-48 rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            loading="lazy"
            src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      )}
    </motion.div>
  );
}
