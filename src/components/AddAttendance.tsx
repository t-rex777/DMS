import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import { IUploadAttendanceProps, uploadAttendance } from '../api/attendance'
import { getAssignmentDropdown } from '../api/assignment'
import { getAllStudents, getStudentsOfaCourse } from '../api/students'
import { getUser } from '../helpers/getUser'
import { IUserDetails } from './ApprovalTable'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

export interface IBatch {
  batch_id: string
  batch_code: string
  batch_name: string
}

export interface ICourse {
  course_id: string
  course_code: string
  course_name: string
}

const AddAttendance = () => {
  const { userId } = useAuthState()

  const [students, setStudents] = useState([])

  const [batches, setBatches] = useState<IBatch[]>([])
  const [courses, setCourses] = useState<ICourse[]>([])

  const { register, handleSubmit, watch, setValue } = useForm<IUploadAttendanceProps>()

  const course_id = watch('course_id')

  useEffect(() => {
    void (async () => {
      const res = await getAssignmentDropdown(userId)

      setBatches(res.data.result[0].batches)
      setCourses(res.data.result[1].courses)
      setValue('batch_id', res.data.result[0].batches[0]?.batch_id)
      setValue('course_id', res.data.result[1].courses[0]?.course_id)
    })()
  }, [])

  const onSubmit: SubmitHandler<IUploadAttendanceProps> = async (data) => {
    try {
      const {
        data: { result },
      } = await uploadAttendance({
        ...data,
        students_list: students.map((s: IUserDetails) => Number(s.userId)),
        attendance_list: students.map((s: IUserDetails) => {
          return Number((data.attendance_list as unknown as string[]).includes(s.userId.toString()))
        }),
        user_id: userId,
        date: format(new Date(), 'dd/mm/yyyy'),
      })

      if (result === false) throw new Error('Something went wrong!')
      toast.success('Attendance uploaded successfully!')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!course_id) return

    void (async () => {
      const {
        data: { result: students },
      } = await getStudentsOfaCourse(course_id)

      const {
        data: { result: studentsList },
      } = await getAllStudents()
      console.log({ studentsList, students })

      setStudents(
        studentsList
          .filter((d: any) => students.some((s: any) => s.student_user_id === d[0]))
          .map(getUser),
      )
    })()
  }, [course_id])

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
        <div className='form-control w-full max-w-xs'>
          <div className='font-semibold'>Upload the Attendance</div>

          <label className='label'>
            <span className='label-text'>Pick the Batch</span>
          </label>
          <select
            {...register('batch_id', { required: true })}
            className='select select-primary w-full max-w-xs'
          >
            {batches.map(({ batch_code, batch_id, batch_name }) => (
              <option key={batch_code} value={batch_id}>
                {batch_name}
              </option>
            ))}
          </select>
        </div>

        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Pick the course</span>
          </label>
          <select
            {...register('course_id', { required: true })}
            className='select select-primary w-full max-w-xs'
          >
            {courses.map(({ course_code, course_id, course_name }) => (
              <option key={course_code} value={course_id}>
                {course_name}
              </option>
            ))}
          </select>
        </div>

        <div className='w-full flex flex-col gap-4'>
          <label className='label'>
            <span className='label-text -mb-4'>Add the Attendance</span>
          </label>

          <table className='table table-zebra w-full'>
            <thead>
              <tr>
                <th></th>
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
                  <td>
                    <input
                      className='checkbox checkbox-sm'
                      type='checkbox'
                      value={userId}
                      {...register('attendance_list')}
                    />
                  </td>
                  <th>{userId}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>{dob}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type='submit' className='btn btn-primary w-40'>
            Upload
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddAttendance
