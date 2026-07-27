import { useState, useCallback } from 'react'
import { userApi } from '../services/api'

const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await userApi.getUsers()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [])

  const addUser = useCallback(async (userData) => {
    try {
      const newUser = await userApi.createUser(userData)
      setUsers(prev => [...prev, newUser])
      return newUser
    } catch (err) {
      throw err
    }
  }, [])

  const updateUser = useCallback(async (id, userData) => {
    try {
      const updatedUser = await userApi.updateUser(id, userData)
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user))
      return updatedUser
    } catch (err) {
      throw err
    }
  }, [])

  const deleteUser = useCallback(async (id) => {
    try {
      await userApi.deleteUser(id)
      setUsers(prev => prev.filter(user => user.id !== id))
    } catch (err) {
      throw err
    }
  }, [])

  const totalUsers = users.length
  const averageAge = users.length > 0 
    ? Math.round(users.reduce((sum, user) => sum + (user.age || 0), 0) / users.length)
    : 0
  
  const newestUser = users.length > 0
    ? users.reduce((newest, user) => {
        const newestDate = new Date(newest.createdAt || 0)
        const userDate = new Date(user.createdAt || 0)
        return userDate > newestDate ? user : newest
      }, users[0])
    : null

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    totalUsers,
    averageAge,
    newestUser,
  }
}

export default useUsers
