import { useNavigate } from 'react-router-dom'
import { AccessTiles } from '../components/ui/AccessTiles'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { usePrototype } from '../context/PrototypeContext'
import {
  getScoreLabel,
  getScoreMessage,
  getUnlockedCount,
} from '../data/constants'
import styles from './VouchScorePage.module.css'

export function VouchScorePage() {
  const navigate = useNavigate()
  const { vouchScore } = usePrototype()
  const unlockedCount = getUnlockedCount(vouchScore)
  const isFullAccess = vouchScore >= 88

  return (
    <div className="screen">
      <h1 className="screen-title">Vouch Score</h1>

      <div className={`card ${styles.card}`}>
        <div className={styles.score}>{vouchScore}/100</div>
        <ProgressBar value={vouchScore} />
        <div className={styles.status}>{getScoreLabel(vouchScore)}</div>
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
      </div>
    </div>
  )
}
