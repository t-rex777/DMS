import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IResetPasswordProps, resetPassword } from '../api/auth'
import { useAuthState } from '../store/auth'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const { userId } = useAuthState()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<IResetPasswordProps>()

  const onSubmit: SubmitHandler<IResetPasswordProps> = async (data) => {
    await resetPassword({ ...data, user_id: userId })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-secondary w-screen h-screen flex flex-col justify-center items-center gap-2'
    >
      <input
        type='password'
        {...register('old_password', { required: true })}
        placeholder='Old Password'
        className='input input-bordered input-primary w-full max-w-sm'
      />
      <input
        type='password'
        {...register('new_password', { required: true })}
        placeholder='New Password'
        className='input input-bordered input-primary w-full max-w-sm'
      />
      <button type='submit' className='btn btn-primary w-full max-w-sm'>
        Submit
      </button>
      <button
        onClick={() => navigate(-1)}
        type='button'
        className='btn btn-primary w-full max-w-sm'
      >
        Go Back
      </button>
    </form>
  )
}

export default ResetPassword
