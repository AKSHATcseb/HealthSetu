export default function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-3xl font-bold">
          {user.name?.[0]}
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Patient ID: {user._id.slice(-6).toUpperCase()}
        </p>
      </div>

      <div className="mt-6 space-y-4 text-sm">
        <InfoRow label="Age" value={user.age} />
        <InfoRow label="Gender" value={user.gender} />
        <InfoRow label="Phone" value={user.phone} />
        <InfoRow label="Email" value={user.email} />
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-gray-600">
      <span>{label}</span>
      <span className="font-medium text-gray-900">
        {value || "-"}
      </span>
    </div>
  );
}
