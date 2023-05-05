import { dmsInstance } from '.'

export interface IUploadExternalResultsProps {
  userId: string
  batchId: string
  courseId: string
  data: string
}

export async function uploadInternalResult(data: IUploadExternalResultsProps) {
  return await dmsInstance.post('/uploadExternalResult', { ...data })
}

// export async function getNotice(data: Pick<IUploadExternalResultsProps, 'batchId' | 'courseId'>) {
//   return await dmsInstance.post('/viewNotice', { ...data })
// }

export async function getuploadExternalResultsDropdowns(userId: string) {
  return await dmsInstance.get('/uploadInternalResult', { data: { userId } })
}
