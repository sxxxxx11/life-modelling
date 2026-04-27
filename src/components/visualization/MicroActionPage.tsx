import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ComposedChart, Area } from 'recharts'
import { useApp } from '../../context/AppContext'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { getConfidenceLevel } from '../../utils/generator'
import { CheckCircle2, Clock, Zap, TrendingUp, RotateCcw, ChevronRight, Flame } from 'lucide-react'

interface MicroActionPageProps {
  onFinish: () => void
  onBack: () => void
  onReset: () => void
}

export function MicroActionPage({ onFinish, onBack, onReset }: MicroActionPageProps) {
  const { state } = useApp()
  const { dailyRoutine, results } = state.userProfile

  const { currentTrajectory, coreParameter, microActions, newTrajectory } = results || {
    currentTrajectory: [],
    coreParameter: null,
    microActions: [],
    newTrajectory: []
  }

  const confidence = useMemo(() => {
    if (!coreParameter) return null
    return getConfidenceLevel(dailyRoutine, coreParameter.name.includes('睡眠') ? 'sleep' : 'work')
  }, [dailyRoutine, coreParameter])

  const chartData = useMemo(() => {
    if (!currentTrajectory.length || !newTrajectory.length) return []
    return currentTrajectory.filter((_, i) => i % 3 === 0).map((point, i) => ({
      month: point.month,
      current: point.overall,
      improved: newTrajectory[i * 3]?.overall || point.overall
    }))
  }, [currentTrajectory, newTrajectory])

  if (!coreParameter || !microActions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted">正在加载...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="text-4xl mb-4">🎯</div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
            你的微行动方案
          </h1>
          <p className="text-text-secondary max-w-md mx-auto">
            针对"{coreParameter.name}"，我们为你设计了每天可以轻松执行的动作
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-bg-secondary rounded-card border border-accent-emerald/30 p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <Flame className="text-accent-emerald flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-accent-emerald mb-1">设计原则</h3>
              <p className="text-sm text-text-secondary">
                这些动作极其简单，2分钟内可完成，不依赖意志力，融入现有习惯。
                目标：让你不可能失败。
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 mb-8"
        >
          {microActions.map((action, i) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Card className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-violet/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-accent-violet font-bold">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary mb-2">
                      {action.action}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-1 text-text-muted">
                        <Zap size={14} />
                        <span>{action.trigger}</span>
                      </div>
                      <div className="flex items-center gap-1 text-text-muted">
                        <Clock size={14} />
                        <span>{action.duration}</span>
                      </div>
                    </div>
                    {action.resistanceSolution && (
                      <p className="mt-2 text-sm text-text-muted bg-bg-tertiary p-2 rounded">
                        💡 {action.resistanceSolution}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {confidence && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-bg-secondary rounded-card border border-border p-6 mb-6"
          >
            <h3 className="font-display font-semibold text-text-primary mb-4">
              行动自信度评估
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="h-3 bg-bg-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      confidence.level === 'high' ? 'bg-accent-emerald' :
                      confidence.level === 'medium' ? 'bg-accent-amber' : 'bg-accent-rose'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence.score}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </div>
              </div>
              <span className={`font-mono font-bold ${
                confidence.level === 'high' ? 'text-accent-emerald' :
                confidence.level === 'medium' ? 'text-accent-amber' : 'text-accent-rose'
              }`}>
                {confidence.score}%
              </span>
            </div>
            {confidence.reasons.length > 0 && (
              <div className="space-y-1">
                {confidence.reasons.map((reason, i) => (
                  <p key={i} className="text-sm text-text-secondary flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent-emerald" />
                    {reason}
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-bg-secondary rounded-card border border-border p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-accent-cyan" size={20} />
            <h3 className="font-display font-semibold text-text-primary">
              改变后的新轨迹
            </h3>
          </div>

          <p className="text-sm text-text-secondary mb-4">
            橙色线条为原始轨迹，绿色线条为改变后的新轨迹
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
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
                  formatter={(value: number) => [`${value}`, '']}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#FBBF24"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="原始轨迹"
                />
                <Line
                  type="monotone"
                  dataKey="improved"
                  stroke="#34D399"
                  strokeWidth={3}
                  dot={false}
                  name="新轨迹"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-bg-tertiary rounded-lg">
              <p className="text-xs text-text-muted mb-1">3年后原始</p>
              <p className="font-mono text-xl font-bold text-accent-amber">
                {chartData[chartData.length - 1]?.current || 0}
              </p>
            </div>
            <div className="text-center p-3 bg-bg-tertiary rounded-lg">
              <p className="text-xs text-text-muted mb-1">3年后新轨迹</p>
              <p className="font-mono text-xl font-bold text-accent-emerald">
                {chartData[chartData.length - 1]?.improved || 0}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-3"
        >
          <Button size="lg" onClick={onFinish} className="w-full">
            开始执行 <ChevronRight size={18} />
          </Button>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onBack} className="flex-1">
              <ChevronRight size={18} className="rotate-180" /> 上一步
            </Button>
            <Button variant="ghost" onClick={onReset} className="flex-1">
              <RotateCcw size={18} /> 重新开始
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}