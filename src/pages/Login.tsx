import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILoginProps, login } from '../api/auth'
import { useAuthState } from '../store/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit } = useForm<ILoginProps>()

  const { setUserDetails } = useAuthState()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ILoginProps> = async (data) => {
    const res = await login(data)
    console.log({ res })
    console.log({
      role: res.data.result[0][4],
      dob: res.data.result[0][6],
      email: res.data.result[0][2],
      name: res.data.result[0][1],
      userId: res.data.result[0][0],
    })

    setUserDetails({
      role: res.data.result[0][4],
      dob: res.data.result[0][6],
      email: res.data.result[0][2],
      name: res.data.result[0][1],
      userId: res.data.result[0][0],
    } as any)

    navigate('/')
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
