import { User, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ patientName, pid }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-teal-100 text-teal-700 p-4 rounded-2xl">
          <User size={28} />
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
          p-3 rounded-xl
          bg-teal-600 text-white
          hover:bg-teal-700
          transition shadow
        "
        title="Edit Profile"
      >
        <Pencil size={18} />
      </button>
    </div>
  );
}
