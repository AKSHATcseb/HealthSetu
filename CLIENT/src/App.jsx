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
// import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
      {/* <Navbar /> */}

      <Routes>
        <Route path='/' element={< LandingPage/>} />
        <Route path='/loginsignup' element={< LoginSignup/>} />
        <Route path='/dashboard' element={< Dashboard/>} />
        <Route path='/myappointments' element={< MyAppointments/>} />
        <Route path='/bookappointment' element={< BookingPage/>} />
        <Route path='/center/:center_id' element={< CenterDetails/>} />
        <Route path='/centerdashboard' element={< CenterDashboard/>} />
        <Route path='/centerdetailsform' element={< CenterDetailsForm/>} />
        <Route path='/center/:center_id/bookingconfirmation' element={< BookingConfirmation/>} />
        <Route path='/profile' element={< PatientProfile/>} />
      </Routes>

      {/* <Footer /> */}
    </>
  )
}

export default App