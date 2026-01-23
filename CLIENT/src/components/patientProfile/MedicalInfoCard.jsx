import { Activity } from "lucide-react";

export default function MedicalInfoCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-teal-100 text-teal-700 p-2 rounded-xl">
          <Activity size={20} />
        </div>

        <h3 className="font-semibold text-lg text-gray-900">
          Medical Information
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Dialysis Type</p>
          <p className="font-medium text-gray-800">
            Hemodialysis
          </p>
        </div>

        <div>
          <p className="text-gray-500">Primary Nephrologist</p>
          <p className="font-medium text-gray-800">
            Dr. R. Mehta
          </p>
        </div>

      </div>
    </div>
  );
}
