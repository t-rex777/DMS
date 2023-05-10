import { dmsInstance } from '.'
interface IAddCourseProps {
  user_id: number
  course_name: string
  course_code: string
}

export async function addCourse(data: IAddCourseProps) {
  return await dmsInstance.post('/addCourse', { ...data })
}

export async function getAllCourses(user_id: number) {
  return await dmsInstance.get('/addCourse', { params: { user_id } })
}
