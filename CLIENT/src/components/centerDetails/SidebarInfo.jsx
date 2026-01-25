export default function SidebarInfo({ hospital }) {
  return (
    <div className="space-y-6">

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold mb-2">Contact Support</h3>

        <p className="text-teal-600 font-medium">
          {hospital.email}
        </p>

        <p className="text-teal-600 font-medium">
          {hospital.phone}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold mb-2">Payment</h3>
        <p className="text-gray-600">UPI ID:</p>
        <p className="font-medium">{hospital.upiId}</p>
      </div>

    </div>
  );
}
