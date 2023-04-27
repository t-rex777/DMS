import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILoginProps, login } from '../api/auth'

const Login = () => {
  const { register, handleSubmit } = useForm<ILoginProps>()

  const onSubmit: SubmitHandler<ILoginProps> = async (data) => {
    await login(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-secondary w-screen h-screen flex flex-col justify-center items-center gap-2'
    >
      <input
        {...register('email', { required: true })}
        placeholder='Email'
        className='input input-bordered input-primary w-full max-w-xs'
      />
      <input
        {...register('password', { required: true })}
        placeholder='Password'
        type='password'
        className='input input-bordered input-primary w-full max-w-xs'
      />

      <button type='submit' className='btn btn-primary w-full max-w-xs'>
        Login
      </button>
    </form>
  )
}

export default Login
