import { dmsInstance } from '.'

export interface IUploadFeedbackProps {
  userId: string
  courseId: string
  batchId: string
  feedbackData: string
}

export async function uploadFeedback(data: IUploadFeedbackProps) {
  return await dmsInstance.post('/feedback', { ...data })
}

export async function getFeedbackDropdown(userId: string) {
  return await dmsInstance.get('/feedback', { data: { userId } })
}
