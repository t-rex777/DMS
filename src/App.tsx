import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import UserDetails from './pages/UserDetails'
import TimeTable from './pages/TimeTable'
import Assignment from './pages/Assignment'
import ResetPassword from './pages/ResetPassword'
import Notice from './pages/Notice'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<Signup />} path='/signup' />
        <Route element={<Home />} path='/' />
        <Route element={<UserDetails />} path='/user-details' />
        <Route element={<TimeTable />} path='/timetable' />
        <Route element={<Assignment />} path='/assignment' />
        <Route element={<ResetPassword />} path='/resetpassword' />
        <Route element={<Notice />} path='/notice' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
