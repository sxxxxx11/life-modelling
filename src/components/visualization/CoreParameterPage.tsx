import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { analyzeCoreParameter } from '../../utils/analyzer'
import { generateMicroActions } from '../../utils/generator'
import { generateTrajectory, generateImprovedTrajectory } from '../../utils/trajectory'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Textarea } from '../ui/Input'
import { ChevronRight, ChevronLeft, Target, Zap, ArrowRight } from 'lucide-react'

interface CoreParameterPageProps {
  onNext: () => void
  onBack: () => void
}

export function CoreParameterPage({ onNext, onBack }: CoreParameterPageProps) {
  const { state, dispatch } = useApp()
  const { dailyRoutine, desiredFuture } = state.userProfile

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
      const paramName = formData.city.length > 0 ? 'work' : 'sleep'
      return analyzeCoreParameter(dailyRoutine, desiredFuture)
    }
    return null
  }, [step, dailyRoutine, desiredFuture, formData])

  useEffect(() => {
    if (step === 'result' && coreParam) {
      const currentTrajectory = generateTrajectory(dailyRoutine, 36, 0.95)

      const paramKey = coreParam.name.includes('睡眠') ? 'sleep' :
                        coreParam.name.includes('运动') ? 'exercise' :
                        coreParam.name.includes('工作') ? 'work' :
                        coreParam.name.includes('休闲') ? 'leisure' :
                        coreParam.name.includes('成长') ? 'growth' : 'sleep'

      const improvement = coreParam.affectedMetrics[0]?.improvement || 15
      const newTrajectory = generateImprovedTrajectory(dailyRoutine, paramKey, improvement, 36)
      const microActions = generateMicroActions(dailyRoutine, paramKey)

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
              你想要什么样的人生？
            </h1>
            <p className="text-text-secondary">
              请具体描述你3年后想要的生活。越具体，分析越准确。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <Textarea
              label="你希望在哪个城市生活？"
              placeholder="如：杭州，有西湖，工作机会多..."
              rows={2}
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            />
            <Textarea
              label="你理想的生活节奏是什么样的？"
              placeholder="如：朝九晚六，周末双休，有时间发展爱好..."
              rows={2}
              value={formData.lifestyle}
              onChange={(e) => setFormData(prev => ({ ...prev, lifestyle: e.target.value }))}
            />
            <Textarea
              label="你想和谁在一起？"
              placeholder="如：和志同道合的朋友，有稳定的亲密关系..."
              rows={2}
              value={formData.relationships}
              onChange={(e) => setFormData(prev => ({ ...prev, relationships: e.target.value }))}
            />
            <Textarea
              label="你的财务目标是什么？"
              placeholder="如：存款达到X万，有稳定的被动收入..."
              rows={2}
              value={formData.financial}
              onChange={(e) => setFormData(prev => ({ ...prev, financial: e.target.value }))}
            />
            <Textarea
              label="你希望的健康状态是什么样的？"
              placeholder="如：体检无异常指标，每天精力充沛..."
              rows={2}
              value={formData.health}
              onChange={(e) => setFormData(prev => ({ ...prev, health: e.target.value }))}
            />
            <Textarea
              label="描述一下你理想的一天"
              placeholder="如：7点起床，运动30分钟，8点吃早餐，9点开始工作..."
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
              <ChevronLeft size={18} /> 上一步
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.lifestyle && !formData.dailySchedule}>
              分析核心参数 <ChevronRight size={18} />
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
            你的核心人生参数
          </h1>
          <p className="text-text-secondary">
            在所有可以改变的参数中，这个是最能撬动全局的那一个
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
                    Core Parameter
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
                <span className="text-accent-cyan font-medium">为什么是这个？</span>
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
                  影响链
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
                改善效果预估
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
                <ChevronLeft size={18} /> 重新描述
              </Button>
              <Button onClick={onNext}>
                查看微行动方案 <ChevronRight size={18} />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}