import { DailyRoutine } from '../types'

export interface ProbeQuestion {
  id: string
  category: string
  question: string
  getContext?: (routine: DailyRoutine) => string
}

export const probeQuestionsEn: ProbeQuestion[] = [
  {
    id: 'sleep-1',
    category: 'sleep',
    question: 'You mentioned bedtime is {bedtime}. How long does it usually take you to actually fall asleep?'
  },
  {
    id: 'sleep-2',
    category: 'sleep',
    question: 'What do you usually do in the last hour before bed? How does it affect your sleep quality?'
  },
  {
    id: 'sleep-3',
    category: 'sleep',
    question: 'If you have nothing important the next day, what time do you get up?'
  },
  {
    id: 'diet-1',
    category: 'diet',
    question: 'On the days you skip breakfast, is it because you\'re not hungry or because you\'re rushing?'
  },
  {
    id: 'diet-2',
    category: 'diet',
    question: 'The dinner time you mentioned is {dinnerTime}. Is that when you start eating or when you finish?'
  },
  {
    id: 'diet-3',
    category: 'diet',
    question: 'Drinking {waterCups} cups of water per day — do you consciously remind yourself, or only when thirsty?'
  },
  {
    id: 'exercise-1',
    category: 'exercise',
    question: 'You exercise {timesPerWeek} times per week for {duration} minutes each time. Is this frequency planned or based on mood?'
  },
  {
    id: 'exercise-2',
    category: 'exercise',
    question: 'If it rains continuously or gets too cold, will you still exercise?'
  },
  {
    id: 'exercise-3',
    category: 'exercise',
    question: 'Sedentary for {sedentaryHours} hours. Do you get up and walk around during this time, or sit until you get off work?'
  },
  {
    id: 'commute-1',
    category: 'commute',
    question: 'Commuting {duration} minutes. What do you usually do during this time?'
  },
  {
    id: 'commute-2',
    category: 'commute',
    question: 'If you could work remotely one day, what would you most want to do with the saved commute time?'
  },
  {
    id: 'work-1',
    category: 'work',
    question: '{focusHours} hours of focused work per day. Is this time recorded by yourself or an estimate?'
  },
  {
    id: 'work-2',
    category: 'work',
    question: 'Overtime frequency: {overtimeFreq}. When you work late, how do you feel the next day?'
  },
  {
    id: 'work-3',
    category: 'work',
    question: '{growthTime} minutes of learning/growth per day. Is this time fixed?'
  },
  {
    id: 'leisure-1',
    category: 'leisure',
    question: '{screenTime} hours of screen time per day. What content are you mainly browsing?'
  },
  {
    id: 'leisure-2',
    category: 'leisure',
    question: '{socialFreq} social activities per week. Are these proactively meeting people or obligatory socializing?'
  },
  {
    id: 'leisure-3',
    category: 'leisure',
    question: 'You mentioned these hobbies: {hobbies}. When was the last time you did any of them?'
  },
  {
    id: 'health-1',
    category: 'health',
    question: 'Stress level {stressLevel}/10. Is this stress mainly from work or life?'
  },
  {
    id: 'health-2',
    category: 'health',
    question: 'Any recent physical symptoms you\'re worried about? ({symptoms})'
  },
  {
    id: 'health-3',
    category: 'health',
    question: 'When was your last health checkup? Any abnormal indicators you didn\'t take seriously?'
  }
]

export const probeQuestionsZh: ProbeQuestion[] = [
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

export function generateProbes(routine: DailyRoutine, lang: 'zh' | 'en' = 'zh'): ProbeQuestion[] {
  const baseQuestions = lang === 'en' ? probeQuestionsEn : probeQuestionsZh
  return baseQuestions.map(probe => {
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
    if (question.includes('{overtimeFreq}')) {
      question = question.replace('{overtimeFreq}',
        lang === 'en'
          ? (routine.work.overtimeFreq === 'never' ? 'rarely' : routine.work.overtimeFreq === 'sometimes' ? 'occasionally' : 'frequently')
          : (routine.work.overtimeFreq === 'never' ? '很少' : routine.work.overtimeFreq === 'sometimes' ? '偶尔' : '经常')
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
      question = question.replace('{hobbies}', routine.leisure.hobbies.join(lang === 'en' ? ', ' : '、') || (lang === 'en' ? 'none' : '无'))
    }
    if (question.includes('{stressLevel}')) {
      question = question.replace('{stressLevel}', routine.health.stressLevel.toString())
    }
    if (question.includes('{symptoms}')) {
      question = question.replace('{symptoms}', routine.health.symptoms.join(lang === 'en' ? ', ' : '、') || (lang === 'en' ? 'none' : '无'))
    }

    return { ...probe, question }
  })
}

export function getPendingProbes(completedIds: string[], lang: 'zh' | 'en' = 'zh'): ProbeQuestion[] {
  const baseQuestions = lang === 'en' ? probeQuestionsEn : probeQuestionsZh
  return baseQuestions.filter(p => !completedIds.includes(p.id))
}
