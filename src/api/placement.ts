import { dmsInstance } from '.'

export interface IAddPlacementCompany {
  user_id: string
  company_name: string
  role: string
  ctc: string
}

export interface IAddStudentPlacement {
  user_id: string
  placement_id: string
  student_id: string
}

export async function addPlacementCompany(data: IAddPlacementCompany) {
  return await dmsInstance.post('/addPlacementCompany', { ...data })
}

export async function addStudentPlacement(data: IAddStudentPlacement) {
  return await dmsInstance.post('/addPlacement', { ...data })
}

export async function getAllPlacementCompanies() {
  return await dmsInstance.get('/addPlacement')
}
