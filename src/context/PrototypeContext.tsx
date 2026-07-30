import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  GATE_REQUIRED_SCORE,
  getLevelLabel,
  MESH_ITEMS,
  SCORE_PRESETS,
  type ScorePreset,
  type SignalResult,
} from '../data/constants'
import {
  PrototypeContext,
  type CompletionMode,
  type SimulatedOutcome,
} from './prototype-context'

const STORAGE_KEY = 'kaugnay-prototype-preset'
const OUTCOME_STORAGE_KEY = 'kaugnay-prototype-outcome'
const ACTIONS_STORAGE_KEY = 'kaugnay-prototype-started-actions'
const VERIFIED_SCARCITY_STORAGE_KEY = 'kaugnay-prototype-verified-scarcity'
const SIGNAL_RESULT_KEY = 'kaugnay-prototype-signal-result'
const MESH_COUNT_KEY = 'kaugnay-prototype-mesh-count'
const COMPLETION_MODE_KEY = 'kaugnay-prototype-completion-mode'

function readStartedActions(): string[] {
  try {
    const stored = JSON.parse(localStorage.getItem(ACTIONS_STORAGE_KEY) ?? '[]')
    return Array.isArray(stored) ? stored.filter((value): value is string => typeof value === 'string') : []
  } catch {
    return []
  }
}

function readPreset(): ScorePreset {
  const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem('voucher-prototype-preset')
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

function readSignalResult(): SignalResult {
  const stored = localStorage.getItem(SIGNAL_RESULT_KEY)
  if (
    stored === 'verified' ||
    stored === 'no-data' ||
    stored === 'forming' ||
    stored === 'conflicting' ||
    stored === 'normal'
  ) {
    return stored
  }
  return 'verified'
}

function readMeshPostCount(): number {
  const raw = localStorage.getItem(MESH_COUNT_KEY)
  if (raw === null) return MESH_ITEMS.length
  const stored = Number(raw)
  if (Number.isFinite(stored) && stored >= 0 && stored <= MESH_ITEMS.length) {
    return stored
  }
  return MESH_ITEMS.length
}

function readCompletionMode(): CompletionMode {
  return localStorage.getItem(COMPLETION_MODE_KEY) === 'pending' ? 'pending' : 'both'
}

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [scorePreset, setScorePresetState] = useState<ScorePreset>(readPreset)
  const [meshExchangeCompleted, setMeshExchangeCompleted] = useState(false)
  const [vouchSubmitted, setVouchSubmitted] = useState(false)
  const [simulatedOutcome, setSimulatedOutcomeState] = useState<SimulatedOutcome>(() =>
    localStorage.getItem(OUTCOME_STORAGE_KEY) === 'decline' ||
    localStorage.getItem('voucher-prototype-outcome') === 'decline'
      ? 'decline'
      : 'accept',
  )
  const [startedActions, setStartedActions] = useState<string[]>(readStartedActions)
  const [verifiedScarcityId, setVerifiedScarcityIdState] = useState<string | null>(
    readVerifiedScarcityId,
  )
  const [signalResult, setSignalResultState] = useState<SignalResult>(readSignalResult)
  const [meshPostCount, setMeshPostCountState] = useState(readMeshPostCount)
  const [completionMode, setCompletionModeState] = useState<CompletionMode>(readCompletionMode)

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

  const setSignalResult = useCallback((value: SignalResult) => {
    setSignalResultState(value)
    localStorage.setItem(SIGNAL_RESULT_KEY, value)
  }, [])

  const setMeshPostCount = useCallback((value: number) => {
    const next = Math.max(0, Math.min(MESH_ITEMS.length, value))
    setMeshPostCountState(next)
    localStorage.setItem(MESH_COUNT_KEY, String(next))
  }, [])

  const setCompletionMode = useCallback((value: CompletionMode) => {
    setCompletionModeState(value)
    localStorage.setItem(COMPLETION_MODE_KEY, value)
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
      signalResult,
      setSignalResult,
      meshPostCount,
      setMeshPostCount,
      completionMode,
      setCompletionMode,
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
      signalResult,
      setSignalResult,
      meshPostCount,
      setMeshPostCount,
      completionMode,
      setCompletionMode,
    ],
  )

  return (
    <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>
  )
}
