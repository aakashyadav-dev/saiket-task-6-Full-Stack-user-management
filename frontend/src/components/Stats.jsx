import { motion } from 'framer-motion'

const Stats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="h-12 bg-white/10 rounded-lg mb-2"></div>
            <div className="h-6 bg-white/5 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card glass-card-hover p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-textSecondary font-medium">{stat.title}</p>
              <p className="text-2xl font-bold mt-1.5">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`text-xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Stats
