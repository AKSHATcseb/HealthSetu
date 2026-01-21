import React from 'react'
import Navbar from '../../components/patientDashboard/Navbar'
import PageHeader from '../../components/MyAppointments/PageHeader'
import AppointmentCard from '../../components/MyAppointments/AppointmentCard'
import PastAppointmentCard from '../../components/MyAppointments/PastAppointmentCard'

const MyAppointments = () => {
  return (
    <>
      <Navbar />
      <div className='px-10 bg-teal-50 py-5'>
        <PageHeader />
        <AppointmentCard status="upcoming" />
        <AppointmentCard status="pending" />
        
        <section>
              <h2 className="font-semibold text-lg mb-5 mt-10">
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
            
      </div>
    </>
  )
}

export default MyAppointments
