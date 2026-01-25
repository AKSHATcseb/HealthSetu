import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";
import LocationDetailsForm from "./LocationDetailsForm";

export default function PatientDetailsForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Only profile fields (name already saved in /auth/login)
  const [formData, setFormData] = useState({
    phone: "",
    age: "",
    weight: "",
    gender: "",
    dialysisType: "",
    bloodGroup: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    location: null,
  });

  // ✅ Handle Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Profile Update
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await auth.currentUser.getIdToken();

      await axios.put(
        "http://localhost:8080/api/users/me",
        {
          phone: formData.phone,

          age: Number(formData.age),
          weight: Number(formData.weight),

          gender: formData.gender,

          address: formData.location || null,

          medicalInfo: {
            bloodGroup: formData.bloodGroup,
            dialysisType: formData.dialysisType,
          },

          emergencyContact: {
            name: formData.emergencyName,
            phone: formData.emergencyPhone,
            relation: formData.emergencyRelation,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Patient Profile Completed Successfully!");
      navigate("/patient/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 space-y-10">

        {/* HEADER */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Patient Profile Details
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Please provide accurate information for better medical assistance.
          </p>
        </div>

        {/* PERSONAL INFO */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-teal-700">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className="input"
            />

            <input
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="input"
            />

            <input
              name="weight"
              type="number"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="input"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <select
              name="dialysisType"
              value={formData.dialysisType}
              onChange={handleChange}
              className="input"
            >
              <option value="">Dialysis Type</option>
              <option value="hemodialysis">Hemodialysis</option>
              <option value="peritoneal">Peritoneal Dialysis</option>
            </select>

            <input
              name="bloodGroup"
              placeholder="Blood Group (e.g. B+)"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="input"
            />
          </div>
        </section>

        {/* EMERGENCY CONTACT */}
        <section className="space-y-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-red-600">
            Emergency Contact
          </h3>

          <input
            name="emergencyName"
            placeholder="Contact Person Name"
            value={formData.emergencyName}
            onChange={handleChange}
            className="input"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="emergencyRelation"
              placeholder="Relation (Father, Wife, Brother...)"
              value={formData.emergencyRelation}
              onChange={handleChange}
              className="input"
            />

            <input
              name="emergencyPhone"
              placeholder="Emergency Contact Number"
              value={formData.emergencyPhone}
              onChange={handleChange}
              className="input"
            />
          </div>
        </section>

        {/* LOCATION */}
        <section className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-slate-700 mb-3">
            Location Details
          </h3>

          <LocationDetailsForm
            onChange={(location) =>
              setFormData((prev) => ({ ...prev, location }))
            }
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
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold text-lg hover:opacity-95 transition disabled:opacity-60"
        >
          {loading ? "Saving Details..." : "Complete Registration"}
        </button>
      </div>

      {/* Tailwind Input Style */}
      <style>{`
        .input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          background-color: #f1f5f9;
          color: #334155;
          outline: none;
          border: 1px solid transparent;
        }
        .input:focus {
          border-color: #14b8a6;
          background-color: white;
        }
      `}</style>
    </div>
  );
}
