import { dmsInstance } from '.'

export interface IUploadFeedbackProps {
  user_id: string
  course_id: string
  feedback: string
}

export async function uploadFeedback(data: IUploadFeedbackProps) {
  return await dmsInstance.post('/feedback', { ...data })
}

export async function getFeedbackDropdown(userId: string) {
  return await dmsInstance.get('/feedback', { data: { userId } })
}

export async function getAllFeedback(user_id: string) {
  return await dmsInstance.post('/getAllFeedbacks', { user_id })
}

export async function getAllCoursesForStudents(user_id: string) {
  return await dmsInstance.get('/feedback', { params: { user_id } })
}
