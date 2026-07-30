import { useNavigate } from 'react-router-dom'
import { AccessTiles } from '../components/ui/AccessTiles'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { usePrototype } from '../context/prototype-context'
import {
  CAPABILITIES,
  getLevelLabel,
  getScoreLabel,
  getScoreMessage,
  getScoreTone,
  getUnlockedCount,
  SCORE_PRESETS,
} from '../data/constants'
import styles from './VouchScorePage.module.css'

export function VouchScorePage() {
  const navigate = useNavigate()
  const { vouchScore } = usePrototype()
  const unlockedCount = getUnlockedCount(vouchScore)
  const isFullAccess = vouchScore >= SCORE_PRESETS.full.score
  const scoreTone = getScoreTone(vouchScore)
  const currentLevel = getLevelLabel(vouchScore)
  const statusLabel = getScoreLabel(vouchScore)
  const nextThreshold = vouchScore >= SCORE_PRESETS.limited.score
    ? SCORE_PRESETS.full
    : SCORE_PRESETS.limited
  const pointsToNextThreshold = Math.max(nextThreshold.score - vouchScore, 0)
  const unlockedSummary = `${unlockedCount} of ${CAPABILITIES.length} capabilities unlocked`

  return (
    <div className="screen">
      <h1 className="screen-title">Vouch Score</h1>

      <div className={`card ${styles.scoreCard}`}>
        <div className={styles.scoreRow}>
          <span className={styles.scoreNumber}>{vouchScore}</span>
          <span className={styles.scoreDenom}>/100</span>
        </div>
        <ProgressBar value={vouchScore} tone={scoreTone} />
        <p className={`${styles.accessLabel} ${styles[`accessLabel--${scoreTone}`]}`}>
          {statusLabel}
        </p>
        <p className={styles.level}>{currentLevel}</p>
      </div>

      <section className={styles.section} aria-labelledby="access-capabilities-heading">
        <h2 id="access-capabilities-heading" className={styles.sectionTitle}>
          Access Capabilities
        </h2>
        <p className={styles.capabilitySummary}>{unlockedSummary}</p>
        <AccessTiles unlockedCount={unlockedCount} />
      </section>

      <div className={`card ${styles.thresholdCard}`}>
        <span className={styles.sectionEyebrow}>Next Threshold</span>
        <strong className={styles.thresholdValue}>
          {isFullAccess
            ? 'All thresholds unlocked'
            : `${nextThreshold.score}/100 · ${nextThreshold.level}`}
        </strong>
        <p className={styles.thresholdDetail}>
          {isFullAccess
            ? 'Your network can already recognize every capability in this prototype.'
            : `${pointsToNextThreshold} more points unlock the next access state.`}
        </p>
      </div>

      <p className={styles.message}>{getScoreMessage(vouchScore)}</p>

      <div className={styles.footer}>
        {isFullAccess ? (
          <Button fullWidth onClick={() => navigate('/trust-card')}>
            Generate Trust Card
          </Button>
        ) : (
          <Button fullWidth onClick={() => navigate('/vouch-actions')}>
            View Vouch Action List
          </Button>
        )}
        <Button variant="secondary" fullWidth onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}
