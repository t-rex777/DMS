import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAssignCourseParams, assignCourse, getAllCourses, getAllFaculties } from '../api/course'
import { useAuthState } from '../store/auth'
import { getUser } from '../helpers/getUser'
import { IUserDetails } from '../components/ApprovalTable'
import { ICourse } from '../components/AddNotice'
import { toast } from 'react-toastify'

const AssignCourse = () => {
  const { register, handleSubmit } = useForm<IAssignCourseParams>()
  const { userId } = useAuthState()

  const [faculties, setFaculties] = useState<IUserDetails[]>([])
  const [courses, setCourses] = useState<ICourse[]>([])
  const [error, setError] = useState(false)

  const fetchFaculties = async () => {
    try {
      const res = await getAllFaculties()
      if (res.data.result === false) {
        setError(true)
        throw new Error('No falculty available')
      }
      setFaculties(res.data.result.map((user: unknown[]) => getUser(user)))
    } catch (error) {
      toast.error(error.message)
    }
  }
  const fetchCourses = async () => {
    try {
      const res = await getAllCourses(Number(userId))
      if (res.data.result === false) {
        setError(true)
        throw new Error('No course available')
      }
      setCourses(res.data.result)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchFaculties()
    fetchCourses()
  }, [])

  const onSubmit: SubmitHandler<IAssignCourseParams> = async (data) => {
    try {
      if (
        data.course_id.toString() === 'Pick the course' ||
        data.faculty_id.toString() === 'Pick the faculty'
      )
        throw new Error('Please enter the details')

      const {
        data: { result },
      } = await assignCourse({
        user_id: Number(userId),
        course_id: data.course_id,
        faculty_id: data.faculty_id,
      })

      if (result === false) throw new Error('Something went wrong!')

      toast.success('Course assigned successfully!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <AppLayout>
      <div className='font-semibold'>Assign a course</div>
      {error ? (
        <div>Either faculty or batch is not available</div>
      ) : (
        <div className='flex flex-col gap-4'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
            <div className='form-control w-full max-w-sm'>
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
      )}
    </AppLayout>
  )
}

export default AssignCourse
