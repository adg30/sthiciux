import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { StatusPill } from '../../components/ui/StatusPill'
import { MOCK_SUPPLIERS } from '../../data/constants'
import styles from './IdentityRevealPage.module.css'

export function IdentityRevealPage() {
  const { supplierId } = useParams()
  const navigate = useNavigate()
  const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) ?? MOCK_SUPPLIERS[0]
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="screen">
      <p className="screen-kicker screen-kicker--trust">Identity revealed</p>
      <h1 className="screen-title">Supplier Profile</h1>

      <div className={styles.hero}>
        <RedactionBar revealed={revealed} variant="photo" delay={0}>
          Photo revealed
        </RedactionBar>
        <div className={styles.heroBadge}>
          <StatusPill tone="trust">Verified supplier</StatusPill>
        </div>
      </div>

      <div className={`card ${styles.profileCard}`}>
        <RedactionBar revealed={revealed} variant="name" delay={150}>
          {supplier.name}
        </RedactionBar>
        <RedactionBar revealed={revealed} variant="line-long" delay={300}>
          Verified supplier in your barangay network
        </RedactionBar>
        <RedactionBar revealed={revealed} variant="line-medium" delay={450}>
          {supplier.category} · {supplier.distance}
        </RedactionBar>
        <div className={styles.meta}>
          <span className={styles.nodeCode}>{supplier.nodeCode}</span>
          <span>{supplier.barangay}</span>
        </div>
      </div>

      <div className={`card ${styles.commHint}`}>
        <strong>Encrypted Comm-Link ready</strong>
        <p>Messages use session keys and stay private between verified businesses.</p>
      </div>

      <div className={styles.actions}>
        <Button fullWidth onClick={() => navigate(`/comm-link/${supplier.id}`)}>
          Message Supplier
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}
