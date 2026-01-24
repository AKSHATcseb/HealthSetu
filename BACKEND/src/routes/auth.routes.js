const express = require("express");
const verifyFirebaseToken = require("../middleware/auth.middleware");
const User = require("../models/User");

const router = express.Router();

router.post("/login", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email, phone_number, email_verified } = req.user;

    if (email && !email_verified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    const { role, name, age, gender, address } = req.body;

    if (!role || !name) {
      return res.status(400).json({ message: "Role and name required" });
    }

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        role,
        name,
        email: email || null,
        phone: phone_number || null,
        age,
        gender,
        address,
      });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
