export interface SleepData {
  bedtime: string
  wakeTime: string
  quality: number
  nightWakeups: number
  napHabit: 'always' | 'sometimes' | 'never'
}

export interface DietData {
  breakfast: 'always' | 'sometimes' | 'never'
  lunchTime: string
  dinnerTime: string
  dinnerRegular: boolean
  snacksPerDay: number
  waterCups: number
}

export interface ExerciseData {
  timesPerWeek: number
  type: string
  duration: number
  sedentaryHours: number
  avgSteps: number
}

export interface CommuteData {
  method: string
  duration: number
  activity: string
}

export interface WorkData {
  type: string
  focusHours: number
  overtimeFreq: 'never' | 'sometimes' | 'often'
  growthTime: number
}

export interface LeisureData {
  screenTime: number
  socialFreq: number
  aloneTime: number
  hobbies: string[]
}

export interface HealthData {
  checkupFreq: string
  symptoms: string[]
  stressLevel: number
}

export interface DailyRoutine {
  sleep: SleepData
  diet: DietData
  exercise: ExerciseData
  commute: CommuteData
  work: WorkData
  leisure: LeisureData
  health: HealthData
}

export interface ProbeAnswer {
  questionId: string
  answer: string
  timestamp: number
}

export interface DesiredFuture {
  city: string
  lifestyle: string
  relationships: string
  financial: string
  health: string
  dailySchedule: string
}

export interface TrajectoryPoint {
  month: number
  health: number
  finance: number
  relationships: number
  growth: number
  overall: number
  milestone?: string
}

export interface MicroAction {
  id: string
  action: string
  trigger: string
  duration: string
  resistanceSolution: string
}

export interface Results {
  currentTrajectory: TrajectoryPoint[]
  coreParameter: CoreParameterResult
  microActions: MicroAction[]
  newTrajectory: TrajectoryPoint[]
}

export interface CoreParameterResult {
  name: string
  description: string
  impactChain: string[]
  affectedMetrics: {
    metric: string
    improvement: number
  }[]
  reasoning: string
}

export interface UserProfile {
  name?: string
  dailyRoutine: DailyRoutine
  probeAnswers: ProbeAnswer[]
  desiredFuture: DesiredFuture
  results?: Results
}

export type Step = 'welcome' | 'daily' | 'probes' | 'current' | 'core' | 'micro'

export interface AppState {
  currentStep: Step
  userProfile: UserProfile
  completedModules: string[]
  pendingProbes: string[]
}