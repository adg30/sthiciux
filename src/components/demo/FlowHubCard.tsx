import { Link } from 'react-router-dom'
import styles from './FlowHubCard.module.css'

interface FlowHubCardProps {
  number: string
  title: string
  description: string
  to: string
}

export function FlowHubCard({
  number,
  title,
  description,
  to,
}: FlowHubCardProps) {
  return (
    <Link className={styles.card} to={to}>
      <span className={styles.number}>{number}</span>
      <strong>{title}</strong>
      <span className={styles.description}>{description}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  )
}
