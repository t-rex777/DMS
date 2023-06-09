import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TRole } from '../store/auth'
import { ISignupProps, signup } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const { register, handleSubmit } = useForm<ISignupProps>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ISignupProps> = async (data) => {
    try {
      const { data: result } = await signup(data)
      if (result === false) throw new Error('Something went wrong, please try again')
      toast.success('Signed up successfully!')

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const roles: TRole[] = ['admin', 'faculty', 'staff', 'student']

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
        {...register('name', { required: true })}
        placeholder='Name'
        className='input input-bordered input-primary w-full max-w-xs'
      />
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
      <select
        {...register('role', { required: true })}
        className='select select-primary w-full max-w-xs'
      >
        <option disabled selected>
          Choose your role
        </option>
        {roles.map((role, index) => (
          <option key={index}>{role}</option>
        ))}
      </select>
      <input
        {...register('dob', { required: true })}
        placeholder='Date of birth'
        className='input input-bordered input-primary w-full max-w-xs'
        type='date'
      />
      <button type='submit' className='btn btn-primary w-full max-w-xs'>
        Signup
      </button>
      <button
        type='button'
        className='btn btn-primary w-full max-w-xs'
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </form>
  )
}

export default Signup
