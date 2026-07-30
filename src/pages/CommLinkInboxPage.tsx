import { useNavigate } from 'react-router-dom'
import { COMM_CONTACTS } from '../data/constants'
import styles from './CommLinkInboxPage.module.css'

export function CommLinkInboxPage() {
  const navigate = useNavigate()
  const hasContacts = COMM_CONTACTS.length > 0

  return (
    <div className="screen">
      <p className="screen-kicker screen-kicker--trust">Encrypted channel</p>
      <h1 className="screen-title">Comm-Link</h1>

      <div className={styles.security}>
        <span className={styles.securityIcon} aria-hidden="true" />
        <div>
          <strong>Encrypted · session keys</strong>
          <p>Only mutually revealed businesses can message you here.</p>
        </div>
      </div>

      {hasContacts ? (
        <>
          <div className={styles.sectionHeading}>
            <strong>Conversations</strong>
            <span>{COMM_CONTACTS.length} secure connections</span>
          </div>
          <ul className={styles.list}>
            {COMM_CONTACTS.map((contact, index) => (
              <li key={contact.id}>
                <button type="button" onClick={() => navigate(`/comm-link/${contact.id}`)}>
                  <span className={styles.avatar}>{contact.name.charAt(0)}</span>
                  <span className={styles.content}>
                    <strong>{contact.name}</strong>
                    <span>{contact.detail}</span>
                    <small>
                      {index === 0
                        ? 'Open conversation · New message'
                        : `Open conversation · ${contact.source}`}
                    </small>
                  </span>
                  <span className={styles.status}>
                    <i aria-hidden="true" /> Secure
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className={styles.empty} role="status">
          <div className={styles.emptyIcon} aria-hidden="true">◇</div>
          <strong>No secure conversations yet</strong>
          <p>
            Complete a trust-gated discovery flow and accept mutual consent to
            unlock encrypted messaging.
          </p>
        </div>
      )}

      <p className={styles.note}>
        Anonymous and pending businesses remain hidden until mutual acceptance.
      </p>
    </div>
  )
}
