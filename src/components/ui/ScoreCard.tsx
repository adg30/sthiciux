import { ProgressBar } from './ProgressBar'
import { getScoreTone } from '../../data/constants'
import styles from './ScoreCard.module.css'

interface ScoreCardProps {
  score: number
  statusLabel: string
  levelLabel?: string
  onClick?: () => void
}

export function ScoreCard({ score, statusLabel, levelLabel, onClick }: ScoreCardProps) {
  const tone = getScoreTone(score)
  const content = (
    <>
      <span className={styles['score-card__label']}>Vouch Score</span>
      <span className={styles['score-card__value']}>{score}/100</span>
      <ProgressBar value={score} tone={tone} />
      <span className={`${styles['score-card__status']} ${styles[`score-card__status--${tone}`]}`}>
        {statusLabel}
      </span>
      {levelLabel && <span className={styles['score-card__level']}>{levelLabel}</span>}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        className={`card ${styles['score-card']} ${styles['score-card--clickable']}`}
        onClick={onClick}
        aria-label={`Vouch Score ${score} out of 100, ${statusLabel}. Tap to view details.`}
      >
        {content}
      </button>
    )
  }

  return <div className={`card ${styles['score-card']}`}>{content}</div>
}
