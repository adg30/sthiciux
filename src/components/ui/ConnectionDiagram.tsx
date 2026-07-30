import styles from './ConnectionDiagram.module.css'

type ConnectionState = 'pending' | 'accepted' | 'declined' | 'confirm-you' | 'confirm-both'

interface ConnectionDiagramProps {
  state: ConnectionState
  youName?: string
  otherName?: string
  message?: string
  revealOther?: boolean
}

export function ConnectionDiagram({
  state,
  youName = 'You',
  otherName = 'Anonymous',
  message,
  revealOther,
}: ConnectionDiagramProps) {
  const middleIcon =
    state === 'declined' ? '✕' : state === 'accepted' || state === 'confirm-both' ? '✓' : '?'

  const showOtherName = revealOther ?? (state === 'accepted' || state === 'confirm-both')

  const defaultMessages: Record<ConnectionState, string> = {
    pending: 'Your identity stays hidden until mutual acceptance.',
    accepted: 'Connection established!',
    declined: 'The supplier has declined your request.',
    'confirm-you': 'Confirmation is required from both parties.',
    'confirm-both': 'Exchange verified by both parties.',
  }

  return (
    <div className={styles.connection} data-state={state}>
      <div className={styles.connection__parties}>
        <div className={styles.connection__party}>
          <div
            className={`${styles.connection__avatar} ${
              state === 'accepted' ||
              state === 'confirm-you' ||
              state === 'confirm-both'
                ? styles['connection__avatar--confirmed']
                : state === 'declined'
                  ? styles['connection__avatar--declined']
                  : ''
            }`}
          >
            {youName.charAt(0)}
          </div>
          <span className={styles.connection__name}>{youName}</span>
          {(state === 'confirm-you' || state === 'confirm-both') && (
            <span className={`${styles.connection__status} ${styles['connection__status--confirmed']}`}>
              Confirmed
            </span>
          )}
          {state === 'accepted' && (
            <span className={`${styles.connection__status} ${styles['connection__status--confirmed']}`}>
              Connected
            </span>
          )}
          {state === 'declined' && (
            <span className={`${styles.connection__status} ${styles['connection__status--declined']}`}>
              Declined
            </span>
          )}
        </div>

        <span className={styles.connection__middle} aria-hidden="true">
          {middleIcon}
        </span>

        <div className={styles.connection__party}>
          <div
            className={`${styles.connection__avatar} ${
              state === 'accepted' || state === 'confirm-both'
                ? styles['connection__avatar--confirmed']
                : state === 'declined'
                  ? styles['connection__avatar--declined']
                  : ''
            }`}
          >
            {showOtherName ? otherName.charAt(0) : '?'}
          </div>
          <span className={styles.connection__name}>
            {showOtherName ? otherName : 'Anonymous'}
          </span>
          {state === 'confirm-you' && (
            <span className={`${styles.connection__status} ${styles['connection__status--pending']}`}>
              Pending
            </span>
          )}
          {state === 'confirm-both' && (
            <span className={`${styles.connection__status} ${styles['connection__status--confirmed']}`}>
              Confirmed
            </span>
          )}
          {state === 'accepted' && (
            <span className={`${styles.connection__status} ${styles['connection__status--confirmed']}`}>
              Connected
            </span>
          )}
          {state === 'declined' && (
            <span className={`${styles.connection__status} ${styles['connection__status--declined']}`}>
              Declined
            </span>
          )}
        </div>
      </div>

      <p className={styles.connection__message}>{message ?? defaultMessages[state]}</p>
    </div>
  )
}
