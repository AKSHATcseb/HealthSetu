const express = require("express");
const verifyFirebaseToken = require("../middleware/auth.middleware");
const User = require("../models/User");

const router = express.Router();

/**
 * LOGIN / REGISTER (AUTO)
 */
router.post("/login", verifyFirebaseToken, async (req, res) => {
    try {
        const { uid, phone_number, email } = req.user;
        const { role, name, age, gender, address } = req.body;

        if (!req.user.email_verified && req.user.email) {
            return res.status(403).json({
                message: "Email not verified"
            });
        }

        if (!role || !name) {
            return res.status(400).json({ message: "Role and name are required" });
        }

        let user = await User.findOne({ firebaseUid: uid });

        // Register if not exists
        if (!user) {
            user = await User.create({
                firebaseUid: uid,
                role,
                name,
                phone: phone_number || "",
                email: email || "",
                age,
                gender,
                address,
            });
        }

        res.json({
            message: "Login successful",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
