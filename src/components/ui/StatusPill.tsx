import type { ReactNode } from 'react'
import styles from './StatusPill.module.css'

type StatusTone = 'signal' | 'trust' | 'scarcity' | 'critical' | 'ink'

interface StatusPillProps {
  tone: StatusTone
  assistiveLabel?: string
  children: ReactNode
}

export function StatusPill({ tone, assistiveLabel, children }: StatusPillProps) {
  const text = typeof children === 'string' ? children : undefined
  const ariaLabel = assistiveLabel && text ? `${assistiveLabel}: ${text}` : undefined

  return (
    <span className={`${styles.pill} ${styles[`pill--${tone}`]}`} aria-label={ariaLabel}>
      {children}
    </span>
  )
}
