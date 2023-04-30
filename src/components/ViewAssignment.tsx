import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { getAssignment } from '../api/assignment'
import { useAuthState } from '../store/auth'

const q = [
  'Who are you?',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
]

const ViewAssignment = () => {
  const { userId } = useAuthState()

  const [questions, setQuestions] = useState<string[]>(q)

  useEffect(() => {
    void (async () => {
      const res = await getAssignment(userId)
      setQuestions(res.data.questions)
    })()
  }, [])

  return (
    <AppLayout>
      <div>
        <h1 className='text-3xl font-semibold mb-4'>Assignments</h1>
        <div className='flex flex-col gap-4'>
          {questions.map((ques, index) => (
            <div key={index} className='flex gap-2 items-center'>
              <p className='text-3xl'>&#8608;</p>
              <p className='p-2 bg-slate-800 text- rounded-lg text-slate-200'>{ques}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default ViewAssignment
