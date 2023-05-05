import React, { useEffect, useState } from 'react'
import { getNoticeDropdowns } from '../api/notice'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  IUploadExternalResultsProps,
  getExternalResult,
  getExternalResultsDropdowns,
} from '../api/externalResult'
import {
  IUploadInternalResultsProps,
  getInternalResult,
  getInternalResultsDropdowns,
} from '../api/internalResult'
import { useAuthState } from '../store/auth'

export interface IViewResultProps {
  type: 'External' | 'Internal'
}

const ViewResult = ({ type }: IViewResultProps) => {
  const { userId } = useAuthState()

  const [result, setResult] = useState('')

  const [batches, setBatches] = useState([])
  const [courses, setCourses] = useState([])

  const { register, handleSubmit } = useForm<
    | Pick<IUploadInternalResultsProps, 'batchId' | 'courseId'>
    | Pick<IUploadExternalResultsProps, 'batchId' | 'courseId'>
  >()

  useEffect(() => {
    const api = type === 'External' ? getExternalResultsDropdowns : getInternalResultsDropdowns

    void (async () => {
      const res = await api(userId)
      setBatches(res.data.batches)
      setCourses(res.data.courses)
    })()
  }, [])

  const onSubmit: SubmitHandler<
    | Pick<IUploadInternalResultsProps, 'batchId' | 'courseId'>
    | Pick<IUploadExternalResultsProps, 'batchId' | 'courseId'>
  > = async (data) => {
    const api = type === 'External' ? getExternalResult : getInternalResult

    const res = await api(data as any)
    setResult(res.data)
  }

  return (
    <div>
      <div className='mb-3 font-semibold text-3xl'>{type} Result</div>
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

      <div>{result && <img src={result} alt='result' />}</div>
    </div>
  )
}

export default ViewResult
