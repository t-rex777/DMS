import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import { IUploadExternalResultsProps, uploadExternalResult } from '../api/externalResult'
import { IUploadInternalResultsProps, uploadInternalResult } from '../api/internalResult'
import { IBatchesAndCourses } from './AddTimetable'
import { getTimeTableDropdown } from '../api/timetable'
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

export interface IAddResutType {
  type: 'External' | 'Internal'
}

const AddResult = ({ type }: IAddResutType) => {
  const { userId } = useAuthState()

  const [batches, setBatches] = useState<IBatchesAndCourses[]>([])
  const [courses, setCourses] = useState<ICourse[]>([])
  const [error, setError] = useState(false)

  const { register, handleSubmit, watch, setValue } = useForm<
    IUploadExternalResultsProps | IUploadInternalResultsProps
  >()

  useEffect(() => {
    void (async () => {
      try {
        const res = await getTimeTableDropdown()

        if (res.data.result === false) {
          setError(true)
          throw new Error('You have not assigned any batch and course')
        }
        const batches = res.data.result as IBatchesAndCourses[]

        setValue('batch_id', batches[0]?.batch_id)
        setBatches(batches)

        setCourses(batches[0].courses.courses)
      } catch (error) {
        toast.error(error.message)
      }
    })()
  }, [])

  const selectedBatch = watch('batch_id')

  const onSubmit: SubmitHandler<
    IUploadExternalResultsProps | IUploadInternalResultsProps
  > = async ({ batch_id, course_id, data }) => {
    try {
      const api = type === 'External' ? uploadExternalResult : uploadInternalResult

      const reader = new FileReader()
      reader.readAsDataURL(data[0] as unknown as Blob)

      reader.onload = async () => {
        const base64Image = 'data:image/png;base64,' + (reader.result as string)?.split(',')[1]

        const {
          data: { result },
        } = await api({
          batch_id,
          course_id,
          data: base64Image,
          user_id: userId,
        })

        if (!result) throw new Error('Something went wrong!')
        toast.success('Result uploaded successfully')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='font-semibold mb-4'>Upload the Result</div>
      {error ? (
        <div className='-mt-4'>You have not assigned any batch and course</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
          <div className='form-control w-full max-w-sm'>
            <label> Select a batch</label>
            <select
              {...register('batch_id', { required: true })}
              className='select select-primary w-full max-w-sm'
              onChange={(e) => {
                const {
                  courses: { courses },
                } = batches.find((d) => {
                  return Number(d.batch_id) === Number(e.target.value)
                }) as IBatchesAndCourses

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
      )}
    </div>
  )
}

export default AddResult
