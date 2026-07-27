cat > pages/Home.jsx << 'EOF'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUsers, FaUserPlus, FaUserClock, FaChartBar } from 'react-icons/fa'
import Stats from '../components/Stats'
import SearchBar from '../components/SearchBar'
import UserTable from '../components/UserTable'
import UserForm from '../components/UserForm'
import DeleteModal from '../components/DeleteModal'
import useUsers from '../hooks/useUsers'

const Home = () => {
  const {
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
  } = useUsers()

  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [deletingUser, setDeletingUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (user) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  const handleDelete = (user) => {
    setDeletingUser(user)
  }

  const handleFormSubmit = async (userData) => {
    if (editingUser) {
      await updateUser(editingUser.id, userData)
    } else {
      await addUser(userData)
    }
    setIsFormOpen(false)
    setEditingUser(null)
  }

  const handleConfirmDelete = async () => {
    if (deletingUser) {
      await deleteUser(deletingUser.id)
      setDeletingUser(null)
    }
  }

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: FaUsers,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Average Age',
      value: averageAge || 0,
      icon: FaChartBar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Newest User',
      value: newestUser?.name || 'N/A',
      icon: FaUserClock,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10',
    },
    {
      title: 'Active Users',
      value: users.length,
      icon: FaUserPlus,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
    },
  ]

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="glass-card p-12 text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Failed to Load Users</h2>
          <p className="text-textSecondary">{error}</p>
          <button onClick={fetchUsers} className="btn-primary mt-6">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            User <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-textSecondary mt-1">
            Manage your users efficiently with our modern interface
          </p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null)
            setIsFormOpen(true)
          }}
          className="btn-primary flex items-center gap-2"
        >
          <FaUserPlus />
          Add User
        </button>
      </div>

      <Stats stats={stats} loading={loading} />
      
      <div className="mt-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="mt-6">
        <UserTable
          users={filteredUsers}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <UserForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingUser(null)
        }}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
        isEditing={!!editingUser}
      />

      <DeleteModal
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleConfirmDelete}
        userName={deletingUser?.name}
      />
    </div>
  )
}

export default Home
EOF