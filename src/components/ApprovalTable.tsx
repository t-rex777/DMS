import React, { useEffect, useState } from 'react'
import { TRole } from '../store/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getApprovalList } from '../api/approval'

export interface IUserDetails {
  userId: string
  role: TRole
  name: string
  email: string
  dob: string
}

export interface IApprovalList {
  userId: string[]
}

export const userDetails: IUserDetails[] = [
  { userId: '1', dob: '2000-1-1', email: 'student@gmail.com', name: 'Student', role: 'student' },
  { userId: '2', dob: '2000-1-1', email: 'student@gmail.com', name: 'Student', role: 'student' },
  { userId: '3', dob: '2000-1-1', email: 'student@gmail.com', name: 'Student', role: 'student' },
  { userId: '4', dob: '2000-1-1', email: 'student@gmail.com', name: 'Student', role: 'student' },
  { userId: '5', dob: '2000-1-1', email: 'student@gmail.com', name: 'Student', role: 'student' },
  { userId: '6', dob: '2000-1-1', email: 'student@gmail.com', name: 'Student', role: 'student' },
  { userId: '7', dob: '2000-1-1', email: 'student@gmail.com', name: 'Student', role: 'student' },
  { userId: '8', dob: '2000-1-1', email: 'student@gmail.com', name: 'Student', role: 'student' },
]

const ApprovalTable = () => {
  const [approvalList, setApprovalList] = useState(userDetails)

  useEffect(() => {
    void (async () => {
      const res = await getApprovalList('')
      setApprovalList(res.data)
    })()
  }, [])

  const { register, handleSubmit } = useForm<IApprovalList>()

  const onSubmit: SubmitHandler<IApprovalList> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className='table table-zebra w-full'>
        <thead>
          <tr>
            <th></th>
            <th>UserId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {approvalList.map(({ dob, email, name, role, userId }, index) => (
            <tr key={index}>
              <td>
                <input
                  className='checkbox checkbox-sm'
                  type='checkbox'
                  value={userId}
                  {...register('userId')}
                />
              </td>
              <th>{userId}</th>
              <td>{name}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>{dob}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type='submit' className='btn btn-primary mt-5 float-right'>
        Approve
      </button>
    </form>
  )
}

export default ApprovalTable
