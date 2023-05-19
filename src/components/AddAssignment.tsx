import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { getAssignmentDropdown, uploadAssignment } from '../api/assignment'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import { toast } from 'react-toastify'

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

  const { control, register, handleSubmit, setValue } = useForm<IQuestions>({
    defaultValues: { questions: ['question 1'], batch: '', course: '' },
  })

  useEffect(() => {
    void (async () => {
      const res = await getAssignmentDropdown(userId)

      setBatches(res.data.result[0].batches)
      setCourses(res.data.result[1].courses)
      setValue('batch', res.data.result[0].batches[0]?.batch_id)
      setValue('course', res.data.result[1].courses[0]?.course_id)
    })()
  }, [])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions' as never,
  })

  const addQuestion = () => {
    append('')
  }

  const onSubmit: SubmitHandler<IQuestions> = async (data) => {
    try {
      const {
        data: { result },
      } = await uploadAssignment({
        ...data,
        user_id: userId,
      })
      if (result === false) throw new Error('Something went wrong!')

      toast.success('Assignment Uploaded Successfully!')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <AppLayout>
      {batches.length === 0 || courses.length === 0 ? (
        <div>You have assigned no batch and course</div>
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='form-control w-full max-w-sm'>
            <div className='font-semibold mb-4'>Upload the Assignment</div>

            <label>Pick the Batch</label>
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
            <label>Pick the Course</label>

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
            <div className='w-full flex flex-col'>
              <label>Enter the question</label>

              <div className='flex flex-col gap-2'>
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
