import { useNavigate } from 'react-router-dom'
import { VOUCH_ACTIONS } from '../data/constants'
import styles from './VouchActionListPage.module.css'

export function VouchActionListPage() {
  const navigate = useNavigate()

  const handleAction = (id: string) => {
    if (id === 'mesh-exchange') {
      navigate('/mesh')
    } else if (id === 'scarcity-signal') {
      navigate('/scarcity')
    } else if (id === 'supplier-forest') {
      navigate('/discovery')
    } else {
      navigate(`/vouch-actions/${id}`)
    }
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Vouch Action List</h1>
      <p className={styles.subtitle}>
        Legitimate actions to build trust. You cannot formally request a vouch from others.
      </p>

      <ul className={styles.list}>
        {VOUCH_ACTIONS.map((action) => (
          <li key={action.id}>
            <button
              type="button"
              className={styles.item}
              onClick={() => handleAction(action.id)}
            >
              <span className={styles.icon} aria-hidden="true">
                ◻
              </span>
              <span className={styles.content}>
                <span className={styles.title}>{action.title}</span>
                <span className={styles.description}>{action.description}</span>
              </span>
              <span className={styles.chevron} aria-hidden="true">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
