import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { generateProbes, getPendingProbes } from '../../data/probes'
import { ProbeQuestion } from '../../data/probes'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Input'
import { ChevronRight, ChevronLeft, MessageCircle, Check, SkipForward } from 'lucide-react'

interface ProbesPageProps {
  onNext: () => void
  onBack: () => void
}

export function ProbesPage({ onNext, onBack }: ProbesPageProps) {
  const { state, dispatch } = useApp()
  const { dailyRoutine, probeAnswers } = state.userProfile

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [skippedIds, setSkippedIds] = useState<string[]>([])

  const probes = useMemo(() => generateProbes(dailyRoutine), [dailyRoutine])
  const completedIds = useMemo(() => probeAnswers.map(a => a.questionId), [probeAnswers])
  const pendingProbes = useMemo(() =>
    probes.filter(p => !completedIds.includes(p.id) && !skippedIds.includes(p.id)),
    [probes, completedIds, skippedIds]
  )

  const currentProbe = pendingProbes[currentIndex]

  const handleSubmit = () => {
    if (!currentProbe || !answer.trim()) return

    dispatch({
      type: 'ADD_PROBE_ANSWER',
      payload: {
        questionId: currentProbe.id,
        answer: answer.trim(),
        timestamp: Date.now()
      }
    })

    setAnswer('')
    if (currentIndex >= pendingProbes.length - 1) {
      onNext()
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handleSkip = () => {
    if (!currentProbe) return
    setSkippedIds(prev => [...prev, currentProbe.id])
    setAnswer('')
    if (currentIndex >= pendingProbes.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  if (pendingProbes.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-5xl mb-4">✨</div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
            探针完成
          </h2>
          <p className="text-text-secondary mb-6">
            基于你的回答，我们已经建立了足够完整的人生日程模型
          </p>
          <Button onClick={onNext}>
            查看你的3年轨迹 →
          </Button>
        </motion.div>
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent-cyan/20 flex items-center justify-center">
              <MessageCircle className="text-accent-cyan" size={20} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-text-primary">
                深度探针
              </h1>
              <p className="text-sm text-text-muted">
                基于你的日常，我们想深入了解一些细节
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-secondary">回答进度</span>
            <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-cyan"
                initial={{ width: 0 }}
                animate={{ width: `${(completedIds.length / probes.length) * 100}%` }}
              />
            </div>
            <span className="font-mono text-accent-cyan">
              {completedIds.length}/{probes.length}
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentProbe.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-bg-secondary rounded-card border border-border p-6 mb-6"
          >
            <div className="mb-2">
              <span className="text-xs font-medium text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded">
                {currentProbe.category === 'sleep' ? '睡眠' :
                 currentProbe.category === 'diet' ? '饮食' :
                 currentProbe.category === 'exercise' ? '运动' :
                 currentProbe.category === 'commute' ? '通勤' :
                 currentProbe.category === 'work' ? '工作' :
                 currentProbe.category === 'leisure' ? '休闲' : '健康'}
              </span>
            </div>

            <h2 className="text-xl font-medium text-text-primary mb-6 leading-relaxed">
              {currentProbe.question}
            </h2>

            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="写下你的回答..."
              rows={4}
              className="mb-4"
            />

            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={!answer.trim()}
                className="flex-1"
              >
                <Check size={18} /> 提交
              </Button>
              <Button variant="ghost" onClick={handleSkip}>
                <SkipForward size={18} /> 跳过
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center"
        >
          <Button variant="ghost" onClick={onBack}>
            <ChevronLeft size={18} /> 返回
          </Button>

          <div className="text-sm text-text-muted">
            探针 {currentIndex + 1} / {pendingProbes.length}
          </div>

          <Button variant="secondary" onClick={onNext}>
            跳过全部 <ChevronRight size={18} />
          </Button>
        </motion.div>

        {probeAnswers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-sm font-medium text-text-secondary mb-3">
              已回答的探针
            </h3>
            <div className="space-y-2">
              {probeAnswers.slice(-3).reverse().map(ans => {
                const probe = probes.find(p => p.id === ans.questionId)
                if (!probe) return null
                return (
                  <div
                    key={ans.questionId}
                    className="bg-bg-tertiary rounded-lg p-3 text-sm"
                  >
                    <p className="text-text-muted mb-1 line-through">
                      {probe.question.slice(0, 50)}...
                    </p>
                    <p className="text-text-secondary">
                      {ans.answer.slice(0, 100)}
                      {ans.answer.length > 100 ? '...' : ''}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}