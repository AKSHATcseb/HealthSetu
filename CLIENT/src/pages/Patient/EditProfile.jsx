import { auth } from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocationDetailsForm from "../../components/loginSignup/LocationDetailsForm";

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = await auth.currentUser.getIdToken();

    await axios.post(
      "http://localhost:5000/api/auth/login",
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

    navigate("/patientdashboard");
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow space-y-5">
      <h3 className="font-semibold text-xl text-gray-800">
        Patient Details
      </h3>

      {/* BASIC INFO */}
      <div className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          name="phone"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
          />

          <select
            name="gender"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            name="dialysisType"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">DialysisType</option>
            <option>Hemodialysis</option>
            <option>Peritoneal Dialysis</option>
          </select>
        </div>

        <input
          name="bloodGroup"
          placeholder="Blood Group"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* EMERGENCY CONTACT */}
      <div className="pt-4 border-t space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">
          Emergency Contact
        </h4>

        <input
          name="emergencyName"
          placeholder="Contact Person Name"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="emergencyRelation"
            placeholder="Relation"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="emergencyPhone"
            placeholder="Contact Number"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <LocationDetailsForm />
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
      >
        Complete Registration
      </button>
    </div>
  );
}
