const express = require("express");

const verifyFirebaseToken = require("../middleware/auth.middleware");
const { isPatient, isHospitalAdmin } = require("../middleware/role.middleware");

const Appointment = require("../models/Appointment");
const Machine = require("../models/Machine");
const Hospital = require("../models/Hospital");
const User = require("../models/User");

const { calculateEndTime, timeToMinutes } = require("../utils/time.util");

const router = express.Router();

/**
 * ✅ PATIENT BOOK APPOINTMENT (Dynamic Time)
 * POST /api/appointments/book
 */
router.post("/book", verifyFirebaseToken, isPatient, async (req, res) => {
  try {
    const { hospitalId, appointmentDate, startTime, durationHours, isEmergency } = req.body;

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Auto calculate amount
    let amount = 0;

    if (durationHours === 4) {
      amount = hospital.costPerSession4h;
    }

    if (durationHours === 6) {
      amount = hospital.costPerSession6h;
    }

    if (isEmergency) {
      amount = hospital.emergencyCostPerSession;
    }


    // Validate duration
    if (![4, 6].includes(durationHours)) {
      return res.status(400).json({ message: "Duration must be 4 or 6 hours" });
    }

    // Calculate end time
    const endTime = calculateEndTime(startTime, durationHours);

    // Find patient
    const patient = await User.findOne({ firebaseUid: req.user.uid });

    // Get all machines in hospital
    const machines = await Machine.find({
      hospitalId,
      status: "available",
    });

    if (machines.length === 0) {
      return res.status(400).json({ message: "No machines available" });
    }

    // Convert booking time range to minutes
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    let assignedMachine = null;

    // Machine allocation with overlap checking
    for (let machine of machines) {
      const existingAppointments = await Appointment.find({
        machineId: machine._id,
        appointmentDate: new Date(appointmentDate),
        status: { $in: ["reserved", "active"] },
      });

      let overlap = false;

      for (let appt of existingAppointments) {
        const existingStart = timeToMinutes(appt.startTime);
        const existingEnd = timeToMinutes(appt.endTime);

        // Overlap Condition
        if (newStart < existingEnd && newEnd > existingStart) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        assignedMachine = machine;
        break;
      }
    }

    if (!assignedMachine) {
      return res.status(400).json({
        message: "No machine available for this time range",
      });
    }

    // Create Appointment (RESERVED)
    const appointment = await Appointment.create({
      patientId: patient._id,
      hospitalId,
      machineId: assignedMachine._id,
      appointmentDate,
      startTime,
      durationHours,
      endTime,
      amount,
      status: "reserved",
    });

    res.status(201).json({
      message: "Appointment reserved successfully",
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ✅ PATIENT VIEW MY APPOINTMENTS
 * GET /api/appointments/my
 */
router.get("/my", verifyFirebaseToken, isPatient, async (req, res) => {
  const patient = await User.findOne({ firebaseUid: req.user.uid });

  const appointments = await Appointment.find({
    patientId: patient._id,
  })
    .populate("hospitalId")
    .populate("machineId");

  res.json(appointments);
});

/**
 * ✅ CANCEL APPOINTMENT
 * PUT /api/appointments/cancel/:id
 */
router.put("/cancel/:id", verifyFirebaseToken, isPatient, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment)
    return res.status(404).json({ message: "Appointment not found" });

  appointment.status = "cancelled";
  await appointment.save();

  res.json({ message: "Appointment cancelled successfully" });
});

/**
 * ✅ ADMIN CONFIRM SESSION START
 * PUT /api/appointments/start/:id
 */
router.put(
  "/start/:id",
  verifyFirebaseToken,
  isHospitalAdmin,
  async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    appointment.status = "active";
    await appointment.save();

    res.json({ message: "Session started", appointment });
  }
);

/**
 * ✅ ADMIN COMPLETE SESSION
 * PUT /api/appointments/complete/:id
 */
router.put(
  "/complete/:id",
  verifyFirebaseToken,
  isHospitalAdmin,
  async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    appointment.status = "completed";
    await appointment.save();

    res.json({ message: "Session completed", appointment });
  }
);

/**
 * ✅ ADMIN VIEW HOSPITAL APPOINTMENTS
 * GET /api/appointments/hospital/:hospitalId
 */
router.get(
  "/hospital/:hospitalId",
  verifyFirebaseToken,
  isHospitalAdmin,
  async (req, res) => {
    const appointments = await Appointment.find({
      hospitalId: req.params.hospitalId,
    }).populate("patientId");

    res.json(appointments);
  }
);

module.exports = router;
