import { dmsInstance } from '.'

export interface IUploadNoticeProps {
  user_id: string
  batch_id: string
  course_id: string
  notice_data: string
}

export async function uploadNotice(data: IUploadNoticeProps) {
  return await dmsInstance.post('/notice', { ...data })
}

export async function getNotice(data: Pick<IUploadNoticeProps, 'batch_id' | 'course_id'>) {
  return await dmsInstance.post('/viewNotice', { ...data })
}

export async function getBatches() {
  return await dmsInstance.get('/viewNotice')
}
