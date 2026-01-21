const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    adminUid: {
      type: String,
      required: true, // Firebase UID of hospital admin
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    totalMachines: {
      type: Number,
      required: true,
    },

    availableMachines: {
      type: Number,
      required: true,
    },

    costPerSession: {
      type: Number,
      required: true,
    },

    workingHours: {
      open: String, // "08:00"
      close: String, // "20:00"
    },

    rating: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Geo index for nearest search
hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);
