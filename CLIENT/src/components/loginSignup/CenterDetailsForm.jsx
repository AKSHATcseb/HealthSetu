import LocationDetailsForm from "./LocationDetailsForm";
import ComplianceForm from "./ComplianceForm";

export default function CenterDetailsForm() {
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

      <select className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl">
        <option>Center Type</option>
        <option>Government</option>
        <option>Private</option>
        <option>Trust</option>
      </select>

      <input
        type="text"
        placeholder="Registration Number"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="number"
        placeholder="Year of Establishment"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      {/* CONTACT */}
      <input
        type="text"
        placeholder="Authorized Contact Person"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="tel"
        placeholder="Official Mobile (OTP)"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="email"
        placeholder="Official Email Address"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <LocationDetailsForm />
      <ComplianceForm />
    </div>
  );
}
