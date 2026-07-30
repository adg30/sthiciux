import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { VOUCH_ACTIONS } from '../data/constants'
import { usePrototype } from '../context/prototype-context'
import styles from './VouchActionDetailPage.module.css'

export function VouchActionDetailPage() {
  const { actionId } = useParams()
  const navigate = useNavigate()
  const action = VOUCH_ACTIONS.find((a) => a.id === actionId)
  const { startedActions, startAction } = usePrototype()
  const isStarted = actionId ? startedActions.includes(actionId) : false

  if (!action) {
    return (
      <div className="screen">
        <p>Action not found.</p>
        <Button onClick={() => navigate('/vouch-actions')}>Back to list</Button>
      </div>
    )
  }

  const handleMarkStarted = () => {
    if (actionId) {
      startAction(actionId)
    }
  }

  return (
    <div className="screen">
      <p className={styles.channel}>{action.channel}</p>
      <h1 className="screen-title">{action.detailTitle}</h1>

      <div className={`card ${styles.detailCard}`}>
        <p className={styles.body}>{action.detailBody}</p>
        <div className={styles.potential}>
          <span className={styles.potentialLabel}>Potential impact</span>
          <strong>{action.potential}</strong>
        </div>
      </div>

      {isStarted ? (
        <div className={`card ${styles.startedCard}`} role="status">
          <span className={styles.startedEyebrow}>Action Started</span>
          <h2 className={styles.startedTitle}>Your trust-building path is in progress</h2>
          <p className={styles.startedLead}>{action.why}</p>
          <p className={styles.startedNote}>
            This prototype records the path as started. Completion is not verified and no real
            trust points are awarded here.
          </p>
        </div>
      ) : (
        <div className={`card ${styles.whyCard}`}>
          <span className={styles.whyLabel}>Why this helps</span>
          <p className={styles.whyBody}>{action.why}</p>
        </div>
      )}

      <div className={styles.footer}>
        {isStarted ? (
          <Button fullWidth onClick={() => navigate(action.continueTo)}>
            {action.continueLabel}
          </Button>
        ) : (
          <Button fullWidth onClick={handleMarkStarted}>
            Mark as Started
          </Button>
        )}
        <Button variant="secondary" fullWidth onClick={() => navigate('/vouch-actions')}>
          Back to list
        </Button>
      </div>
    </div>
  )
}
