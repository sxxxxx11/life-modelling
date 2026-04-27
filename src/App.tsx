import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import { ProgressIndicator } from './components/ui/ProgressIndicator'
import { WelcomePage } from './components/layout/WelcomePage'
import { DailyInputPage } from './components/modules/DailyInputPage'
import { ProbesPage } from './components/modules/ProbesPage'
import { CurrentTrajectoryPage } from './components/visualization/CurrentTrajectoryPage'
import { CoreParameterPage } from './components/visualization/CoreParameterPage'
import { MicroActionPage } from './components/visualization/MicroActionPage'
import { Step } from './types'

const steps = [
  { key: 'welcome' as Step, label: '开始' },
  { key: 'daily' as Step, label: '日常' },
  { key: 'probes' as Step, label: '探针' },
  { key: 'current' as Step, label: '现状' },
  { key: 'core' as Step, label: '核心' },
  { key: 'micro' as Step, label: '行动' }
]

function AppContent() {
  const { state, dispatch } = useApp()
  const { currentStep } = state
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    if (currentStep !== 'welcome') {
      setShowWelcome(false)
    }
  }, [currentStep])

  const handleStart = () => {
    dispatch({ type: 'SET_STEP', payload: 'daily' })
  }

  const handleReset = () => {
    if (window.confirm('确定要重新开始吗？所有数据将被清除。')) {
      dispatch({ type: 'RESET' })
      setShowWelcome(true)
    }
  }

  const goToStep = (step: Step) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }

  const goNext = () => {
    const currentIndex = steps.findIndex(s => s.key === currentStep)
    if (currentIndex < steps.length - 1) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex + 1].key })
    }
  }

  const goBack = () => {
    const currentIndex = steps.findIndex(s => s.key === currentStep)
    if (currentIndex > 0) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex - 1].key })
    }
  }

  if (showWelcome && currentStep === 'welcome') {
    return <WelcomePage onStart={handleStart} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display font-bold text-lg text-text-primary">
              ⚡ LifeForge
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              重新开始
            </button>
          </div>
          <ProgressIndicator
            steps={steps}
            currentStep={currentStep}
            onStepClick={goToStep}
          />
        </div>
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 'daily' && (
              <DailyInputPage onNext={goNext} />
            )}
            {currentStep === 'probes' && (
              <ProbesPage onNext={goNext} onBack={goBack} />
            )}
            {currentStep === 'current' && (
              <CurrentTrajectoryPage onNext={goNext} onBack={goBack} />
            )}
            {currentStep === 'core' && (
              <CoreParameterPage onNext={goNext} onBack={goBack} />
            )}
            {currentStep === 'micro' && (
              <MicroActionPage onFinish={goNext} onBack={goBack} onReset={handleReset} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentStep !== 'welcome' && currentStep !== 'micro' && (
        <footer className="border-t border-border px-4 py-4 bg-bg-primary">
          <div className="max-w-3xl mx-auto text-center text-sm text-text-muted">
            预计还需 {steps.filter(s => steps.findIndex(st => st.key === currentStep) < steps.findIndex(st => st.key === s.key)).length} 步完成
          </div>
        </footer>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}