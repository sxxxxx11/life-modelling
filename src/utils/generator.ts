import { MicroAction, DailyRoutine } from '../types'

export function generateMicroActions(
  routine: DailyRoutine,
  coreParam: string
): MicroAction[] {
  const actions: MicroAction[] = []

  switch (coreParam) {
    case 'sleep':
      actions.push(
        {
          id: 'sleep-1',
          action: '把手机闹钟调为睡前30分钟自动静音',
          trigger: '睡前30分钟',
          duration: '30秒',
          resistanceSolution: '如果忘记设置，就直接把手机放到够不着的地方'
        },
        {
          id: 'sleep-2',
          action: '躺在床上做5次深呼吸',
          trigger: '躺在床上时',
          duration: '1分钟',
          resistanceSolution: '不需要特意做，自然呼吸就好'
        },
        {
          id: 'sleep-3',
          action: '把闹钟放在必须下床才能拿到的地方',
          trigger: '第二天早上闹钟响时',
          duration: '完成即止',
          resistanceSolution: '多设一个手机闹钟作为备份，确保能起来'
        }
      )
      break

    case 'exercise':
      actions.push(
        {
          id: 'exercise-1',
          action: '起床后伸懒腰10秒',
          trigger: '起床后',
          duration: '10秒',
          resistanceSolution: '坐着也可以伸，伸手就行'
        },
        {
          id: 'exercise-2',
          action: '喝水时站立3分钟',
          trigger: '每次喝水时',
          duration: '3分钟',
          resistanceSolution: '不需要运动，就站着看手机也行'
        },
        {
          id: 'exercise-3',
          action: '提前一站下车走路',
          trigger: '通勤时',
          duration: '10分钟',
          resistanceSolution: '如果太累就不勉强，下班时再做'
        }
      )
      break

    case 'diet':
      actions.push(
        {
          id: 'diet-1',
          action: '早起后先喝一杯温水再喝咖啡',
          trigger: '起床后',
          duration: '1分钟',
          resistanceSolution: '没条件就不做，喝咖啡也行'
        },
        {
          id: 'diet-2',
          action: '吃早餐时不吃手机',
          trigger: '早餐时',
          duration: '15分钟',
          resistanceSolution: '偶尔刷手机也没关系'
        },
        {
          id: 'diet-3',
          action: '在工位上放一个水杯提醒喝水',
          trigger: '每次看到水杯时',
          duration: '30秒',
          resistanceSolution: '忘了就忘了，不强求'
        }
      )
      break

    case 'work':
      actions.push(
        {
          id: 'work-1',
          action: '工作前先写今天要完成的3件事',
          trigger: '每天开工前',
          duration: '2分钟',
          resistanceSolution: '用手机备忘录简单列一下就行'
        },
        {
          id: 'work-2',
          action: '每工作25分钟后站起来倒杯水',
          trigger: '番茄钟提醒时',
          duration: '2分钟',
          resistanceSolution: '不设番茄钟就不做'
        },
        {
          id: 'work-3',
          action: '用一个固定的动作标记工作开始',
          trigger: '开始工作时',
          duration: '完成即止',
          resistanceSolution: '不需要仪式，直接开始也行'
        }
      )
      break

    case 'leisure':
      actions.push(
        {
          id: 'leisure-1',
          action: '睡前10分钟不看电子屏幕',
          trigger: '睡前10分钟',
          duration: '10分钟',
          resistanceSolution: '用看书代替，如果做不到就听音频'
        },
        {
          id: 'leisure-2',
          action: '周末约一个人见面或通话',
          trigger: '每周五',
          duration: '5分钟安排',
          resistanceSolution: '约不到就不约，不强求'
        },
        {
          id: 'leisure-3',
          action: '独处时做一件让自己开心的小事',
          trigger: '感到无聊时',
          duration: '5分钟',
          resistanceSolution: '发呆也算休息'
        }
      )
      break

    case 'growth':
      actions.push(
        {
          id: 'growth-1',
          action: '通勤时听一个跟目标相关的音频',
          trigger: '通勤时',
          duration: '20分钟',
          resistanceSolution: '没听懂也没关系，当背景音'
        },
        {
          id: 'growth-2',
          action: '每天睡前看1页书',
          trigger: '睡前',
          duration: '5分钟',
          resistanceSolution: '看了1页就不想看就睡觉'
        },
        {
          id: 'growth-3',
          action: '把一个学到的东西用自己的话发一条朋友圈',
          trigger: '学到新东西时',
          duration: '3分钟',
          resistanceSolution: '不发也没关系'
        }
      )
      break

    default:
      actions.push(
        {
          id: 'default-1',
          action: '每天记录一个做得好的小地方',
          trigger: '睡前',
          duration: '2分钟',
          resistanceSolution: '忘了就不记，不强求'
        }
      )
  }

  return actions
}

export function getConfidenceLevel(routine: DailyRoutine, coreParam: string): {
  level: 'low' | 'medium' | 'high'
  score: number
  reasons: string[]
} {
  let score = 60
  const reasons: string[] = []

  if (coreParam === 'sleep') {
    if (routine.sleep.quality >= 3) {
      score += 15
      reasons.push('你的睡眠质量中等，有改善空间')
    }
    if (routine.sleep.nightWakeups <= 1) {
      score += 10
      reasons.push('夜间干扰较少')
    }
  }

  if (coreParam === 'exercise') {
    if (routine.exercise.timesPerWeek >= 1) {
      score += 15
      reasons.push('你已经有运动习惯，容易坚持')
    }
  }

  if (coreParam === 'growth') {
    if (routine.work.growthTime >= 15) {
      score += 10
      reasons.push('你已经有固定的学习时间')
    }
  }

  const level = score >= 75 ? 'high' : score >= 55 ? 'medium' : 'low'

  return { level, score, reasons }
}