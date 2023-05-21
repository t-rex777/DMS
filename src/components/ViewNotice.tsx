import React, { useEffect, useState } from 'react'
import { getNotice, IGetNoticeProps } from '../api/notice'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import { getTimeTableDropdown } from '../api/timetable'
import { IBatchesAndCourses } from './AddTimetable'
import { ICourse } from './AddNotice'
import { toast } from 'react-toastify'

interface INotice {
  batchId: number
  course_id: number
  notice: string
}

const ViewNotice = () => {
  const [notice, setNotice] = useState<INotice[]>([])
  const { userId } = useAuthState()

  const [batches, setBatches] = useState<IBatchesAndCourses[]>([])
  const [courses, setCourses] = useState<ICourse[]>([])
  const [error, setError] = useState(false)

  const { register, handleSubmit, setValue } = useForm<IGetNoticeProps>()

  useEffect(() => {
    void (async () => {
      try {
        const res = await getTimeTableDropdown()
        if (res.data.result === false) {
          setError(true)
          throw new Error('No notice found!')
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

  const onSubmit: SubmitHandler<IGetNoticeProps> = async (data) => {
    try {
      const res = await getNotice(data)

      if (res.data.result === false) throw new Error('Something went wrong!')
      toast.success('Notices fetched')

      setNotice(res.data.result)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <div className='mb-3 font-semibold text-3xl'>Notice</div>
      {error ? (
        <div>No notice found!</div>
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
            <div className='flex flex-col'>
              <label>Select a batch</label>
              <select
                {...register('batch_id', { required: true })}
                className='select select-primary w-full max-w-sm'
              >
                <option disabled selected>
                  Choose the batch
                </option>
                {batches.map(({ batch_code, batch_id, batch_name }) => (
                  <option key={batch_code} value={batch_id}>
                    {batch_name}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label>Choose a course</label>
              <select
                {...register('course_id', { required: true })}
                className='select select-primary w-full max-w-sm'
              >
                <option disabled selected>
                  Choose the course
                </option>
                {courses.map(({ course_code, course_id, course_name }) => (
                  <option key={course_code} value={course_id}>
                    {course_name}
                  </option>
                ))}
              </select>
            </div>

            <button type='submit' className='btn btn-primary max-w-sm'>
              View Notice
            </button>
          </form>

          <div className='mt-4 flex flex-col gap-4'>
            {notice.length > 0 ? (
              notice.map(({ notice, course_id, batchId }, index) => {
                return (
                  <div key={index}>
                    <div className='card w-96 shadow-xl bg-slate-800 text-white'>
                      <div className='card-body'>
                        <h2 className=''>Course id - {course_id}</h2>
                        <h2 className=''>Batch id - {batchId}</h2>
                        <div className='whitespace-pre-wrap'>{notice}</div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewNotice
