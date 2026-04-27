import { DailyRoutine } from '../types'

export interface ProbeQuestion {
  id: string
  category: string
  question: string
  getContext?: (routine: DailyRoutine) => string
}

export const probeQuestions: ProbeQuestion[] = [
  {
    id: 'sleep-1',
    category: 'sleep',
    question: '你提到睡觉时间是 {bedtime}，但实际入睡通常需要多久？'
  },
  {
    id: 'sleep-2',
    category: 'sleep',
    question: '睡前最后一个小时通常在做什么？这会如何影响你的睡眠质量？'
  },
  {
    id: 'sleep-3',
    category: 'sleep',
    question: '如果第二天没有重要的事，你会几点起床？'
  },
  {
    id: 'diet-1',
    category: 'diet',
    question: '不吃早餐的那几天，是因为不饿还是因为赶时间？'
  },
  {
    id: 'diet-2',
    category: 'diet',
    question: '你提到的晚餐时间 {dinnerTime}，是指开始吃的时间还是吃完的时间？'
  },
  {
    id: 'diet-3',
    category: 'diet',
    question: '一天喝 {waterCups} 杯水，你是自己记得喝还是等到渴了才喝？'
  },
  {
    id: 'exercise-1',
    category: 'exercise',
    question: '每周运动 {timesPerWeek} 次但每次 {duration} 分钟，这个频率是你主动规划的还是看心情？'
  },
  {
    id: 'exercise-2',
    category: 'exercise',
    question: '如果连续下雨或太冷，你还会运动吗？'
  },
  {
    id: 'exercise-3',
    category: 'exercise',
    question: '久坐 {sedentaryHours} 小时，这期间会起来走动吗？还是一直坐到下班？'
  },
  {
    id: 'commute-1',
    category: 'commute',
    question: '通勤 {duration} 分钟，这段时间你通常在做什么？'
  },
  {
    id: 'commute-2',
    category: 'commute',
    question: '如果可以远程工作一天，你最想用节省下来的通勤时间做什么？'
  },
  {
    id: 'work-1',
    category: 'work',
    question: '每天专注 {focusHours} 小时，这个时间是你自己记录的还是估算的？'
  },
  {
    id: 'work-2',
    category: 'work',
    question: '加班频率 {overtimeFreq}，加班到很晚的时候，第二天状态如何？'
  },
  {
    id: 'work-3',
    category: 'work',
    question: '每天学习/成长 {growthTime} 分钟，这个时间固定吗？'
  },
  {
    id: 'leisure-1',
    category: 'leisure',
    question: '每天刷手机 {screenTime} 小时，主要刷什么内容？'
  },
  {
    id: 'leisure-2',
    category: 'leisure',
    question: '社交活动 {socialFreq} 次每周，这些是主动约人还是被动应酬？'
  },
  {
    id: 'leisure-3',
    category: 'leisure',
    question: '你提到有这些爱好：{hobbies}，最近一次做这些是什么时候？'
  },
  {
    id: 'health-1',
    category: 'health',
    question: '压力水平 {stressLevel}/10，这个压力主要来自工作还是生活？'
  },
  {
    id: 'health-2',
    category: 'health',
    question: '最近有没有什么身体症状让你担心？（{symptoms}）'
  },
  {
    id: 'health-3',
    category: 'health',
    question: '上次体检是什么时候？有没有什么指标异常但你没重视的？'
  }
]

export function generateProbes(routine: DailyRoutine): ProbeQuestion[] {
  return probeQuestions.map(probe => {
    let question = probe.question

    if (question.includes('{bedtime}')) {
      question = question.replace('{bedtime}', routine.sleep.bedtime)
    }
    if (question.includes('{dinnerTime}')) {
      question = question.replace('{dinnerTime}', routine.diet.dinnerTime)
    }
    if (question.includes('{waterCups}')) {
      question = question.replace('{waterCups}', routine.diet.waterCups.toString())
    }
    if (question.includes('{timesPerWeek}')) {
      question = question.replace('{timesPerWeek}', routine.exercise.timesPerWeek.toString())
    }
    if (question.includes('{duration}')) {
      question = question.replace('{duration}', routine.exercise.duration.toString())
    }
    if (question.includes('{sedentaryHours}')) {
      question = question.replace('{sedentaryHours}', routine.exercise.sedentaryHours.toString())
    }
    if (question.includes('{duration}')) {
      question = question.replace('{duration}', routine.exercise.duration.toString())
    }
    if (question.includes('{overtimeFreq}')) {
      question = question.replace('{overtimeFreq}',
        routine.work.overtimeFreq === 'never' ? '很少' :
        routine.work.overtimeFreq === 'sometimes' ? '偶尔' : '经常'
      )
    }
    if (question.includes('{focusHours}')) {
      question = question.replace('{focusHours}', routine.work.focusHours.toString())
    }
    if (question.includes('{growthTime}')) {
      question = question.replace('{growthTime}', routine.work.growthTime.toString())
    }
    if (question.includes('{screenTime}')) {
      question = question.replace('{screenTime}', routine.leisure.screenTime.toString())
    }
    if (question.includes('{socialFreq}')) {
      question = question.replace('{socialFreq}', routine.leisure.socialFreq.toString())
    }
    if (question.includes('{hobbies}')) {
      question = question.replace('{hobbies}', routine.leisure.hobbies.join('、') || '无')
    }
    if (question.includes('{stressLevel}')) {
      question = question.replace('{stressLevel}', routine.health.stressLevel.toString())
    }
    if (question.includes('{symptoms}')) {
      question = question.replace('{symptoms}', routine.health.symptoms.join('、') || '无')
    }

    return { ...probe, question }
  })
}

export function getPendingProbes(completedIds: string[]): ProbeQuestion[] {
  return probeQuestions.filter(p => !completedIds.includes(p.id))
}