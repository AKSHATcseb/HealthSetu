import AppointmentCard from "./AppointmentCard";

export default function UpcomingAppointments() {
  return (
    <section className="mb-10">
      <h2 className="font-semibold text-lg mb-4">
        🔵 Upcoming Appointments
      </h2>

      <div className="space-y-6">
        <AppointmentCard
          status="Confirmed"
          ai
          name="Apollo Dialysis Center"
          date="Oct 24, 2023"
          time="09:00 AM"
          location="123 Health Ave, New York, NY10001"
          map
        />

        <AppointmentCard
          status="Pending Confirmation"
          name="City Care Hospital"
          date="Oct 27, 2023"
          time="10:30 AM"
        />
      </div>
    </section>
  );
}
