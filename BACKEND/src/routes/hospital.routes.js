const express = require("express");
const verifyFirebaseToken = require("../middleware/auth.middleware");
const { isHospitalAdmin } = require("../middleware/role.middleware");
const Hospital = require("../models/Hospital");

const router = express.Router();

/**
 * CREATE HOSPITAL (Only Hospital Admin)
 */
router.post(
  "/",
  verifyFirebaseToken,
  isHospitalAdmin,
  async (req, res) => {
    const hospital = await Hospital.create({
      ...req.body,
      adminUid: req.user.uid,
    });

    res.json(hospital);
  }
);

/**
 * GET MY HOSPITAL
 */
router.get(
  "/my",
  verifyFirebaseToken,
  isHospitalAdmin,
  async (req, res) => {
    const hospital = await Hospital.findOne({
      adminUid: req.user.uid,
    });

    res.json(hospital);
  }
);

/**
 * UPDATE HOSPITAL
 */
router.put(
  "/:id",
  verifyFirebaseToken,
  isHospitalAdmin,
  async (req, res) => {
    const hospital = await Hospital.findOneAndUpdate(
      { _id: req.params.id, adminUid: req.user.uid },
      req.body,
      { new: true }
    );

    res.json(hospital);
  }
);

module.exports = router;
