import { dmsInstance } from '.'

export interface IUploadAttendanceProps {
  userId: string
  batchId: string
  courseId: string
  date: string
  students_list: string[]
  attendance_list: string[]
}

export async function uploadAttendance(data: IUploadAttendanceProps) {
  return await dmsInstance.post('/uploadAttendance', { ...data })
}

export async function getAttendanceDropdowns(userId: string) {
  return await dmsInstance.get('/uploadAttendance', { data: { userId } })
}
