import { useState } from 'react'
import { usePrototype } from '../../context/PrototypeContext'
import type { ScorePreset } from '../../data/constants'
import styles from './DemoSettings.module.css'

const OPTIONS: { value: ScorePreset; label: string }[] = [
  { value: 'restricted', label: 'Restricted — 15/100' },
  { value: 'limited', label: 'Limited — 45/100' },
  { value: 'full', label: 'Full Access — 88/100' },
]

export function DemoSettings() {
  const [open, setOpen] = useState(false)
  const { scorePreset, setScorePreset } = usePrototype()

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
          <p className={styles['demo-settings__title']}>Prototype Demo Settings</p>
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
          <p className={styles['demo-settings__note']}>
            For demonstration only. Switches Vouch Score across all flows.
          </p>
        </div>
      )}
    </div>
  )
}
