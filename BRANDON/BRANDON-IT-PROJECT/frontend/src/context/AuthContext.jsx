import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth.service'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const userData = authService.getCurrentUser()
    if (userData) {
      setUser(userData)
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)
      setUser(response.data.user)
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      setUser(response.data.user)
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    toast.info('Logged out successfully')
    navigate('/login')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
