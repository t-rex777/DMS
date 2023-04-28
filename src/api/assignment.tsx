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
