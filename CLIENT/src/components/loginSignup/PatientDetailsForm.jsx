import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";
import LocationDetailsForm from "./LocationDetailsForm";

export default function PatientDetailsForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    weight: "",
    gender: "",
    dialysisType: "",
    bloodGroup: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Firebase token
      const token = await auth.currentUser.getIdToken();

      // 2️⃣ Save patient details to backend
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          role: "patient",
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = res.data.user;

      // 3️⃣ Redirect to patient dashboard
      navigate(`/patient/${user._id}/dashboard`, { replace: true });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to save patient details"
      );
    } finally {
      setLoading(false);
    }
  };

  // const user = auth.currentUser;
  // await user.reload();

  // if (!user.emailVerified) {
  //   setError("Please verify your email before completing registration.");
  //   return;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 space-y-8">

        {/* HEADER */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Patient Profile Details
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Please provide accurate information for better medical assistance
          </p>
        </div>

        {/* BASIC INFO */}
        <section className="space-y-5">
          <h3 className="text-lg font-semibold text-teal-700">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="input"
            />

            <input
              name="phone"
              placeholder="Mobile Number"
              onChange={handleChange}
              className="input"
            />

            <input
              name="age"
              placeholder="Age"
              onChange={handleChange}
              className="input"
            />

            <input
              name="weight"
              placeholder="Weight (kg)"
              onChange={handleChange}
              className="input"
            />

            <select
              name="gender"
              onChange={handleChange}
              className="input"
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <select
              name="dialysisType"
              onChange={handleChange}
              className="input"
            >
              <option value="">Dialysis Type</option>
              <option>Hemodialysis</option>
              <option>Peritoneal Dialysis</option>
            </select>
          </div>

          <input
            name="bloodGroup"
            placeholder="Blood Group"
            onChange={handleChange}
            className="input"
          />
        </section>

        {/* EMERGENCY CONTACT */}
        <section className="space-y-5 pt-6 border-t">
          <h3 className="text-lg font-semibold text-red-600">
            Emergency Contact
          </h3>

          <input
            name="emergencyName"
            placeholder="Contact Person Name"
            onChange={handleChange}
            className="input"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="emergencyRelation"
              placeholder="Relation"
              onChange={handleChange}
              className="input"
            />

            <input
              name="emergencyPhone"
              placeholder="Emergency Contact Number"
              onChange={handleChange}
              className="input"
            />
          </div>
        </section>

        {/* LOCATION */}
        <LocationDetailsForm
          onChange={(location) =>
            setFormData(p => ({ ...p, location }))
          }
        />


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
          className="w-full py-4 rounded-full bg-linear-to-r from-teal-600 to-teal-700 text-white font-semibold text-lg hover:opacity-95 transition disabled:opacity-60"
        >
          {loading ? "Saving Details..." : "Complete Registration"}
        </button>
      </div>

      {/* Tailwind utility */}
      <style>
        {`
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
            background-color: #ffffff;
          }
        `}
      </style>
    </div>
  );
}
