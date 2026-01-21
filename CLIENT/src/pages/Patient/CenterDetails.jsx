import AIRecommendation from "../../components/centerDetails/AIRecommendation";
import ClinicHeader from "../../components/centerDetails/ClinicHeader";
import ClinicStats from "../../components/centerDetails/ClinicStats";
import FacilityInfo from "../../components/centerDetails/FacilityInfo";
import SidebarInfo from "../../components/centerDetails/SidebarInfo";
import SlotTable from "../../components/centerDetails/SlotTable";
import Navbar from "../../components/patientDashboard/Navbar";


export default function ClinicDetails() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen px-5 md:px-10 py-6">
        <ClinicHeader />
        <ClinicStats />
        <AIRecommendation />

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">
            <SlotTable />
            <FacilityInfo />
          </div>

          <SidebarInfo />
        </div>
      </div>
    </>
  );
}
