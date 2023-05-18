import { dmsInstance } from '.'
export interface IGetResults {
  user_id: string
  course_id: string
}

export async function getResults(data: IGetResults) {
  return await dmsInstance.post('/viewResult', { ...data })
}

export async function getAllStudentCourses(user_id: string) {
  return await dmsInstance.get('/feedback', {
    params: {
      user_id,
    },
  })
}
