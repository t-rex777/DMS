import React, { useEffect, useState } from 'react'
import { IUploadNoticeProps, getNotice, getBatches } from '../api/notice'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getAllCourses } from '../api/course'
import { useAuthState } from '../store/auth'

const ViewNotice = () => {
  const [notice, setNotice] = useState('')
  const { userId } = useAuthState()

  const [batches, setBatches] = useState([])
  const [courses, setCourses] = useState([])

  const { register, handleSubmit } = useForm<Pick<IUploadNoticeProps, 'batchId' | 'courseId'>>()

  useEffect(() => {
    void (async () => {
      const data1 = await getBatches()
      const data2 = await getAllCourses(Number(userId))
      setBatches(data1.data.result)
      setCourses(data2.data.result)
    })()
  }, [])

  const onSubmit: SubmitHandler<Pick<IUploadNoticeProps, 'batchId' | 'courseId'>> = async (
    data,
  ) => {
    const res = await getNotice(data)
    setNotice(res.data)
  }

  return (
    <div>
      <div className='mb-3 font-semibold text-3xl'>Notice</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          {...register('batchId', { required: true })}
          className='select select-primary w-full max-w-xs'
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

        <select
          {...register('batchId', { required: true })}
          className='select select-primary w-full max-w-xs'
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
      </form>

      <div className='whitespace-pre-wrap'>{notice}</div>
    </div>
  )
}

export default ViewNotice
