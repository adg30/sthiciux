import { Link } from 'react-router-dom'
import { StatusPill } from '../ui/StatusPill'
import styles from './FlowHubCard.module.css'

interface FlowHubCardProps {
  number: string
  title: string
  description: string
  to: string
  statusLabel: string
  statusTone: 'signal' | 'trust' | 'scarcity' | 'critical' | 'ink'
}

export function FlowHubCard({
  number,
  title,
  description,
  to,
  statusLabel,
  statusTone,
}: FlowHubCardProps) {
  return (
    <Link className={styles.card} to={to}>
      <div className={styles.topRow}>
        <span className={styles.number}>{number}</span>
        <StatusPill tone={statusTone}>{statusLabel}</StatusPill>
      </div>
      <strong>{title}</strong>
      <span className={styles.description}>{description}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  )
}
