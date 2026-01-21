import React from 'react'
import Navbar from '../../components/patientDashboard/Navbar'
import AppointmentsPage from '../../components/MyAppointments/AppointmentsPage'
import PageHeader from '../../components/MyAppointments/PageHeader'
import UpcomingAppointments from '../../components/MyAppointments/UpcomingAppointments'
import AppointmentCard from '../../components/MyAppointments/AppointmentCard'
import PastAppointments from '../../components/MyAppointments/PastAppointments'
import PastAppointmentCard from '../../components/MyAppointments/PastAppointmentCard'

const MyAppointments = () => {
  return (
    <div>
      <AppointmentsPage/>
      <PageHeader/>
      <UpcomingAppointments/>
      <AppointmentCard/>
      <PastAppointments/>
      <PastAppointmentCard/>
    </div>
  )
}

export default MyAppointments
