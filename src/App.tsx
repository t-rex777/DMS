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
import ErrorPage from './pages/ErrorPage'
import PrivateRoute from './privateRoute'
import AddCourse from './pages/AddCourse'
import AssignCourse from './pages/AssignCourse'
import ProfileReview from './components/ProfileReview'
import StudentsList from './pages/StudentsList'
import AddPlacementCompany from './pages/AddPlacementCompany'
import AddStudentPlacement from './pages/AddStudentPlacement'
import AssignStudentToBatch from './pages/AssignStudentToBatch'
import EditStudentDetails from './pages/EditStudentDetails'
import StudentPlacement from './pages/StudentPlacement'
import AddBatch from './pages/AddBatch'
import AssignBatch from './pages/AssignBatch'

// todo: make separate routes for each role
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<Signup />} path='/signup' />

        <Route element={<PrivateRoute />} path='/'>
          <Route element={<Home />} path='/' />
          <Route element={<AboutUs />} path='/about-us' />
          <Route element={<ContactUs />} path='/contact-us' />
          <Route element={<Approvals />} path='/approvals' />
          <Route element={<AddCourse />} path='/add-course' />
          <Route element={<AssignCourse />} path='/assign-course' />

          <Route element={<UserDetails />} path='/user-details' />
          <Route element={<TimeTable />} path='/timetable' />
          <Route element={<Assignment />} path='/assignment' />
          <Route element={<ResetPassword />} path='/resetpassword' />
          <Route element={<Notice />} path='/notice' />
          <Route element={<Result />} path='/results' />
          <Route element={<Attendance />} path='/attendance' />
          <Route element={<Feedback />} path='/feedbacks' />
          <Route element={<StudentsList />} path='/students' />
          <Route element={<AddPlacementCompany />} path='/placement' />
          <Route element={<AddStudentPlacement />} path='/student-placement' />
          <Route element={<AssignStudentToBatch />} path='/assign-student' />
          <Route element={<EditStudentDetails />} path='/edit-student/:studentId' />
          <Route element={<StudentPlacement />} path='/view-student-placement' />
          <Route element={<AddBatch />} path='/add-batch' />
          <Route element={<AssignBatch />} path='/assign-batch' />
        </Route>

        <Route element={<ErrorPage />} path='*' />
        <Route element={<ProfileReview />} path='/profile-review' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
