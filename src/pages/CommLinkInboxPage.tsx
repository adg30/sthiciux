import { useNavigate } from 'react-router-dom'
import { COMM_CONTACTS } from '../data/constants'
import styles from './CommLinkInboxPage.module.css'

export function CommLinkInboxPage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <h1 className="screen-title">Encrypted Comm-Link</h1>
      <div className={styles.security}>
        <span aria-hidden="true">◇</span>
        <div><strong>Secure connections</strong><p>Only mutually revealed businesses appear here.</p></div>
      </div>
      <ul className={styles.list}>
        {COMM_CONTACTS.map((contact, index) => (
          <li key={contact.id}>
            <button type="button" onClick={() => navigate(`/comm-link/${contact.id}`)}>
              <span className={styles.avatar}>{contact.name.charAt(0)}</span>
              <span className={styles.content}>
                <strong>{contact.name}</strong>
                <span>{contact.detail}</span>
                <small>{index === 0 ? 'New encrypted session available' : contact.source}</small>
              </span>
              <span className={styles.status}><i /> Secure</span>
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.note}>Anonymous and pending businesses remain hidden until mutual acceptance.</p>
    </div>
  )
}
