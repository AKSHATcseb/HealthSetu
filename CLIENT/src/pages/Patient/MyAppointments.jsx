import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/patientDashboard/Navbar";
import PageHeader from "../../components/MyAppointments/PageHeader";
import AppointmentCard from "../../components/MyAppointments/AppointmentCard";
import PastAppointmentCard from "../../components/MyAppointments/PastAppointmentCard";

import { auth } from "../../firebase";

const MyAppointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAppointments = async () => {
      try {
        const token = await auth.currentUser.getIdToken();

        const res = await axios.get(
          "http://localhost:8080/api/appointments/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(res.data);

      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="px-10 py-10 text-center text-gray-600">
          Loading appointments...
        </div>
      </>
    );
  }

  // 🔀 Split upcoming & past
  const upcomingAppointments = appointments.filter(
    (a) => a.status === "reserved" || a.status === "active"
  );

  const pastAppointments = appointments.filter(
    (a) => a.status === "completed" || a.status === "cancelled"
  );

  return (
    <>
      <Navbar />

      <div className="px-10 bg-teal-50 py-5 min-h-screen">

        <PageHeader />

        {/* 🔮 UPCOMING */}
        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500 mt-6">
            No upcoming appointments
          </p>
        ) : (
          upcomingAppointments.map((appt) => (
            <AppointmentCard
              key={appt._id}
              appointment={appt}
            />
          ))
        )}

        {/* ⏳ PAST */}
        <section>
          <h2 className="font-semibold text-lg mb-5 mt-10">
            ⏳ Past Appointments
          </h2>

          {pastAppointments.length === 0 ? (
            <p className="text-gray-500">
              No past appointments
            </p>
          ) : (
            <div className="space-y-4">
              {pastAppointments.map((appt) => (
                <PastAppointmentCard
                  key={appt._id}
                  name={appt.hospitalId.centerName}
                  date={new Date(appt.appointmentDate).toLocaleDateString()}
                  time={`${appt.startTime} - ${appt.endTime}`}
                  submitted={appt.status === "completed"}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </>
  );
};

export default MyAppointments;
