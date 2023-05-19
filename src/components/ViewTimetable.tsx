import React, { useEffect, useState } from 'react'
import { getTimeTable } from '../api/timetable'
import { useAuthState } from '../store/auth'
import { toast } from 'react-toastify'

export interface IViewTimetable {
  batchId: string
  timetable: string
}

const ViewTimetable = () => {
  const { userId } = useAuthState()

  const [timetable, setTimetable] = useState<IViewTimetable>()
  const [error, setError] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await getTimeTable(userId)
        if (data.result === false) {
          setError(true)
          throw new Error('there is no timetable available')
        }

        setTimetable(data.result)
      } catch (error: any) {
        toast.error(error.message)
      }
    })()
  }, [])

  return (
    <div>
      <h1 className='text-3xl font-semibold mb-4'>Timetable</h1>
      {error ? (
        <div>there is no timetable available</div>
      ) : (
        <img
          className='max-w-3xl'
          src={'data:image/png;base64,' + timetable?.timetable}
          alt='timetable'
        />
      )}
    </div>
  )
}

export default ViewTimetable
