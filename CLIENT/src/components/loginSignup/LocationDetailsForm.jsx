import { useState } from "react";

export default function LocationDetailsForm() {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    mapLink: "",
    latitude: "",
    longitude: "",
  });

  /* ---------- HELPERS ---------- */

  const extractLatLng = (url) => {
    try {
      // Matches @lat,lng from Google Maps URL
      const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

      if (match) {
        return {
          lat: match[1],
          lng: match[2],
        };
      }
      return null;
    } catch {
      return null;
    }
  };

  /* ---------- HANDLERS ---------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMapLinkChange = (e) => {
    const link = e.target.value;
    const coords = extractLatLng(link);

    setFormData((prev) => ({
      ...prev,
      mapLink: link,
      latitude: coords ? coords.lat : "",
      longitude: coords ? coords.lng : "",
    }));
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800">
        Location Details
      </h4>

      <input
        type="text"
        name="address"
        placeholder="Complete Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-200 rounded-xl"
      />

      <input
        type="text"
        name="city"
        placeholder="City / District"
        value={formData.city}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-200 rounded-xl"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-200 rounded-xl"
      />

      <input
        type="number"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-200 rounded-xl"
      />

      <div className="bg-teal-50 text-teal-700 px-4 py-3 rounded-xl text-sm">
        📍 Location will be auto-detected from Google Maps link
      </div>
    </div>
  );
}
