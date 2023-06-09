import { dmsInstance } from '.'

export interface IUploadTimeTableProps {
  user_id: string
  batch_id: string
  course_id: string
  data: string
}

export async function uploadTimeTable(data: IUploadTimeTableProps) {
  return await dmsInstance.post('/uploadTimetable', { ...data })
}

export async function getTimeTableDropdown() {
  return await dmsInstance.get('/viewNotice')
}

export async function getTimeTable(user_id: string) {
  return await dmsInstance.get('/viewTimetable', { params: { user_id } })
}
