import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred'
    toast.error(message)
    return Promise.reject(error)
  }
)

export const userApi = {
  getUsers: async () => {
    const response = await api.get('/users')
    return response.data?.data || []
  },

  getUser: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data?.data
  },

  createUser: async (userData) => {
    const response = await api.post('/users', userData)
    toast.success('User created successfully!')
    return response.data?.data
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData)
    toast.success('User updated successfully!')
    return response.data?.data
  },

  deleteUser: async (id) => {
    await api.delete(`/users/${id}`)
    toast.success('User deleted successfully!')
  },
}

export default api
