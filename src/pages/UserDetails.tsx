import { useNavigate } from 'react-router-dom'
import AppLayout from '../AppLayout'
import { useAuthState } from '../store/auth'
import React from 'react'

const UserDetails = () => {
  const { dob, email, name, role, userId } = useAuthState()
  console.log({ dob, email, name, role, userId })

  const navigate = useNavigate()

  return (
    <AppLayout>
      <div className='flex flex-col justify-between items-center bg-slate-600 rounded-lg h-96 text-white p-10 gap-4'>
        <div className='font-semibold text-5xl text-slate-200 flex flex-col items-center'>
          <img
            src='https://img.freepik.com/premium-vector/person-avatar-icon-design-vector-multiple-use-vector-illustration_625349-280.jpg?w=740'
            width={120}
            height={120}
            className='rounded-full'
          />
          <p>{name}</p>
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
