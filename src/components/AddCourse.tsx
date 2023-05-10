import React from 'react'
import AppLayout from '../AppLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { addCourse } from '../api/course'
import { useAuthState } from '../store/auth'

export interface IAddCourse {
  courseName: string
  courseCode: string
}

const AddCourse = () => {
  const { register, handleSubmit, formState } = useForm<IAddCourse>()
  console.log(formState.errors)

  const { userId } = useAuthState()

  const onSubmit: SubmitHandler<IAddCourse> = async (data) => {
    await addCourse({
      user_id: Number(userId),
      course_code: data.courseCode,
      course_name: data.courseName,
    })
  }

  return (
    <AppLayout>
      <div className='flex flex-col gap-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
          <div className='form-control w-full max-w-sm'>
            <div className='font-semibold mb-4'>Add a course</div>

            <div className='flex flex-col gap-4'>
              <input
                {...register('courseCode', { required: true })}
                placeholder='Course Code'
                className='input input-bordered input-primary w-full'
              />
              <input
                {...register('courseName', { required: true })}
                placeholder='Course Name'
                className='input input-bordered input-primary w-full'
              />

              <button type='submit' className='btn btn-primary w-full'>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}

export default AddCourse
