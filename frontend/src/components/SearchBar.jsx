import { FaSearch, FaTimes } from 'react-icons/fa'

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="glass-card p-1 flex items-center">
      <div className="flex-1 flex items-center px-4">
        <FaSearch className="text-textSecondary text-sm" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name or email..."
          className="w-full bg-transparent px-3 py-2.5 text-text placeholder-textSecondary/50 focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-textSecondary hover:text-text transition-colors"
          >
            <FaTimes />
          </button>
        )}
      </div>
      <div className="px-4 py-1.5 text-xs text-textSecondary bg-white/5 rounded-lg">
        {searchTerm ? 'Searching...' : 'All Users'}
      </div>
    </div>
  )
}

export default SearchBar
