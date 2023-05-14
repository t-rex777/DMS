import React, { useEffect, useState } from 'react'
import { TRole, useAuthState } from '../store/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { approveUsers, getApprovalList } from '../api/approval'
import { getUser } from '../helpers/getUser'

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

const ApprovalTable = () => {
  const [approvalList, setApprovalList] = useState([])

  const { userId } = useAuthState()

  const fetchApprovalList = async () => {
    const res = await getApprovalList(userId)

    const list = res.data.result.map((user: any[]) => {
      return getUser(user)
    })
    setApprovalList(list)
  }

  useEffect(() => {
    fetchApprovalList()
  }, [])

  const { register, handleSubmit } = useForm<IApprovalList>()

  const onSubmit: SubmitHandler<IApprovalList> = async (data) => {
    const res = await approveUsers(
      Number(userId),
      data.userId.map((d) => Number(d)),
    )

    if (res.data.result === true) {
      fetchApprovalList()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-3xl font-semibold mb-4'>Approve Users</h1>
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
