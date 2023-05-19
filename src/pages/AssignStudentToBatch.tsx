import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAssignStudentToBatch, assignStudentToBatch, getAllStudents } from '../api/students'
import { useAuthState } from '../store/auth'
import { IUserDetails } from '../components/ApprovalTable'
import { IBatch } from '../components/AddNotice'
import { getBatches } from '../api/notice'
import { getUser } from '../helpers/getUser'
import AppLayout from '../AppLayout'
import { toast } from 'react-toastify'

const AssignStudentToBatch = () => {
  const { userId } = useAuthState()

  const { register, handleSubmit } = useForm<IAssignStudentToBatch>()

  const [students, setStudents] = useState<IUserDetails[]>([])
  const [batches, setBatches] = useState<IBatch[]>([])

  useEffect(() => {
    void (async () => {
      const students = await getAllStudents()
      const batches = await getBatches()

      setStudents(students.data.result.map(getUser))
      setBatches(batches.data.result)
    })()
  }, [])

  const onSubmit: SubmitHandler<IAssignStudentToBatch> = async (data) => {
    try {
      const {
        data: { result },
      } = await assignStudentToBatch({
        ...data,
        user_id: userId,
        id: data.user_id,
      })
      if (result === false) throw new Error('Something went wrong!')
      toast.success('Student added to course successfully')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <AppLayout>
      <div className='flex flex-col gap-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
          <div className='form-control w-full max-w-xs'>
            <div className='font-semibold'>Upload the Notice</div>

            <label className='label'>
              <span className='label-text'>Pick the Batch</span>
            </label>
            <select
              {...register('batch_id', { required: true })}
              className='select select-primary w-full max-w-xs'
            >
              {batches.map(({ batch_code, batch_id, batch_name }) => (
                <option key={batch_code} value={batch_id}>
                  {batch_name}
                </option>
              ))}
            </select>
          </div>

          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Pick the student</span>
            </label>
            <select
              {...register('user_id', { required: true })}
              className='select select-primary w-full max-w-xs'
            >
              {students.map(({ name, userId }) => (
                <option key={userId} value={userId}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button type='submit' className='btn btn-primary w-40'>
            Add Student
          </button>
        </form>
      </div>
    </AppLayout>
  )
}

export default AssignStudentToBatch
