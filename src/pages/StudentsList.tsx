import React, { useEffect, useState } from 'react'
import { getAllStudents } from '../api/students'
import { getUser } from '../helpers/getUser'
import AppLayout from '../AppLayout'
import { format } from 'date-fns'

const StudentsList = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    void (async () => {
      const res = await getAllStudents()
      setStudents(res.data.result.map(getUser))
    })()
  }, [])

  return (
    <AppLayout>
      <h1 className='text-3xl font-semibold mb-4'>Approve Users</h1>
      <table className='table table-zebra w-full'>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ dob, email, name, role, userId }, index) => (
            <tr key={index}>
              <th>{userId}</th>
              <td>{name}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>{format(new Date(dob), 'dd LLLL yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  )
}

export default StudentsList
