import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', age: '' })
  const [showForm, setShowForm] = useState(false)

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/users`)
      setUsers(response.data.data || [])
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Add user
  const addUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/users`, {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age)
      })
      setUsers([...users, response.data.data])
      setFormData({ name: '', email: '', age: '' })
      setShowForm(false)
      alert('✅ User added successfully!')
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.message || err.message))
    }
  }

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await axios.delete(`${API_URL}/users/${id}`)
      setUsers(users.filter(user => user.id !== id))
      alert('✅ User deleted successfully!')
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0F172A', 
      color: '#F8FAFC',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            👥 User Management
          </h1>
          <p style={{ color: '#94A3B8' }}>
            Total Users: {users.length}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {showForm ? '✕ Close Form' : '➕ Add User'}
        </button>
      </div>

      {/* Add User Form */}
      {showForm && (
        <div style={{
          background: '#1E293B',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #334155'
        }}>
          <h2 style={{ marginBottom: '15px' }}>Add New User</h2>
          <form onSubmit={addUser} style={{ display: 'grid', gap: '15px' }}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#0F172A',
                color: 'white'
              }}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#0F172A',
                color: 'white'
              }}
            />
            <input
              type="number"
              placeholder="Age (18-100)"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              required
              min="18"
              max="100"
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#0F172A',
                color: 'white'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#2563EB',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Create User
            </button>
          </form>
        </div>
      )}

      {/* Users List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ 
            display: 'inline-block',
            border: '4px solid #1E293B',
            borderTop: '4px solid #2563EB',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '10px', color: '#94A3B8' }}>Loading users...</p>
        </div>
      ) : error ? (
        <div style={{ 
          background: '#1E293B', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid #EF4444',
          textAlign: 'center'
        }}>
          <p style={{ color: '#EF4444' }}>❌ Error: {error}</p>
          <button 
            onClick={fetchUsers}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              background: '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div style={{
          background: '#1E293B',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #334155'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#0F172A' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8' }}>Age</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8' }}>Created</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#94A3B8' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderTop: '1px solid #334155' }}>
                  <td style={{ padding: '12px' }}>{user.id}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{user.name}</td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: '#2563EB20',
                      color: '#2563EB',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      {user.age}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#94A3B8', fontSize: '14px' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => deleteUser(user.id)}
                      style={{
                        background: '#EF4444',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: '30px',
        textAlign: 'center',
        color: '#94A3B8',
        fontSize: '14px',
        borderTop: '1px solid #1E293B',
        paddingTop: '20px'
      }}>
        <p>© 2026 UserHub. All rights reserved.</p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default App
