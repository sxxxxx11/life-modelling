import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Utensils, Dumbbell, Car, Briefcase, Smile, Heart, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { ModuleCard } from '../ui/Card'
import { Input, Textarea, Select } from '../ui/Input'
import { Slider } from '../ui/Slider'
import { Button } from '../ui/Button'

interface DailyInputPageProps {
  onNext: () => void
}

const modules = [
  { key: 'sleep', icon: Moon, label: '睡眠' },
  { key: 'diet', icon: Utensils, label: '饮食' },
  { key: 'exercise', icon: Dumbbell, label: '运动' },
  { key: 'commute', icon: Car, label: '通勤' },
  { key: 'work', icon: Briefcase, label: '工作' },
  { key: 'leisure', icon: Smile, label: '休闲' },
  { key: 'health', icon: Heart, label: '健康' }
]

export function DailyInputPage({ onNext }: DailyInputPageProps) {
  const { state, dispatch } = useApp()
  const { dailyRoutine } = state.userProfile
  const [expandedModule, setExpandedModule] = useState<string | null>('sleep')
  const [completedCount, setCompletedCount] = useState(0)

  const updateRoutine = <K extends keyof typeof dailyRoutine>(
    section: K,
    field: string,
    value: any
  ) => {
    dispatch({
      type: 'UPDATE_DAILY_ROUTINE',
      payload: {
        [section]: {
          ...dailyRoutine[section],
          [field]: value
        }
      }
    })
  }

  const isModuleComplete = (key: string) => {
    switch (key) {
      case 'sleep':
        return dailyRoutine.sleep.bedtime && dailyRoutine.sleep.wakeTime
      case 'diet':
        return dailyRoutine.diet.breakfast !== undefined
      case 'exercise':
        return dailyRoutine.exercise.timesPerWeek !== undefined
      case 'commute':
        return dailyRoutine.commute.method !== ''
      case 'work':
        return dailyRoutine.work.type !== ''
      case 'leisure':
        return dailyRoutine.leisure.screenTime !== undefined
      case 'health':
        return dailyRoutine.health.stressLevel !== undefined
      default:
        return false
    }
  }

  const renderModuleContent = (key: string) => {
    switch (key) {
      case 'sleep':
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="睡觉时间"
                type="time"
                value={dailyRoutine.sleep.bedtime}
                onChange={(e) => updateRoutine('sleep', 'bedtime', e.target.value)}
              />
              <Input
                label="起床时间"
                type="time"
                value={dailyRoutine.sleep.wakeTime}
                onChange={(e) => updateRoutine('sleep', 'wakeTime', e.target.value)}
              />
            </div>
            <Slider
              label="睡眠质量 (1-5)"
              min={1}
              max={5}
              value={dailyRoutine.sleep.quality}
              onChange={(e) => updateRoutine('sleep', 'quality', Number(e.target.value))}
            />
            <Input
              label="夜间醒来次数"
              type="number"
              min={0}
              max={10}
              value={dailyRoutine.sleep.nightWakeups}
              onChange={(e) => updateRoutine('sleep', 'nightWakeups', Number(e.target.value))}
            />
            <Select
              label="午睡习惯"
              value={dailyRoutine.sleep.napHabit}
              onChange={(e) => updateRoutine('sleep', 'napHabit', e.target.value)}
              options={[
                { value: 'always', label: '每天午睡' },
                { value: 'sometimes', label: '偶尔午睡' },
                { value: 'never', label: '从不午睡' }
              ]}
            />
          </div>
        )

      case 'diet':
        return (
          <div className="space-y-5">
            <Select
              label="早餐习惯"
              value={dailyRoutine.diet.breakfast}
              onChange={(e) => updateRoutine('diet', 'breakfast', e.target.value)}
              options={[
                { value: 'always', label: '每天吃' },
                { value: 'sometimes', label: '偶尔吃' },
                { value: 'never', label: '几乎不吃' }
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="午餐时间"
                type="time"
                value={dailyRoutine.diet.lunchTime}
                onChange={(e) => updateRoutine('diet', 'lunchTime', e.target.value)}
              />
              <Input
                label="晚餐时间"
                type="time"
                value={dailyRoutine.diet.dinnerTime}
                onChange={(e) => updateRoutine('diet', 'dinnerTime', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="dinnerRegular"
                checked={dailyRoutine.diet.dinnerRegular}
                onChange={(e) => updateRoutine('diet', 'dinnerRegular', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-bg-tertiary text-accent-cyan focus:ring-accent-cyan"
              />
              <label htmlFor="dinnerRegular" className="text-sm text-text-secondary">
                晚餐时间相对规律
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="每天零食次数"
                type="number"
                min={0}
                max={10}
                value={dailyRoutine.diet.snacksPerDay}
                onChange={(e) => updateRoutine('diet', 'snacksPerDay', Number(e.target.value))}
              />
              <Input
                label="每天喝水量 (杯)"
                type="number"
                min={0}
                max={20}
                value={dailyRoutine.diet.waterCups}
                onChange={(e) => updateRoutine('diet', 'waterCups', Number(e.target.value))}
              />
            </div>
          </div>
        )

      case 'exercise':
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="每周运动次数"
                type="number"
                min={0}
                max={14}
                value={dailyRoutine.exercise.timesPerWeek}
                onChange={(e) => updateRoutine('exercise', 'timesPerWeek', Number(e.target.value))}
              />
              <Input
                label="每次运动时长 (分钟)"
                type="number"
                min={0}
                max={300}
                value={dailyRoutine.exercise.duration}
                onChange={(e) => updateRoutine('exercise', 'duration', Number(e.target.value))}
              />
            </div>
            <Input
              label="主要运动类型"
              placeholder="如：跑步、游泳、瑜伽..."
              value={dailyRoutine.exercise.type}
              onChange={(e) => updateRoutine('exercise', 'type', e.target.value)}
            />
            <Slider
              label="每天久坐时长 (小时)"
              min={2}
              max={14}
              value={dailyRoutine.exercise.sedentaryHours}
              onChange={(e) => updateRoutine('exercise', 'sedentaryHours', Number(e.target.value))}
            />
            <Input
              label="每天平均步数"
              type="number"
              min={0}
              max={50000}
              value={dailyRoutine.exercise.avgSteps}
              onChange={(e) => updateRoutine('exercise', 'avgSteps', Number(e.target.value))}
            />
          </div>
        )

      case 'commute':
        return (
          <div className="space-y-5">
            <Select
              label="主要通勤方式"
              value={dailyRoutine.commute.method}
              onChange={(e) => updateRoutine('commute', 'method', e.target.value)}
              options={[
                { value: '', label: '选择通勤方式' },
                { value: 'drive', label: '开车' },
                { value: 'transit', label: '公共交通' },
                { value: 'bike', label: '骑车' },
                { value: 'walk', label: '步行' },
                { value: 'wfh', label: '居家办公' },
                { value: 'other', label: '其他' }
              ]}
            />
            <Input
              label="单程通勤时间 (分钟)"
              type="number"
              min={0}
              max={180}
              value={dailyRoutine.commute.duration}
              onChange={(e) => updateRoutine('commute', 'duration', Number(e.target.value))}
            />
            <Textarea
              label="通勤时通常做什么"
              placeholder="如：刷手机、听播客、看视频..."
              rows={2}
              value={dailyRoutine.commute.activity}
              onChange={(e) => updateRoutine('commute', 'activity', e.target.value)}
            />
          </div>
        )

      case 'work':
        return (
          <div className="space-y-5">
            <Input
              label="工作类型"
              placeholder="如：程序员、销售、教师..."
              value={dailyRoutine.work.type}
              onChange={(e) => updateRoutine('work', 'type', e.target.value)}
            />
            <Slider
              label="每天专注工作时长 (小时)"
              min={1}
              max={12}
              value={dailyRoutine.work.focusHours}
              onChange={(e) => updateRoutine('work', 'focusHours', Number(e.target.value))}
            />
            <Select
              label="加班频率"
              value={dailyRoutine.work.overtimeFreq}
              onChange={(e) => updateRoutine('work', 'overtimeFreq', e.target.value)}
              options={[
                { value: 'never', label: '几乎不加班' },
                { value: 'sometimes', label: '偶尔加班' },
                { value: 'often', label: '经常加班' }
              ]}
            />
            <Slider
              label="每天学习/成长时间 (分钟)"
              min={0}
              max={120}
              step={5}
              value={dailyRoutine.work.growthTime}
              onChange={(e) => updateRoutine('work', 'growthTime', Number(e.target.value))}
            />
          </div>
        )

      case 'leisure':
        return (
          <div className="space-y-5">
            <Slider
              label="每天屏幕时间 (小时)"
              min={0}
              max={12}
              value={dailyRoutine.leisure.screenTime}
              onChange={(e) => updateRoutine('leisure', 'screenTime', Number(e.target.value))}
            />
            <Input
              label="每周社交活动次数"
              type="number"
              min={0}
              max={21}
              value={dailyRoutine.leisure.socialFreq}
              onChange={(e) => updateRoutine('leisure', 'socialFreq', Number(e.target.value))}
            />
            <Slider
              label="每天独处时间 (小时)"
              min={0}
              max={8}
              value={dailyRoutine.leisure.aloneTime}
              onChange={(e) => updateRoutine('leisure', 'aloneTime', Number(e.target.value))}
            />
            <Textarea
              label="兴趣爱好"
              placeholder="如：读书、摄影、烹饪...（用逗号分隔）"
              rows={2}
              value={dailyRoutine.leisure.hobbies.join('、')}
              onChange={(e) => updateRoutine('leisure', 'hobbies', e.target.value.split('、').filter(Boolean))}
            />
          </div>
        )

      case 'health':
        return (
          <div className="space-y-5">
            <Select
              label="体检频率"
              value={dailyRoutine.health.checkupFreq}
              onChange={(e) => updateRoutine('health', 'checkupFreq', e.target.value)}
              options={[
                { value: 'never', label: '几乎不体检' },
                { value: 'rarely', label: '偶尔体检' },
                { value: 'yearly', label: '每年一次' },
                { value: 'half', label: '半年一次' }
              ]}
            />
            <Slider
              label="当前压力水平 (1-10)"
              min={1}
              max={10}
              value={dailyRoutine.health.stressLevel}
              onChange={(e) => updateRoutine('health', 'stressLevel', Number(e.target.value))}
            />
            <Textarea
              label="近期身体症状"
              placeholder="如：失眠、头痛、胃不适...（用逗号分隔，无则填"无"）"
              rows={2}
              value={dailyRoutine.health.symptoms.join('、')}
              onChange={(e) => updateRoutine('health', 'symptoms', e.target.value.split('、').filter(Boolean))}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
            你的日常是什么样子的？
          </h1>
          <p className="text-text-secondary">
            请如实填写你目前的日常状态。越真实，推演越准确。
          </p>
        </motion.div>

        <div className="space-y-3 mb-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ModuleCard
                title={module.label}
                icon={<module.icon size={20} />}
                isExpanded={expandedModule === module.key}
                onToggle={() => setExpandedModule(expandedModule === module.key ? null : module.key)}
                isValid={isModuleComplete(module.key)}
              >
                {renderModuleContent(module.key)}
              </ModuleCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center"
        >
          <p className="text-sm text-text-muted">
            {modules.filter(m => isModuleComplete(m.key)).length} / {modules.length} 模块已填写
          </p>
          <Button onClick={onNext}>
            继续 <ChevronRight size={18} />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}