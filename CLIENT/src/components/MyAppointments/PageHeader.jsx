import { motion } from "framer-motion";

export default function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Appointments
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your upcoming and past dialysis sessions.
        </p>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0">
        <button className="px-4 py-2 border rounded-lg hover:border-blue-500 transition">
          ⚙ Filter
        </button>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Book New
        </button>
      </div>
    </motion.div>
  );
}
