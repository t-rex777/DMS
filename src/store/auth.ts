import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { ISignupProps } from '../api/auth'

export type TRole = 'admin' | 'staff' | 'faculty' | 'student'

interface AuthState {
  userId: string
  role: TRole
  name: string
  email: string
  dob: string
  isApproved: boolean

  setUserDetails: (data: ISignupProps) => void
}

export const useAuthState = create(
  persist<AuthState>(
    (set) => ({
      role: 'student',
      dob: '',
      email: '',
      name: '',
      userId: '',
      isApproved: false,

      setUserDetails(data) {
        set({ ...data })
      },
    }),

    { name: 'user-details' },
  ),
)
