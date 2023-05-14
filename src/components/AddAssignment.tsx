import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { getAssignmentDropdown, uploadAssignment } from '../api/assignment'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'

interface IQuestions {
  questions: string[]
  batch: string
  course: string
}

interface IBatch {
  batch_id: string
  batch_code: string
  batch_name: string
}

interface ICourse {
  course_id: string
  course_code: string
  course_name: string
}

const AddAssignment = () => {
  const [batches, setBatches] = useState<IBatch[]>([])
  const [courses, setCourses] = useState<ICourse[]>([])

  const { userId } = useAuthState()

  useEffect(() => {
    void (async () => {
      const res = await getAssignmentDropdown(userId)

      setBatches(res.data.result[0].batches)
      setCourses(res.data.result[1].courses)
    })()
  }, [])

  const { control, register, handleSubmit } = useForm<IQuestions>({
    defaultValues: { questions: ['question 1'], batch: '', course: '' },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions' as never,
  })

  const addQuestion = () => {
    append('')
  }

  const onSubmit: SubmitHandler<IQuestions> = async (data) => {
    await uploadAssignment({
      ...data,
      user_id: userId,
    })
  }

  console.log({ batches, courses })

  return (
    <AppLayout>
      {batches.length === 0 || courses.length === 0 ? (
        <div>You have assigned no batch and course</div>
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='form-control w-full max-w-sm'>
            <div className='font-semibold'>Upload the Assignment</div>

            <label className='label'>
              <span className='label-text'>Pick the Batch</span>
            </label>
            <select
              {...register('batch', { required: true })}
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
              <span className='label-text'>Pick the course</span>
            </label>
            <select
              {...register('course', { required: true })}
              className='select select-primary w-full max-w-sm'
            >
              {courses.map(({ course_code, course_id, course_name }) => (
                <option key={course_code} value={course_id}>
                  {course_name}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4'>
            <div className='w-full flex flex-col gap-4'>
              <label className='label'>
                <span className='label-text -mb-4'>Enter the questions</span>
              </label>
              {fields.map((field, index) => (
                <div key={field.id} className='flex gap-4 items-center'>
                  <input
                    {...register(`questions.${index}`)}
                    type='text'
                    placeholder={`question ${index + 1}`}
                    className='input input-bordered input-primary w-full max-w-sm'
                  />
                  <p className='cursor-pointer' onClick={() => remove(index)}>
                    &#10005;
                  </p>
                </div>
              ))}
            </div>
            <div className='flex w-full max-w-xs gap-4 items-end'>
              <button type='button' className='btn btn-primary w-40' onClick={addQuestion}>
                Add Question
              </button>
              <button type='submit' className='btn btn-primary w-40'>
                Upload
              </button>
            </div>
          </form>
        </div>
      )}
    </AppLayout>
  )
}

export default AddAssignment
