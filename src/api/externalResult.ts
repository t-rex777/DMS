import { dmsInstance } from '.'

export interface IUploadExternalResultsProps {
  user_id: string
  batch_id: string
  course_id: string
  data: string
}

export async function uploadExternalResult(data: IUploadExternalResultsProps) {
  return await dmsInstance.post('/uploadExternalResult', { ...data })
}

export async function getExternalResult(
  data: Pick<IUploadExternalResultsProps, 'batch_id' | 'course_id' | 'data'>,
) {
  return await dmsInstance.post('/viewExternalResult', { ...data })
}

export async function getExternalResultsDropdowns(userId: string) {
  return await dmsInstance.get('/uploadInternalResult', { data: { userId } })
}
