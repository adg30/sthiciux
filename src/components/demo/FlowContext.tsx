import type { ReactNode } from 'react'
import styles from './FlowContext.module.css'

interface FlowContextProps {
  label: string
  children: ReactNode
}

export function FlowContext({ label, children }: FlowContextProps) {
  return (
    <aside className={styles.context}>
      <strong>{label}</strong>
      <p>{children}</p>
    </aside>
  )
}
