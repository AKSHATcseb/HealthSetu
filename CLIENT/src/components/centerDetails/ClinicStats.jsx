export default function ClinicStats() {
  return (
    <div className="mt-6 grid sm:grid-cols-3 gap-4">
      <Stat title="Availability" value="3 Slots" sub="Available Today" />
      <Stat title="Session Cost" value="₹1,200" sub="Includes consumables" />
      <Stat title="Avg. Wait Time" value="15 Mins" sub="Fastest in area" />
    </div>
  );
}

function Stat({ title, value, sub }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-sm text-teal-600 mt-1">{sub}</p>
    </div>
  );
}
