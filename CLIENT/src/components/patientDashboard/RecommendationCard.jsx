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
    <div className="space-y-8">

      {centers.map((center) => (
        <motion.div
          key={center._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 flex flex-col md:flex-row gap-6
                   border border-slate-200 shadow-lg hover:shadow-2xl transition"
        >

          {/* IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
            alt="Dialysis Center"
            className="w-full md:w-48 h-40 md:h-36 object-cover rounded-2xl"
          />

          {/* CONTENT */}
          <div className="flex-1 flex flex-col justify-between">

            <div>

              <div className="flex justify-between items-start">

                <h3 className="text-2xl font-bold text-slate-800">
                  {center.name}
                </h3>

                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Active
                </span>

              </div>

              {/* ADDRESS */}
              <div className="mt-3 text-sm text-slate-500 flex flex-wrap gap-1 leading-relaxed">

                <span>📍</span>
                <span>{center.address.street},</span>
                <span>{center.address.city},</span>
                <span>{center.address.state},</span>
                <span>{center.address.pincode}</span>

              </div>

            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-4">

              <motion.button
                onClick={() => navigate(`/center/${center._id}`)}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200
                         text-slate-700 font-medium transition"
              >
                View Details
              </motion.button>

              {/* Keep booking disabled as before */}

            </div>

          </div>
        </motion.div>
      ))}

    </div>
  );

}
