import { useState } from 'react'
import { usePrototype, type CompletionMode, type SimulatedOutcome } from '../../context/prototype-context'
import {
  MESH_ITEMS,
  type ScorePreset,
  type SignalResult,
} from '../../data/constants'
import styles from './DemoSettings.module.css'

const OPTIONS: { value: ScorePreset; label: string }[] = [
  { value: 'restricted', label: 'Restricted — 15/100' },
  { value: 'limited', label: 'Limited — 45/100' },
  { value: 'full', label: 'Full Access — 88/100' },
]

const OUTCOMES: { value: SimulatedOutcome; label: string }[] = [
  { value: 'accept', label: 'Consent accepted' },
  { value: 'decline', label: 'Consent declined' },
]

const SIGNAL_RESULTS: { value: SignalResult; label: string }[] = [
  { value: 'verified', label: 'Verified problem' },
  { value: 'no-data', label: 'No signal data' },
  { value: 'forming', label: 'Signal forming' },
  { value: 'conflicting', label: 'Conflicting' },
  { value: 'normal', label: 'Normal availability' },
]

const COMPLETION: { value: CompletionMode; label: string }[] = [
  { value: 'pending', label: 'One-party pending' },
  { value: 'both', label: 'Both confirmed' },
]

export function DemoSettings() {
  const [open, setOpen] = useState(false)
  const {
    scorePreset,
    setScorePreset,
    simulatedOutcome,
    setSimulatedOutcome,
    signalResult,
    setSignalResult,
    meshPostCount,
    setMeshPostCount,
    completionMode,
    setCompletionMode,
  } = usePrototype()

  return (
    <div className={styles['demo-settings']}>
      <button
        type="button"
        className={styles['demo-settings__toggle']}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="demo-settings-panel"
      >
        Demo
      </button>
      {open && (
        <div
          id="demo-settings-panel"
          className={styles['demo-settings__panel']}
          role="region"
          aria-label="Demo settings"
        >
          <p className={styles['demo-settings__title']}>KaUgnay Demo Settings</p>

          <p className={styles['demo-settings__subtitle']}>Vouch Score</p>
          <div className={styles['demo-settings__options']}>
            {OPTIONS.map((opt) => (
              <label key={opt.value} className={styles['demo-settings__option']}>
                <input
                  type="radio"
                  name="score-preset"
                  value={opt.value}
                  checked={scorePreset === opt.value}
                  onChange={() => setScorePreset(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>

          <p className={styles['demo-settings__subtitle']}>Consent / Gate response</p>
          <div className={styles['demo-settings__options']}>
            {OUTCOMES.map((outcome) => (
              <label key={outcome.value} className={styles['demo-settings__option']}>
                <input
                  type="radio"
                  name="request-outcome"
                  value={outcome.value}
                  checked={simulatedOutcome === outcome.value}
                  onChange={() => setSimulatedOutcome(outcome.value)}
                />
                {outcome.label}
              </label>
            ))}
          </div>

          <p className={styles['demo-settings__subtitle']}>Supply signal result</p>
          <div className={styles['demo-settings__options']}>
            {SIGNAL_RESULTS.map((result) => (
              <label key={result.value} className={styles['demo-settings__option']}>
                <input
                  type="radio"
                  name="signal-result"
                  value={result.value}
                  checked={signalResult === result.value}
                  onChange={() => setSignalResult(result.value)}
                />
                {result.label}
              </label>
            ))}
          </div>

          <p className={styles['demo-settings__subtitle']}>Mesh post count</p>
          <label className={styles['demo-settings__option']}>
            <input
              type="range"
              min={0}
              max={MESH_ITEMS.length}
              value={meshPostCount}
              onChange={(event) => setMeshPostCount(Number(event.target.value))}
              aria-label="Mesh post count"
            />
            <span>{meshPostCount} of {MESH_ITEMS.length}</span>
          </label>

          <p className={styles['demo-settings__subtitle']}>Completion state</p>
          <div className={styles['demo-settings__options']}>
            {COMPLETION.map((mode) => (
              <label key={mode.value} className={styles['demo-settings__option']}>
                <input
                  type="radio"
                  name="completion-mode"
                  value={mode.value}
                  checked={completionMode === mode.value}
                  onChange={() => setCompletionMode(mode.value)}
                />
                {mode.label}
              </label>
            ))}
          </div>

          <p className={styles['demo-settings__note']}>
            Evaluator controls only. Separate from the product interface.
          </p>
        </div>
      )}
    </div>
  )
}
