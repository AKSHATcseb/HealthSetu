export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-3xl font-bold">
          AS
        </div>

        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          Amit Sharma
        </h2>
        <p className="text-gray-500 text-sm">
          Patient ID: HS-P-10234
        </p>
      </div>

      <div className="mt-6 space-y-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Age</span>
          <span className="font-medium text-gray-800">45</span>
        </div>

        <div className="flex justify-between">
          <span>Gender</span>
          <span className="font-medium text-gray-800">Male</span>
        </div>

        <div className="flex justify-between">
          <span>Blood Group</span>
          <span className="font-medium text-gray-800">O+</span>
        </div>

        <div className="flex justify-between">
          <span>Phone</span>
          <span className="font-medium text-gray-800">
            +91 98765 43210
          </span>
        </div>

        <div className="flex justify-between">
          <span>Email</span>
          <span className="font-medium text-gray-800">
            amit.sharma@email.com
          </span>
        </div>
      </div>
    </div>
  );
}
