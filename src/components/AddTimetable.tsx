import React, { useEffect, useState } from 'react'
import { IUploadTimeTableProps, getTimeTableDropdown, uploadTimeTable } from '../api/timetable'
import { useAuthState } from '../store/auth'
import { IBatch, ICourse } from './AddNotice'
import { SubmitHandler, useForm } from 'react-hook-form'

export interface IBatchesAndCourses extends IBatch {
  courses: {
    courses: ICourse[]
  }
}

const AddTimetable = () => {
  const { userId } = useAuthState()

  const [batches, setBatches] = useState<IBatchesAndCourses[]>([])
  const [courses, setCourses] = useState<ICourse[]>([])

  const { register, handleSubmit, watch, setValue } = useForm<IUploadTimeTableProps>()

  useEffect(() => {
    void (async () => {
      const res = await getTimeTableDropdown()

      const batches = res.data.result as IBatchesAndCourses[]

      setValue('batch_id', batches[0]?.batch_id)
      setBatches(batches)

      setCourses(batches[0].courses.courses)
    })()
  }, [])

  const selectedBatch = watch('batch_id')

  const onSubmit: SubmitHandler<IUploadTimeTableProps> = async ({
    batch_id: batchId,
    course_id: courseId,
    data,
  }) => {
    const reader = new FileReader()
    reader.readAsDataURL(data[0] as unknown as Blob)

    reader.onload = async () => {
      const base64Image = 'data:image/png;base64,' + (reader.result as string)?.split(',')[1]

      await uploadTimeTable({
        batch_id: batchId,
        course_id: courseId,
        data: base64Image,
        user_id: userId,
      })
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
        <div className='form-control w-full max-w-sm'>
          <div className='font-semibold mb-4'>Upload the Timetable</div>

          <label> Select a batch</label>
          <select
            {...register('batch_id', { required: true })}
            className='select select-primary w-full max-w-sm'
            onChange={(e) => {
              const {
                courses: { courses },
              } = batches.find((d) => {
                return Number(d.batch_id) === Number(e.target.value)
              })

              setCourses(courses)
            }}
          >
            <option disabled>Select a batch</option>
            {batches.map(({ batch_code, batch_id, batch_name }) => (
              <option key={batch_code} value={batch_id}>
                {batch_name}
              </option>
            ))}
          </select>
        </div>

        {selectedBatch !== 'Select a batch' && (
          <div className='form-control w-full max-w-sm'>
            <label> Select a course</label>
            <select
              {...register('course_id', { required: true })}
              className='select select-primary w-full max-w-sm'
            >
              <option disabled>Select a course</option>
              {courses.map(({ course_code, course_id, course_name }) => (
                <option key={course_code} value={course_id}>
                  {course_name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className='w-full flex flex-col gap-4'>
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
