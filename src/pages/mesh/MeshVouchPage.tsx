import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { usePrototype } from '../../context/prototype-context'
import { MESH_ITEMS } from '../../data/constants'
import styles from './MeshVouchPage.module.css'

export function MeshVouchPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const { setVouchSubmitted } = usePrototype()
  const item = MESH_ITEMS.find((i) => i.id === itemId) ?? MESH_ITEMS[0]
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setVouchSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="screen">
        <p className="screen-kicker screen-kicker--trust">Vouch recorded</p>
        <h1 className="screen-title">Vouch submitted</h1>
        <div className="card">
          <StatusPill tone="trust">Voluntary</StatusPill>
          <p className={styles.successText}>
            Your voluntary vouch for {item.business} has been recorded. Vouches are initiated by
            endorsers — they cannot be formally requested.
          </p>
        </div>
        <div className={styles.footer}>
          <Button fullWidth onClick={() => navigate('/')}>
            Return to dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <p className="screen-kicker">First verified exchange</p>
      <h1 className="screen-title">Optional vouch</h1>

      <div className={`card ${styles.context}`}>
        <StatusPill tone="trust">New connection</StatusPill>
        <p className={styles.question}>Vouch for {item.business}?</p>
        <p className={styles.note}>
          This optional step appears after your first verified exchange with a newly connected
          business. Existing connections like Aling Rosa skip vouch and use Comm-Link instead.
        </p>
      </div>

      <label className="sr-only" htmlFor="vouch-text">
        Write your vouch
      </label>
      <textarea
        id="vouch-text"
        className={styles.textarea}
        placeholder="Write your endorsement…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
      />

      <div className={styles.footer}>
        <Button fullWidth onClick={handleSubmit} disabled={!text.trim()}>
          Submit vouch
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('/')}>
          Skip
        </Button>
      </div>
    </div>
  )
}
