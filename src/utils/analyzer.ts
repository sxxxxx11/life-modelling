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

const paramNames = {
  sleep: { zh: '睡眠时间', en: 'Sleep Duration' },
  exercise: { zh: '运动频率', en: 'Exercise Frequency' },
  diet: { zh: '饮食习惯', en: 'Dietary Habits' },
  work: { zh: '工作专注度', en: 'Work Focus' },
  leisure: { zh: '休闲质量', en: 'Leisure Quality' },
  growth: { zh: '个人成长', en: 'Personal Growth' }
}

const impactChains = {
  sleep: {
    zh: ['睡眠质量提升', '次日精力充沛', '专注力增强', '工作产出提高', '收入增长', '情绪稳定', '关系改善'],
    en: ['Better sleep quality', 'More energy next day', 'Improved focus', 'Better work output', 'Income growth', 'Emotional stability', 'Better relationships']
  },
  exercise: {
    zh: ['体能改善', '精力提升', '睡眠质量提高', '自信增强', '社交机会增加', '整体幸福感'],
    en: ['Improved fitness', 'More energy', 'Better sleep', 'More confidence', 'More social opportunities', 'Overall well-being']
  },
  diet: {
    zh: ['身体健康', '精力稳定', '体重管理', '医疗支出减少', '财务压力降低'],
    en: ['Better physical health', 'Stable energy', 'Weight management', 'Reduced medical expenses', 'Less financial stress']
  },
  work: {
    zh: ['专业能力提升', '职业竞争力增强', '收入潜力提高', '自我价值感增强'],
    en: ['Improved professional skills', 'Enhanced career competitiveness', 'Higher income potential', 'Greater self-worth']
  },
  leisure: {
    zh: ['压力缓解', '情绪健康', '人际关系', '生活满意度'],
    en: ['Stress relief', 'Emotional health', 'Better relationships', 'Life satisfaction']
  },
  growth: {
    zh: ['技能增长', '职业发展', '收入提升', '自我实现'],
    en: ['Skill growth', 'Career development', 'Income increase', 'Self-actualization']
  }
}

const affectedMetrics = {
  sleep: [
    { metric: { zh: '健康', en: 'Health' }, improvement: 15 },
    { metric: { zh: '成长', en: 'Growth' }, improvement: 12 },
    { metric: { zh: '关系', en: 'Relationships' }, improvement: 8 }
  ],
  exercise: [
    { metric: { zh: '健康', en: 'Health' }, improvement: 20 },
    { metric: { zh: '成长', en: 'Growth' }, improvement: 7 },
    { metric: { metric: { zh: '综合', en: 'Overall' }, improvement: 10 }
  ],
  work: [
    { metric: { zh: '财务', en: 'Finance' }, improvement: 18 },
    { metric: { zh: '成长', en: 'Growth' }, improvement: 15 },
    { metric: { zh: '健康', en: 'Health' }, improvement: -5 }
  ],
  leisure: [
    { metric: { zh: '关系', en: 'Relationships' }, improvement: 15 },
    { metric: { zh: '健康', en: 'Health' }, improvement: 8 },
    { metric: { zh: '综合', en: 'Overall' }, improvement: 10 }
  ],
  growth: [
    { metric: { zh: '成长', en: 'Growth' }, improvement: 25 },
    { metric: { zh: '财务', en: 'Finance' }, improvement: 12 },
    { metric: { zh: '综合', en: 'Overall' }, improvement: 15 }
  ]
}

const reasonings = {
  sleep: {
    zh: (score: number) => `你的睡眠得分仅为 ${Math.round(score)}/100，而睡眠是健康的底层参数。研究表明，睡眠质量直接影响次日的专注力、情绪稳定性和决策质量。改善睡眠可以带动整体人生轨迹的提升。`,
    en: (score: number) => `Your sleep score is only ${Math.round(score)}/100, and sleep is the foundational parameter for health. Research shows that sleep quality directly affects next-day focus, emotional stability, and decision-making quality. Improving sleep can drive your overall life trajectory upward.`
  },
  exercise: {
    zh: (times: number) => `你每周运动 ${times} 次，运动是改善身心状态最有效的方式之一。它不仅提升体能，还能改善情绪、提高认知功能，是最具杠杆效应的改变。`,
    en: (times: number) => `You exercise ${times} times per week. Exercise is one of the most effective ways to improve your physical and mental state. It not only improves fitness but also enhances mood and cognitive function — one of the most high-leverage changes you can make.`
  },
  work: {
    zh: (hours: number) => `你的每日专注时间仅 ${hours} 小时，而深度工作是职业发展的核心。提升专注力可以直接带动产出和质量，从而影响收入和成长。`,
    en: (hours: number) => `Your daily focused work time is only ${hours} hours, and deep work is the core of career development. Improving focus can directly drive output quality, thereby affecting income and growth.`
  },
  leisure: {
    zh: (screen: number) => `你的每日屏幕时间达 ${screen} 小时，而高质量的休闲能有效缓解压力。改善休闲质量可以提升整体幸福感和人际关系。`,
    en: (screen: number) => `Your daily screen time is ${screen} hours, and quality leisure effectively relieves stress. Improving leisure quality can enhance overall well-being and relationships.`
  },
  growth: {
    zh: (minutes: number) => `你每天仅投入 ${minutes} 分钟用于学习成长，而持续学习是应对未来变化的最佳保险。增加成长时间可以显著提升竞争力。`,
    en: (minutes: number) => `You only invest ${minutes} minutes per day in learning and growth, and continuous learning is the best insurance against future change. Increasing growth time can significantly enhance your competitiveness.`
  }
}

export function analyzeCoreParameter(
  routine: DailyRoutine,
  desired: DesiredFuture,
  lang: 'zh' | 'en' = 'zh'
): CoreParameterResult {
  const baseScores = calculateBaseScores(routine)

  const parameters: ParameterGap[] = []

  const sleepDuration = timeDiff(routine.sleep.bedtime, routine.wakeTime)
  const sleepGap = Math.abs(8 - sleepDuration) * 10
  parameters.push({
    param: 'sleep',
    name: paramNames.sleep[lang],
    currentScore: Math.max(0, 100 - sleepGap - (5 - routine.sleep.quality) * 10),
    targetScore: 85,
    gap: Math.abs(85 - (Math.max(0, 100 - sleepGap - (5 - routine.sleep.quality) * 10))),
    impactWeight: 0.9,
    priority: 0
  })

  parameters.push({
    param: 'exercise',
    name: paramNames.exercise[lang],
    currentScore: Math.min(100, routine.exercise.timesPerWeek * 15 + routine.exercise.duration / 2),
    targetScore: 75,
    gap: Math.abs(75 - Math.min(100, routine.exercise.timesPerWeek * 15 + routine.exercise.duration / 2)),
    impactWeight: 0.8,
    priority: 0
  })

  parameters.push({
    param: 'diet',
    name: paramNames.diet[lang],
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
    name: paramNames.work[lang],
    currentScore: Math.min(100, routine.work.focusHours * 12 + routine.work.growthTime / 2),
    targetScore: 75,
    gap: Math.abs(75 - Math.min(100, routine.work.focusHours * 12 + routine.work.growthTime / 2)),
    impactWeight: 0.85,
    priority: 0
  })

  parameters.push({
    param: 'leisure',
    name: paramNames.leisure[lang],
    currentScore: Math.max(0, 80 - routine.leisure.screenTime * 10 + routine.leisure.socialFreq * 5),
    targetScore: 65,
    gap: Math.abs(65 - Math.max(0, 80 - routine.leisure.screenTime * 10 + routine.leisure.socialFreq * 5)),
    impactWeight: 0.6,
    priority: 0
  })

  parameters.push({
    param: 'growth',
    name: paramNames.growth[lang],
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

  const coreMetricNames = affectedMetrics[core.param as keyof typeof affectedMetrics] || affectedMetrics.sleep

  return {
    name: core.name,
    description: lang === 'zh'
      ? `${core.name}是最能撬动你人生的参数。当前得分 ${Math.round(core.currentScore)}/100，与目标的差距为 ${Math.round(core.gap)} 分。`
      : `${core.name} is the parameter that can most leverage your life. Current score: ${Math.round(core.currentScore)}/100, gap to target: ${Math.round(core.gap)} points.`,
    impactChain: impactChains[core.param as keyof typeof impactChains]?.[lang] || [lang === 'zh' ? '整体提升' : 'Overall improvement'],
    affectedMetrics: coreMetricNames.map(m => ({
      metric: m.metric[lang],
      improvement: m.improvement
    })),
    reasoning: (reasonings as any)[core.param]?.[lang]?.(Math.round(core.currentScore)) || ''
  }
}

export function getDefaultCoreParameter(lang: 'zh' | 'en' = 'zh'): CoreParameterResult {
  return {
    name: lang === 'zh' ? '每日专注成长时间' : 'Daily Focused Growth Time',
    description: lang === 'zh'
      ? '每天用于深度学习和自我提升的时间是改变人生轨迹最有效的杠杆。'
      : 'Time spent on deep learning and self-improvement each day is the most effective lever for changing your life trajectory.',
    impactChain: lang === 'zh'
      ? ['专注力提升', '技能增长', '产出质量提高', '职业竞争力增强', '收入提升', '生活选择权扩大']
      : ['Improved focus', 'Skill growth', 'Better output quality', 'Enhanced career competitiveness', 'Income increase', 'Greater life choices'],
    affectedMetrics: [
      { metric: lang === 'zh' ? '成长' : 'Growth', improvement: 25 },
      { metric: lang === 'zh' ? '财务' : 'Finance', improvement: 15 },
      { metric: lang === 'zh' ? '综合' : 'Overall', improvement: 12 }
    ],
    reasoning: lang === 'zh'
      ? '在你当前的各项指标中，每日专注成长时间的提升空间最大，且它的影响会随时间不断累积，形成复利效应。'
      : 'Among your current indicators, daily focused growth time has the largest room for improvement, and its impact accumulates over time, forming a compound interest effect.'
  }
}
