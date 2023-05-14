import React, { useEffect, useState } from 'react'
import { getAllFeedback } from '../api/feedback'
import { useAuthState } from '../store/auth'
import { ICourse as ICourseDetails } from './AddNotice'
import { getNameInitials } from '../helpers/getNameInitials'

export interface IFacultyDetails {
  faculty_email: string
  faculty_name: string
  faculty_user_id: string
}

export interface IStudentDetails {
  student_batch: string
  student_email: string
  student_name: string
  student_user_id: string
}
export interface IFeedback {
  course_details: ICourseDetails
  faculty_details: IFacultyDetails
  feedback: string
  student_details: IStudentDetails
}

const ViewFeedback = () => {
  const { userId } = useAuthState()

  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])

  useEffect(() => {
    void (async () => {
      const res = await getAllFeedback(userId)
      setFeedbacks(res.data.result)
    })()
  }, [])

  return (
    <div>
      {feedbacks.map(
        (
          {
            course_details: { course_code, course_name },
            faculty_details: { faculty_email, faculty_name },
            feedback,
            student_details: { student_email, student_name },
          },
          index,
        ) => {
          return (
            <div key={index} className='card w-96 bg-slate-300 text-primary-content'>
              <h2 className='card-title px-8 pt-6 pb-2 border-b border-slate-800'>
                Course: {course_name} - {course_code}
              </h2>
              <div className='card-body'>
                <p className='text-2xl mb-5'>{`"${feedback}"`}</p>

                <div className='flex gap-4 items-center'>
                  <div className='bg-slate-900 w-10 h-10 flex justify-center items-center rounded-full text-white'>
                    {getNameInitials(faculty_name)}
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-secondary-content'>
                      Faculty: {faculty_name}
                    </p>
                    <p className='text-sm text-slate-600'>{faculty_email}</p>
                  </div>
                </div>

                <div className='flex gap-4 items-center'>
                  <div className='bg-slate-900 text-white w-10 h-10 flex justify-center items-center rounded-full'>
                    {getNameInitials(student_name)}
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-secondary-content'>
                      Student: {student_name}
                    </p>
                    <p className='text-sm text-slate-600'>{student_email}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
      )}
    </div>
  )
}

export default ViewFeedback
