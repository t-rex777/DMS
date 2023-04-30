import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import UserDetails from './pages/UserDetails'
import TimeTable from './pages/TimeTable'
import Assignment from './pages/Assignment'
import ResetPassword from './pages/ResetPassword'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
