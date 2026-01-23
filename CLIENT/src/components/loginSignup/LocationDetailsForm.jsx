export default function LocationDetailsForm() {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800">
        Location Details
      </h4>

      <input
        type="text"
        placeholder="Complete Address"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="text"
        placeholder="City / District"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="text"
        placeholder="State"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <input
        type="number"
        placeholder="Pincode"
        className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-xl"
      />

      <div className="bg-teal-50 text-teal-700 px-4 py-3 rounded-xl text-sm">
        📍 Location will be auto-detected from map
      </div>
    </div>
  );
}
