import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { useI18n } from '../../i18n'
import { analyzeCoreParameter } from '../../utils/analyzer'
import { generateMicroActions } from '../../utils/generator'
import { generateTrajectory, generateImprovedTrajectory } from '../../utils/trajectory'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Input'
import { ChevronRight, ChevronLeft, Target, Zap, ArrowRight } from 'lucide-react'

interface CoreParameterPageProps {
  onNext: () => void
  onBack: () => void
}

export function CoreParameterPage({ onNext, onBack }: CoreParameterPageProps) {
  const { state, dispatch } = useApp()
  const { dailyRoutine, desiredFuture } = state.userProfile
  const { t } = useI18n()

  const [step, setStep] = useState<'input' | 'result'>('input')
  const [formData, setFormData] = useState({
    city: '',
    lifestyle: '',
    relationships: '',
    financial: '',
    health: '',
    dailySchedule: ''
  })

  const coreParam = useMemo(() => {
    if (step === 'result') {
      return analyzeCoreParameter(dailyRoutine, desiredFuture, lang)
    }
    return null
  }, [step, dailyRoutine, desiredFuture, lang])

  useEffect(() => {
    if (step === 'result' && coreParam) {
      const currentTrajectory = generateTrajectory(dailyRoutine, 36, 0.95, lang)

      const paramKey = coreParam.name.includes('睡眠') || coreParam.name.includes('Sleep') ? 'sleep' :
                        coreParam.name.includes('运动') || coreParam.name.includes('Exercise') ? 'exercise' :
                        coreParam.name.includes('工作') || coreParam.name.includes('Work') ? 'work' :
                        coreParam.name.includes('休闲') || coreParam.name.includes('Leisure') ? 'leisure' :
                        coreParam.name.includes('成长') || coreParam.name.includes('Growth') ? 'growth' : 'sleep'

      const improvement = coreParam.affectedMetrics[0]?.improvement || 15
      const newTrajectory = generateImprovedTrajectory(dailyRoutine, paramKey, improvement, 36, lang)
      const microActions = generateMicroActions(dailyRoutine, paramKey, lang)

      dispatch({
        type: 'UPDATE_PROFILE',
        payload: {
          results: {
            currentTrajectory,
            coreParameter: coreParam,
            microActions,
            newTrajectory
          }
        }
      })
    }
  }, [step, coreParam, dailyRoutine, dispatch])

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_DESIRED_FUTURE',
      payload: formData
    })
    setStep('result')
  }

  if (step === 'input') {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
              {t.core.inputTitle}
            </h1>
            <p className="text-text-secondary">
              {t.core.inputSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <Textarea
              label={t.core.city}
              placeholder={t.core.cityPlaceholder}
              rows={2}
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            />
            <Textarea
              label={t.core.lifestyle}
              placeholder={t.core.lifestylePlaceholder}
              rows={2}
              value={formData.lifestyle}
              onChange={(e) => setFormData(prev => ({ ...prev, lifestyle: e.target.value }))}
            />
            <Textarea
              label={t.core.relationships}
              placeholder={t.core.relationshipsPlaceholder}
              rows={2}
              value={formData.relationships}
              onChange={(e) => setFormData(prev => ({ ...prev, relationships: e.target.value }))}
            />
            <Textarea
              label={t.core.financial}
              placeholder={t.core.financialPlaceholder}
              rows={2}
              value={formData.financial}
              onChange={(e) => setFormData(prev => ({ ...prev, financial: e.target.value }))}
            />
            <Textarea
              label={t.core.health}
              placeholder={t.core.healthPlaceholder}
              rows={2}
              value={formData.health}
              onChange={(e) => setFormData(prev => ({ ...prev, health: e.target.value }))}
            />
            <Textarea
              label={t.core.dailySchedule}
              placeholder={t.core.dailySchedulePlaceholder}
              rows={3}
              value={formData.dailySchedule}
              onChange={(e) => setFormData(prev => ({ ...prev, dailySchedule: e.target.value }))}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center mt-8"
          >
            <Button variant="ghost" onClick={onBack}>
              <ChevronLeft size={18} /> {t.core.back}
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.lifestyle && !formData.dailySchedule}>
              {t.core.analyzeButton} <ChevronRight size={18} />
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
            {t.core.resultTitle}
          </h1>
          <p className="text-text-secondary">
            {t.core.resultSubtitle}
          </p>
        </motion.div>

        {coreParam && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-bg-secondary rounded-card border-2 border-accent-rose p-6 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent-rose/20 flex items-center justify-center">
                  <Target className="text-accent-rose" size={24} />
                </div>
                <div>
                  <span className="text-xs font-medium text-accent-rose uppercase tracking-wider">
                    {t.core.coreParameter}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-text-primary">
                    {coreParam.name}
                  </h2>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-4">
                {coreParam.description}
              </p>

              <p className="text-text-secondary leading-relaxed bg-bg-tertiary p-4 rounded-lg">
                <span className="text-accent-cyan font-medium">{t.core.whyThis}</span>
                <br />
                {coreParam.reasoning}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-bg-secondary rounded-card border border-border p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-accent-amber" size={20} />
                <h3 className="font-display font-semibold text-text-primary">
                  {t.core.impactChain}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {coreParam.impactChain.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <span className="px-3 py-1 bg-bg-tertiary rounded-full text-sm text-text-primary">
                      {step}
                    </span>
                    {i < coreParam.impactChain.length - 1 && (
                      <ArrowRight size={16} className="text-text-muted" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-bg-secondary rounded-card border border-border p-6 mb-6"
            >
              <h3 className="font-display font-semibold text-text-primary mb-4">
                {t.core.improvementTitle}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {coreParam.affectedMetrics.map((m, i) => (
                  <motion.div
                    key={m.metric}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg"
                  >
                    <span className="text-text-secondary">{m.metric}</span>
                    <span className="font-mono text-accent-emerald">+{m.improvement}%</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between items-center"
            >
              <Button variant="ghost" onClick={() => setStep('input')}>
                <ChevronLeft size={18} /> {t.core.reinput}
              </Button>
              <Button onClick={onNext}>
                {t.micro.title} <ChevronRight size={18} />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
