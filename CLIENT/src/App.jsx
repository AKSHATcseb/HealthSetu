import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Public/LandingPage'
import MyAppointments from './pages/Patient/MyAppointments'
import BookingPage from './pages/Patient/BookingPage'
import CenterDetails from './pages/Patient/CenterDetails'
import CenterDashboard from './pages/Center/CenterDashboard'
import BookingConfirmation from './pages/Patient/BookingConfirmation'
import PatientProfile from './pages/Patient/PatientProfile'
import EditProfile from './pages/Patient/EditProfile'
import PatientDashboard from './pages/Patient/PatientDashboard'
import SelectRolePage from './pages/auth/SelectRolePage'
import LoginForm from './components/loginSignup/LoginForm'
import Register from './components/loginSignup/Register'
import CenterVerificationForm from './components/loginSignup/CenterVerificationForm'
import CenterDetailsForm from './components/loginSignup/CenterDetailsForm'
import PatientDetailsForm from './components/loginSignup/PatientDetailsForm'
import RoleSelector from './components/loginSignup/RoleSelector'
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
        <Route path="/center/verify" element={<CenterVerificationForm />} />

        <Route path='/patient/:pid/dashboard' element={<PatientDashboard />} />
        <Route path='/patient/:pid/myappointments' element={<MyAppointments />} />
        <Route path='/patient/:pid/bookappointment' element={<BookingPage />} />
        <Route path='/center/:cid' element={<CenterDetails />} />
        <Route path='/centerdashboard/:cid' element={<CenterDashboard />} />
        <Route path='/:pid/:cid/bookingconfirmation' element={<BookingConfirmation />} />
        <Route path='/patient/:pid/profile' element={<PatientProfile />} />
        <Route path='/patient/:pid/profile/edit' element={<EditProfile />} />
      </Routes>
    </>
  )
}

export default App