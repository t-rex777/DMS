import { dmsInstance } from '.'

export async function getAllStudents() {
  return await dmsInstance.get('/getAllStudents')
}
