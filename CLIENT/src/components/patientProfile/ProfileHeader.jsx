import { User, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ patientName, pid }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-teal-100 text-teal-700 p-4 rounded-2xl">
          <User size={32} />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {patientName}
          </h1>
          <p className="text-gray-500 text-sm">
            Patient Profile
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/${pid}/profile/editprofile`)}
        className="
          p-2.5 rounded-full
          bg-white border border-teal-200
          text-teal-700
          hover:bg-teal-50 hover:border-teal-300
          transition
          shadow-sm
        "
        title="Edit Profile"
      >
        <Pencil size={18} />
      </button>
    </div>
  );
}
