import { useState } from 'react'
import './App.css'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Public/LandingPage'
import Dashboard from './pages/Patient/Dashboard'
// import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
      {/* <Navbar /> */}

      <Routes>
        <Route path='/' element={< LandingPage/>} />
        <Route path='/dashboard' element={< Dashboard/>} />
      </Routes>

      {/* <Footer /> */}
    </>
  )
}

export default App