import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'
import authService from '../services/authService'
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await authService.login(email, password)
          
          // Store tokens
          localStorage.setItem('accessToken', response.token)
          localStorage.setItem('refreshToken', response.refreshToken)
          
          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false 
          })
          
          toast.success('Login successful!')
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

signup: async (userData) => {
  set({ isLoading: true })
  try {
    const response = await authService.signup(userData)
    // Don't store token or set authenticated — email not verified yet
    set({ isLoading: false })
    return { success: true }
  } catch (error) {
    set({ isLoading: false })
    throw error
  }
},

logout: async () => {
        try {
          await authService.logout()
        } catch (error) {
            console.log(error);
            
          // Even if API fails, clear local storage
        } finally {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          set({ user: null, isAuthenticated: false })
          toast.success('Logged out successfully')
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
          set({ isAuthenticated: false, user: null })
          return
        }
        
        set({ isLoading: true })
        try {
          const user = await authService.getMe()
          set({ user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            console.log(error);
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          set({ user: null, isAuthenticated: false, isLoading: false })
        }
      },

      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)