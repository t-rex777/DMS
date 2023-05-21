import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IResetPasswordProps, resetPassword } from '../api/auth'
import { useAuthState } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResetPassword = () => {
  const { userId } = useAuthState()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<IResetPasswordProps>()

  const onSubmit: SubmitHandler<IResetPasswordProps> = async (data) => {
    try {
      const { data: result } = await resetPassword({ ...data, user_id: userId })
      if (result.result === null) throw new Error('Something went wrong!')

      toast.success('Password reset successfully!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-secondary w-screen h-screen flex flex-col justify-center items-center gap-2'
    >
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
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
