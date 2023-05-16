import { dmsInstance } from '.'

export interface IGetStudentsProps {
  userId: string
  batchId: string
  courseId: string
}
export interface IUploadAttendanceProps {
  user_id: string
  batch_id: string
  course_id: string
  date: string
  students_list: number[]
  attendance_list: number[]
}

export async function uploadAttendance({ batch_id, ...data }: IUploadAttendanceProps) {
  return await dmsInstance.post('/uploadAttendance', { ...data })
}

export async function getAttendanceDropdowns(userId: string) {
  return await dmsInstance.get('/uploadAttendance', { data: { userId } })
}

export async function getStudentsList(data: IGetStudentsProps) {
  return await dmsInstance.get('/students', { ...data } as any)
}
