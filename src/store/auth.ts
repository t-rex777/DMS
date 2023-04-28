import { create } from 'zustand'
import { ISignupProps } from '../api/auth'

export type TRole = 'admin' | 'staff' | 'faculty' | 'student'

interface AuthState {
  userId: string | undefined
  role: TRole | undefined
  name: string | undefined
  email: string | undefined
  dob: string | undefined

  setUserDetails: (data: ISignupProps) => void
}

export const useAuthState = create<AuthState>()((set) => ({
  role: undefined,
  dob: undefined,
  email: undefined,
  name: undefined,
  userId: undefined,

  setUserDetails(data) {
    set((state) => ({ ...data, ...state }))
  },
}))
