import { createContext, useContext } from 'react'
import type { ScorePreset } from '../data/constants'

export type SimulatedOutcome = 'accept' | 'decline'
export interface PrototypeSessionSnapshot {
  scoreLevelLabel: string
  startedActionsCount: number
  hasVerifiedScarcity: boolean
  verifiedScarcityId: string | null
  meshExchangeCompleted: boolean
  vouchSubmitted: boolean
}

export interface PrototypeContextValue {
  vouchScore: number
  scorePreset: ScorePreset
  setScorePreset: (preset: ScorePreset) => void
  gateRequiredScore: number
  meshExchangeCompleted: boolean
  setMeshExchangeCompleted: (value: boolean) => void
  vouchSubmitted: boolean
  setVouchSubmitted: (value: boolean) => void
  simulatedOutcome: SimulatedOutcome
  setSimulatedOutcome: (value: SimulatedOutcome) => void
  startedActions: string[]
  startAction: (actionId: string) => void
  verifiedScarcityId: string | null
  setVerifiedScarcityId: (signalId: string | null) => void
  prototypeSession: PrototypeSessionSnapshot
}

export const PrototypeContext = createContext<PrototypeContextValue | null>(null)

export function usePrototype() {
  const context = useContext(PrototypeContext)
  if (!context) {
    throw new Error('usePrototype must be used within PrototypeProvider')
  }
  return context
}
