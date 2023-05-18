import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import {
  IUploadFeedbackProps,
  getAllCoursesForStudents,
  getFeedbackDropdown,
  uploadFeedback,
} from '../api/feedback'

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

const AddFeedback = () => {
  const { userId } = useAuthState()

  const [courses, setCourses] = useState<ICourse[]>([])

  useEffect(() => {
    void (async () => {
      const res = await getAllCoursesForStudents(userId)

      setCourses(res.data.result.courses)
    })()
  }, [])

  const { register, handleSubmit } = useForm<IUploadFeedbackProps>()

  const onSubmit: SubmitHandler<IUploadFeedbackProps> = async (data) => {
    await uploadFeedback({
      ...data,
      user_id: userId,
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
        <div className='form-control w-full max-w-sm'>
          <div className='font-semibold'>Upload the Feedback</div>
        </div>

        <div className='form-control w-full max-w-sm'>
          <label>Select the course</label>
          <select
            {...register('course_id', { required: true })}
            className='select select-primary w-full max-w-sm'
          >
            {courses.map(({ course_code, course_id, course_name }) => (
              <option key={course_code} value={course_id}>
                {course_name}
              </option>
            ))}
          </select>
        </div>

        <div className='w-full flex flex-col'>
          <label>Write the feedback</label>
          <textarea
            {...register('feedback')}
            rows={5}
            className='textarea textarea-primary w-full max-w-sm'
            placeholder='Feedback'
          ></textarea>
        </div>

        <button type='submit' className='btn btn-primary w-40'>
          Upload
        </button>
      </form>
    </div>
  )
}

export default AddFeedback
