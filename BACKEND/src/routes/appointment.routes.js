const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const appointment = await Appointment.create({
    ...req.body,
    patientUid: req.user.uid,
  });
  res.json(appointment);
});

module.exports = router;
