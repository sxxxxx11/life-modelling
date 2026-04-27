import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { AppState, UserProfile, Step, DailyRoutine, DesiredFuture, ProbeAnswer, Results } from '../types'

const defaultDailyRoutine: DailyRoutine = {
  sleep: {
    bedtime: '23:30',
    wakeTime: '07:00',
    quality: 3,
    nightWakeups: 0,
    napHabit: 'sometimes'
  },
  diet: {
    breakfast: 'sometimes',
    lunchTime: '12:30',
    dinnerTime: '19:30',
    dinnerRegular: true,
    snacksPerDay: 2,
    waterCups: 5
  },
  exercise: {
    timesPerWeek: 2,
    type: '',
    duration: 30,
    sedentaryHours: 8,
    avgSteps: 5000
  },
  commute: {
    method: '',
    duration: 30,
    activity: ''
  },
  work: {
    type: '',
    focusHours: 4,
    overtimeFreq: 'sometimes',
    growthTime: 30
  },
  leisure: {
    screenTime: 3,
    socialFreq: 2,
    aloneTime: 2,
    hobbies: []
  },
  health: {
    checkupFreq: 'yearly',
    symptoms: [],
    stressLevel: 6
  }
}

const defaultDesiredFuture: DesiredFuture = {
  city: '',
  lifestyle: '',
  relationships: '',
  financial: '',
  health: '',
  dailySchedule: ''
}

const defaultUserProfile: UserProfile = {
  dailyRoutine: defaultDailyRoutine,
  probeAnswers: [],
  desiredFuture: defaultDesiredFuture
}

const initialState: AppState = {
  currentStep: 'welcome',
  userProfile: defaultUserProfile,
  completedModules: [],
  pendingProbes: []
}

type Action =
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'UPDATE_DAILY_ROUTINE'; payload: Partial<DailyRoutine> }
  | { type: 'UPDATE_DESIRED_FUTURE'; payload: Partial<DesiredFuture> }
  | { type: 'ADD_PROBE_ANSWER'; payload: ProbeAnswer }
  | { type: 'COMPLETE_MODULE'; payload: string }
  | { type: 'SET_RESULTS'; payload: Results }
  | { type: 'RESET' }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'UPDATE_PROFILE':
      return { ...state, userProfile: { ...state.userProfile, ...action.payload } }
    case 'UPDATE_DAILY_ROUTINE':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          dailyRoutine: { ...state.userProfile.dailyRoutine, ...action.payload }
        }
      }
    case 'UPDATE_DESIRED_FUTURE':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          desiredFuture: { ...state.userProfile.desiredFuture, ...action.payload }
        }
      }
    case 'ADD_PROBE_ANSWER':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          probeAnswers: [...state.userProfile.probeAnswers, action.payload]
        }
      }
    case 'COMPLETE_MODULE':
      return {
        ...state,
        completedModules: [...state.completedModules, action.payload]
      }
    case 'SET_RESULTS':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          results: action.payload
        }
      }
    case 'RESET':
      return { ...initialState }
    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const STORAGE_KEY = 'lifeforge_state'

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...initial, ...parsed }
      }
    } catch (e) {
      console.warn('Failed to load saved state')
    }
    return initial
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Failed to save state')
    }
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export function useStep() {
  const { state, dispatch } = useApp()
  const goToStep = (step: Step) => dispatch({ type: 'SET_STEP', payload: step })
  const nextStep = () => {
    const steps: Step[] = ['welcome', 'daily', 'probes', 'current', 'core', 'micro']
    const currentIndex = steps.indexOf(state.currentStep)
    if (currentIndex < steps.length - 1) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex + 1] })
    }
  }
  const prevStep = () => {
    const steps: Step[] = ['welcome', 'daily', 'probes', 'current', 'core', 'micro']
    const currentIndex = steps.indexOf(state.currentStep)
    if (currentIndex > 0) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex - 1] })
    }
  }
  return { currentStep: state.currentStep, goToStep, nextStep, prevStep }
}