import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { getAssignment } from '../api/assignment'
import { useAuthState } from '../store/auth'
import { ICourse } from './AddNotice'
import { toast } from 'react-toastify'

export interface IViewAssignment {
  course: ICourse
  questions: string[]
}

const ViewAssignment = () => {
  const { userId } = useAuthState()

  const [assignments, setAssignments] = useState<IViewAssignment[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    void (async () => {
      try {
        const res = await getAssignment(userId)
        if (res.data.result === false) {
          setError(true)
          throw new Error('Something went wrong')
        }
        setAssignments(res.data.result)
      } catch (error) {
        toast.error(error.message)
      }
    })()
  }, [])

  return (
    <AppLayout>
      <div>
        <h1 className='text-3xl font-semibold mb-4'>Assignments</h1>
        {error ? (
          <div>Something went wrong</div>
        ) : (
          <div className='flex flex-col gap-4'>
            {assignments.length > 0 ? (
              assignments.map(({ course, questions }, index) => {
                return (
                  <div key={index}>
                    <div className='card w-96 shadow-xl bg-slate-800 text-white'>
                      <div className='card-body'>
                        <h2 className='card-title'>Course Name - {course.course_name}</h2>
                        {questions.map((ques, index) => (
                          <div key={index} className='flex gap-2 items-center'>
                            <p>&#8608; {ques}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div>There is no assignment</div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default ViewAssignment
