import { useNavigate } from 'react-router-dom'
import AppLayout from '../AppLayout'
import { useAuthState } from '../store/auth'
import React from 'react'
import { getNameInitials } from '../helpers/getNameInitials'

const UserDetails = () => {
  const { dob, email, name, role, userId } = useAuthState()
  console.log({ dob, email, name, role, userId })

  const navigate = useNavigate()

  return (
    <AppLayout>
      <div className='flex flex-col justify-between items-center bg-slate-600 rounded-lg h-96 text-white p-10 gap-4'>
        <div className='font-semibold text-7xl border border-primary rounded-full h-32 w-32 justify-center text-white bg-slate-800 flex flex-col items-center'>
          <p>{getNameInitials(name).toUpperCase()}</p>
        </div>

        <div className='flex gap-4 w-full justify-between bg-slate-900 px-4 py-2 rounded-lg text-2xl'>
          <div className='flex flex-col items-center'>
            <div className='text-slate-400'>User Id</div>
            <div>{userId}</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-slate-400'>Role</div>
            <div>{role}</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-slate-400'>Email</div>
            <div>{email}</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-slate-400'>Date of birth</div>
            <div>{dob}</div>
          </div>
        </div>
      </div>

      <div className='mt-5 flex justify-end'>
        <button
          onClick={() => navigate('/resetpassword')}
          type='submit'
          className='btn bg-slate-600 w-60 text-white'
        >
          Reset Password
        </button>
      </div>
    </AppLayout>
  )
}

export default UserDetails
