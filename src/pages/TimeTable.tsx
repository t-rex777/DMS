import React from 'react'
import FileUploader, { IFileInputProp } from '../components/FileUploader'
import AppLayout from '../AppLayout'
import { uploadTimeTable } from '../api/timetable'

const TimeTable = () => {
  const onSubmit = async (data: IFileInputProp) => {
    const formData = new FormData()
    formData.append('file', data.file[0])

    await uploadTimeTable({
      batchId: '',
      courseId: '',
      data: formData,
      userId: '',
    })
  }

  return (
    <AppLayout>
      <div className='font-semibold mb-3'>Upload the Time Table</div>
      <FileUploader onSubmit={onSubmit} />
    </AppLayout>
  )
}

export default TimeTable
