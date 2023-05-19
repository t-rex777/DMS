import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import {
  IAddStudentPlacement,
  addStudentPlacement,
  getAllPlacementCompanies,
} from '../api/placement'
import { getAllStudents } from '../api/students'
import { getUser } from '../helpers/getUser'
import { IUserDetails } from '../components/ApprovalTable'
import { toast } from 'react-toastify'

export interface IPlacementCompany {
  company_code: string
  company_name: string
  ctc: string
  role: string
}

const AddStudentPlacement = () => {
  const { register, handleSubmit } = useForm<IAddStudentPlacement>()

  const { userId } = useAuthState()

  const [companies, setCompanies] = useState<IPlacementCompany[]>([])
  const [students, setStudents] = useState<IUserDetails[]>([])

  useEffect(() => {
    void (async () => {
      const res = await getAllPlacementCompanies()
      const students = await getAllStudents()
      setStudents(students.data.result.map(getUser))
      setCompanies(res.data.result)
    })()
  }, [])

  const onSubmit: SubmitHandler<IAddStudentPlacement> = async (data) => {
    try {
      const { data: result } = await addStudentPlacement({
        ...data,
        user_id: userId,
      })

      if (result === false) throw new Error('Something went wrong!')

      toast.success('Student placement added successfully!')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <AppLayout>
      <div className='flex flex-col gap-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
          <div className='form-control w-full max-w-sm'>
            <div className='font-semibold mb-4'>Add a Student&apos;s Placement</div>

            <div className='flex flex-col gap-4'>
              <select
                {...register('placement_id', { required: true })}
                className='select select-primary w-full max-w-sm'
              >
                <option disabled selected>
                  Pick the faculty
                </option>
                {companies.map(({ role, company_name }) => (
                  <option key={userId} value={userId}>
                    {company_name} - {role}
                  </option>
                ))}
              </select>

              <select
                {...register('student_id', { required: true })}
                className='select select-primary w-full max-w-sm'
              >
                <option disabled selected>
                  Pick the student
                </option>
                {students.map(({ userId, name }) => (
                  <option key={userId} value={userId}>
                    {name}
                  </option>
                ))}
              </select>

              <button type='submit' className='btn btn-primary w-full'>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}

export default AddStudentPlacement
