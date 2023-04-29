import { dmsInstance } from '.'

interface IUploadAssignmentProps {
  userId: string
  questions: string[]
  batchId: string
  courseId: string
}

export async function uploadAssignment(data: IUploadAssignmentProps) {
  return await dmsInstance.post('/assignment', { ...data })
}

export async function getBatches(user_id: string) {
  return await dmsInstance.get('/assignment', { data: { user_id } })
}

export async function getAssignment(user_id: string) {
  return await dmsInstance.get('/viewAssignment', { data: { user_id } })
}
