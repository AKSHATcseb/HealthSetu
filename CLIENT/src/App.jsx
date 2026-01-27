import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Public/LandingPage'
import MyAppointments from './pages/Patient/MyAppointments'
// import BookingPage from './pages/Patient/BookingPage'
import CenterDetails from './pages/Patient/CenterDetails'
import CenterDashboard from './pages/Center/CenterDashboard'
import BookingConfirmation from './pages/Patient/BookingConfirmation'
import PatientProfile from './pages/Patient/PatientProfile'
import EditProfile from './pages/Patient/EditProfile'
import PatientDashboard from './pages/Patient/PatientDashboard'
import SelectRolePage from './pages/auth/SelectRolePage'
import LoginForm from './components/loginSignup/LoginForm'
import Register from './components/loginSignup/Register'
// import CenterVerificationForm from './components/loginSignup/CenterVerificationForm'
import CenterDetailsForm from './components/loginSignup/CenterDetailsForm'
import PatientDetailsForm from './components/loginSignup/PatientDetailsForm'
import RoleSelector from './components/loginSignup/RoleSelector'
import NewBookingPage from './pages/Patient/NewBookingPage'
import AvailableCenters from './pages/Patient/AvailableCenters'
import ConfirmAppointment from './pages/Patient/ConfirmAppointment'
import Payment from './pages/Patient/Payment'
// import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        {/* AUTH */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/roleselector" element={<SelectRolePage />} />
        <Route path="/register" element={<Register />} />

        {/* AFTER REGISTRATION */}
        <Route path="/patient/details" element={<PatientDetailsForm />} />
        <Route path="/center/details" element={<CenterDetailsForm />} />
        {/* <Route path="/center/verify" element={<CenterVerificationForm />} /> */}

        <Route path='/patient/dashboard' element={<PatientDashboard />} />
        {/* <Route path='/patient/:pid/myappointments' element={<MyAppointments />} /> */}
        <Route path='/patient/myappointments' element={<MyAppointments />} />
        {/* <Route path='/patient/:pid/bookappointment' element={<NewBookingPage />} /> */}
        <Route path='/patient/bookappointment' element={<NewBookingPage />} />
        <Route path='/center/:cid' element={<CenterDetails />} />
        <Route path='/center/dashboard' element={<CenterDashboard />} />
        <Route path='/patient/:pid/bookappointment/:cid' element={<BookingConfirmation />} />
        <Route path='/patient/bookingconfirmation' element={<BookingConfirmation />} />
        {/* <Route path='/patient/:pid/profile' element={<PatientProfile />} /> */}
        <Route path='/patient/profile' element={<PatientProfile />} />
        {/* <Route path='/patient/:pid/profile/edit' element={<EditProfile />} /> */}
        <Route path='/patient/profile/edit' element={<EditProfile />} />
        <Route path='/patient/bookappointment/searchresults' element={<AvailableCenters />} />
        <Route path='/patient/bookappointment/searchresults/confirm' element={<ConfirmAppointment />} />/
        <Route path='/confirm' element={<Payment />} />/
      </Routes>
    </>
  )
}

export default App