const express = require("express");
const Appointment = require("../models/Appointment");
const Hospital = require("../models/Hospital");

const router = express.Router();

/**
 * ✅ CHECK HOSPITAL SLOT AVAILABILITY
 * GET /api/hospitals/:hospitalId/availability?date=2026-02-12
 */
router.get("/:hospitalId/availability", async (req, res) => {
  try {
    const { date } = req.query;
    const hospitalId = req.params.hospitalId;

    // ✅ Date required
    if (!date) {
      return res.status(400).json({
        message: "Date is required in query (?date=YYYY-MM-DD)",
      });
    }

    // ✅ Find hospital
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found",
      });
    }

    // ✅ Define full day range
    const dayStart = new Date(`${date}T00:00:00.000Z`);
    const dayEnd = new Date(`${date}T23:59:59.999Z`);

    // ✅ Get all booked appointments for that day
    const bookedAppointments = await Appointment.find({
      hospitalId,
      status: "booked",
      startTime: { $gte: dayStart, $lte: dayEnd },
    }).select("startTime endTime durationHours");

    // ✅ Calculate availability count
    const availableMachines =
      hospital.totalMachines - bookedAppointments.length;

    res.json({
      hospital: {
        id: hospital._id,
        name: hospital.name,
      },

      date,

      totalMachines: hospital.totalMachines,

      bookedAppointments: bookedAppointments.length,

      availableMachines: availableMachines > 0 ? availableMachines : 0,

      bookedSlots: bookedAppointments.map((a) => ({
        startTime: a.startTime,
        endTime: a.endTime,
        durationHours: a.durationHours,
      })),
    });
  } catch (err) {
    res.status(500).json({
      message: "Availability check failed",
      error: err.message,
    });
  }
});

module.exports = router;
