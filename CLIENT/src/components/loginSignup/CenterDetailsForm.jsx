import { useState } from "react";
import LocationDetailsForm from "./LocationDetailsForm";
import ComplianceForm from "./ComplianceForm";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";

const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export default function CenterDetailsForm() {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        dialysisCount: "",
        normalCost: "",
        emergencyAvailable: false,
        emergencyCost: "",
        workingDays: [],
        openingTime: "",
        closingTime: "",
        emergency24x7: false,

        upiId: "",
    });

    /* ---------- HANDLERS ---------- */

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const toggleDay = (day) => {
        setFormData((prev) => ({
            ...prev,
            workingDays: prev.workingDays.includes(day)
                ? prev.workingDays.filter((d) => d !== day)
                : [...prev.workingDays, day],
        }));
    };

    /* ---------- SUBMIT ---------- */

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await auth.currentUser.getIdToken();

        const payload = {
            role: "center",
            ...formData,
        };

        await axios.post(
            "http://localhost:5000/api/auth/login",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        navigate("/centerdashboard");
    };
    const navigate = useNavigate()

    return (

        <div className="px-64">
            <form
                onSubmit={handleSubmit}
                className="space-y-6 mt-6 bg-white p-6 rounded-xl shadow"
            >
                <h3 className="font-semibold text-lg text-gray-800">
                    Dialysis Center Details
                </h3>

                {/* BASIC DETAILS */}
                <input
                    type="email"
                    name="email"
                    placeholder="Contact Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-200 rounded-xl"
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Contact Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-200 rounded-xl"
                    required
                />

                <input
                    type="number"
                    name="dialysisCount"
                    placeholder="Number of Dialysis Machines"
                    value={formData.dialysisCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-200 rounded-xl"
                />

                <input
                    type="number"
                    name="normalCost"
                    placeholder="Cost per Session"
                    value={formData.normalCost}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-200 rounded-xl"
                />

                {/* EMERGENCY DIALYSIS */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="emergencyAvailable"
                        checked={formData.emergencyAvailable}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">
                        Emergency Dialysis Available
                    </span>
                </div>

                {formData.emergencyAvailable && (
                    <input
                        type="number"
                        name="emergencyCost"
                        placeholder="Emergency Cost per Session"
                        value={formData.emergencyCost}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-200 rounded-xl"
                    />
                )}

                {/* 24/7 EMERGENCY AVAILABILITY */}
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">
                        24/7 Emergency Dialysis
                    </h4>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev) => ({ ...prev, emergency24x7: true }))
                            }
                            className={`px-5 py-2 rounded-full font-medium transition
        ${formData.emergency24x7
                                    ? "bg-teal-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            Yes
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev) => ({ ...prev, emergency24x7: false }))
                            }
                            className={`px-5 py-2 rounded-full font-medium transition
        ${!formData.emergency24x7
                                    ? "bg-teal-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            No
                        </button>
                    </div>
                </div>

                {/* CENTER RATING */}
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">
                        Center Rating
                    </h4>

                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({ ...prev, rating: star }))
                                }
                                className={`w-10 h-10 rounded-full text-lg font-bold transition
          ${formData.rating >= star
                                        ? "bg-teal-600 text-white scale-105"
                                        : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <p className="text-xs text-gray-500">
                        Selected rating: {formData.rating || "Not rated"}
                    </p>
                </div>


                {/* WORKING DAYS */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                        Working Days
                    </h4>

                    <div className="flex flex-wrap gap-3">
                        {daysOfWeek.map((day) => {
                            const isSelected = formData.workingDays.includes(day);

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${isSelected
                                            ? "bg-teal-600 text-white shadow-md scale-105"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {isSelected && <span className="text-xs">✓</span>}
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-xs text-gray-500">
                        Select the days when the dialysis center is operational
                    </p>
                </div>

                {/* OPERATING HOURS */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                        Operating Hours
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Opening Time
                            </label>
                            <input
                                type="time"
                                name="openingTime"
                                value={formData.openingTime}
                                onChange={handleChange}
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Closing Time
                            </label>
                            <input
                                type="time"
                                name="closingTime"
                                value={formData.closingTime}
                                onChange={handleChange}
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>
                    </div>
                </div>

                {/* LOCATION + COMPLIANCE */}
                <LocationDetailsForm />
                <ComplianceForm />

                {/* PREVIEW */}
                <div className="bg-gray-50 p-3 rounded text-sm">
                    <p>
                        <b>Working Days:</b> {formData.workingDays.join(", ") || "Not selected"}
                    </p>
                    <p>
                        <b>Timings:</b>{" "}
                        {formData.openingTime && formData.closingTime
                            ? `${formData.openingTime} - ${formData.closingTime}`
                            : "Not set"}
                    </p>
                </div>

                {/* UPI Link */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                        UPI ID / UPI Payment Link
                    </label>

                    <input
                        type="text"
                        name="upiId"
                        placeholder="example@upi or upi://pay?pa=example@upi"
                        value={formData.upiId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-200 rounded-xl"
                    />

                    <p className="text-xs text-gray-500">
                        This will be used for direct patient payments
                    </p>
                </div>

                {/* SUBMIT */}
                <button
                    onClick={() => navigate('/centerdashboard')}
                    type="submit"
                    className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
