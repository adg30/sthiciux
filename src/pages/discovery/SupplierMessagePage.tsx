import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { COMM_CONTACTS } from '../../data/constants'
import styles from './SupplierMessagePage.module.css'

interface CommMessage {
  id: number
  author: 'system' | 'supplier' | 'you'
  text: string
  time: string
}

const INITIAL_MESSAGES: CommMessage[] = [
  {
    id: 1,
    author: 'system',
    text: 'Mutual consent verified. Identity keys exchanged for this session.',
    time: '14:02',
  },
  {
    id: 2,
    author: 'supplier',
    text: 'Hello. We received your access request. How much cooking oil does your business need?',
    time: '14:03',
  },
]

export function SupplierMessagePage() {
  const { supplierId, contactId } = useParams()
  const activeContactId = contactId ?? supplierId
  const supplier = COMM_CONTACTS.find((candidate) => candidate.id === activeContactId) ?? COMM_CONTACTS[0]
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<CommMessage[]>(INITIAL_MESSAGES)
  const [awaitingReply, setAwaitingReply] = useState(false)

  useEffect(() => {
    if (!awaitingReply) return
    const timer = setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          author: 'supplier',
          text: 'Available. We can reserve the requested amount until tomorrow at 3:00 PM. Shall we confirm pickup?',
          time: 'Now',
        },
      ])
      setAwaitingReply(false)
    }, 900)
    return () => clearTimeout(timer)
  }, [awaitingReply])

  const sendMessage = () => {
    const text = draft.trim()
    if (!text || awaitingReply) return
    setMessages((current) => [
      ...current,
      { id: Date.now(), author: 'you', text, time: 'Now' },
    ])
    setDraft('')
    setAwaitingReply(true)
  }

  return (
    <div className={`screen ${styles.commLink}`}>
      <header className={styles.commHeader}>
        <div className={styles.identity}>
          <div className={styles.avatar} aria-hidden="true">{supplier.name.charAt(0)}</div>
          <div>
            <h1>{supplier.name}</h1>
            <p>Verified barangay supplier</p>
          </div>
        </div>
        <span className={styles.encrypted}><i aria-hidden="true" /> Encrypted</span>
      </header>

      <div className={styles.securityNotice} role="status">
        <span aria-hidden="true">◇</span>
        <div>
          <strong>Encrypted Comm-Link</strong>
          <p>Messages use temporary session keys and disappear when this prototype session ends.</p>
        </div>
      </div>

      <div className={styles.thread} aria-live="polite" aria-label="Conversation">
        {messages.map((message) => (
          message.author === 'system' ? (
            <div key={message.id} className={styles.systemMessage}>{message.text}</div>
          ) : (
            <article
              key={message.id}
              className={`${styles.message} ${message.author === 'you' ? styles.outgoing : styles.incoming}`}
            >
              <p>{message.text}</p>
              <time>{message.author === 'you' ? 'You' : supplier.name} · {message.time}</time>
            </article>
          )
        ))}
        {awaitingReply && <div className={styles.typing}>{supplier.name} is transmitting…</div>}
      </div>

      <div className={styles.quickReplies} aria-label="Suggested replies">
        {['20 liters', 'Confirm pickup', 'Share logistics'].map((reply) => (
          <button key={reply} type="button" onClick={() => setDraft(reply)}>{reply}</button>
        ))}
      </div>

      <div className={styles.composer}>
        <label className="sr-only" htmlFor="comm-message">Encrypted message</label>
        <textarea
          id="comm-message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              sendMessage()
            }
          }}
          placeholder="Transmit an encrypted message…"
          rows={2}
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={!draft.trim() || awaitingReply}
          aria-label="Send encrypted message"
        >
          Send
        </button>
      </div>
    </div>
  )
}
