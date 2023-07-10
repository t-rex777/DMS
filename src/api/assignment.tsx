import { dmsInstance } from '.'

export interface IUploadAssignmentProps {
  user_id: string
  questions: string[]
  batch: string
  course: string
}

export async function uploadAssignment(data: IUploadAssignmentProps) {
  return await dmsInstance.post('/assignment', { ...data })
}

export async function getBatches(user_id: string) {
  return await dmsInstance.get('/assignment', { data: { user_id } })
}

export async function getAssignment(user_id: string) {
  return await dmsInstance.get('/viewAssignment', { params: { user_id } })
}
export async function getAssignmentDropdown(user_id: string) {
  return await dmsInstance.get('/assignment', { params: { user_id } })
}
