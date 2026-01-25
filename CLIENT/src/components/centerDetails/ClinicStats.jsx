export default function ClinicStats({ hospital }) {
  return (
    <div className="mt-6 grid sm:grid-cols-3 gap-4">

      <Stat
        title="Total Machines"
        value={`${hospital.totalMachines} Machines`}
      />

      <Stat
        title="Session Cost - 4 hours"
        value={`₹${hospital.costPerSession4h}`}
      />

      <Stat
        title="Session Cost - 6 hours"
        value={`₹${hospital.costPerSession6h}`}
      />

      {hospital.emergencyService && (
        <Stat
          title="Emergency Session"
          value={`₹${hospital.emergencyCostPerSession}`}
        />
      )}
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <p className="text-md text-gray-600">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
