export default function SidebarInfo() {
  return (
    <div className="space-y-6">
      {/* Map */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold mb-3">Easy Navigation</h3>
        <button className="bg-gray-200 w-full rounded-lg py-2 hover:bg-gray-300 transition">
          Get Directions
        </button>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold mb-3">Amenities</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✔ Free High-Speed Wi-Fi</li>
          <li>✔ Cafeteria for Visitors</li>
          <li>✔ Dedicated Parking</li>
          <li>✔ Wheelchair Assistance</li>
        </ul>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold mb-2">Contact Support</h3>
        <p className="text-teal-600 font-medium">
          +91 98765 43210
        </p>
      </div>
    </div>
  );
}
