import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAssignCourseParams, assignCourse, getAllFaculties } from '../api/course'
import { useAuthState } from '../store/auth'
import { getUser } from '../helpers/getUser'
import { IUserDetails } from '../components/ApprovalTable'
import { IBatch } from '../components/AddNotice'
import { toast } from 'react-toastify'
import { IAssignBatch, assignBatch, getAllBatches } from '../api/batch'

const AssignBatch = () => {
  const { register, handleSubmit } = useForm<IAssignBatch>()
  const { userId } = useAuthState()

  const [faculties, setFaculties] = useState<IUserDetails[]>([])
  const [batches, setBatches] = useState<IBatch[]>([])
  const [error, setError] = useState(false)

  const fetchFaculties = async () => {
    try {
      const res = await getAllFaculties()
      if (res.data.result === false) {
        setError(true)
        throw new Error('No falculty available')
      }
      setFaculties(res.data.result.map((user: unknown[]) => getUser(user)))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchBatches = async () => {
    try {
      const res = await getAllBatches(Number(userId))
      setBatches(res.data.result)
      if (res.data.result === false) {
        setError(true)
        throw new Error('No batch available')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchFaculties()
    fetchBatches()
  }, [])

  const onSubmit: SubmitHandler<IAssignBatch> = async (data) => {
    try {
      if (
        data.batch_id.toString() === 'Pick the batch' ||
        data.user_id.toString() === 'Pick the faculty'
      )
        return

      const {
        data: { result },
      } = await assignBatch({
        id: Number(userId),
        user_id: data.user_id,
        batch_id: data.batch_id,
        assign_to: 'faculty',
      })

      if (result === false) throw new Error('Something went wrong!')

      toast.success('Batch assigned successfully!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <AppLayout>
      <div className='font-semibold'>Assign a batch</div>

      {error ? (
        <div>Either faculty or course is not available</div>
      ) : (
        <div className='flex flex-col gap-4'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
            <div className='form-control w-full max-w-sm'>
              <div className='flex flex-col gap-4'>
                <select
                  {...register('user_id', { required: true })}
                  className='select select-primary w-full max-w-sm'
                >
                  <option disabled selected>
                    Pick the faculty
                  </option>
                  {faculties.map(({ name, userId }) => (
                    <option key={userId} value={userId}>
                      {name}
                    </option>
                  ))}
                </select>

                <select
                  {...register('batch_id', { required: true })}
                  className='select select-primary w-full max-w-sm'
                >
                  <option disabled selected>
                    Pick the batch
                  </option>
                  {batches.map(({ batch_id, batch_name }) => (
                    <option key={batch_id} value={batch_id}>
                      {batch_name}
                    </option>
                  ))}
                </select>
                <button type='submit' className='btn btn-primary w-full'>
                  Assign
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </AppLayout>
  )
}

export default AssignBatch
