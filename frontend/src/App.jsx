import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', age: '' })
  const [editingUser, setEditingUser] = useState(null)

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/users`)
      console.log('Users fetched:', response.data)
      setUsers(response.data.data || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('Failed to load users. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Create user
  const createUser = async (e) => {
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
      alert('✅ User created successfully!')
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.message || err.message))
    }
  }

  // Delete user
  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return
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
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px',
          background: '#1E293B',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
              👥 User Management
            </h1>
            <p style={{ color: '#94A3B8', marginTop: '5px' }}>
              Total Users: <strong style={{ color: 'white' }}>{users.length}</strong>
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingUser(null)
            }}
            style={{
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {showForm ? '✕ Close' : '➕ Add User'}
          </button>
        </div>

        {/* Add User Form */}
        {showForm && (
          <div style={{
            background: '#1E293B',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid #334155'
          }}>
            <h2 style={{ marginBottom: '15px', fontSize: '20px' }}>
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={createUser} style={{ display: 'grid', gap: '15px' }}>
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#0F172A',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#0F172A',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
              <input
                type="number"
                placeholder="Age (18-100) *"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
                min="18"
                max="100"
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#0F172A',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: '#2563EB',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setFormData({ name: '', email: '', age: '' })
                  }}
                  style={{
                    padding: '12px 24px',
                    background: '#334155',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            background: '#1E293B',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{
              display: 'inline-block',
              border: '4px solid #1E293B',
              borderTop: '4px solid #2563EB',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '15px', color: '#94A3B8' }}>Loading users...</p>
          </div>
        ) : error ? (
          <div style={{
            background: '#1E293B',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid #EF4444',
            textAlign: 'center'
          }}>
            <p style={{ color: '#EF4444', fontSize: '18px' }}>❌ {error}</p>
            <button
              onClick={fetchUsers}
              style={{
                marginTop: '15px',
                padding: '10px 20px',
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
        ) : users.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            background: '#1E293B',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <p style={{ fontSize: '48px', margin: 0 }}>📭</p>
            <p style={{ color: '#94A3B8', fontSize: '18px', marginTop: '10px' }}>
              No users found. Add your first user!
            </p>
          </div>
        ) : (
          <div style={{
            background: '#1E293B',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #334155'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px'
              }}>
                <thead style={{ background: '#0F172A' }}>
                  <tr>
                    <th style={{ padding: '14px 16px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ID</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Age</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Created</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} style={{
                      borderTop: '1px solid #334155',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#0F172A'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 16px', color: '#94A3B8' }}>#{user.id}</td>
                      <td style={{ padding: '14px 16px', fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          {user.name}
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#94A3B8' }}>{user.email}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          background: '#2563EB20',
                          color: '#60A5FA',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '14px'
                        }}>
                          {user.age}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#94A3B8', fontSize: '14px' }}>
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : 'N/A'}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <button
                          onClick={() => deleteUser(user.id)}
                          style={{
                            background: '#EF444420',
                            color: '#EF4444',
                            border: '1px solid #EF444430',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#EF4444'
                            e.target.style.color = 'white'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#EF444420'
                            e.target.style.color = '#EF4444'
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
            {/* Footer of table */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid #334155',
              background: '#0F172A',
              color: '#94A3B8',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Showing {users.length} users</span>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
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
          <p style={{ fontSize: '12px', marginTop: '4px' }}>
            Connected to: {API_URL}
          </p>
        </div>
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
