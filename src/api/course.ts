import { dmsInstance } from '.'
interface IAddCourseProps {
  user_id: number
  course_name: string
  course_code: string
}

export interface IAssignCourseParams {
  user_id: number
  course_id: number
  faculty_id: number
}

export async function addCourse(data: IAddCourseProps) {
  return await dmsInstance.post('/addCourse', { ...data })
}

export async function getAllCourses(user_id: number) {
  return await dmsInstance.get('/assignCourse', { params: { user_id } })
}

export async function getAllFaculties() {
  return await dmsInstance.get('/getAllFaculties')
}

export async function assignCourse(data: IAssignCourseParams) {
  return await dmsInstance.post('/assignCourse', { ...data })
}
