import { dmsInstance } from '.'

export interface IUploadTimeTableProps {
  userId: string
  batchId: string
  courseId: string
  data: FormData
}

export async function uploadTimeTable(data: IUploadTimeTableProps) {
  return await dmsInstance.post('/uploadTimetable', { ...data })
}

export async function getTimeTable(userId: string) {
  return await dmsInstance.get('/viewTimeTable', { data: userId })
}
