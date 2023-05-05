import { dmsInstance } from '.'

export interface IUploadInternalResultsProps {
  userId: string
  batchId: string
  courseId: string
  data: string
}

export async function uploadInternalResult(data: IUploadInternalResultsProps) {
  return await dmsInstance.post('/uploadInternalResult', { ...data })
}

export async function getInternalResult(
  data: Pick<IUploadInternalResultsProps, 'batchId' | 'courseId' | 'data'>,
) {
  return await dmsInstance.post('/viewInternalResult', { ...data })
}

export async function getInternalResultsDropdowns(userId: string) {
  return await dmsInstance.get('/uploadInternalResult', { data: { userId } })
}
