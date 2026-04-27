import { DailyRoutine, TrajectoryPoint } from '../types'

function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function calculateSleepScore(routine: DailyRoutine): number {
  const bedtimeMinutes = parseTime(routine.sleep.bedtime)
  const wakeTimeMinutes = parseTime(routine.sleep.wakeTime)

  let sleepDuration = wakeTimeMinutes - bedtimeMinutes
  if (sleepDuration < 0) sleepDuration += 24 * 60

  const idealDuration = 8 * 60
  const durationScore = 100 - Math.abs(sleepDuration - idealDuration) / (idealDuration) * 100

  const qualityScore = routine.sleep.quality * 20
  const wakeupPenalty = routine.sleep.nightWakeups * 5

  const napBonus = routine.sleep.napHabit === 'always' ? 5 :
                    routine.sleep.napHabit === 'sometimes' ? 10 : 0

  return Math.max(0, Math.min(100, (durationScore * 0.4 + qualityScore * 0.5 - wakeupPenalty + napBonus)))
}

function calculateDietScore(routine: DailyRoutine): number {
  let score = 50

  const breakfastScore = routine.diet.breakfast === 'always' ? 20 :
                         routine.diet.breakfast === 'sometimes' ? 10 : 0
  score += breakfastScore

  score += routine.diet.dinnerRegular ? 10 : -10

  const waterScore = Math.min(10, routine.diet.waterCups * 2)
  score += waterScore

  const snackPenalty = Math.min(20, routine.diet.snacksPerDay * 5)
  score -= snackPenalty

  return Math.max(0, Math.min(100, score))
}

function calculateExerciseScore(routine: DailyRoutine): number {
  let score = 30

  const exerciseScore = Math.min(30, routine.exercise.timesPerWeek * 6)
  score += exerciseScore

  const durationScore = Math.min(15, routine.exercise.duration / 2)
  score += durationScore

  const stepsScore = routine.exercise.avgSteps >= 10000 ? 15 :
                     routine.exercise.avgSteps >= 7000 ? 10 :
                     routine.exercise.avgSteps >= 5000 ? 5 : 0
  score += stepsScore

  const sedentaryPenalty = Math.min(20, (routine.exercise.sedentaryHours - 6) * 3)
  score -= Math.max(0, sedentaryPenalty)

  return Math.max(0, Math.min(100, score))
}

function calculateWorkScore(routine: DailyRoutine): number {
  let score = 50

  const focusScore = Math.min(25, routine.work.focusHours * 5)
  score += focusScore

  const overtimePenalty = routine.work.overtimeFreq === 'often' ? -15 :
                          routine.work.overtimeFreq === 'sometimes' ? -5 : 0
  score += overtimePenalty

  const growthScore = Math.min(15, routine.work.growthTime / 2)
  score += growthScore

  return Math.max(0, Math.min(100, score))
}

function calculateLeisureScore(routine: DailyRoutine): number {
  let score = 50

  const screenPenalty = Math.min(30, (routine.leisure.screenTime - 2) * 10)
  score -= Math.max(0, screenPenalty)

  const socialBonus = Math.min(15, routine.leisure.socialFreq * 3)
  score += socialBonus

  const hobbyBonus = Math.min(10, routine.leisure.hobbies.length * 3)
  score += hobbyBonus

  return Math.max(0, Math.min(100, score))
}

function calculateHealthScore(routine: DailyRoutine): number {
  let score = 70

  const stressPenalty = (routine.health.stressLevel - 5) * 5
  score -= Math.max(-30, Math.min(30, stressPenalty))

  const symptomPenalty = routine.health.symptoms.length * 8
  score -= symptomPenalty

  return Math.max(0, Math.min(100, score))
}

export function calculateBaseScores(routine: DailyRoutine): {
  health: number
  finance: number
  relationships: number
  growth: number
} {
  const sleepScore = calculateSleepScore(routine)
  const dietScore = calculateDietScore(routine)
  const exerciseScore = calculateExerciseScore(routine)
  const workScore = calculateWorkScore(routine)
  const leisureScore = calculateLeisureScore(routine)
  const healthScore = calculateHealthScore(routine)

  return {
    health: (sleepScore * 0.25 + dietScore * 0.25 + exerciseScore * 0.3 + healthScore * 0.2),
    finance: (workScore * 0.7 + sleepScore * 0.15 + healthScore * 0.15),
    relationships: (leisureScore * 0.4 + sleepScore * 0.3 + workScore * 0.15 + healthScore * 0.15),
    growth: (workScore * 0.4 + sleepScore * 0.2 + leisureScore * 0.2 + exerciseScore * 0.2)
  }
}

const milestonesEn = [
  { month: 6, condition: (h: number) => h < 40, text: 'Abnormal checkup indicators' },
  { month: 12, condition: (h: number, f: number) => f < 35, text: 'Tight financial situation' },
  { month: 18, condition: (h: number, f: number, g: number) => g < 30, text: 'Career stagnation' },
  { month: 24, condition: (h: number) => h < 35, text: 'Chronic fatigue syndrome' },
  { month: 30, condition: (h: number, f: number, r: number) => r < 30, text: 'Emotional distancing in relationships' },
  { month: 36, condition: (h: number, f: number, r: number, g: number, o: number) => o < 40, text: 'Significant decline in quality of life' }
]

const milestonesZh = [
  { month: 6, condition: (h: number) => h < 40, text: '体检指标异常' },
  { month: 12, condition: (h: number, f: number) => f < 35, text: '财务状况紧张' },
  { month: 18, condition: (h: number, f: number, g: number) => g < 30, text: '职业发展停滞' },
  { month: 24, condition: (h: number) => h < 35, text: '慢性疲劳综合征' },
  { month: 30, condition: (h: number, f: number, r: number) => r < 30, text: '人际关系疏离' },
  { month: 36, condition: (h: number, f: number, r: number, g: number, o: number) => o < 40, text: '生活质量明显下降' }
]

function getMilestone(month: number, health: number, finance: number, relationships: number, growth: number, overall: number, lang: 'zh' | 'en'): string | undefined {
  const milestones = lang === 'en' ? milestonesEn : milestonesZh
  for (const m of milestones) {
    if (m.month === month && m.condition(health, finance, growth, relationships, overall)) {
      return m.text
    }
  }
  return undefined
}

export function generateTrajectory(
  routine: DailyRoutine,
  months: number = 36,
  inertiaFactor: number = 0.95,
  lang: 'zh' | 'en' = 'zh'
): TrajectoryPoint[] {
  const baseScores = calculateBaseScores(routine)
  const trajectory: TrajectoryPoint[] = []

  let current = { ...baseScores }

  for (let month = 0; month <= months; month++) {
    const overall = (current.health * 0.3 + current.finance * 0.3 + current.relationships * 0.2 + current.growth * 0.2)

    const milestone = getMilestone(month, current.health, current.finance, current.relationships, current.growth, overall, lang)

    trajectory.push({
      month,
      health: Math.round(current.health),
      finance: Math.round(current.finance),
      relationships: Math.round(current.relationships),
      growth: Math.round(current.growth),
      overall: Math.round(overall),
      milestone
    })

    current.health *= inertiaFactor
    current.finance *= inertiaFactor
    current.relationships *= inertiaFactor
    current.growth *= inertiaFactor

    current.health = Math.max(10, Math.min(100, current.health))
    current.finance = Math.max(10, Math.min(100, current.finance))
    current.relationships = Math.max(10, Math.min(100, current.relationships))
    current.growth = Math.max(10, Math.min(100, current.growth))
  }

  return trajectory
}

export function generateImprovedTrajectory(
  routine: DailyRoutine,
  coreParam: string,
  improvement: number,
  months: number = 36,
  lang: 'zh' | 'en' = 'zh'
): TrajectoryPoint[] {
  const baseScores = calculateBaseScores(routine)
  const trajectory: TrajectoryPoint[] = []

  let current = { ...baseScores }

  switch (coreParam) {
    case 'sleep':
      current.health = Math.min(100, current.health + improvement * 0.8)
      current.relationships = Math.min(100, current.relationships + improvement * 0.4)
      break
    case 'exercise':
      current.health = Math.min(100, current.health + improvement * 0.9)
      current.growth = Math.min(100, current.growth + improvement * 0.3)
      break
    case 'diet':
      current.health = Math.min(100, current.health + improvement * 0.7)
      current.finance = Math.min(100, current.finance + improvement * 0.2)
      break
    case 'work':
      current.finance = Math.min(100, current.finance + improvement * 0.8)
      current.growth = Math.min(100, current.growth + improvement * 0.6)
      break
    case 'leisure':
      current.relationships = Math.min(100, current.relationships + improvement * 0.8)
      current.health = Math.min(100, current.health + improvement * 0.3)
      break
    case 'growth':
      current.growth = Math.min(100, current.growth + improvement * 0.9)
      current.finance = Math.min(100, current.finance + improvement * 0.4)
      break
    default:
      current.health = Math.min(100, current.health + improvement * 0.5)
  }

  for (let month = 0; month <= months; month++) {
    const overall = (current.health * 0.3 + current.finance * 0.3 + current.relationships * 0.2 + current.growth * 0.2)

    trajectory.push({
      month,
      health: Math.round(current.health),
      finance: Math.round(current.finance),
      relationships: Math.round(current.relationships),
      growth: Math.round(current.growth),
      overall: Math.round(overall)
    })

    current.health *= 0.97
    current.finance *= 0.975
    current.relationships *= 0.97
    current.growth *= 0.975

    current.health = Math.max(10, Math.min(100, current.health))
    current.finance = Math.max(10, Math.min(100, current.finance))
    current.relationships = Math.max(10, Math.min(100, current.relationships))
    current.growth = Math.max(10, Math.min(100, current.growth))
  }

  return trajectory
}

export function getMetricLabel(metric: string, lang: 'zh' | 'en' = 'zh'): string {
  const labels: Record<string, Record<string, string>> = {
    health: { zh: '健康', en: 'Health' },
    finance: { zh: '财务', en: 'Finance' },
    relationships: { zh: '关系', en: 'Relationships' },
    growth: { zh: '成长', en: 'Growth' },
    overall: { zh: '综合', en: 'Overall' }
  }
  return labels[metric]?.[lang] || metric
}

export function getMetricColor(metric: string): string {
  const colors: Record<string, string> = {
    health: '#FB7185',
    finance: '#FBBF24',
    relationships: '#A78BFA',
    growth: '#22D3EE',
    overall: '#34D399'
  }
  return colors[metric] || '#94A1B2'
}
