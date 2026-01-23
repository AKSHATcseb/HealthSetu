export default function PatientDetailsForm() {
  return (
    <div className="space-y-4 mt-6">
      <h3 className="font-semibold text-lg text-gray-800">
        Patient Details
      </h3>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="tel"
        placeholder="Mobile Number"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="number"
        placeholder="Age"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <select className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl">
        <option>Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <input
        type="text"
        placeholder="Blood group"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="text"
        placeholder="Emergency Person Contact Name"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="text"
        placeholder="Relation"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="tel"
        placeholder="Emergence Contact Number"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <button className="w-full py-3 rounded-full bg-teal-600 text-white font-semibold">
        Complete Registration
      </button>
    </div>
  );
}
