import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import { IUploadFeedbackProps, getFeedbackDropdown, uploadFeedback } from '../api/feedback'

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

  const [batches, setBatches] = useState<IBatch[]>([
    { batch_code: 'rwg', batch_id: 'gr', batch_name: 'rwg' },
  ])
  const [courses, setCourses] = useState<ICourse[]>([
    { course_code: 'rgw', course_id: 'rwg', course_name: 'rwg' },
  ])

  useEffect(() => {
    void (async () => {
      const res = await getFeedbackDropdown(userId)

      setBatches(res.data.batches)
      setCourses(res.data.courses)
    })()
  }, [])

  const { register, handleSubmit } = useForm<IUploadFeedbackProps>()

  const onSubmit: SubmitHandler<IUploadFeedbackProps> = async (data) => {
    await uploadFeedback({
      ...data,
      userId,
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
        <div className='form-control w-full max-w-xs'>
          <div className='font-semibold'>Upload the Feedback</div>

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
            <span className='label-text -mb-4'>Write the Feedback</span>
          </label>
          <textarea
            {...register('feedbackData')}
            rows={5}
            className='textarea textarea-primary w-full max-w-xs'
            placeholder='Bio'
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
