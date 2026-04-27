import { motion } from 'framer-motion'
import { Step } from '../../types'

interface ProgressIndicatorProps {
  steps: { key: Step; label: string }[]
  currentStep: Step
  onStepClick?: (step: Step) => void
}

export function ProgressIndicator({ steps, currentStep, onStepClick }: ProgressIndicatorProps) {
  const currentIndex = steps.findIndex(s => s.key === currentStep)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
        <motion.div
          className="absolute top-4 left-0 h-0.5 bg-accent-cyan"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isClickable = onStepClick && (isCompleted || isCurrent)

          return (
            <div
              key={step.key}
              className="relative flex flex-col items-center z-10"
            >
              <motion.button
                whileHover={isClickable ? { scale: 1.1 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                onClick={() => isClickable && onStepClick(step.key)}
                disabled={!isClickable}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-300
                  ${isCompleted ? 'bg-accent-emerald text-bg-primary' : ''}
                  ${isCurrent ? 'bg-accent-cyan text-bg-primary shadow-lg shadow-accent-cyan/30' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-bg-tertiary text-text-muted border border-border' : ''}
                  ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.button>
              <span className={`
                mt-2 text-xs font-medium whitespace-nowrap
                ${isCurrent ? 'text-accent-cyan' : isCompleted ? 'text-accent-emerald' : 'text-text-muted'}
              `}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}