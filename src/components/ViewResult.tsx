import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuthState } from '../store/auth'
import { IGetResults, getAllStudentCourses, getResults } from '../api/result'

export interface IResult {
  batchId: number
  courseId: number
  isExternal: boolean
  resultImage: string
}

const ViewResult = () => {
  const { userId } = useAuthState()

  const [result, setResult] = useState<IResult[]>([])
  const [error, setError] = useState(false)

  const [courses, setCourses] = useState([])

  const { register, handleSubmit } = useForm<IGetResults>()

  useEffect(() => {
    void (async () => {
      const res = await getAllStudentCourses(userId)

      if (res.data.result === false) return setError(true)

      setCourses(res.data.result.courses)
    })()
  }, [])

  const onSubmit: SubmitHandler<IGetResults> = async (data) => {
    const res = await getResults({
      course_id: data.course_id,
      user_id: userId,
    })

    setResult(res.data.result)
  }

  return (
    <div>
      {error ? (
        <div>Internal Error 500, Please check if you have assigned a batch</div>
      ) : (
        <>
          <div className='mb-3 font-semibold text-3xl'>Result</div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <label>Select a course</label>
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

            <button type='submit' className='btn btn-primary mt-5 float-right max-w-sm'>
              Show Result
            </button>
          </form>

          <div className='mt-8 flex flex-col gap-4'>
            {result.length > 0 &&
              result.map(({ resultImage, batchId, courseId, isExternal }, index) => (
                <div key={index} className='card card-compact w-full bg-base-100 shadow-xl'>
                  <figure>
                    <img key={index} src={'data:image/png;base64,' + resultImage} alt='result' />
                  </figure>
                  <div className='card-body p-1 flex justify-between flex-row'>
                    <div>
                      <h2 className='card-title'>{isExternal ? 'External' : 'Internal'} Result</h2>
                      <div>
                        <p className='font-semibold'>Batch Id - {batchId} </p>
                        <p className='font-semibold'>Course Id - {courseId} </p>
                      </div>
                    </div>

                    <div className='card-actions p-3'>
                      <button
                        onClick={() => {
                          // Get the Base64 string (example)
                          const base64String = 'data:image/png;base64,' + resultImage

                          // Convert it to a Blob
                          const byteString = atob(base64String.split(',')[1])
                          const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0]
                          const ab = new ArrayBuffer(byteString.length)
                          const ia = new Uint8Array(ab)
                          for (let i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i)
                          }
                          const blob = new Blob([ab], { type: mimeString })

                          // Convert the Blob to a URL object
                          const urlObject = URL.createObjectURL(blob)

                          window.open(urlObject)

                          // Release the URL object when done to free memory
                          URL.revokeObjectURL(urlObject)
                        }}
                        className='btn btn-primary'
                      >
                        Open Image
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ViewResult
