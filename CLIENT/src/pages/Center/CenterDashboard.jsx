import AppointmentsTable from "../../components/centerDashboard/AppointmentsTable";
import MachineTable from "../../components/centerDashboard/MachineTable";
import PricingCard from "../../components/centerDashboard/PricingCard";
import Sidebar from "../../components/centerDashboard/Sidebar";
import StatsCard from "../../components/centerDashboard/StatsCard";
import TopBar from "../../components/centerDashboard/TopBar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6">
        <TopBar />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Dialysis Machines" value="12" />
          <StatsCard title="Available Machines" value="5" highlight="green" />
          <StatsCard title="Today’s Appointments" value="8" highlight="blue" />
          <StatsCard title="Pending Requests" value="3" highlight="yellow" />
        </div>

        <AppointmentsTable />
        <MachineTable />

      </main>
    </div>
  );
};

export default Dashboard;
