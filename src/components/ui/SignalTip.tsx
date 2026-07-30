import { useId, useState, type ReactNode } from 'react'
import styles from './SignalTip.module.css'

interface SignalTipProps {
  label?: string
  children: ReactNode
  defaultOpen?: boolean
}

/** Tap-to-expand tip for older MSME users — keeps screens calm by default. */
export function SignalTip({
  label = 'Bakit ito?',
  children,
  defaultOpen = false,
}: SignalTipProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <div className={styles.tip}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.pulse} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
        <span className={styles.chevron} aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div id={panelId} className={styles.panel} role="region">
          {children}
        </div>
      )}
    </div>
  )
}
