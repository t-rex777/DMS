import React, { useEffect, useState } from 'react'
import { IUploadTimeTableProps, getTimeTableDropdown, uploadTimeTable } from '../api/timetable'
import { useAuthState } from '../store/auth'
import { IBatch, ICourse } from './AddNotice'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddTimetable = () => {
  const { userId } = useAuthState()

  const [batches, setBatches] = useState<IBatch[]>([
    { batch_code: 'rwg', batch_id: 'gr', batch_name: 'rwg' },
  ])
  const [courses, setCourses] = useState<ICourse[]>([
    { course_code: 'rgw', course_id: 'rwg', course_name: 'rwg' },
  ])

  useEffect(() => {
    void (async () => {
      const res = await getTimeTableDropdown()

      setBatches(res.data.batches)
      setCourses(res.data.courses)
    })()
  }, [])

  const { register, handleSubmit } = useForm<IUploadTimeTableProps>()

  const onSubmit: SubmitHandler<IUploadTimeTableProps> = async ({ batchId, courseId, data }) => {
    console.log(data[0])
    const formData = new FormData()
    formData.append('file', data[0])

    await uploadTimeTable({
      batchId,
      courseId,
      data: formData,
      userId,
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
        <div className='form-control w-full max-w-sm'>
          <div className='font-semibold'>Upload the Timetable</div>

          <label className='label'>
            <span className='label-text'>Pick the Batch</span>
          </label>
          <select
            {...register('batchId', { required: true })}
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
          <label className='label'>
            <span className='label-text'>Pick the Course</span>
          </label>
          <select
            {...register('courseId', { required: true })}
            className='select select-primary w-full max-w-sm'
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
            <span className='label-text -mb-4'></span>
          </label>

          <input
            accept='image/png, image/gif, image/jpeg'
            type='file'
            {...register('data')}
            className='file-input file-input-bordered file-input-primary w-full max-w-sm'
          />
        </div>

        <button type='submit' className='btn btn-primary w-40'>
          Upload
        </button>
      </form>
    </div>
  )
}

export default AddTimetable
