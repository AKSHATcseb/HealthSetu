import React from "react";
import { motion } from "framer-motion";

export default function RecommendationCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
        bg-white rounded-3xl p-5
        flex gap-6 mt-5 mr-5 items-center
        shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)]
      "
        >
            {/* LEFT: Image */}
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
                    alt="dialysis"
                    className="w-40 h-40 object-cover rounded-2xl"
                />

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-lg text-sm font-semibold shadow">
                    ⭐ 4.5
                </div>
            </div>

            {/* RIGHT: Content */}
            <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            City Health Dialysis
                            <span className="text-teal-600 text-sm">✔</span>
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                            📍 Sector 45, Gurgaon
                        </p>
                    </div>

                    <span className="text-sm bg-gray-100 text-gray-700 px-4 py-1 rounded-full">
                        Next Available: Oct 7
                    </span>
                </div>

                {/* Stats */}
                <div className="flex gap-20 mt-4 text-sm">
                    <div>
                        <p className="text-gray-400 uppercase text-xs">Distance</p>
                        <p className="font-semibold text-gray-800 text-xl">4.2 km</p>
                    </div>

                    <div>
                        <p className="text-gray-400 uppercase text-xs">Price</p>
                        <p className="font-semibold text-teal-700 text-xl">
                            ₹1,450 <span className="text-gray-400 font-normal text-sm ">/ session</span>
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-400 uppercase text-xs">Reviews</p>
                        <p className="font-semibold text-gray-800 text-xl">
                            120+ <span className="text-gray-400 text-sm">(Verified)</span>
                        </p>
                    </div>
                </div>

                {/* Info Pill */}
                <div className="flex justify-between items-center my-2">
                    <div className="mt-4 inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm">
                        👍 Highly rated by users over 60 years old
                    </div>
                    <div className="flex justify-center items-center gap-5">
                        <div className="flex items-end">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="
            px-6 py-3 rounded-xl
            border border-gray-300
            text-gray-700 font-medium
            transition
            hover:border-teal-500 hover:text-teal-600
          "
                            >
                                View Details
                            </motion.button>
                        </div>
                        <div className="flex items-end">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className=" 
            px-6 py-3 rounded-xl
            text-white bg-teal-600 font-medium
            transition
            hover:border-teal-800 hover:text-white
          "
                            >
                                Book Visit
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ACTION */}

        </motion.div>
    );
}
