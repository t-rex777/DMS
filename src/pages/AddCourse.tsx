import React from 'react'
import AppLayout from '../AppLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { addCourse } from '../api/course'
import { useAuthState } from '../store/auth'
import { toast } from 'react-toastify'

export interface IAddCourse {
  courseName: string
  courseCode: string
}

const AddCourse = () => {
  const { register, handleSubmit } = useForm<IAddCourse>()

  const { userId } = useAuthState()

  const onSubmit: SubmitHandler<IAddCourse> = async (data) => {
    try {
      const {
        data: { result },
      } = await addCourse({
        user_id: Number(userId),
        course_code: data.courseCode,
        course_name: data.courseName,
      })
      if (result === false) throw new Error('Please check for the valid values passes')
      toast.success('Course added successfully')
    } catch (error: any) {
      toast.error(error.message)
    }
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
