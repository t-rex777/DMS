import { dmsInstance } from '.'

export interface IUploadInternalResultsProps {
  user_id: string
  batch_id: string
  course_id: string
  data: string
}

export async function uploadInternalResult(data: IUploadInternalResultsProps) {
  return await dmsInstance.post('/uploadInternalResult', { ...data })
}

export async function getInternalResult(
  data: Pick<IUploadInternalResultsProps, 'batch_id' | 'course_id' | 'data'>,
) {
  return await dmsInstance.post('/viewInternalResult', { ...data })
}

export async function getInternalResultsDropdowns(userId: string) {
  return await dmsInstance.get('/uploadInternalResult', { data: { userId } })
}
