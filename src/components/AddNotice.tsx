import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IUploadNoticeProps, uploadNotice } from '../api/notice'
import { useAuthState } from '../store/auth'
import { getAssignmentDropdown } from '../api/assignment'
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

const AddNotice = () => {
  const { userId } = useAuthState()

  const [batches, setBatches] = useState<IBatch[]>([])
  const [courses, setCourses] = useState<ICourse[]>([])

  const { register, handleSubmit, setValue } = useForm<IUploadNoticeProps>()

  useEffect(() => {
    void (async () => {
      const res = await getAssignmentDropdown(userId)

      setBatches(res.data.result[0].batches)
      setCourses(res.data.result[1].courses)
      setValue('batch_id', res.data.result[0].batches[0]?.batch_id)
      setValue('course_id', res.data.result[1].courses[0]?.course_id)
    })()
  }, [])

  const onSubmit: SubmitHandler<IUploadNoticeProps> = async (data) => {
    try {
      const {
        data: { result },
      } = await uploadNotice({
        ...data,
        user_id: userId,
      })
      if (result === false) throw new Error('Something went wrong!')
      toast.success('Notice uploaded successfully!')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
        <div className='form-control w-full max-w-sm'>
          <div className='font-semibold mb-4'>Upload the Notice</div>

          <label>Pick the Batch</label>
          <select
            {...register('batch_id', { required: true })}
            className='select select-primary w-full max-w-sm'
          >
            {batches.map(({ batch_code, batch_id, batch_name }) => (
              <option key={batch_code} value={batch_id}>
                {batch_name}
              </option>
            ))}
          </select>
        </div>

        <div className='form-control w-full max-w-sm'>
          <label>Pick the Course</label>

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
          <label>Write the notice</label>

          <textarea
            {...register('notice_data')}
            rows={5}
            className='textarea textarea-primary w-full max-w-sm'
            placeholder='Notice'
          ></textarea>
        </div>

        <button type='submit' className='btn btn-primary w-40'>
          Upload
        </button>
      </form>
    </div>
  )
}

export default AddNotice
