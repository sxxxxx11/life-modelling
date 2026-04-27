import { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useApp } from '../../context/AppContext'
import { useI18n } from '../../i18n'
import { generateTrajectory, calculateBaseScores, getMetricLabel, getMetricColor } from '../../utils/trajectory'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ChevronRight, AlertTriangle, TrendingDown, Activity, Wallet, Users, Brain } from 'lucide-react'

interface CurrentTrajectoryPageProps {
  onNext: () => void
  onBack: () => void
}

export function CurrentTrajectoryPage({ onNext, onBack }: CurrentTrajectoryPageProps) {
  const { state, dispatch } = useApp()
  const { dailyRoutine } = state.userProfile
  const { t, lang } = useI18n()

  const baseScores = useMemo(() => calculateBaseScores(dailyRoutine), [dailyRoutine])
  const trajectory = useMemo(() => generateTrajectory(dailyRoutine, 36, 0.95, lang), [dailyRoutine, lang])

  const chartData = trajectory.filter((_, i) => i % 3 === 0)
  const finalScores = trajectory[trajectory.length - 1]

  const metrics = [
    {
      key: 'health',
      label: t.trajectory.metrics.health,
      icon: Activity,
      color: '#FB7185',
      initial: Math.round(baseScores.health),
      final: finalScores.health,
      warning: finalScores.health < 40
    },
    {
      key: 'finance',
      label: t.trajectory.metrics.finance,
      icon: Wallet,
      color: '#FBBF24',
      initial: Math.round(baseScores.finance),
      final: finalScores.finance,
      warning: finalScores.finance < 35
    },
    {
      key: 'relationships',
      label: t.trajectory.metrics.relationships,
      icon: Users,
      color: '#A78BFA',
      initial: Math.round(baseScores.relationships),
      final: finalScores.relationships,
      warning: finalScores.relationships < 30
    },
    {
      key: 'growth',
      label: t.trajectory.metrics.growth,
      icon: Brain,
      color: '#22D3EE',
      initial: Math.round(baseScores.growth),
      final: finalScores.growth,
      warning: finalScores.growth < 30
    }
  ]

  useEffect(() => {
    const final = trajectory[trajectory.length - 1]
    if (final) {
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: {
          results: {
            currentTrajectory: trajectory,
            coreParameter: {
              name: '',
              description: '',
              impactChain: [],
              affectedMetrics: [],
              reasoning: ''
            },
            microActions: [],
            newTrajectory: trajectory
          }
        }
      })
    }
  }, [trajectory])

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
            {t.trajectory.title}
          </h1>
          <p className="text-text-secondary">
            {t.trajectory.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-bg-secondary rounded-card border border-accent-rose/30 p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-accent-rose flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-accent-rose mb-1">{t.trajectory.realityCheck}</h3>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                {t.trajectory.realityCheckText}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card variant={metric.warning ? 'warning' : 'default'} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <metric.icon style={{ color: metric.color }} size={18} />
                    <span className="font-medium text-text-primary">{metric.label}</span>
                  </div>
                  {metric.warning && (
                    <TrendingDown size={16} className="text-accent-rose" />
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="font-mono text-2xl font-bold text-text-primary"
                  >
                    {metric.final}
                  </motion.span>
                  <span className="text-text-muted text-sm">/100</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="text-text-muted">: {metric.initial}</span>
                  <span className="text-accent-rose">
                    {metric.final - metric.initial < 0 ? '↓' : ''}{metric.final - metric.initial}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-bg-secondary rounded-card border border-border p-6 mb-6"
        >
          <h2 className="font-display font-semibold text-text-primary mb-4">
            {t.trajectory.chartTitle}
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="month"
                  tickFormatter={(v) => `${v}${lang === 'zh' ? '月' : 'mo'}`}
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#16161A',
                    border: '1px solid #2A2A32',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                  labelFormatter={(v) => ` ${lang === 'zh' ? '第' : ''}${v}${lang === 'zh' ? '个月' : ' months'}`}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="health"
                  stroke="#FB7185"
                  strokeWidth={2}
                  dot={false}
                  name={t.trajectory.metrics.health}
                />
                <Line
                  type="monotone"
                  dataKey="finance"
                  stroke="#FBBF24"
                  strokeWidth={2}
                  dot={false}
                  name={t.trajectory.metrics.finance}
                />
                <Line
                  type="monotone"
                  dataKey="relationships"
                  stroke="#A78BFA"
                  strokeWidth={2}
                  dot={false}
                  name={t.trajectory.metrics.relationships}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#22D3EE"
                  strokeWidth={2}
                  dot={false}
                  name={t.trajectory.metrics.growth}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {trajectory.filter(t => t.milestone).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-bg-secondary rounded-card border border-border p-6 mb-6"
          >
            <h2 className="font-display font-semibold text-text-primary mb-4">
              {t.trajectory.milestones}
            </h2>
            <div className="space-y-3">
              {trajectory.filter(t => t.milestone).map((point) => (
                <div
                  key={point.month}
                  className="flex items-center gap-4 p-3 bg-bg-tertiary rounded-lg"
                >
                  <div className="w-16 text-center">
                    <span className="font-mono text-accent-amber text-sm">
                      {lang === 'zh' ? '第' : ''}{point.month}{lang === 'zh' ? '月' : ' mo'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-accent-rose font-medium">
                      {point.milestone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-center"
        >
          <Button variant="ghost" onClick={onBack}>
            {t.trajectory.back}
          </Button>
          <Button onClick={onNext}>
            {t.trajectory.next} <ChevronRight size={18} />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
