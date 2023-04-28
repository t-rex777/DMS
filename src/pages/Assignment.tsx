import React from 'react'
import AppLayout from '../AppLayout'
import { useFieldArray, useForm } from 'react-hook-form'

interface IQuestions {
  questions: string[]
}

const Assignment = () => {
  const { control, register, handleSubmit } = useForm<IQuestions>({
    defaultValues: { questions: ['Enter the Question'] },
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'questions',
  })

  const addQuestion = () => {
    append('')
  }

  const onSubmit = (data: IQuestions) => console.log(data)

  return (
    <AppLayout>
      <div className='font-semibold mb-3'>Upload the Time Table</div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex  gap-4'>
        <div className='w-full flex flex-col gap-4'>
          {fields.map((field, index) => (
            <input
              key={field.id}
              {...register(`questions.${index}`)}
              type='text'
              placeholder='Enter the question'
              className='input input-bordered input-primary w-full max-w-sm'
            />
          ))}
        </div>
        <div className='flex w-full max-w-xs gap-4'>
          <button type='button' className='btn btn-primary w-40' onClick={addQuestion}>
            Add Question
          </button>
          <button type='submit' className='btn btn-primary w-40'>
            Upload
          </button>
        </div>
      </form>
    </AppLayout>
  )
}

export default Assignment
