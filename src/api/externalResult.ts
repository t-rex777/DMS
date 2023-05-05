import { dmsInstance } from '.'

export interface IUploadExternalResultsProps {
  userId: string
  batchId: string
  courseId: string
  data: string
}

export async function uploadExternalResult(data: IUploadExternalResultsProps) {
  return await dmsInstance.post('/uploadExternalResult', { ...data })
}

export async function getExternalResult(
  data: Pick<IUploadExternalResultsProps, 'batchId' | 'courseId' | 'data'>,
) {
  return await dmsInstance.post('/viewExternalResult', { ...data })
}

export async function getExternalResultsDropdowns(userId: string) {
  return await dmsInstance.get('/uploadInternalResult', { data: { userId } })
}
