import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILoginProps, login } from '../api/auth'
import { useAuthState } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../helpers/getUser'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const { register, handleSubmit } = useForm<ILoginProps>()

  const { setUserDetails } = useAuthState()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ILoginProps> = async (data) => {
    try {
      const res = await login(data)
      if (res.data.result === false) throw Error('Invalid credentials')
      toast.success('Logged In')

      setTimeout(() => {
        navigate('/')
      }, 2000)
      const { dob, email, name, role, userId, isApproved } = getUser(res.data.result[0])

      setUserDetails({
        role,
        dob,
        email,
        name,
        userId,
        isApproved,
      } as any)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div>
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
        <button
          type='button'
          className='btn btn-primary w-full max-w-xs'
          onClick={() => navigate('/signup')}
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Login
