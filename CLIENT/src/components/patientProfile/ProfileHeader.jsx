import { User } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-teal-100 text-teal-700 p-4 rounded-2xl">
          <User size={32} />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Patient Profile
          </h1>
          <p className="text-gray-500 text-sm">
            View and manage your personal information
          </p>
        </div>
      </div>

      <button
        className="
          px-5 py-2 rounded-full
          bg-teal-600 text-white
          hover:bg-teal-700 transition
        "
      >
        Edit Profile
      </button>
    </div>
  );
}
