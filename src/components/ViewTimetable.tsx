import React, { useEffect, useState } from 'react'
import { getTimeTable } from '../api/timetable'
import { useAuthState } from '../store/auth'

export interface IViewTimetable {
  batchId: string
  timetable: string
}

const ViewTimetable = () => {
  const { userId } = useAuthState()

  const [timetable, setTimetable] = useState<IViewTimetable>()

  useEffect(() => {
    void (async () => {
      const { data } = await getTimeTable(userId)

      setTimetable(data.result)
    })()
  }, [])

  return (
    <div>
      <div className='font-semibold mb-4'>Timetable</div>
      <img
        className='max-w-3xl'
        src={'data:image/png;base64,' + timetable?.timetable}
        alt='timetable'
      />
    </div>
  )
}

export default ViewTimetable
