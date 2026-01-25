import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";
import LocationDetailsForm from "./LocationDetailsForm";
import ComplianceForm from "./ComplianceForm";

const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

export default function CenterDetailsForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        centerName: "",
        registrationNumber: "",
        type: "",
        email: "",
        phone: "",
        totalMachines: "",
        costPerSession4h: "",
        costPerSession6h: "",
        emergencyService: false,
        emergencyCostPerSession: "",
        is24x7: false,
        workingDays: [],
        workingHours: {
            open: "",
            close: "",
        },
        upiId: "",
        location: ""
    });

    /* ---------------- HANDLERS ---------------- */

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((p) => ({
            ...p,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const toggleDay = (day) => {
        setFormData((p) => ({
            ...p,
            workingDays: p.workingDays.includes(day)
                ? p.workingDays.filter((d) => d !== day)
                : [...p.workingDays, day],
        }));
    };

    /* ---------------- SUBMIT ---------------- */

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const user = auth.currentUser;

            // 🔴 No user logged in
            if (!user) {
                setError("User not authenticated");
                return;
            }

            // 🔴 Reload to get latest verification status
            await user.reload();

            // 🔴 Check email verified
            if (!user.emailVerified) {
                setError("Please verify your email before completing registration.");
                setLoading(false);
                return;
            }

            // ✅ Now safe to continue
            const token = await user.getIdToken();

            const res = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    role: "center",
                    ...formData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const center = res.data.user;

            navigate(`/center/${center._id}/dashboard`, { replace: true });

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to save center details"
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-linear-to-br from-teal-50 to-slate-100 py-10 px-4 flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-8 space-y-8"
            >
                {/* HEADER */}
                <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Dialysis Center Profile
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Provide accurate center details for patient trust & verification
                    </p>
                </div>

                {/* BASIC DETAILS */}
                <section className="space-y-5">
                    <h3 className="section-title">Basic Information</h3>

                    <div className="grid md:grid-cols-2 gap-5">
                        <input name="email" placeholder="Contact Email" onChange={handleChange} className="input" />
                        <input name="phone" placeholder="Contact Phone Number" onChange={handleChange} className="input" />
                        <input name="totalMachines" placeholder="Number of Dialysis Machines" onChange={handleChange} className="input" />
                        <input name="costPerSession4h" placeholder="Cost per Session (3-4 hrs dialysis)" onChange={handleChange} className="input" />
                        <input name="costPerSession6h" placeholder="Cost per Session (5-6 hrs dialysis)" onChange={handleChange} className="input" />
                    </div>
                </section>

                {/* EMERGENCY */}
                <section className="space-y-4">
                    <h3 className="section-title">Emergency Services</h3>

                    <label className="flex items-center gap-3 text-sm">
                        <input type="checkbox" name="emergencyService" onChange={handleChange} />
                        Emergency Dialysis Available
                    </label>

                    {formData.emergencyService && (
                        <input
                            name="emergencyCostPerSession"
                            placeholder="Emergency Cost per Session"
                            onChange={handleChange}
                            className="input"
                        />
                    )}
                </section>

                <section className="space-y-4">
                    <h3 className="section-title">Days & Timings</h3>

                    <label className="flex items-center gap-3 text-sm">
                        <input type="checkbox" name="is24x7" onChange={handleChange} />
                        24/7
                    </label>

                    {!formData.is24x7 && (
                        <section className="space-y-3">
                            <div className="flex flex-wrap gap-3">
                                {daysOfWeek.map((day) => (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => toggleDay(day)}
                                        className={`pill ${formData.workingDays.includes(day) ? "pill-active" : ""}`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                            <div className="grid md:grid-cols-2 gap-5">
                                <input type="time" name="openingTime" onChange={handleChange} className="input" />
                                <input type="time" name="closingTime" onChange={handleChange} className="input" />
                            </div>

                        </section>
                    )}
                </section>

                {/* LOCATION + COMPLIANCE */}
                <LocationDetailsForm
                    onChange={(location) =>
                        setFormData((p) => ({ ...p, location }))
                    }
                />

                <ComplianceForm />

                {/* UPI */}
                <section>
                    <input
                        name="upiId"
                        placeholder="UPI ID / Payment Link"
                        onChange={handleChange}
                        className="input"
                    />
                </section>

                {/* ERROR */}
                {error && (
                    <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                        {error}
                    </p>
                )}

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-linear-to-r from-teal-600 to-teal-700 text-white font-semibold text-lg disabled:opacity-60"
                >
                    {loading ? "Saving Center Profile..." : "Complete Registration"}
                </button>
            </form>

            {/* Utility styles */}
            <style>{`
        .input {
          padding: 14px 16px;
          border-radius: 14px;
          background: #f1f5f9;
          border: 1px solid transparent;
        }
        .input:focus {
          border-color: #14b8a6;
          background: white;
        }
        .section-title {
          font-weight: 600;
          color: #0f766e;
        }
        .pill {
          padding: 8px 16px;
          border-radius: 9999px;
          background: #e5e7eb;
        }
        .pill-active {
          background: #14b8a6;
          color: white;
        }
        .star {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          background: #e5e7eb;
        }
        .star-active {
          background: #14b8a6;
          color: white;
        }
      `}</style>
        </div>
    );
}
