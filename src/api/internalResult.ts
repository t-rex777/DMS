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

// export async function getNotice(data: Pick<IUploadInternalResultsProps, 'batchId' | 'courseId'>) {
//   return await dmsInstance.post('/viewNotice', { ...data })
// }

export async function getUploadInternalResultsDropdowns(userId: string) {
  return await dmsInstance.get('/uploadInternalResult', { data: { userId } })
}
