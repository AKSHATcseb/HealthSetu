import React from "react";
import PageHeader from "./PageHeader";
import UpcomingAppointments from "./UpcomingAppointments";
import PastAppointments from "./PastAppointments";

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">
      <PageHeader />
      <UpcomingAppointments />
      <PastAppointments />
    </div>
  );
}
