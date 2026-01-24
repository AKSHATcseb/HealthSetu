import { useState } from 'react'
import './App.css'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Public/LandingPage'
import LoginSignup from './pages/Public/AuthPage'
import Dashboard from './pages/Patient/Dashboard'
import MyAppointments from './pages/Patient/MyAppointments'
import BookingPage from './pages/Patient/BookingPage'
import CenterDetails from './pages/Patient/CenterDetails'
import CenterDashboard from './pages/Center/CenterDashboard'
import CenterDetailsForm from './components/loginSignup/CenterDetailsForm'
import BookingConfirmation from './pages/Patient/BookingConfirmation'
import PatientProfile from './pages/Patient/PatientProfile'
import EditProfile from './pages/Patient/EditProfile'
// import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/loginsignup' element={<LoginSignup />} />
        <Route path='/patient/:pid/dashboard' element={<Dashboard />} />
        <Route path='/patient/:pid/myappointments' element={<MyAppointments />} />
        <Route path='/patient/:pid/bookappointment' element={<BookingPage />} />
        <Route path='/center/:cid' element={<CenterDetails />} />
        <Route path='/centerdashboard/:cid' element={<CenterDashboard />} />
        <Route path='/centerdetailsform' element={<CenterDetailsForm />} />
        <Route path='/:pid/:cid/bookingconfirmation' element={<BookingConfirmation />} />
        <Route path='/patient/:pid/profile' element={<PatientProfile />} />
        <Route path='/patient/:pid/profile/edit' element={<EditProfile />} />
      </Routes>
    </>
  )
}

export default App