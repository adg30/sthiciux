import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { usePrototype } from '../../context/PrototypeContext'
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
        <h1 className="screen-title">Vouch Submitted</h1>
        <div className="card">
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            Your voluntary vouch for {item.business} has been recorded. Vouches are initiated by
            endorsers — they cannot be formally requested.
          </p>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Button fullWidth onClick={() => navigate('/')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Optional Vouch</h1>

      <p className={styles.question}>Vouch for this business?</p>
      <p className={styles.note}>
        This is voluntary and initiated by you. The other business did not request this vouch.
      </p>

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

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
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
