import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Approvals from './pages/Approvals'
import UserDetails from './pages/UserDetails'
import TimeTable from './pages/TimeTable'
import Assignment from './pages/Assignment'
import ResetPassword from './pages/ResetPassword'
import Notice from './pages/Notice'
import Result from './pages/Result'
import Attendance from './pages/Attendance'
import Feedback from './pages/Feedback'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<AboutUs />} path='/about-us' />
        <Route element={<ContactUs />} path='/contact-us' />
        <Route element={<Login />} path='/login' />
        <Route element={<Signup />} path='/signup' />
        <Route element={<Approvals />} path='/approvals' />
        <Route element={<UserDetails />} path='/user-details' />
        <Route element={<TimeTable />} path='/timetable' />
        <Route element={<Assignment />} path='/assignment' />
        <Route element={<ResetPassword />} path='/resetpassword' />
        <Route element={<Notice />} path='/notice' />
        <Route element={<Result />} path='/result' />
        <Route element={<Attendance />} path='/attendance' />
        <Route element={<Feedback />} path='/feedback' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
