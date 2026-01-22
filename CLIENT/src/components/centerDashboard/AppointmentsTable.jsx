const AppointmentsTable = () => {
  return (
    <div className="bg-white rounded-xl p-5">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Appointments Management</h3>
        <input
          placeholder="Search patient..."
          className="border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <table className="w-full text-sm">
        <thead className="text-slate-500 border-b">
          <tr>
            <th>Patient</th>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td>Amit Sharma</td>
            <td>Oct 24, 09:30 AM</td>
            <td>Hemodialysis</td>
            <td>Dr. Mradul Kumar</td>
            <td>
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                Pending Approval
              </span>
            </td>
            <td className="space-x-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded">
                Approve
              </button>
              <button className="bg-red-100 text-red-600 px-3 py-1 rounded">
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;
