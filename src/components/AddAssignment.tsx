import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { getBatches, uploadAssignment } from '../api/assignment'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

interface IQuestions {
  questions: string[]
  batchId: string
  courseId: string
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

  useEffect(() => {
    void (async () => {
      const res = await getBatches('')

      setBatches(res.data.batches)
      setCourses(res.data.courses)
    })()
  }, [])

  const { control, register, handleSubmit } = useForm<IQuestions>({
    defaultValues: { questions: ['question 1'], batchId: '', courseId: '' },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })

  const addQuestion = () => {
    append('')
  }

  const onSubmit: SubmitHandler<IQuestions> = async (data) => {
    await uploadAssignment({
      ...data,
      userId: '',
    })
  }
  return (
    <AppLayout>
      <div className='flex flex-col gap-4'>
        <div className='form-control w-full max-w-xs'>
          <div className='font-semibold'>Upload the Assignment</div>

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
    </AppLayout>
  )
}

export default AddAssignment
