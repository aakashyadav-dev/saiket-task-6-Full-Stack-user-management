import { FaEdit, FaTrash } from 'react-icons/fa'

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="glass-card glass-card-hover p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-textSecondary">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(user)}
            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <FaEdit size={14} />
          </button>
          <button
            onClick={() => onDelete(user)}
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-4">
        <span className="text-sm text-textSecondary">Age: {user.age}</span>
        <span className="text-sm text-textSecondary">
          Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
        </span>
      </div>
    </div>
  )
}

export default UserCard
