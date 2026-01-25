const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    /**
     * Patient booking dialysis
     */
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /**
     * Hospital selected
     */
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    /**
     * Machine assigned (when session starts)
     */
    machineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      default: null,
    },

    /**
     * Appointment Date
     */
    appointmentDate: {
      type: Date,
      required: true,
    },

    /**
     * Duration in Hours (4 or 6)
     */
    durationHours: {
      type: Number,
      enum: [4, 6],
      required: true,
    },

    /**
     * Start Time (Dynamic)
     * Example: "08:00"
     */
    startTime: {
      type: String,
      required: true,
    },

    /**
     * End Time (Auto Calculated)
     * Example: "12:00"
     */
    endTime: {
      type: String,
      required: true,
    },

    /**
     * Appointment Status
     */
    status: {
      type: String,
      enum: ["reserved", "active", "completed", "cancelled", "expired"],
      default: "reserved",
    },

    /**
     * Payment Tracking
     */
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    amount: {
      type: Number,
      required: true,
    },

    /**
     * Emergency booking
     */
    isEmergency: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
