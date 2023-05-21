import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AppLayout from '../AppLayout'
import { getAllStudents } from '../api/students'
import { getDateFromFormattedString } from '../helpers/getDate'
import { getUser } from '../helpers/getUser'
import { useAuthState } from '../store/auth'

const StudentsList = () => {
  const { role: accountRole } = useAuthState()
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    void (async () => {
      try {
        const res = await getAllStudents()
        if (res.data.result === false) {
          setError(true)
          throw new Error('No student available')
        }
        setStudents(res.data.result.map(getUser))
      } catch (error) {
        toast.error(error.message)
      }
    })()
  }, [])

  return (
    <AppLayout>
      <h1 className='text-3xl font-semibold mb-4'>Student Details</h1>
      {error ? (
        <div>No student available</div>
      ) : (
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
      )}
    </AppLayout>
  )
}

export default StudentsList
