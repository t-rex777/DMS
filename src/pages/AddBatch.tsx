import React from 'react'
import AppLayout from '../AppLayout'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuthState } from '../store/auth'
import { toast } from 'react-toastify'
import { IAddBatchProps, addBatch } from '../api/batch'

const AddBatch = () => {
  const { register, handleSubmit } = useForm<IAddBatchProps>()

  const { userId } = useAuthState()

  const onSubmit: SubmitHandler<IAddBatchProps> = async ({ batch_code, batch_name }) => {
    try {
      const {
        data: { result },
      } = await addBatch({
        batch_code,
        batch_name,
        user_id: Number(userId),
      })
      if (result === false) throw new Error('Please check for the valid values passed')
      toast.success('Batch added successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <AppLayout>
      <div className='flex flex-col gap-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
          <div className='form-control w-full max-w-sm'>
            <div className='font-semibold mb-4'>Add a batch</div>

            <div className='flex flex-col gap-4'>
              <input
                {...register('batch_code', { required: true })}
                placeholder='Batch Code'
                className='input input-bordered input-primary w-full'
              />
              <input
                {...register('batch_name', { required: true })}
                placeholder='Batch Name'
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

export default AddBatch
