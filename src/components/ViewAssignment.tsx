import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { getAssignment } from '../api/assignment'
import { useAuthState } from '../store/auth'
import { ICourse } from './AddNotice'

export interface IViewAssignment {
  course: ICourse
  questions: string[]
}

const ViewAssignment = () => {
  const { userId } = useAuthState()

  const [assignments, setAssignments] = useState<IViewAssignment[]>([])

  useEffect(() => {
    void (async () => {
      const res = await getAssignment(userId)
      setAssignments(res.data.result)
    })()
  }, [])

  return (
    <AppLayout>
      <div>
        <h1 className='text-3xl font-semibold mb-4'>Assignments</h1>

        <div className='flex flex-col gap-4'>
          {assignments.map(({ course, questions }, index) => {
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
          })}
        </div>
      </div>
    </AppLayout>
  )
}

export default ViewAssignment
