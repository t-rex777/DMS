import { dmsInstance } from '.'

export async function getApprovalList(admin_id: string) {
  return await dmsInstance.get('/approval', { data: { admin_id } })
}

export async function approveUsers(admin_id: string, userId: string[]) {
  return await dmsInstance.get('/approval', { data: { admin_id, userId } })
}
