import { create } from 'zustand'
import { ISignupProps } from '../api/auth'

export type TRole = 'admin' | 'staff' | 'faculty' | 'student'

interface AuthState {
  userId: string
  role: TRole
  name: string
  email: string
  dob: string

  setUserDetails: (data: ISignupProps) => void
}

export const useAuthState = create<AuthState>()((set) => ({
  role: 'student',
  dob: '',
  email: '',
  name: '',
  userId: '',

  setUserDetails(data) {
    set((state) => ({ ...data, ...state }))
  },
}))
