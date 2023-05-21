import React, { useEffect, useState } from 'react'
import { ICourse } from './AddNotice'
import { getAllCoursesForStudents } from '../api/feedback'
import { useAuthState } from '../store/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IViewAttendanceProps, getAllOperationDates, viewAttendance } from '../api/attendance'
import { toast } from 'react-toastify'
import { IUserDetails } from './ApprovalTable'
import { getUser } from '../helpers/getUser'
import { getDateFromFormattedString } from '../helpers/getDate'
import { format } from 'date-fns'
import { IStudentDetails } from './ViewFeedback'

interface IAttendance {
  attendanceList: number[]
  course_id: number
  studentList: IStudentDetails[]
}

const ViewAttendance = () => {
  const { userId } = useAuthState()

  const [courses, setCourses] = useState<ICourse[]>([])
  const [dates, setDates] = useState<string[]>([])
  const [error, setError] = useState(false)
  const [attendance, setAttendance] = useState<IAttendance>()

  const { handleSubmit, register } = useForm<IViewAttendanceProps>()

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await getAllCoursesForStudents(userId)
        if (data.result === false) {
          setError(true)
          throw new Error('You have not assigned any batch and course')
        }
        setCourses(data.result.courses)

        const {
          data: { result: dates },
        } = await getAllOperationDates()

        if (dates.length === 0) throw new Error('There are no attendance taken')
        setDates(dates)
      } catch (error) {
        toast.error(error.message)
      }
    })()
  }, [])

  const onSubmit: SubmitHandler<IViewAttendanceProps> = async (data) => {
    try {
      const {
        data: { result },
      } = await viewAttendance({
        course_id: data.course_id,
        user_id: userId,
        date: data.date,
      })

      if (result.length === 0) throw new Error('There is no attendance record found')
      toast.success('Attendance fetched')

      setAttendance(result[0])
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <h1 className='text-3xl font-semibold mb-4'>Attendance</h1>
      {error ? (
        <div>You have not assigned any batch and course</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label>Select a course</label>
            <select
              {...register('course_id', { required: true })}
              className='select select-primary w-full max-w-sm'
            >
              <option disabled selected>
                Choose the course
              </option>
              {courses.map(({ course_code, course_id, course_name }) => (
                <option key={course_code} value={course_id}>
                  {course_name}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label>Select a date</label>
            <select
              {...register('date', { required: true })}
              className='select select-primary w-full max-w-sm'
            >
              <option disabled selected>
                Choose the date
              </option>
              {dates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          <button type='submit' className='btn btn-primary mt-5 float-right max-w-sm'>
            Show Attendance
          </button>
        </form>
      )}

      {attendance !== undefined && (
        <div className='mt-4'>
          <table className='table table-zebra w-full'>
            <thead>
              <tr>
                <th>UserId</th>
                <th>Name</th>
                <th>Email</th>
                <th>Batch</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendance?.studentList.map(
                ({ student_batch, student_email, student_name, student_user_id }, index) => {
                  return (
                    <tr key={index}>
                      <th>{student_user_id}</th>
                      <td>{student_name}</td>
                      <td>{student_email}</td>
                      <td>{student_batch}</td>

                      <td>{attendance.attendanceList[index] === 1 ? 'Present' : 'Absent'}</td>
                    </tr>
                  )
                },
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ViewAttendance
