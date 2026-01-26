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
    const {
      hospitalId,
      appointmentDate,
      startTime,
      durationHours,
      isEmergency,
    } = req.body;

    // ✅ Validate inputs
    if (!hospitalId || !appointmentDate || !startTime || !durationHours) {
      return res.status(400).json({
        message: "hospitalId, appointmentDate, startTime, durationHours required",
      });
    }

    // ✅ Validate duration
    if (![4, 6].includes(durationHours)) {
      return res.status(400).json({
        message: "Duration must be 4 or 6 hours only",
      });
    }

    // ✅ Find hospital
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // ✅ Auto Calculate Amount
    let amount =
      durationHours === 4
        ? hospital.costPerSession4h
        : hospital.costPerSession6h;

    if (isEmergency) {
      if (!hospital.emergencyServices) {
        return res.status(400).json({
          message: "Emergency dialysis not available at this hospital",
        });
      }
      amount = hospital.emergencyCostPerSession;
    }

    // ✅ Calculate endTime
    const endTime = calculateEndTime(startTime, durationHours);

    // ✅ Find patient profile
    const patient = await User.findOne({ firebaseUid: req.user.uid });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    // ✅ Get available machines
    const machines = await Machine.find({
      hospitalId,
      status: "available",
    });

    if (!machines.length) {
      return res.status(400).json({
        message: "No machines available in this hospital",
      });
    }

    // Convert times to minutes
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    let assignedMachine = null;

    // ✅ Machine Allocation Loop
    for (let machine of machines) {
      const existingAppointments = await Appointment.find({
        machineId: machine._id,
        appointmentDate,
        status: { $in: ["reserved", "active"] },
      });

      let overlap = false;

      for (let appt of existingAppointments) {
        const existingStart = timeToMinutes(appt.startTime);
        const existingEnd = timeToMinutes(appt.endTime);

        // ✅ Overlap condition
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

    // ❌ No machine free for that slot
    if (!assignedMachine) {
      return res.status(400).json({
        message: "No machine available for this time slot",
      });
    }

    // ✅ Create Appointment Reservation
    const appointment = await Appointment.create({
      patientId: patient._id,
      hospitalId,
      machineId: assignedMachine._id,

      appointmentDate,
      startTime,
      endTime,
      durationHours,

      amount,
      isEmergency: isEmergency || false,

      status: "reserved",
    });

    res.status(201).json({
      message: "Appointment reserved successfully",
      appointment,
    });
  } catch (err) {
    res.status(500).json({
      message: "Appointment booking failed",
      error: err.message,
    });
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
