export const zh = {
  // App.tsx
  steps: {
    welcome: '开始',
    daily: '日常',
    probes: '探针',
    current: '现状',
    core: '核心',
    micro: '行动'
  },
  app: {
    title: 'LifeForge',
    reset: '重新开始',
    resetConfirm: '确定要重新开始吗？所有数据将被清除。',
    stepsRemaining: '预计还需 {count} 步完成'
  },

  // WelcomePage.tsx
  welcome: {
    subtitle: '人生建模 · 轨迹推演 · 改写参数',
    description: '这不是一份人生规划指南，也不是一碗鸡汤。\n它是一个基于统计学的人生模拟器——用冷峻的数据告诉你真相。',
    step1Title: '看清现状',
    step1Desc: '不做任何改变，3年后你会是什么样子',
    step2Title: '找到核心',
    step2Desc: '对比理想与现实，识别最关键的1个参数',
    step3Title: '微行动',
    step3Desc: '每天一个轻松到不可能失败的动作',
    startButton: '开始人生建模 →',
    timeEstimate: '预计耗时：15-20分钟 · 所有数据仅保存在本地',
    whyTitle: '为什么要做这个？',
    whyQuote: '大多数人的失败，不是因为不知道目标在哪里，\n而是因为没有看清脚下每一步正在把他们带向何方。'
  },

  // DailyInputPage.tsx
  daily: {
    title: '你的日常是什么样子的？',
    subtitle: '请如实填写你目前的日常状态。越真实，推演越准确。',
    modules: {
      sleep: '睡眠',
      diet: '饮食',
      exercise: '运动',
      commute: '通勤',
      work: '工作',
      leisure: '休闲',
      health: '健康'
    },
    sleep: {
      bedtime: '睡觉时间',
      wakeTime: '起床时间',
      quality: '睡眠质量 (1-5)',
      nightWakeups: '夜间醒来次数',
      napHabit: '午睡习惯',
      napAlways: '每天午睡',
      napSometimes: '偶尔午睡',
      napNever: '从不午睡'
    },
    diet: {
      breakfast: '早餐习惯',
      breakfastAlways: '每天吃',
      breakfastSometimes: '偶尔吃',
      breakfastNever: '几乎不吃',
      lunchTime: '午餐时间',
      dinnerTime: '晚餐时间',
      dinnerRegular: '晚餐时间相对规律',
      snacksPerDay: '每天零食次数',
      waterCups: '每天喝水量 (杯)'
    },
    exercise: {
      timesPerWeek: '每周运动次数',
      duration: '每次运动时长 (分钟)',
      type: '主要运动类型',
      typePlaceholder: '如：跑步、游泳、瑜伽...',
      sedentaryHours: '每天久坐时长 (小时)',
      avgSteps: '每天平均步数'
    },
    commute: {
      method: '主要通勤方式',
      methodPlaceholder: '选择通勤方式',
      drive: '开车',
      transit: '公共交通',
      bike: '骑车',
      walk: '步行',
      wfh: '居家办公',
      other: '其他',
      duration: '单程通勤时间 (分钟)',
      activity: '通勤时通常做什么',
      activityPlaceholder: '如：刷手机、听播客、看视频...'
    },
    work: {
      type: '工作类型',
      typePlaceholder: '如：程序员、销售、教师...',
      focusHours: '每天专注工作时长 (小时)',
      overtimeFreq: '加班频率',
      overtimeNever: '几乎不加班',
      overtimeSometimes: '偶尔加班',
      overtimeOften: '经常加班',
      growthTime: '每天学习/成长时间 (分钟)'
    },
    leisure: {
      screenTime: '每天屏幕时间 (小时)',
      socialFreq: '每周社交活动次数',
      aloneTime: '每天独处时间 (小时)',
      hobbies: '兴趣爱好',
      hobbiesPlaceholder: '如：读书、摄影、烹饪...（用逗号分隔）'
    },
    health: {
      checkupFreq: '体检频率',
      checkupNever: '几乎不体检',
      checkupRarely: '偶尔体检',
      checkupYearly: '每年一次',
      checkupHalf: '半年一次',
      stressLevel: '当前压力水平 (1-10)',
      symptoms: '近期身体症状',
      symptomsPlaceholder: '如：失眠、头痛、胃不适...（用逗号分隔，无则填"无"）'
    },
    progress: '{completed} / {total} 模块已填写',
    continue: '继续'
  },

  // ProbesPage.tsx
  probes: {
    title: '深度探针',
    subtitle: '基于你的日常，我们想深入了解一些细节',
    progress: '回答进度',
    completed: '探针完成',
    completedDesc: '基于你的回答，我们已经建立了足够完整的人生日程模型',
    viewTrajectory: '查看你的3年轨迹 →',
    placeholder: '写下你的回答...',
    submit: '提交',
    skip: '跳过',
    skipAll: '跳过全部',
    back: '返回',
    answeredProbes: '已回答的探针',
    categories: {
      sleep: '睡眠',
      diet: '饮食',
      exercise: '运动',
      commute: '通勤',
      work: '工作',
      leisure: '休闲',
      health: '健康'
    }
  },

  // CurrentTrajectoryPage.tsx
  trajectory: {
    title: '如果什么都不变...',
    subtitle: '以下是基于你当前日常状态的3年轨迹推演。我们不会美化数据。',
    realityCheck: '现实检验',
    realityCheckText: '这不是预测，而是基于你当前习惯的概率推演。\n如果你继续保持现在的所有习惯，3年后的轨迹大概率会是这样。\n这不是命运，但它是惯性。',
    metrics: {
      health: '健康',
      finance: '财务',
      relationships: '关系',
      growth: '成长'
    },
    chartTitle: '3年综合轨迹',
    milestones: '关键转折点',
    back: '上一步',
    next: '下一步：设定目标'
  },

  // CoreParameterPage.tsx
  core: {
    inputTitle: '你想要什么样的人生？',
    inputSubtitle: '请具体描述你3年后想要的生活。越具体，分析越准确。',
    city: '你希望在哪个城市生活？',
    cityPlaceholder: '如：杭州，有西湖，工作机会多...',
    lifestyle: '你理想的生活节奏是什么样的？',
    lifestylePlaceholder: '如：朝九晚六，周末双休，有时间发展爱好...',
    relationships: '你想和谁在一起？',
    relationshipsPlaceholder: '如：和志同道合的朋友，有稳定的亲密关系...',
    financial: '你的财务目标是什么？',
    financialPlaceholder: '如：存款达到X万，有稳定的被动收入...',
    health: '你希望的健康状态是什么样的？',
    healthPlaceholder: '如：体检无异常指标，每天精力充沛...',
    dailySchedule: '描述一下你理想的一天',
    dailySchedulePlaceholder: '如：7点起床，运动30分钟，8点吃早餐，9点开始工作...',
    analyzeButton: '分析核心参数',
    back: '上一步',
    resultTitle: '你的核心人生参数',
    resultSubtitle: '在所有可以改变的参数中，这个是最能撬动全局的那一个',
    coreParameter: 'Core Parameter',
    whyThis: '为什么是这个？',
    impactChain: '影响链',
    improvementTitle: '改善效果预估',
    reinput: '重新描述'
  },

  // MicroActionPage.tsx
  micro: {
    title: '你的微行动方案',
    subtitle: '针对"{param}"，我们为你设计了每天可以轻松执行的动作',
    designPrinciple: '设计原则',
    designPrincipleText: '这些动作极其简单，2分钟内可完成，不依赖意志力，融入现有习惯。\n目标：让你不可能失败。',
    actionConfidence: '行动自信度评估',
    newTrajectory: '改变后的新轨迹',
    trajectoryNote: '橙色线条为原始轨迹，绿色线条为改变后的新轨迹',
    currentTrajectory: '3年后原始',
    newTrajectoryLabel: '3年后新轨迹',
    startExecution: '开始执行',
    back: '上一步',
    restart: '重新开始',
    loading: '正在加载...'
  },

  // analyzer.ts
  analyzer: {
    paramNames: {
      sleep: '睡眠时间',
      exercise: '运动频率',
      diet: '饮食习惯',
      work: '工作专注度',
      leisure: '休闲质量',
      growth: '个人成长'
    },
    impactChains: {
      sleep: ['睡眠质量提升', '次日精力充沛', '专注力增强', '工作产出提高', '收入增长', '情绪稳定', '关系改善'],
      exercise: ['体能改善', '精力提升', '睡眠质量提高', '自信增强', '社交机会增加', '整体幸福感'],
      diet: ['身体健康', '精力稳定', '体重管理', '医疗支出减少', '财务压力降低'],
      work: ['专业能力提升', '职业竞争力增强', '收入潜力提高', '自我价值感增强'],
      leisure: ['压力缓解', '情绪健康', '人际关系', '生活满意度'],
      growth: ['技能增长', '职业发展', '收入提升', '自我实现']
    },
    metricNames: {
      health: '健康',
      finance: '财务',
      relationships: '关系',
      growth: '成长',
      overall: '综合'
    },
    defaultParam: '每日专注成长时间',
    defaultParamDesc: '每天用于深度学习和自我提升的时间是改变人生轨迹最有效的杠杆。'
  },

  // generator.ts
  generator: {
    confidenceReasons: {
      sleepGood: '你的睡眠质量中等，有改善空间',
      sleepLowWakeups: '夜间干扰较少',
      exerciseHabit: '你已经有运动习惯，容易坚持',
      growthTime: '你已经有固定的学习时间'
    }
  },

  // trajectory.ts
  metricLabels: {
    health: '健康',
    finance: '财务',
    relationships: '关系',
    growth: '成长',
    overall: '综合'
  },
  milestones: {
    healthWarning: '体检指标异常',
    financeWarning: '财务状况紧张',
    growthWarning: '职业发展停滞',
    healthCrisis: '慢性疲劳综合征',
    relationshipWarning: '人际关系疏离',
    overallDecline: '生活质量明显下降'
  }
}

export const en = {
  // App.tsx
  steps: {
    welcome: 'Start',
    daily: 'Daily',
    probes: 'Probes',
    current: 'Current',
    core: 'Core',
    micro: 'Actions'
  },
  app: {
    title: 'LifeForge',
    reset: 'Start Over',
    resetConfirm: 'Are you sure you want to start over? All data will be cleared.',
    stepsRemaining: 'About {count} steps remaining'
  },

  // WelcomePage.tsx
  welcome: {
    subtitle: 'Life Modelling · Trajectory Projection · Rewrite Your Parameters',
    description: 'This is not a life planning guide, nor a bowl of chicken soup.\nIt is a statistics-based life simulator — telling you the cold, hard truth with data.',
    step1Title: 'See Where You Stand',
    step1Desc: 'Without any changes, what will you look like in 3 years',
    step2Title: 'Find Your Core',
    step2Desc: 'Compare ideal vs reality, identify the 1 most critical parameter',
    step3Title: 'Micro-Actions',
    step3Desc: 'One action per day, so easy it is impossible to fail',
    startButton: 'Start Life Modelling →',
    timeEstimate: 'Estimated time: 15-20 min · All data stored locally only',
    whyTitle: 'Why do this?',
    whyQuote: "Most people's failure is not not knowing where the goal is,\nbut not seeing where each step they take is leading them."
  },

  // DailyInputPage.tsx
  daily: {
    title: "What does your daily routine look like?",
    subtitle: "Please honestly fill in your current daily status. The more real, the more accurate the projection.",
    modules: {
      sleep: 'Sleep',
      diet: 'Diet',
      exercise: 'Exercise',
      commute: 'Commute',
      work: 'Work',
      leisure: 'Leisure',
      health: 'Health'
    },
    sleep: {
      bedtime: 'Bedtime',
      wakeTime: 'Wake Time',
      quality: 'Sleep Quality (1-5)',
      nightWakeups: 'Night Wakings',
      napHabit: 'Nap Habit',
      napAlways: 'Nap every day',
      napSometimes: 'Nap occasionally',
      napNever: 'Never nap'
    },
    diet: {
      breakfast: 'Breakfast Habit',
      breakfastAlways: 'Eat every day',
      breakfastSometimes: 'Eat occasionally',
      breakfastNever: 'Rarely eat',
      lunchTime: 'Lunch Time',
      dinnerTime: 'Dinner Time',
      dinnerRegular: 'Dinner time is relatively regular',
      snacksPerDay: 'Snacks per day',
      waterCups: 'Water cups per day'
    },
    exercise: {
      timesPerWeek: 'Exercise times per week',
      duration: 'Duration per session (minutes)',
      type: 'Main Exercise Type',
      typePlaceholder: 'e.g.: running, swimming, yoga...',
      sedentaryHours: 'Daily sedentary hours',
      avgSteps: 'Average daily steps'
    },
    commute: {
      method: 'Main commute method',
      methodPlaceholder: 'Select commute method',
      drive: 'Drive',
      transit: 'Public Transit',
      bike: 'Bicycle',
      walk: 'Walk',
      wfh: 'Work from Home',
      other: 'Other',
      duration: 'One-way commute time (minutes)',
      activity: 'What do you usually do during commute',
      activityPlaceholder: 'e.g.: scroll phone, listen to podcasts, watch videos...'
    },
    work: {
      type: 'Work Type',
      typePlaceholder: 'e.g.: programmer, sales, teacher...',
      focusHours: 'Daily focused work hours',
      overtimeFreq: 'Overtime frequency',
      overtimeNever: 'Rarely work overtime',
      overtimeSometimes: 'Work overtime occasionally',
      overtimeOften: 'Work overtime frequently',
      growthTime: 'Daily learning/growth time (minutes)'
    },
    leisure: {
      screenTime: 'Daily screen time (hours)',
      socialFreq: 'Social activities per week',
      aloneTime: 'Daily alone time (hours)',
      hobbies: 'Hobbies',
      hobbiesPlaceholder: 'e.g.: reading, photography, cooking... (comma separated)'
    },
    health: {
      checkupFreq: 'Health checkup frequency',
      checkupNever: 'Rarely get checkups',
      checkupRarely: 'Get checkups occasionally',
      checkupYearly: 'Once a year',
      checkupHalf: 'Twice a year',
      stressLevel: 'Current stress level (1-10)',
      symptoms: 'Recent physical symptoms',
      symptomsPlaceholder: 'e.g.: insomnia, headache, stomach discomfort... (comma separated, or "none")'
    },
    progress: '{completed} / {total} modules completed',
    continue: 'Continue'
  },

  // ProbesPage.tsx
  probes: {
    title: 'Deep Probes',
    subtitle: 'Based on your daily routine, we want to understand some details deeper',
    progress: 'Answer Progress',
    completed: 'Probes Complete',
    completedDesc: 'Based on your answers, we have built a sufficiently complete life schedule model',
    viewTrajectory: "View Your 3-Year Trajectory →",
    placeholder: 'Write your answer...',
    submit: 'Submit',
    skip: 'Skip',
    skipAll: 'Skip All',
    back: 'Back',
    answeredProbes: 'Answered Probes',
    categories: {
      sleep: 'Sleep',
      diet: 'Diet',
      exercise: 'Exercise',
      commute: 'Commute',
      work: 'Work',
      leisure: 'Leisure',
      health: 'Health'
    }
  },

  // CurrentTrajectoryPage.tsx
  trajectory: {
    title: 'If nothing changes...',
    subtitle: "The following is a 3-year trajectory projection based on your current daily status. We don't beautify data.",
    realityCheck: 'Reality Check',
    realityCheckText: "This is not a prediction, but a probability projection based on your current habits.\nIf you continue all your current habits, this is most likely what your trajectory will look like in 3 years.\nThis is not destiny, but it is inertia.",
    metrics: {
      health: 'Health',
      finance: 'Finance',
      relationships: 'Relationships',
      growth: 'Growth'
    },
    chartTitle: '3-Year Overall Trajectory',
    milestones: 'Key Turning Points',
    back: 'Previous',
    next: 'Next: Set Goals'
  },

  // CoreParameterPage.tsx
  core: {
    inputTitle: 'What kind of life do you want?',
    inputSubtitle: 'Please describe in detail the life you want in 3 years. The more specific, the more accurate the analysis.',
    city: 'Which city do you want to live in?',
    cityPlaceholder: 'e.g.: Hangzhou, with West Lake, good job opportunities...',
    lifestyle: 'What is your ideal daily rhythm?',
    lifestylePlaceholder: 'e.g.: 9-to-5, weekends off, time to develop hobbies...',
    relationships: 'Who do you want to be with?',
    relationshipsPlaceholder: 'e.g.: like-minded friends, stable intimate relationship...',
    financial: 'What are your financial goals?',
    financialPlaceholder: 'e.g.: save X amount, have stable passive income...',
    health: 'What is your desired health status?',
    healthPlaceholder: 'e.g.: no abnormal checkup indicators, energetic every day...',
    dailySchedule: "Describe your ideal day",
    dailySchedulePlaceholder: 'e.g.: wake up at 7, exercise 30min, breakfast at 8, start work at 9...',
    analyzeButton: 'Analyze Core Parameter',
    back: 'Previous',
    resultTitle: 'Your Core Life Parameter',
    resultSubtitle: 'Among all changeable parameters, this is the one that can leverage the whole situation',
    coreParameter: 'Core Parameter',
    whyThis: 'Why this one?',
    impactChain: 'Impact Chain',
    improvementTitle: 'Estimated Improvement',
    reinput: 'Redescribe'
  },

  // MicroActionPage.tsx
  micro: {
    title: 'Your Micro-Action Plan',
    subtitle: 'For "{param}", we have designed actions you can easily execute daily',
    designPrinciple: 'Design Principles',
    designPrincipleText: 'These actions are extremely simple, completable within 2 minutes, do not rely on willpower, and integrate into existing habits.\nGoal: make it impossible for you to fail.',
    actionConfidence: 'Action Confidence Assessment',
    newTrajectory: 'New Trajectory After Change',
    trajectoryNote: 'Orange line is original trajectory, green line is the new trajectory after change',
    currentTrajectory: 'Original in 3 years',
    newTrajectoryLabel: 'New trajectory in 3 years',
    startExecution: 'Start Execution',
    back: 'Previous',
    restart: 'Start Over',
    loading: 'Loading...'
  },

  // analyzer.ts
  analyzer: {
    paramNames: {
      sleep: 'Sleep Duration',
      exercise: 'Exercise Frequency',
      diet: 'Dietary Habits',
      work: 'Work Focus',
      leisure: 'Leisure Quality',
      growth: 'Personal Growth'
    },
    impactChains: {
      sleep: ['Better sleep quality', 'More energy next day', 'Improved focus', 'Better work output', 'Income growth', 'Emotional stability', 'Better relationships'],
      exercise: ['Improved fitness', 'More energy', 'Better sleep', 'More confidence', 'More social opportunities', 'Overall well-being'],
      diet: ['Better physical health', 'Stable energy', 'Weight management', 'Reduced medical expenses', 'Less financial stress'],
      work: ['Improved professional skills', 'Enhanced career competitiveness', 'Higher income potential', 'Greater self-worth'],
      leisure: ['Stress relief', 'Emotional health', 'Better relationships', 'Life satisfaction'],
      growth: ['Skill growth', 'Career development', 'Income increase', 'Self-actualization']
    },
    metricNames: {
      health: 'Health',
      finance: 'Finance',
      relationships: 'Relationships',
      growth: 'Growth',
      overall: 'Overall'
    },
    defaultParam: 'Daily Focused Growth Time',
    defaultParamDesc: 'Time spent on deep learning and self-improvement each day is the most effective lever for changing your life trajectory.'
  },

  // generator.ts
  generator: {
    confidenceReasons: {
      sleepGood: 'Your sleep quality is moderate, with room for improvement',
      sleepLowWakeups: 'Fewer nighttime disturbances',
      exerciseHabit: 'You already have an exercise habit, easy to maintain',
      growthTime: 'You already have fixed study time'
    }
  },

  // trajectory.ts
  metricLabels: {
    health: 'Health',
    finance: 'Finance',
    relationships: 'Relationships',
    growth: 'Growth',
    overall: 'Overall'
  },
  milestones: {
    healthWarning: 'Abnormal checkup indicators',
    financeWarning: 'Tight financial situation',
    growthWarning: 'Career stagnation',
    healthCrisis: 'Chronic fatigue syndrome',
    relationshipWarning: 'Emotional distancing in relationships',
    overallDecline: 'Significant decline in quality of life'
  }
}

export type Language = 'zh' | 'en'
export type Translations = typeof zh
