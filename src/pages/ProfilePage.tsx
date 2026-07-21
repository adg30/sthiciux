import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { usePrototype } from '../context/PrototypeContext'
import { getLevelLabel, getScoreLabel } from '../data/constants'
import styles from './ProfilePage.module.css'

export function ProfilePage() {
  const navigate = useNavigate()
  const { vouchScore, meshExchangeCompleted, vouchSubmitted } = usePrototype()

  return (
    <div className="screen">
      <h1 className="screen-title">Profile</h1>

      <div className={`card ${styles.profile}`}>
        <div className={styles.avatar} aria-hidden="true">
          ○
        </div>
        <p className={styles.name}>MSME Owner</p>
        <p className={styles.role}>Barangay-level trust network member</p>
      </div>

      <div className="card">
        <p className={styles.scoreLabel}>Vouch Score</p>
        <p className={styles.scoreValue}>{vouchScore}/100</p>
        <ProgressBar value={vouchScore} label={getLevelLabel(vouchScore)} />
        <p className={styles.status}>{getScoreLabel(vouchScore)}</p>
      </div>

      <div className="card">
        <h2 className={styles.activityTitle}>Network Activity</h2>
        <ul className={styles.activityList}>
          <li>Mesh exchange: {meshExchangeCompleted ? 'Completed' : 'None yet'}</li>
          <li>Peer vouch given: {vouchSubmitted ? 'Yes' : 'None yet'}</li>
        </ul>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button fullWidth onClick={() => navigate('/vouch-score')}>
          View Vouch Score
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('/vouch-actions')}>
          Vouch Action List
        </Button>
      </div>
    </div>
  )
}
