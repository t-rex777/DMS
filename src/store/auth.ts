import { create } from 'zustand'

export type TRole = 'admin' | 'staff' | 'faculty' | 'student'

interface AuthState {
  role: TRole | undefined
}

export const useAuthState = create<AuthState>()(() => ({
  role: undefined,
}))
