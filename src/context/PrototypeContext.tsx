import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  GATE_REQUIRED_SCORE,
  SCORE_PRESETS,
  type ScorePreset,
} from '../data/constants'

interface PrototypeContextValue {
  vouchScore: number
  scorePreset: ScorePreset
  setScorePreset: (preset: ScorePreset) => void
  gateRequiredScore: number
  meshExchangeCompleted: boolean
  setMeshExchangeCompleted: (value: boolean) => void
  vouchSubmitted: boolean
  setVouchSubmitted: (value: boolean) => void
}

const PrototypeContext = createContext<PrototypeContextValue | null>(null)

const STORAGE_KEY = 'voucher-prototype-preset'

function readPreset(): ScorePreset {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'restricted' || stored === 'limited' || stored === 'full') {
    return stored
  }
  return 'restricted'
}

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [scorePreset, setScorePresetState] = useState<ScorePreset>(readPreset)
  const [meshExchangeCompleted, setMeshExchangeCompleted] = useState(false)
  const [vouchSubmitted, setVouchSubmitted] = useState(false)

  const setScorePreset = useCallback((preset: ScorePreset) => {
    setScorePresetState(preset)
    localStorage.setItem(STORAGE_KEY, preset)
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
    }),
    [scorePreset, setScorePreset, meshExchangeCompleted, vouchSubmitted],
  )

  return (
    <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>
  )
}

export function usePrototype() {
  const context = useContext(PrototypeContext)
  if (!context) {
    throw new Error('usePrototype must be used within PrototypeProvider')
  }
  return context
}
