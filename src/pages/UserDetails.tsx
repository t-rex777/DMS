import React from 'react'
import AppLayout from '../AppLayout'

const UserDetails = () => {
  return (
    <AppLayout>
      <div className='flex flex-col'>
        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>What is your name?</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            disabled
            type='text'
            placeholder='User Name'
            className='input input-bordered w-full max-w-xs'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
            <span className='label-text-alt'>Bottom Right label</span>
          </label>
        </div>
      </div>
    </AppLayout>
  )
}

export default UserDetails
