import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUsers, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/5 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
              <FaUsers className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                UserHub
              </h1>
              <p className="text-xs text-textSecondary hidden sm:block">
                Management System
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-textSecondary text-sm px-3 py-1 rounded-lg bg-white/5">
              v2.0
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-primary" />}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5 animate-slide-up">
            <div className="flex flex-col gap-3">
              <span className="text-textSecondary text-sm px-3 py-2 rounded-lg bg-white/5">
                v2.0
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon />}
                <span>Toggle Theme</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
