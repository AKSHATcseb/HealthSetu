import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecommendationCard() {

  const navigate = useNavigate();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/hospitals");

        // top 4 only
        setCenters(res.data.slice(0, 4));

      } catch (err) {
        console.error("Failed to fetch hospitals", err);
        setCenters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  // ⏳ Loading
  if (loading) {
    return (
      <p className="text-gray-500 text-center">
        Loading recommendations...
      </p>
    );
  }

  // ❌ No hospitals available
  if (centers.length === 0) {
    return (
      <div className="bg-white rounded-xl p-10 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Hospitals Available
        </h3>
        <p className="text-gray-500">
          Please check back later.
        </p>
      </div>
    );
  }

  // ✅ Show hospitals
  return (
    <div className="space-y-6">

      {centers.map((center) => (
        <motion.div
          key={center._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white rounded-2xl p-6 flex gap-6
                     shadow-md hover:shadow-xl transition-shadow"
        >

          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
            alt="dialysis"
            className="w-40 object-cover rounded-xl"
          />

          <div className="flex-1">

            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-900">
                {center.centerName}
              </h3>

              <span className="text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full">
                ACTIVE
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-3">
              <span>📍 {center.location}</span>
            </div>

            <div className="mt-5 flex gap-4 justify-end">

              <motion.button
                onClick={() => navigate(`/center/${center._id}`)}
                className="px-5 py-2 bg-gray-200 rounded-lg font-medium"
              >
                View Details
              </motion.button>

              <motion.button
                onClick={() => navigate(`/center/${center._id}/bookappointment`)}
                className="px-10 py-2 bg-teal-600 text-white rounded-lg font-medium"
              >
                Book Now
              </motion.button>

            </div>
          </div>
        </motion.div>
      ))}

    </div>
  );
}
