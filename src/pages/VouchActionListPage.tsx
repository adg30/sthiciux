import { useNavigate } from 'react-router-dom'
import { VOUCH_ACTIONS } from '../data/constants'
import { usePrototype } from '../context/prototype-context'
import { SignalTip } from '../components/ui/SignalTip'
import styles from './VouchActionListPage.module.css'

export function VouchActionListPage() {
  const navigate = useNavigate()
  const { startedActions } = usePrototype()

  return (
    <div className="screen">
      <p className="screen-kicker">Voluntary paths</p>
      <h1 className="screen-title">Trust-Building Paths</h1>

      <SignalTip label="Paano ito gumagana?">
        <p>
          Choose an action you can really do. No one is asked to vouch for you.
        </p>
      </SignalTip>

      <p className={styles.progress} role="status">
        {startedActions.length}/{VOUCH_ACTIONS.length} started
      </p>

      <ul className={styles.list}>
        {VOUCH_ACTIONS.map((action) => {
          const isStarted = startedActions.includes(action.id)

          return (
            <li key={action.id}>
              <button
                type="button"
                className={`${styles.item} ${isStarted ? styles['item--started'] : ''}`}
                onClick={() => navigate(`/vouch-actions/${action.id}`)}
              >
                <span className={styles.content}>
                  <span className={styles.channel}>{action.channel}</span>
                  <span className={styles.title}>{action.title}</span>
                  {isStarted && <span className={styles.status}>Started</span>}
                </span>
                <span className={styles.chevron} aria-hidden="true">
                  ›
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
