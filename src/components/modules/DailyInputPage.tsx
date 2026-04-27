import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Utensils, Dumbbell, Car, Briefcase, Smile, Heart, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useI18n } from '../../i18n'
import { ModuleCard } from '../ui/Card'
import { Input, Textarea, Select } from '../ui/Input'
import { Slider } from '../ui/Slider'
import { Button } from '../ui/Button'
import { formatTemplate } from '../../i18n'

interface DailyInputPageProps {
  onNext: () => void
}

export function DailyInputPage({ onNext }: DailyInputPageProps) {
  const { state, dispatch } = useApp()
  const { dailyRoutine } = state.userProfile
  const { t } = useI18n()
  const [expandedModule, setExpandedModule] = useState<string | null>('sleep')

  const modules = [
    { key: 'sleep', icon: Moon, label: t.daily.modules.sleep },
    { key: 'diet', icon: Utensils, label: t.daily.modules.diet },
    { key: 'exercise', icon: Dumbbell, label: t.daily.modules.exercise },
    { key: 'commute', icon: Car, label: t.daily.modules.commute },
    { key: 'work', icon: Briefcase, label: t.daily.modules.work },
    { key: 'leisure', icon: Smile, label: t.daily.modules.leisure },
    { key: 'health', icon: Heart, label: t.daily.modules.health }
  ]

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
                label={t.daily.sleep.bedtime}
                type="time"
                value={dailyRoutine.sleep.bedtime}
                onChange={(e) => updateRoutine('sleep', 'bedtime', e.target.value)}
              />
              <Input
                label={t.daily.sleep.wakeTime}
                type="time"
                value={dailyRoutine.sleep.wakeTime}
                onChange={(e) => updateRoutine('sleep', 'wakeTime', e.target.value)}
              />
            </div>
            <Slider
              label={t.daily.sleep.quality}
              min={1}
              max={5}
              value={dailyRoutine.sleep.quality}
              onChange={(e) => updateRoutine('sleep', 'quality', Number(e.target.value))}
            />
            <Input
              label={t.daily.sleep.nightWakeups}
              type="number"
              min={0}
              max={10}
              value={dailyRoutine.sleep.nightWakeups}
              onChange={(e) => updateRoutine('sleep', 'nightWakeups', Number(e.target.value))}
            />
            <Select
              label={t.daily.sleep.napHabit}
              value={dailyRoutine.sleep.napHabit}
              onChange={(e) => updateRoutine('sleep', 'napHabit', e.target.value)}
              options={[
                { value: 'always', label: t.daily.sleep.napAlways },
                { value: 'sometimes', label: t.daily.sleep.napSometimes },
                { value: 'never', label: t.daily.sleep.napNever }
              ]}
            />
          </div>
        )

      case 'diet':
        return (
          <div className="space-y-5">
            <Select
              label={t.daily.diet.breakfast}
              value={dailyRoutine.diet.breakfast}
              onChange={(e) => updateRoutine('diet', 'breakfast', e.target.value)}
              options={[
                { value: 'always', label: t.daily.diet.breakfastAlways },
                { value: 'sometimes', label: t.daily.diet.breakfastSometimes },
                { value: 'never', label: t.daily.diet.breakfastNever }
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t.daily.diet.lunchTime}
                type="time"
                value={dailyRoutine.diet.lunchTime}
                onChange={(e) => updateRoutine('diet', 'lunchTime', e.target.value)}
              />
              <Input
                label={t.daily.diet.dinnerTime}
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
                {t.daily.diet.dinnerRegular}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t.daily.diet.snacksPerDay}
                type="number"
                min={0}
                max={10}
                value={dailyRoutine.diet.snacksPerDay}
                onChange={(e) => updateRoutine('diet', 'snacksPerDay', Number(e.target.value))}
              />
              <Input
                label={t.daily.diet.waterCups}
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
                label={t.daily.exercise.timesPerWeek}
                type="number"
                min={0}
                max={14}
                value={dailyRoutine.exercise.timesPerWeek}
                onChange={(e) => updateRoutine('exercise', 'timesPerWeek', Number(e.target.value))}
              />
              <Input
                label={t.daily.exercise.duration}
                type="number"
                min={0}
                max={300}
                value={dailyRoutine.exercise.duration}
                onChange={(e) => updateRoutine('exercise', 'duration', Number(e.target.value))}
              />
            </div>
            <Input
              label={t.daily.exercise.type}
              placeholder={t.daily.exercise.typePlaceholder}
              value={dailyRoutine.exercise.type}
              onChange={(e) => updateRoutine('exercise', 'type', e.target.value)}
            />
            <Slider
              label={t.daily.exercise.sedentaryHours}
              min={2}
              max={14}
              value={dailyRoutine.exercise.sedentaryHours}
              onChange={(e) => updateRoutine('exercise', 'sedentaryHours', Number(e.target.value))}
            />
            <Input
              label={t.daily.exercise.avgSteps}
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
              label={t.daily.commute.method}
              value={dailyRoutine.commute.method}
              onChange={(e) => updateRoutine('commute', 'method', e.target.value)}
              options={[
                { value: '', label: t.daily.commute.methodPlaceholder },
                { value: 'drive', label: t.daily.commute.drive },
                { value: 'transit', label: t.daily.commute.transit },
                { value: 'bike', label: t.daily.commute.bike },
                { value: 'walk', label: t.daily.commute.walk },
                { value: 'wfh', label: t.daily.commute.wfh },
                { value: 'other', label: t.daily.commute.other }
              ]}
            />
            <Input
              label={t.daily.commute.duration}
              type="number"
              min={0}
              max={180}
              value={dailyRoutine.commute.duration}
              onChange={(e) => updateRoutine('commute', 'duration', Number(e.target.value))}
            />
            <Textarea
              label={t.daily.commute.activity}
              placeholder={t.daily.commute.activityPlaceholder}
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
              label={t.daily.work.type}
              placeholder={t.daily.work.typePlaceholder}
              value={dailyRoutine.work.type}
              onChange={(e) => updateRoutine('work', 'type', e.target.value)}
            />
            <Slider
              label={t.daily.work.focusHours}
              min={1}
              max={12}
              value={dailyRoutine.work.focusHours}
              onChange={(e) => updateRoutine('work', 'focusHours', Number(e.target.value))}
            />
            <Select
              label={t.daily.work.overtimeFreq}
              value={dailyRoutine.work.overtimeFreq}
              onChange={(e) => updateRoutine('work', 'overtimeFreq', e.target.value)}
              options={[
                { value: 'never', label: t.daily.work.overtimeNever },
                { value: 'sometimes', label: t.daily.work.overtimeSometimes },
                { value: 'often', label: t.daily.work.overtimeOften }
              ]}
            />
            <Slider
              label={t.daily.work.growthTime}
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
              label={t.daily.leisure.screenTime}
              min={0}
              max={12}
              value={dailyRoutine.leisure.screenTime}
              onChange={(e) => updateRoutine('leisure', 'screenTime', Number(e.target.value))}
            />
            <Input
              label={t.daily.leisure.socialFreq}
              type="number"
              min={0}
              max={21}
              value={dailyRoutine.leisure.socialFreq}
              onChange={(e) => updateRoutine('leisure', 'socialFreq', Number(e.target.value))}
            />
            <Slider
              label={t.daily.leisure.aloneTime}
              min={0}
              max={8}
              value={dailyRoutine.leisure.aloneTime}
              onChange={(e) => updateRoutine('leisure', 'aloneTime', Number(e.target.value))}
            />
            <Textarea
              label={t.daily.leisure.hobbies}
              placeholder={t.daily.leisure.hobbiesPlaceholder}
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
              label={t.daily.health.checkupFreq}
              value={dailyRoutine.health.checkupFreq}
              onChange={(e) => updateRoutine('health', 'checkupFreq', e.target.value)}
              options={[
                { value: 'never', label: t.daily.health.checkupNever },
                { value: 'rarely', label: t.daily.health.checkupRarely },
                { value: 'yearly', label: t.daily.health.checkupYearly },
                { value: 'half', label: t.daily.health.checkupHalf }
              ]}
            />
            <Slider
              label={t.daily.health.stressLevel}
              min={1}
              max={10}
              value={dailyRoutine.health.stressLevel}
              onChange={(e) => updateRoutine('health', 'stressLevel', Number(e.target.value))}
            />
            <Textarea
              label={t.daily.health.symptoms}
              placeholder={t.daily.health.symptomsPlaceholder}
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
            {t.daily.title}
          </h1>
          <p className="text-text-secondary">
            {t.daily.subtitle}
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
            {formatTemplate(t.daily.progress, { completed: modules.filter(m => isModuleComplete(m.key)).length, total: modules.length })}
          </p>
          <Button onClick={onNext}>
            {t.daily.continue} <ChevronRight size={18} />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
