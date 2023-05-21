import { dmsInstance } from '.'

export interface IAddBatchProps {
  user_id: number
  batch_name: string
  batch_code: string
}

export interface IAssignBatch {
  user_id: number
  batch_id: number
  id: number
  assign_to: 'faculty'
}

export async function addBatch(data: IAddBatchProps) {
  return await dmsInstance.post('/addBatch', { ...data })
}

export async function assignBatch(data: IAssignBatch) {
  return await dmsInstance.post('/assignBatch', { ...data })
}

export async function getAllBatches(user_id: number) {
  return await dmsInstance.get('/assignBatch', { params: { user_id } })
}
