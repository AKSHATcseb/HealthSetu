import { CheckCircle, XCircle, Cpu } from "lucide-react";

const AvailabilityBadge = ({ status }) => {
  const config = {
    Available: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <CheckCircle size={14} />,
    },
    "Not Available": {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <XCircle size={14} />,
    },
  };

  const s = config[status];

  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-4 py-1.5 rounded-full text-xs font-semibold
        ${s.bg} ${s.text}
      `}
    >
      {s.icon}
      {status}
    </span>
  );
};

const MachineTable = () => {
  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Dialysis Machines
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Live availability status of machines
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="space-y-3">
        {[
          { id: "DM-001", status: "Available" },
          { id: "DM-002", status: "Not Available" },
          { id: "DM-003", status: "Not Available" },
          { id: "DM-004", status: "Available" },
        ].map((machine) => (
          <div
            key={machine.id}
            className="
              flex items-center justify-between
              bg-slate-50 rounded-2xl px-5 py-4
              hover:bg-slate-100 transition
              border-l-4
              border-l-transparent hover:border-l-teal-500
            "
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 text-teal-700 p-2 rounded-xl">
                <Cpu size={18} />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {machine.id}
                </p>
                <p className="text-xs text-gray-500">
                  Dialysis Machine
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <AvailabilityBadge status={machine.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineTable;
