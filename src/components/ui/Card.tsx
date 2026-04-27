import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'highlight' | 'warning'
  onClick?: () => void
  animate?: boolean
}

export function Card({ children, className = '', variant = 'default', onClick, animate = true }: CardProps) {
  const variants = {
    default: 'bg-bg-secondary border-border',
    highlight: 'bg-bg-secondary border-accent-rose shadow-lg shadow-accent-rose/10',
    warning: 'bg-bg-secondary border-accent-amber'
  }

  const Component = animate ? motion.div : 'div'
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  } : {}

  return (
    <Component
      className={`
        rounded-card border p-6
        ${variants[variant]}
        ${onClick ? 'cursor-pointer hover:border-text-muted transition-colors' : ''}
        ${className}
      `}
      onClick={onClick}
      {...animationProps}
    >
      {children}
    </Component>
  )
}

interface ModuleCardProps {
  title: string
  icon: ReactNode
  children: ReactNode
  isExpanded: boolean
  onToggle: () => void
  isValid?: boolean
}

export function ModuleCard({ title, icon, children, isExpanded, onToggle, isValid = false }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-secondary rounded-card border border-border overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-bg-tertiary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-accent-cyan">{icon}</span>
          <span className="font-display font-semibold text-text-primary">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {isValid && (
            <span className="w-2 h-2 rounded-full bg-accent-emerald" />
          )}
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pt-2">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}