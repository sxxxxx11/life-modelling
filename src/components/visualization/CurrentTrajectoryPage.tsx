import { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useApp } from '../../context/AppContext'
import { generateTrajectory, calculateBaseScores } from '../../utils/trajectory'
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

  const baseScores = useMemo(() => calculateBaseScores(dailyRoutine), [dailyRoutine])

  const trajectory = useMemo(() => generateTrajectory(dailyRoutine, 36, 0.95), [dailyRoutine])

  const chartData = trajectory.filter((_, i) => i % 3 === 0)

  const finalScores = trajectory[trajectory.length - 1]

  const metrics = [
    {
      key: 'health',
      label: '健康',
      icon: Activity,
      color: '#FB7185',
      initial: Math.round(baseScores.health),
      final: finalScores.health,
      warning: finalScores.health < 40
    },
    {
      key: 'finance',
      label: '财务',
      icon: Wallet,
      color: '#FBBF24',
      initial: Math.round(baseScores.finance),
      final: finalScores.finance,
      warning: finalScores.finance < 35
    },
    {
      key: 'relationships',
      label: '关系',
      icon: Users,
      color: '#A78BFA',
      initial: Math.round(baseScores.relationships),
      final: finalScores.relationships,
      warning: finalScores.relationships < 30
    },
    {
      key: 'growth',
      label: '成长',
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
            如果什么都不变...
          </h1>
          <p className="text-text-secondary">
            以下是基于你当前日常状态的3年轨迹推演。我们不会美化数据。
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
              <h3 className="font-medium text-accent-rose mb-1">现实检验</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                这不是预测，而是基于你当前习惯的概率推演。
                如果你继续保持现在的所有习惯，3年后的轨迹大概率会是这样。
                <span className="text-accent-rose">这不是命运，但它是惯性。</span>
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
                  <span className="text-text-muted">现在: {metric.initial}</span>
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
            3年综合轨迹
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="month"
                  tickFormatter={(v) => `${v}月`}
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
                  labelFormatter={(v) => `第 ${v} 个月`}
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
                  name="健康"
                />
                <Line
                  type="monotone"
                  dataKey="finance"
                  stroke="#FBBF24"
                  strokeWidth={2}
                  dot={false}
                  name="财务"
                />
                <Line
                  type="monotone"
                  dataKey="relationships"
                  stroke="#A78BFA"
                  strokeWidth={2}
                  dot={false}
                  name="关系"
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#22D3EE"
                  strokeWidth={2}
                  dot={false}
                  name="成长"
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
              关键转折点
            </h2>
            <div className="space-y-3">
              {trajectory.filter(t => t.milestone).map((point) => (
                <div
                  key={point.month}
                  className="flex items-center gap-4 p-3 bg-bg-tertiary rounded-lg"
                >
                  <div className="w-16 text-center">
                    <span className="font-mono text-accent-amber text-sm">
                      第{point.month}月
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
            上一步
          </Button>
          <Button onClick={onNext}>
            下一步：设定目标 <ChevronRight size={18} />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}