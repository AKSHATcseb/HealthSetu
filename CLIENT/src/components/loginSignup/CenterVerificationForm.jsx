import LocationDetailsForm from "./LocationDetailsForm";
import ComplianceForm from "./ComplianceForm";
import { useNavigate } from "react-router-dom";

export default function CenterDetailsForm() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 mt-6">
      <h3 className="font-semibold text-lg text-gray-800">
        Dialysis Center Details
      </h3>

      {/* BASIC IDENTITY */}
      <input
        type="text"
        placeholder="Hospital / Center Name"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="text"
        placeholder="Registration Number"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <select className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl">
        <option>Government</option>
        <option>Private</option>
        <option>Trust</option>
      </select>

      <button onClick={() => navigate("/centerdetailsform")} className="w-full py-3 rounded-full bg-teal-600 text-white font-semibold">
        Verify Authanticity
      </button>

    </div>
  );
}
