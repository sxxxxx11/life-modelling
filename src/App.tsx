import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import { useI18n, formatTemplate } from './i18n'
import { ProgressIndicator } from './components/ui/ProgressIndicator'
import { WelcomePage } from './components/layout/WelcomePage'
import { DailyInputPage } from './components/modules/DailyInputPage'
import { ProbesPage } from './components/modules/ProbesPage'
import { CurrentTrajectoryPage } from './components/visualization/CurrentTrajectoryPage'
import { CoreParameterPage } from './components/visualization/CoreParameterPage'
import { MicroActionPage } from './components/visualization/MicroActionPage'
import { Step } from './types'
import { Globe } from 'lucide-react'

function AppContent() {
  const { state, dispatch } = useApp()
  const { currentStep } = state
  const { t, lang, toggleLang } = useI18n()
  const [showWelcome, setShowWelcome] = useState(true)

  const steps = [
    { key: 'welcome' as Step, label: t.steps.welcome },
    { key: 'daily' as Step, label: t.steps.daily },
    { key: 'probes' as Step, label: t.steps.probes },
    { key: 'current' as Step, label: t.steps.current },
    { key: 'core' as Step, label: t.steps.core },
    { key: 'micro' as Step, label: t.steps.micro }
  ]

  useEffect(() => {
    if (currentStep !== 'welcome') {
      setShowWelcome(false)
    }
  }, [currentStep])

  const handleStart = () => {
    dispatch({ type: 'SET_STEP', payload: 'daily' })
  }

  const handleReset = () => {
    if (window.confirm(t.app.resetConfirm)) {
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
              ◇ LifeForge
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors"
              >
                <Globe size={16} />
                <span>{lang === 'zh' ? 'EN' : '中文'}</span>
              </button>
              <button
                onClick={handleReset}
                className="text-sm text-text-muted hover:text-text-secondary transition-colors"
              >
                {t.app.reset}
              </button>
            </div>
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
            {formatTemplate(t.app.stepsRemaining, { count: steps.filter(s => steps.findIndex(st => st.key === currentStep) < steps.findIndex(st => st.key === s.key)).length })}
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
