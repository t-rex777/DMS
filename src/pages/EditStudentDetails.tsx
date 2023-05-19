import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthState } from '../store/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { IEditStudentDetails, editStudentDetails } from '../api/students'
import { format } from 'date-fns'
import { getDateFromFormattedString } from '../helpers/getDate'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditStudentDetails = () => {
  const { userId } = useAuthState()

  const location = useLocation()
  const navigate = useNavigate()

  const { dob, email, name, userId: student_id } = location.state

  const { day, month, year } = getDateFromFormattedString(dob)

  const { register, handleSubmit } = useForm<IEditStudentDetails>({
    defaultValues: {
      dob: format(new Date(year, month - 1, day), 'yyyy-MM-dd'),
      new_email: email,
      student_id,
      name,
    },
  })

  const onSubmit: SubmitHandler<IEditStudentDetails> = async (data) => {
    try {
      const tempDate = new Date(data.dob)
      const formattedDate = [
        String(tempDate.getDate()).padStart(2, '0'),
        String(tempDate.getMonth() + 1).padStart(2, '0'),
        tempDate.getFullYear(),
      ].join('/')

      const {
        data: { result },
      } = await editStudentDetails({
        ...data,
        user_id: Number(userId),
        dob: formattedDate,
      })

      if (result === false) throw new Error('Something went wrong!')

      toast.success('Student details updated!')
      setTimeout(() => {
        navigate('/students')
      }, 2000)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

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
        placeholder='New Name'
        className='input input-bordered input-primary w-full max-w-sm'
      />
      <input
        {...register('new_email', { required: true })}
        placeholder='New Email'
        className='input input-bordered input-primary w-full max-w-sm'
      />
      <input
        {...register('dob', { required: true })}
        placeholder='Date of birth'
        className='input input-bordered input-primary w-full max-w-sm'
        type='date'
      />
      <button type='submit' className='btn btn-primary w-full max-w-sm'>
        Submit
      </button>
      <button
        onClick={() => navigate(-1)}
        type='button'
        className='btn btn-primary w-full max-w-sm'
      >
        Go Back
      </button>
    </form>
  )
}

export default EditStudentDetails
