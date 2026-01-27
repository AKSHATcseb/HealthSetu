const StatusBadge = ({ status }) => {
  const styles = {
    "Pending Approval":
      "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
    Approved:
      "bg-green-100 text-green-700 ring-1 ring-green-200",
    Cancelled:
      "bg-red-100 text-red-700 ring-1 ring-red-200",
  };

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-semibold
        inline-flex items-center
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
};

const AppointmentsTable = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-semibold text-gray-900 text-xl">
            Appointments Management
          </h3>
          <p className="text-sm text-gray-500">
            Review and manage dialysis appointments
          </p>
        </div>

        <input
          placeholder="Search by patient or machine ID"
          className="
            border rounded-xl px-4 py-2 text-sm w-full sm:w-64
            focus:ring-2 focus:ring-teal-500 outline-none
          "
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left px-4 py-2">Machine ID</th>
              <th className="text-left px-4 py-2">Patient Name</th>
              <th className="text-left px-4 py-2">Start Time</th>
              <th className="text-left px-4 py-2">End Time</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-right px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Pending Row */}
            <tr className="bg-white rounded-xl shadow-sm hover:shadow transition">
              <td className="px-4 py-3 font-medium text-gray-800">
                M-102
              </td>
              <td className="px-4 py-3">Amit Sharma</td>
              <td className="px-4 py-3">09:30 AM</td>
              <td className="px-4 py-3">01:30 PM</td>
              <td className="px-4 py-3 font-semibold text-teal-700">
                ₹1500
              </td>
              <td className="px-4 py-3">
                <StatusBadge status="Pending Approval" />
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  className="
                    px-4 py-1.5 text-xs rounded-lg
                    bg-teal-600 text-white
                    hover:bg-teal-700 transition
                  "
                >
                  Approve
                </button>
                <button
                  className="
                    px-4 py-1.5 text-xs rounded-lg
                    bg-red-100 text-red-600
                    hover:bg-red-200 transition
                  "
                >
                  Cancel
                </button>
              </td>
            </tr>

            {/* Approved Row */}
            <tr className="bg-white rounded-xl shadow-sm hover:shadow transition">
              <td className="px-4 py-3 font-medium text-gray-800">
                M-108
              </td>
              <td className="px-4 py-3">Neha Verma</td>
              <td className="px-4 py-3">10:00 AM</td>
              <td className="px-4 py-3">02:00 PM</td>
              <td className="px-4 py-3 font-semibold text-teal-700">
                ₹1600
              </td>
              <td className="px-4 py-3">
                <StatusBadge status="Approved" />
              </td>
              <td className="px-4 py-3 text-right text-gray-400 text-xs">
                —
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
