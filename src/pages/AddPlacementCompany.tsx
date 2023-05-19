import React from 'react'
import AppLayout from '../AppLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import { IAddPlacementCompany, addPlacementCompany } from '../api/placement'
import { toast } from 'react-toastify'

const AddPlacementCompany = () => {
  const { register, handleSubmit } = useForm<IAddPlacementCompany>()

  const { userId } = useAuthState()

  const onSubmit: SubmitHandler<IAddPlacementCompany> = async (data) => {
    try {
      const { data: result } = await addPlacementCompany({
        ...data,
        user_id: userId,
      })
      if (result === false) throw new Error('Something went wrong!')
      toast.success('Placement added successfully!')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <AppLayout>
      <div className='flex flex-col gap-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
          <div className='form-control w-full max-w-sm'>
            <div className='font-semibold mb-4'>Add a Placement Company</div>

            <div className='flex flex-col gap-4'>
              <input
                {...register('company_name', { required: true })}
                placeholder='Company Name'
                className='input input-bordered input-primary w-full'
              />
              <input
                {...register('role', { required: true })}
                placeholder='Role'
                className='input input-bordered input-primary w-full'
              />
              <input
                {...register('ctc', { required: true })}
                placeholder='CTC'
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

export default AddPlacementCompany
