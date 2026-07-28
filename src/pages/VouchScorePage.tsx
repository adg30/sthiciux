import { useNavigate } from 'react-router-dom'
import { FlowContext } from '../components/demo/FlowContext'
import { AccessTiles } from '../components/ui/AccessTiles'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { StatusPill } from '../components/ui/StatusPill'
import { usePrototype } from '../context/prototype-context'
import {
  CAPABILITIES,
  getLevelLabel,
  getScoreLabel,
  getScoreMessage,
  getUnlockedCount,
  SCORE_PRESETS,
} from '../data/constants'
import styles from './VouchScorePage.module.css'

export function VouchScorePage() {
  const navigate = useNavigate()
  const { vouchScore } = usePrototype()
  const unlockedCount = getUnlockedCount(vouchScore)
  const isFullAccess = vouchScore >= SCORE_PRESETS.full.score
  const currentLevel = getLevelLabel(vouchScore)
  const nextThreshold = vouchScore >= SCORE_PRESETS.limited.score
    ? SCORE_PRESETS.full
    : SCORE_PRESETS.limited
  const pointsToNextThreshold = Math.max(nextThreshold.score - vouchScore, 0)
  const unlockedSummary = `${unlockedCount} of ${CAPABILITIES.length} capabilities unlocked`

  return (
    <div className="screen">
      <h1 className="screen-title">Vouch Score</h1>
      <FlowContext label="Access through activity">
        Verified business activity determines which network capabilities are
        available—not payment or subscription status.
      </FlowContext>

      <div className={`card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.kicker}>Current access state</span>
            <h2 className={styles.heading}>What your network recognizes today</h2>
          </div>
          <StatusPill tone="signal">Score-driven</StatusPill>
        </div>
        <div className={styles.score}>{vouchScore}/100</div>
        <ProgressBar value={vouchScore} />
        <div className={styles.status}>{getScoreLabel(vouchScore)}</div>
        <p className={styles.level}>{currentLevel}</p>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Current status</span>
            <strong>{currentLevel}</strong>
            <p>{getScoreLabel(vouchScore)} access is based on verified business activity.</p>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Next threshold</span>
            <strong>
              {isFullAccess
                ? 'All thresholds unlocked'
                : `${nextThreshold.score}/100 · ${nextThreshold.level}`}
            </strong>
            <p>
              {isFullAccess
                ? 'Your network can already recognize every capability in this prototype.'
                : `${pointsToNextThreshold} more points unlock the next access state.`}
            </p>
          </div>
        </div>
        <div className={styles.capabilityHeader}>
          <div>
            <span className={styles.summaryLabel}>Unlocked capabilities</span>
            <strong>{unlockedSummary}</strong>
          </div>
          <StatusPill tone={isFullAccess ? 'trust' : 'ink'}>
            {isFullAccess ? 'High-Trust ready' : 'Expanding access'}
          </StatusPill>
        </div>
        <AccessTiles unlockedCount={unlockedCount} />
        <p className={styles.message}>{getScoreMessage(vouchScore)}</p>
      </div>

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
