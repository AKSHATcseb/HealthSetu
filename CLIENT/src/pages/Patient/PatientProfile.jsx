import EmergencyContactCard from "../../components/patientProfile/EmergencyContactCard";
import MedicalInfoCard from "../../components/patientProfile/MedicalInfoCard";
import ProfileCard from "../../components/patientProfile/ProfileCard";
import ProfileHeader from "../../components/patientProfile/ProfileHeader";


export default function PatientProfile() {
  return (
    <div className="min-h-screen bg-teal-50 px-4 md:px-10 py-6">
      <ProfileHeader />

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* LEFT */}
        <div className="lg:col-span-1 space-y-6">
          <ProfileCard />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          <MedicalInfoCard />
          <EmergencyContactCard />
        </div>
      </div>
    </div>
  );
}
