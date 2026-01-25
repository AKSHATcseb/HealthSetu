import { useEffect, useState } from "react";
import EmergencyContactCard from "../../components/patientProfile/EmergencyContactCard";
import MedicalInfoCard from "../../components/patientProfile/MedicalInfoCard";
import ProfileCard from "../../components/patientProfile/ProfileCard";
import ProfileHeader from "../../components/patientProfile/ProfileHeader";
import { getMe } from "../../services/userApi";

export default function PatientProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe()
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-white px-4 md:px-10 py-6">
      {/* HEADER */}
      <ProfileHeader
        patientName={user.name}
        pid={user._id}
      />

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* LEFT */}
        <ProfileCard user={user} />

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          <MedicalInfoCard medicalInfo={user.medicalInfo} />
          <EmergencyContactCard contact={user.emergencyContact} />
        </div>
      </div>
    </div>
  );
}
