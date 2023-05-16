import { dmsInstance } from '.'

export interface IAssignStudentToBatch {
  user_id: string
  batch_id: string
  id: string
  assign_to: 'student'
}

export interface IEditStudentDetails {
  user_id: number
  student_id: number
  new_email: string
  dob: string
  name: string
}

export async function getAllStudents() {
  return await dmsInstance.get('/getAllStudents')
}

export async function assignStudentToBatch(data: IAssignStudentToBatch) {
  return await dmsInstance.post('/assignBatch', { ...data, assign_to: 'student' })
}

export async function getStudentsOfaCourse(course_id: string) {
  return await dmsInstance.get('/uploadAttendance', { params: { course_id } })
}

export async function editStudentDetails(data: IEditStudentDetails) {
  return await dmsInstance.post('/editStudentDetails', { ...data })
}
