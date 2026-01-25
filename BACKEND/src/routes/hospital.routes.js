const express = require("express");
const verifyFirebaseToken = require("../middleware/auth.middleware");
const { isHospitalAdmin } = require("../middleware/role.middleware");
const Hospital = require("../models/Hospital");

const router = express.Router();

/**
 * CREATE Hospital
 */
router.post("/", verifyFirebaseToken, isHospitalAdmin, async (req, res) => {
  try {
    const hospital = await Hospital.create({
      ...req.body,
      adminUid: req.user.uid,
    });

    res.status(201).json(hospital);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET Hospital by admin
 */
router.get("/my", verifyFirebaseToken, isHospitalAdmin, async (req, res) => {
  const hospital = await Hospital.findOne({ adminUid: req.user.uid });

  res.json(hospital);
});

/**
 * get particular hospital by user
 */

// GET /api/hospitals/:id
router.get("/:id", async (req, res) => {
  try {
    const hospitalId = req.params.id;

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json(hospital);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch hospital details",
      error: error.message,
    });
  }
});


/**
 * GET All Hospitals (Patient Search)
 */
router.get("/", async (req, res) => {
  const hospitals = await Hospital.find({ isActive: true });
  res.json(hospitals);
});

/**
 * UPDATE Hospital
 */
router.put("/:id", verifyFirebaseToken, isHospitalAdmin, async (req, res) => {
  const hospital = await Hospital.findOneAndUpdate(
    { _id: req.params.id, adminUid: req.user.uid },
    req.body,
    { new: true }
  );

  res.json(hospital);
});

/**
 * DELETE Hospital
 */
router.delete("/:id", verifyFirebaseToken, isHospitalAdmin, async (req, res) => {
  await Hospital.findOneAndDelete({
    _id: req.params.id,
    adminUid: req.user.uid,
  });

  res.json({ message: "Hospital deleted" });
});

module.exports = router;
