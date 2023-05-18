import React, { useEffect, useState } from 'react'
import { ICourse } from './AddNotice'
import { getAllCoursesForStudents } from '../api/feedback'
import { useAuthState } from '../store/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IViewAttendanceProps, viewAttendance } from '../api/attendance'

const ViewAttendance = () => {
  const { userId } = useAuthState()

  const [courses, setCourses] = useState<ICourse[]>([])
  const [attendance, setAttendance] = useState()

  const { handleSubmit, register } = useForm<IViewAttendanceProps>()

  useEffect(() => {
    void (async () => {
      const { data } = await getAllCoursesForStudents(userId)
      setCourses(data.result.courses)
    })()
  }, [])

  const onSubmit: SubmitHandler<IViewAttendanceProps> = async (data) => {
    const res = await viewAttendance({
      course_id: data.course_id,
      user_id: userId,
    })

    setAttendance(res.data.result)
  }

  return (
    <div>
      <h1 className='text-3xl font-semibold mb-4'>Assignments</h1>

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

        <button type='submit' className='btn btn-primary mt-5 float-right max-w-sm'>
          Show Attendance
        </button>
      </form>
    </div>
  )
}

export default ViewAttendance
