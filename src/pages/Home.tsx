import React from 'react'
import AppLayout from '../AppLayout'

const Home = () => {
  return (
    <AppLayout>
      <div>
        Our platform is designed to revolutionize the way college departments manage their
        information, streamline administrative tasks, and enhance overall efficiency. With a
        comprehensive set of features, we aim to provide a user-friendly and intuitive experience
        for faculty, staff, and students alike.
      </div>

      <div className='font-semibold text-xl my-3'>Key Features:</div>
      <ul className='flex flex-col gap-3'>
        <li>
          Centralized Information Tracking: Our system tracks all essential information related to
          courses, students, exams, and more. You can easily access and manage these records,
          ensuring that all relevant data is organized and readily available.
        </li>
        <li>
          Course Management: Managing courses is a breeze with our platform. You can efficiently
          create, update, and manage course information, including descriptions, schedules, and
          prerequisites. This feature ensures accurate and up-to-date course offerings for students.
        </li>
        <li>
          Secure Profiles and Logins: We prioritize the security of user profiles and logins. All
          fields, including profiles, logins, and fees, undergo validation checks to ensure that
          only valid values are accepted. This ensures the integrity and reliability of the data
          stored in the system.
        </li>
        <li>
          Report Generation: Our system generates comprehensive reports on profiles, courses, and
          students. These reports provide valuable insights into the performance and progress of
          various departments, helping administrators make informed decisions.
        </li>
        <li>
          Attendance Shortage Alerts: To improve attendance management, our system includes an alert
          system that notifies administrators and faculty members of any attendance shortages. This
          feature ensures timely intervention and encourages students to maintain regular
          attendance.
        </li>
      </ul>
    </AppLayout>
  )
}

export default Home
