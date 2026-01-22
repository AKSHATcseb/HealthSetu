const statusBadge = (status) => {
  const map = {
    Available: "bg-green-100 text-green-600",
    Occupied: "bg-red-100 text-red-600",
    Maintenance: "bg-yellow-100 text-yellow-600",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
};

const MachineTable = () => {
  return (
    <div className="rounded-xl p-5 bg-gray-100">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Machine Availability</h3>
        <button className="text-teal-600 text-sm">View All</button>
      </div>

      <table className="w-full text-sm">
        <tbody>
          {[
            ["DM-001", "Available", "10 mins ago"],
            ["DM-002", "Occupied", "1 hr ago"],
            ["DM-003", "Maintenance", "2 days ago"],
            ["DM-004", "Available", "5 mins ago"],
          ].map((m) => (
            <tr key={m[0]}>
              <td className="py-3">{m[0]}</td>
              <td>{statusBadge(m[1])}</td>
              <td className="text-slate-500">{m[2]}</td>
              <td>
                <input type="checkbox" defaultChecked={m[1] !== "Maintenance"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineTable;
