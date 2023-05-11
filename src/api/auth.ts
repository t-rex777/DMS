import { dmsInstance } from '.'
import { TRole } from '../store/auth'

export interface IResetPasswordProps {
  user_id: string
  old_password: string
  new_password: string
}
export interface ISignupProps {
  name: string
  email: string
  password: string
  role: TRole
  dob: string
}

export interface ILoginProps {
  email: string
  password: string
}

export async function signup(data: ISignupProps) {
  return await dmsInstance.post('/registration', { ...data })
}

export async function login(data: ILoginProps) {
  return await dmsInstance.post('/login', { ...data })
}

export async function resetPassword(data: IResetPasswordProps) {
  return await dmsInstance.post('/editProfile', { ...data })
}
