import PastAppointmentCard from "./PastAppointmentCard";

export default function PastAppointments() {
  return (
    <section>
      <h2 className="font-semibold text-lg mb-4">
        ⏳ Past Appointments
      </h2>

      <div className="space-y-4">
        <PastAppointmentCard
          name="Apollo Dialysis Center"
          date="Oct 21, 2023"
          time="09:00 AM"
          feedback
        />

        <PastAppointmentCard
          name="City Care Hospital"
          date="Oct 18, 2023"
          time="11:00 AM"
          submitted
        />
      </div>
    </section>
  );
}
