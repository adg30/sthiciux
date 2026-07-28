import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  GATE_REQUIRED_SCORE,
  getLevelLabel,
  SCORE_PRESETS,
  type ScorePreset,
} from '../data/constants'
import { PrototypeContext, type SimulatedOutcome } from './prototype-context'

const STORAGE_KEY = 'voucher-prototype-preset'
const OUTCOME_STORAGE_KEY = 'voucher-prototype-outcome'
const ACTIONS_STORAGE_KEY = 'voucher-prototype-started-actions'
const VERIFIED_SCARCITY_STORAGE_KEY = 'voucher-prototype-verified-scarcity'

function readStartedActions(): string[] {
  try {
    const stored = JSON.parse(localStorage.getItem(ACTIONS_STORAGE_KEY) ?? '[]')
    return Array.isArray(stored) ? stored.filter((value): value is string => typeof value === 'string') : []
  } catch {
    return []
  }
}

function readPreset(): ScorePreset {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'restricted' || stored === 'limited' || stored === 'full') {
    return stored
  }
  return 'restricted'
}

function readVerifiedScarcityId(): string | null {
  try {
    const stored = sessionStorage.getItem(VERIFIED_SCARCITY_STORAGE_KEY)
    return stored || null
  } catch {
    return null
  }
}

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [scorePreset, setScorePresetState] = useState<ScorePreset>(readPreset)
  const [meshExchangeCompleted, setMeshExchangeCompleted] = useState(false)
  const [vouchSubmitted, setVouchSubmitted] = useState(false)
  const [simulatedOutcome, setSimulatedOutcomeState] = useState<SimulatedOutcome>(() =>
    localStorage.getItem(OUTCOME_STORAGE_KEY) === 'decline' ? 'decline' : 'accept',
  )
  const [startedActions, setStartedActions] = useState<string[]>(readStartedActions)
  const [verifiedScarcityId, setVerifiedScarcityIdState] = useState<string | null>(
    readVerifiedScarcityId,
  )

  const setScorePreset = useCallback((preset: ScorePreset) => {
    setScorePresetState(preset)
    localStorage.setItem(STORAGE_KEY, preset)
  }, [])

  const setSimulatedOutcome = useCallback((outcome: SimulatedOutcome) => {
    setSimulatedOutcomeState(outcome)
    localStorage.setItem(OUTCOME_STORAGE_KEY, outcome)
  }, [])

  const startAction = useCallback((actionId: string) => {
    setStartedActions((current) => {
      if (current.includes(actionId)) return current
      const next = [...current, actionId]
      localStorage.setItem(ACTIONS_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const setVerifiedScarcityId = useCallback((signalId: string | null) => {
    setVerifiedScarcityIdState(signalId)
    try {
      if (signalId) {
        sessionStorage.setItem(VERIFIED_SCARCITY_STORAGE_KEY, signalId)
      } else {
        sessionStorage.removeItem(VERIFIED_SCARCITY_STORAGE_KEY)
      }
    } catch {
      // The prototype remains usable when browser storage is unavailable.
    }
  }, [])

  const value = useMemo(
    () => ({
      vouchScore: SCORE_PRESETS[scorePreset].score,
      scorePreset,
      setScorePreset,
      gateRequiredScore: GATE_REQUIRED_SCORE,
      meshExchangeCompleted,
      setMeshExchangeCompleted,
      vouchSubmitted,
      setVouchSubmitted,
      simulatedOutcome,
      setSimulatedOutcome,
      startedActions,
      startAction,
      verifiedScarcityId,
      setVerifiedScarcityId,
      prototypeSession: {
        scoreLevelLabel: getLevelLabel(SCORE_PRESETS[scorePreset].score),
        startedActionsCount: startedActions.length,
        hasVerifiedScarcity: verifiedScarcityId !== null,
        verifiedScarcityId,
        meshExchangeCompleted,
        vouchSubmitted,
      },
    }),
    [
      scorePreset,
      setScorePreset,
      meshExchangeCompleted,
      vouchSubmitted,
      simulatedOutcome,
      setSimulatedOutcome,
      startedActions,
      startAction,
      verifiedScarcityId,
      setVerifiedScarcityId,
    ],
  )

  return (
    <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>
  )
}
