import { dmsInstance } from '.'

export interface IGetStudentsProps {
  userId: string
  batchId: string
  courseId: string
}
export interface IUploadAttendanceProps {
  userId: string
  batchId: string
  courseId: string
  date: string
  students_list: string[]
  attendance_list: boolean[]
}

export async function uploadAttendance(data: IUploadAttendanceProps) {
  return await dmsInstance.post('/uploadAttendance', { ...data })
}

export async function getAttendanceDropdowns(userId: string) {
  return await dmsInstance.get('/uploadAttendance', { data: { userId } })
}

export async function getStudentsList(data: IGetStudentsProps) {
  return await dmsInstance.get('/students', { ...data } as any)
}
