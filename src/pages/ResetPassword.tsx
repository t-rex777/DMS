import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IResetPasswordProps, resetPassword } from '../api/auth'

const ResetPassword = () => {
  const { register, handleSubmit } = useForm<IResetPasswordProps>()

  const onSubmit: SubmitHandler<IResetPasswordProps> = async (data) => {
    await resetPassword(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-secondary w-screen h-screen flex flex-col justify-center items-center gap-2'
    >
      <input
        {...register('oldPassword', { required: true })}
        placeholder='Old Password'
        className='input input-bordered input-primary w-full max-w-sm'
      />
      <input
        {...register('newPassword', { required: true })}
        placeholder='New Password'
        className='input input-bordered input-primary w-full max-w-sm'
      />
      <button type='submit' className='btn btn-primary w-full max-w-sm'>
        Submit
      </button>
    </form>
  )
}

export default ResetPassword
