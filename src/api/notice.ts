import { dmsInstance } from '.'

export interface IUploadNoticeProps {
  userId: string
  batchId: string
  courseId: string
  noticeData: string
}

export async function uploadNotice(data: IUploadNoticeProps) {
  return await dmsInstance.post('/notice', { ...data })
}

export async function getNotice(data: Pick<IUploadNoticeProps, 'batchId' | 'courseId'>) {
  return await dmsInstance.post('/viewNotice', { ...data })
}

export async function getNoticeDropdowns() {
  return await dmsInstance.get('/viewNotice')
}
