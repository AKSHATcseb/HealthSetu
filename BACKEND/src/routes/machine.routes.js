const express = require("express");
const verifyFirebaseToken = require("../middleware/auth.middleware");
const { isHospitalAdmin } = require("../middleware/role.middleware");
const Machine = require("../models/Machine");
const Hospital = require("../models/Hospital");

const router = express.Router();

/**
 * ADD MACHINE (Hospital Admin only)
 */
router.post(
  "/:hospitalId",
  verifyFirebaseToken,
  isHospitalAdmin,
  async (req, res) => {
    const { hospitalId } = req.params;
    const { machineNumber, lastServicedOn } = req.body;

    // Check hospital ownership
    const hospital = await Hospital.findOne({
      _id: hospitalId,
      adminUid: req.user.uid,
    });

    if (!hospital) {
      return res.status(403).json({ message: "Unauthorized hospital access" });
    }

    const machine = await Machine.create({
      hospitalId,
      machineNumber,
      lastServicedOn,
    });

    // Update available machine count
    hospital.totalMachines += 1;
    hospital.availableMachines += 1;
    await hospital.save();

    res.json(machine);
  }
);

/**
 * GET MACHINES OF A HOSPITAL
 */
router.get(
  "/:hospitalId",
  verifyFirebaseToken,
  async (req, res) => {
    const machines = await Machine.find({
      hospitalId: req.params.hospitalId,
    });

    res.json(machines);
  }
);

/**
 * UPDATE MACHINE STATUS
 */
router.put(
  "/:machineId/status",
  verifyFirebaseToken,
  isHospitalAdmin,
  async (req, res) => {
    const { status } = req.body;

    const machine = await Machine.findById(req.params.machineId);
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    const hospital = await Hospital.findOne({
      _id: machine.hospitalId,
      adminUid: req.user.uid,
    });

    if (!hospital) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Adjust available machine count
    if (machine.status === "available" && status !== "available") {
      hospital.availableMachines -= 1;
    }
    if (machine.status !== "available" && status === "available") {
      hospital.availableMachines += 1;
    }

    machine.status = status;
    await machine.save();
    await hospital.save();

    res.json(machine);
  }
);

/**
 * DELETE MACHINE
 */
router.delete(
  "/:machineId",
  verifyFirebaseToken,
  isHospitalAdmin,
  async (req, res) => {
    const machine = await Machine.findById(req.params.machineId);
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    const hospital = await Hospital.findOne({
      _id: machine.hospitalId,
      adminUid: req.user.uid,
    });

    if (!hospital) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (machine.status === "available") {
      hospital.availableMachines -= 1;
    }

    hospital.totalMachines -= 1;

    await machine.deleteOne();
    await hospital.save();

    res.json({ message: "Machine deleted successfully" });
  }
);

module.exports = router;
