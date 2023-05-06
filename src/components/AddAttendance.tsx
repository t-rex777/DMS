import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import {
  IUploadAttendanceProps,
  getAttendanceDropdowns,
  getStudentsList,
  uploadAttendance,
} from '../api/attendance'
import { userDetails } from './ApprovalTable'

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

  const [students, setStudents] = useState(userDetails)

  const [batches, setBatches] = useState<IBatch[]>([
    { batch_code: 'rwg', batch_id: 'gr', batch_name: 'rwg' },
  ])
  const [courses, setCourses] = useState<ICourse[]>([
    { course_code: 'rgw', course_id: 'rwg', course_name: 'rwg' },
  ])

  const { register, handleSubmit, watch } = useForm<IUploadAttendanceProps>()

  const courseId = watch('courseId')
  const batchId = watch('batchId')

  useEffect(() => {
    void (async () => {
      const res = await getAttendanceDropdowns(userId)

      setBatches(res.data.batches)
      setCourses(res.data.courses)
    })()
  }, [])

  const onSubmit: SubmitHandler<IUploadAttendanceProps> = async (data) => {
    await uploadAttendance({
      ...data,
      students_list: students.map((s) => s.userId),
      attendance_list: students.map((s) => data.attendance_list.includes(s.userId as any)),
      userId,
    })
  }

  useEffect(() => {
    void (async () => {
      const res = await getStudentsList({
        batchId,
        courseId,
        userId,
      })
      setStudents(res.data)
    })()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
        <div className='form-control w-full max-w-xs'>
          <div className='font-semibold'>Upload the Attendance</div>

          <label className='label'>
            <span className='label-text'>Pick the Batch</span>
          </label>
          <select
            {...register('batchId', { required: true })}
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
            {...register('courseId', { required: true })}
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
