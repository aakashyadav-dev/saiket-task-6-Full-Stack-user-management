import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="glass-card mt-12 border-t border-white/5">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-textSecondary">
              © {currentYear} UserHub. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-textSecondary hover:text-text transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="#"
              className="text-textSecondary hover:text-text transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="text-textSecondary hover:text-text transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
