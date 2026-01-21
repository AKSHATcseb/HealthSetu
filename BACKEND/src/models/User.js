const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firebaseUid: {
            type: String,
            required: true,
            unique: true,
        },

        role: {
            type: String,
            enum: ["patient", "hospital_admin"],
            default: "patient",
        },

        name: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            default: null,
        },

        email: {
            type: String,
        },

        age: {
            type: Number,
            required: true,
        },

        weight: {
            type: Number,
            default: null
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },

        address: {
            street: String,
            city: String,
            state: String,
            pincode: String,
        },

        medicalInfo: {
            bloodGroup: String,
            dialysisType: {
                type: String,
                enum: ["hemodialysis", "peritoneal"],
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
