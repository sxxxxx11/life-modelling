import { MicroAction, DailyRoutine } from '../types'

export function generateMicroActions(
  routine: DailyRoutine,
  coreParam: string,
  lang: 'zh' | 'en' = 'zh'
): MicroAction[] {
  const actions: MicroAction[] = []

  const texts = {
    sleep: {
      action: [
        lang === 'en' ? 'Mute your phone 30 minutes before bed' : '把手机闹钟调为睡前30分钟自动静音',
        lang === 'en' ? 'Do 5 deep breaths while lying in bed' : '躺在床上做5次深呼吸',
        lang === 'en' ? 'Place your alarm clock somewhere you must get up to reach' : '把闹钟放在必须下床才能拿到的地方'
      ],
      trigger: [
        lang === 'en' ? '30 minutes before bed' : '睡前30分钟',
        lang === 'en' ? 'When lying in bed' : '躺在床上时',
        lang === 'en' ? 'When alarm goes off next morning' : '第二天早上闹钟响时'
      ],
      duration: ['30 seconds', '1 minute', lang === 'en' ? 'Until done' : '完成即止'],
      resistance: [
        lang === 'en' ? 'If you forget, just put your phone out of reach' : '如果忘记设置，就直接把手机放到够不着的地方',
        lang === 'en' ? "Don't need to do it specially, just breathe naturally" : '不需要特意做，自然呼吸就好',
        lang === 'en' ? 'Set a backup phone alarm to ensure you get up' : '多设一个手机闹钟作为备份，确保能起来'
      ]
    },
    exercise: {
      action: [
        lang === 'en' ? 'Stretch for 10 seconds after waking up' : '起床后伸懒腰10秒',
        lang === 'en' ? 'Stand for 3 minutes when drinking water' : '喝水时站立3分钟',
        lang === 'en' ? 'Get off one stop early and walk' : '提前一站下车走路'
      ],
      trigger: [
        lang === 'en' ? 'After waking up' : '起床后',
        lang === 'en' ? 'Each time you drink water' : '每次喝水时',
        lang === 'en' ? 'During commute' : '通勤时'
      ],
      duration: ['10 seconds', '3 minutes', '10 minutes'],
      resistance: [
        lang === 'en' ? 'Can stretch while sitting, just reach up' : '坐着也可以伸，伸手就行',
        lang === 'en' ? "Don't need to exercise, just stand and look at your phone" : '不需要运动，就站着看手机也行',
        lang === 'en' ? "If too tired, don't force it, do it after work instead" : '如果太累就不勉强，下班时再做'
      ]
    },
    diet: {
      action: [
        lang === 'en' ? 'Drink a glass of warm water before coffee in the morning' : '早起后先喝一杯温水再喝咖啡',
        lang === 'en' ? "Don't look at your phone during breakfast" : '吃早餐时不吃手机',
        lang === 'en' ? 'Keep a water cup at your desk as a reminder' : '在工位上放一个水杯提醒喝水'
      ],
      trigger: [
        lang === 'en' ? 'After waking up' : '起床后',
        lang === 'en' ? 'During breakfast' : '早餐时',
        lang === 'en' ? 'Each time you see the water cup' : '每次看到水杯时'
      ],
      duration: ['1 minute', '15 minutes', '30 seconds'],
      resistance: [
        lang === 'en' ? "No conditions, just skip if needed, coffee is fine too" : '没条件就不做，喝咖啡也行',
        lang === 'en' ? "It's okay to scroll occasionally" : '偶尔刷手机也没关系',
        lang === 'en' ? "If you forget, don't force it" : '忘了就忘了，不强求'
      ]
    },
    work: {
      action: [
        lang === 'en' ? 'Write down 3 things to accomplish today before starting work' : '工作前先写今天要完成的3件事',
        lang === 'en' ? 'Stand up and get water after every 25 minutes of work' : '每工作25分钟后站起来倒杯水',
        lang === 'en' ? 'Use a fixed gesture to mark the start of work' : '用一个固定的动作标记工作开始'
      ],
      trigger: [
        lang === 'en' ? 'Before starting work each day' : '每天开工前',
        lang === 'en' ? 'When Pomodoro timer goes off' : '番茄钟提醒时',
        lang === 'en' ? 'When starting work' : '开始工作时'
      ],
      duration: ['2 minutes', '2 minutes', lang === 'en' ? 'Until done' : '完成即止'],
      resistance: [
        lang === 'en' ? 'Just use your phone notes to list briefly' : '用手机备忘录简单列一下就行',
        lang === 'en' ? "Don't set Pomodoro, don't do it" : '不设番茄钟就不做',
        lang === 'en' ? "No ceremony needed, just start directly" : '不需要仪式，直接开始也行'
      ]
    },
    leisure: {
      action: [
        lang === 'en' ? 'No screens for 10 minutes before bed' : '睡前10分钟不看电子屏幕',
        lang === 'en' ? 'Meet or call one person on the weekend' : '周末约一个人见面或通话',
        lang === 'en' ? 'Do something that makes you happy during alone time' : '独处时做一件让自己开心的小事'
      ],
      trigger: [
        lang === 'en' ? '10 minutes before bed' : '睡前10分钟',
        lang === 'en' ? 'Every Friday' : '每周五',
        lang === 'en' ? 'When feeling bored' : '感到无聊时'
      ],
      duration: ['10 minutes', lang === 'en' ? '5 min arrangement' : '5分钟安排', '5 minutes'],
      resistance: [
        lang === 'en' ? 'Replace with reading, or listen to audio if you cannot' : '用看书代替，如果做不到就听音频',
        lang === 'en' ? "Don't force it if you cannot meet someone" : '约不到就不约，不强求',
        lang === 'en' ? 'Daydreaming counts as rest too' : '发呆也算休息'
      ]
    },
    growth: {
      action: [
        lang === 'en' ? 'Listen to a goal-related audio during commute' : '通勤时听一个跟目标相关的音频',
        lang === 'en' ? 'Read 1 page of a book before bed each day' : '每天睡前看1页书',
        lang === 'en' ? 'Post what you learned in your own words on social media' : '把一个学到的东西用自己的话发一条朋友圈'
      ],
      trigger: [
        lang === 'en' ? 'During commute' : '通勤时',
        lang === 'en' ? 'Before sleep' : '睡前',
        lang === 'en' ? 'When you learn something new' : '学到新东西时'
      ],
      duration: ['20 minutes', '5 minutes', '3 minutes'],
      resistance: [
        lang === 'en' ? "It's okay if you don't understand it, treat it as background noise" : '没听懂也没关系，当背景音',
        lang === 'en' ? 'Sleep if you only read 1 page and don\'t want more' : '看了1页就不想看就睡觉',
        lang === 'en' ? "It's okay not to post" : '不发也没关系'
      ]
    }
  }

  const paramActions = texts[coreParam as keyof typeof texts] || texts.sleep

  switch (coreParam) {
    case 'sleep':
      actions.push(
        { id: 'sleep-1', action: paramActions.action[0], trigger: paramActions.trigger[0], duration: paramActions.duration[0], resistanceSolution: paramActions.resistance[0] },
        { id: 'sleep-2', action: paramActions.action[1], trigger: paramActions.trigger[1], duration: paramActions.duration[1], resistanceSolution: paramActions.resistance[1] },
        { id: 'sleep-3', action: paramActions.action[2], trigger: paramActions.trigger[2], duration: paramActions.duration[2], resistanceSolution: paramActions.resistance[2] }
      )
      break
    case 'exercise':
      actions.push(
        { id: 'exercise-1', action: paramActions.action[0], trigger: paramActions.trigger[0], duration: paramActions.duration[0], resistanceSolution: paramActions.resistance[0] },
        { id: 'exercise-2', action: paramActions.action[1], trigger: paramActions.trigger[1], duration: paramActions.duration[1], resistanceSolution: paramActions.resistance[1] },
        { id: 'exercise-3', action: paramActions.action[2], trigger: paramActions.trigger[2], duration: paramActions.duration[2], resistanceSolution: paramActions.resistance[2] }
      )
      break
    case 'diet':
      actions.push(
        { id: 'diet-1', action: paramActions.action[0], trigger: paramActions.trigger[0], duration: paramActions.duration[0], resistanceSolution: paramActions.resistance[0] },
        { id: 'diet-2', action: paramActions.action[1], trigger: paramActions.trigger[1], duration: paramActions.duration[1], resistanceSolution: paramActions.resistance[1] },
        { id: 'diet-3', action: paramActions.action[2], trigger: paramActions.trigger[2], duration: paramActions.duration[2], resistanceSolution: paramActions.resistance[2] }
      )
      break
    case 'work':
      actions.push(
        { id: 'work-1', action: paramActions.action[0], trigger: paramActions.trigger[0], duration: paramActions.duration[0], resistanceSolution: paramActions.resistance[0] },
        { id: 'work-2', action: paramActions.action[1], trigger: paramActions.trigger[1], duration: paramActions.duration[1], resistanceSolution: paramActions.resistance[1] },
        { id: 'work-3', action: paramActions.action[2], trigger: paramActions.trigger[2], duration: paramActions.duration[2], resistanceSolution: paramActions.resistance[2] }
      )
      break
    case 'leisure':
      actions.push(
        { id: 'leisure-1', action: paramActions.action[0], trigger: paramActions.trigger[0], duration: paramActions.duration[0], resistanceSolution: paramActions.resistance[0] },
        { id: 'leisure-2', action: paramActions.action[1], trigger: paramActions.trigger[1], duration: paramActions.duration[1], resistanceSolution: paramActions.resistance[1] },
        { id: 'leisure-3', action: paramActions.action[2], trigger: paramActions.trigger[2], duration: paramActions.duration[2], resistanceSolution: paramActions.resistance[2] }
      )
      break
    case 'growth':
      actions.push(
        { id: 'growth-1', action: paramActions.action[0], trigger: paramActions.trigger[0], duration: paramActions.duration[0], resistanceSolution: paramActions.resistance[0] },
        { id: 'growth-2', action: paramActions.action[1], trigger: paramActions.trigger[1], duration: paramActions.duration[1], resistanceSolution: paramActions.resistance[1] },
        { id: 'growth-3', action: paramActions.action[2], trigger: paramActions.trigger[2], duration: paramActions.duration[2], resistanceSolution: paramActions.resistance[2] }
      )
      break
    default:
      actions.push(
        {
          id: 'default-1',
          action: lang === 'en' ? 'Record one thing you did well each day' : '每天记录一个做得好的小地方',
          trigger: lang === 'en' ? 'Before sleep' : '睡前',
          duration: lang === 'en' ? '2 minutes' : '2分钟',
          resistanceSolution: lang === 'en' ? "If you forget, don't force it" : '忘了就不记，不强求'
        }
      )
  }

  return actions
}

export function getConfidenceLevel(routine: DailyRoutine, coreParam: string, lang: 'zh' | 'en' = 'zh'): {
  level: 'low' | 'medium' | 'high'
  score: number
  reasons: string[]
} {
  let score = 60
  const reasons: string[] = []

  if (coreParam === 'sleep') {
    if (routine.sleep.quality >= 3) {
      score += 15
      reasons.push(lang === 'en' ? 'Your sleep quality is moderate, room for improvement' : '你的睡眠质量中等，有改善空间')
    }
    if (routine.sleep.nightWakeups <= 1) {
      score += 10
      reasons.push(lang === 'en' ? 'Few nighttime disturbances' : '夜间干扰较少')
    }
  }

  if (coreParam === 'exercise') {
    if (routine.exercise.timesPerWeek >= 1) {
      score += 15
      reasons.push(lang === 'en' ? 'You already have an exercise habit, easy to maintain' : '你已经有运动习惯，容易坚持')
    }
  }

  if (coreParam === 'growth') {
    if (routine.work.growthTime >= 15) {
      score += 10
      reasons.push(lang === 'en' ? 'You already have fixed study time' : '你已经有固定的学习时间')
    }
  }

  const level = score >= 75 ? 'high' : score >= 55 ? 'medium' : 'low'

  return { level, score, reasons }
}
