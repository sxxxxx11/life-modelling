import { DailyRoutine, DesiredFuture, CoreParameterResult } from '../types'
import { calculateBaseScores } from './trajectory'

interface ParameterGap {
  param: string
  name: string
  currentScore: number
  targetScore: number
  gap: number
  impactWeight: number
  priority: number
}

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function timeDiff(start: string, end: string): number {
  let diff = parseTimeToMinutes(end) - parseTimeToMinutes(start)
  if (diff < 0) diff += 24 * 60
  return diff / 60
}

export function analyzeCoreParameter(
  routine: DailyRoutine,
  desired: DesiredFuture
): CoreParameterResult {
  const baseScores = calculateBaseScores(routine)

  const parameters: ParameterGap[] = []

  const sleepDuration = timeDiff(routine.sleep.bedtime, routine.wakeTime)
  const sleepGap = Math.abs(8 - sleepDuration) * 10
  parameters.push({
    param: 'sleep',
    name: '睡眠时间',
    currentScore: Math.max(0, 100 - sleepGap - (5 - routine.sleep.quality) * 10),
    targetScore: 85,
    gap: Math.abs(85 - (Math.max(0, 100 - sleepGap - (5 - routine.sleep.quality) * 10))),
    impactWeight: 0.9,
    priority: 0
  })

  parameters.push({
    param: 'exercise',
    name: '运动频率',
    currentScore: Math.min(100, routine.exercise.timesPerWeek * 15 + routine.exercise.duration / 2),
    targetScore: 75,
    gap: Math.abs(75 - Math.min(100, routine.exercise.timesPerWeek * 15 + routine.exercise.duration / 2)),
    impactWeight: 0.8,
    priority: 0
  })

  parameters.push({
    param: 'diet',
    name: '饮食习惯',
    currentScore: (routine.diet.breakfast === 'always' ? 30 : routine.diet.breakfast === 'sometimes' ? 15 : 0) +
                  Math.min(20, routine.diet.waterCups * 4) +
                  (routine.diet.dinnerRegular ? 20 : 0),
    targetScore: 70,
    gap: 0,
    impactWeight: 0.7,
    priority: 0
  })

  parameters.push({
    param: 'work',
    name: '工作专注度',
    currentScore: Math.min(100, routine.work.focusHours * 12 + routine.work.growthTime / 2),
    targetScore: 75,
    gap: Math.abs(75 - Math.min(100, routine.work.focusHours * 12 + routine.work.growthTime / 2)),
    impactWeight: 0.85,
    priority: 0
  })

  parameters.push({
    param: 'leisure',
    name: '休闲质量',
    currentScore: Math.max(0, 80 - routine.leisure.screenTime * 10 + routine.leisure.socialFreq * 5),
    targetScore: 65,
    gap: Math.abs(65 - Math.max(0, 80 - routine.leisure.screenTime * 10 + routine.leisure.socialFreq * 5)),
    impactWeight: 0.6,
    priority: 0
  })

  parameters.push({
    param: 'growth',
    name: '个人成长',
    currentScore: routine.work.growthTime * 2 + (routine.leisure.hobbies.length > 0 ? 20 : 0),
    targetScore: 70,
    gap: Math.abs(70 - (routine.work.growthTime * 2 + (routine.leisure.hobbies.length > 0 ? 20 : 0))),
    impactWeight: 0.75,
    priority: 0
  })

  parameters.forEach(p => {
    p.priority = p.gap * p.impactWeight
  })

  parameters.sort((a, b) => b.priority - a.priority)

  const core = parameters[0]

  const impactChains: Record<string, string[]> = {
    sleep: ['睡眠质量提升', '次日精力充沛', '专注力增强', '工作产出提高', '收入增长', '情绪稳定', '关系改善'],
    exercise: ['体能改善', '精力提升', '睡眠质量提高', '自信增强', '社交机会增加', '整体幸福感'],
    diet: ['身体健康', '精力稳定', '体重管理', '医疗支出减少', '财务压力降低'],
    work: ['专业能力提升', '职业竞争力增强', '收入潜力提高', '自我价值感增强'],
    leisure: ['压力缓解', '情绪健康', '人际关系', '生活满意度'],
    growth: ['技能增长', '职业发展', '收入提升', '自我实现']
  }

  const affectedMetrics: Record<string, { metric: string; improvement: number }[]> = {
    sleep: [
      { metric: '健康', improvement: 15 },
      { metric: '成长', improvement: 12 },
      { metric: '关系', improvement: 8 }
    ],
    exercise: [
      { metric: '健康', improvement: 20 },
      { metric: '成长', improvement: 7 },
      { metric: '综合', improvement: 10 }
    ],
    work: [
      { metric: '财务', improvement: 18 },
      { metric: '成长', improvement: 15 },
      { metric: '健康', improvement: -5 }
    ],
    leisure: [
      { metric: '关系', improvement: 15 },
      { metric: '健康', improvement: 8 },
      { metric: '综合', improvement: 10 }
    ],
    growth: [
      { metric: '成长', improvement: 25 },
      { metric: '财务', improvement: 12 },
      { metric: '综合', improvement: 15 }
    ]
  }

  const reasonings: Record<string, string> = {
    sleep: `你的睡眠得分仅为 ${Math.round(core.currentScore)}/100，而睡眠是健康的底层参数。研究表明，睡眠质量直接影响次日的专注力、情绪稳定性和决策质量。改善睡眠可以带动整体人生轨迹的提升。`,
    exercise: `你每周运动 ${routine.exercise.timesPerWeek} 次，运动是改善身心状态最有效的方式之一。它不仅提升体能，还能改善情绪、提高认知功能，是最具杠杆效应的改变。`,
    work: `你的每日专注时间仅 ${routine.work.focusHours} 小时，而深度工作是职业发展的核心。提升专注力可以直接带动产出和质量，从而影响收入和成长。`,
    leisure: `你的每日屏幕时间达 ${routine.leisure.screenTime} 小时，而高质量的休闲能有效缓解压力。改善休闲质量可以提升整体幸福感和人际关系。`,
    growth: `你每天仅投入 ${routine.work.growthTime} 分钟用于学习成长，而持续学习是应对未来变化的最佳保险。增加成长时间可以显著提升竞争力。`
  }

  return {
    name: core.name,
    description: `${core.name}是最能撬动你人生的参数。当前得分 ${Math.round(core.currentScore)}/100，与目标的差距为 ${Math.round(core.gap)} 分。`,
    impactChain: impactChains[core.param] || ['整体提升'],
    affectedMetrics: affectedMetrics[core.param] || [],
    reasoning: reasonings[core.param] || ''
  }
}

export function getDefaultCoreParameter(): CoreParameterResult {
  return {
    name: '每日专注成长时间',
    description: '每天用于深度学习和自我提升的时间是改变人生轨迹最有效的杠杆。',
    impactChain: ['专注力提升', '技能增长', '产出质量提高', '职业竞争力增强', '收入提升', '生活选择权扩大'],
    affectedMetrics: [
      { metric: '成长', improvement: 25 },
      { metric: '财务', improvement: 15 },
      { metric: '综合', improvement: 12 }
    ],
    reasoning: '在你当前的各项指标中，每日专注成长时间的提升空间最大，且它的影响会随时间不断累积，形成复利效应。'
  }
}