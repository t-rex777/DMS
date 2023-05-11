import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAssignCourseParams, assignCourse, getAllCourses, getAllFaculties } from '../api/course'
import { useAuthState } from '../store/auth'
import { getUser } from '../helpers/getUser'
import { IUserDetails } from '../components/ApprovalTable'
import { ICourse } from '../components/AddNotice'

const AssignCourse = () => {
  const { register, handleSubmit } = useForm<IAssignCourseParams>()
  const { userId } = useAuthState()

  const [faculties, setFaculties] = useState<IUserDetails[]>([])
  const [courses, setCourses] = useState<ICourse[]>([])

  const fetchFaculties = async () => {
    const res = await getAllFaculties()
    setFaculties(res.data.result.map((user: unknown[]) => getUser(user)))
  }

  const fetchCourses = async () => {
    const res = await getAllCourses(Number(userId))
    setCourses(res.data.result)
  }

  useEffect(() => {
    fetchFaculties()
    fetchCourses()
  }, [])

  const onSubmit: SubmitHandler<IAssignCourseParams> = async (data) => {
    if (
      data.course_id.toString() === 'Pick the course' ||
      data.faculty_id.toString() === 'Pick the faculty'
    )
      return

    await assignCourse({
      user_id: Number(userId),
      course_id: data.course_id,
      faculty_id: data.faculty_id,
    })
  }

  return (
    <AppLayout>
      <div className='flex flex-col gap-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
          <div className='form-control w-full max-w-sm'>
            <div className='font-semibold mb-4'>Assign a course</div>

            <div className='flex flex-col gap-4'>
              <select
                {...register('faculty_id', { required: true })}
                className='select select-primary w-full max-w-sm'
              >
                <option disabled selected>
                  Pick the faculty
                </option>
                {faculties.map(({ name, userId }) => (
                  <option key={userId} value={userId}>
                    {name}
                  </option>
                ))}
              </select>

              <select
                {...register('course_id', { required: true })}
                className='select select-primary w-full max-w-sm'
              >
                <option disabled selected>
                  Pick the course
                </option>
                {courses.map(({ course_id, course_name }) => (
                  <option key={course_id} value={course_id}>
                    {course_name}
                  </option>
                ))}
              </select>
              <button type='submit' className='btn btn-primary w-full'>
                Assign
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}

export default AssignCourse
