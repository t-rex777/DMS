import React, { useEffect, useState } from 'react'
import { getAllStudents } from '../api/students'
import { getUser } from '../helpers/getUser'
import AppLayout from '../AppLayout'
import { format } from 'date-fns'
import { useAuthState } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { getDateFromFormattedString } from '../helpers/getDate'

const StudentsList = () => {
  const { role: accountRole } = useAuthState()
  const navigate = useNavigate()

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
            {accountRole === 'faculty' && <th></th>}
          </tr>
        </thead>
        <tbody>
          {students.map(({ dob, email, name, role, userId }, index) => {
            const { day, month, year } = getDateFromFormattedString(dob)

            return (
              <tr key={index}>
                <th>{userId}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td>{format(new Date(year, month - 1, day), 'dd LLLL yyyy')}</td>
                {accountRole === 'faculty' && (
                  <td
                    onClick={() => {
                      navigate('/edit-student' + '/' + userId, {
                        state: {
                          dob,
                          email,
                          name,
                          role,
                          userId,
                        },
                      })
                    }}
                    className='link link-accent'
                  >
                    Edit
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </AppLayout>
  )
}

export default StudentsList
