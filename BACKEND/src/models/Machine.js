const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    machineNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "in_use", "maintenance"],
      default: "available",
    },

    lastServicedOn: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Machine", machineSchema);
