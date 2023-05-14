import { dmsInstance } from '.'

export interface IAssignStudentToBatch {
  user_id: string
  batch_id: string
  id: string
  assign_to: 'student'
}

export async function getAllStudents() {
  return await dmsInstance.get('/getAllStudents')
}

export async function assignStudentToBatch(data: IAssignStudentToBatch) {
  return await dmsInstance.post('/assignBatch', { ...data, assign_to: 'student' })
}
