import { dmsInstance } from '.'

export async function getApprovalList(user_id: string) {
  return await dmsInstance.get('/approval', { params: { user_id } })
}

export async function approveUsers(admin_id: number, user_id: number[]) {
  return await dmsInstance.post('/approval', { admin_id, user_id })
}
