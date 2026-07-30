import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ConnectionDiagram } from '../../components/ui/ConnectionDiagram'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { StatusPill } from '../../components/ui/StatusPill'
import { OTHER_PARTY_CONFIRM_DELAY_MS } from '../../data/constants'
import { MOCK_SUPPLIERS } from '../../data/constants'
import { usePrototype } from '../../context/prototype-context'
import styles from './DiscoveryConfirmPage.module.css'

type Phase = 'confirm' | 'waiting' | 'accepted' | 'declined'

export function DiscoveryConfirmPage() {
  const { supplierId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) ?? MOCK_SUPPLIERS[0]
  const simulateDecline = searchParams.get('outcome') === 'decline'
  const { simulatedOutcome } = usePrototype()
  const shouldDecline = simulateDecline || simulatedOutcome === 'decline'

  const [phase, setPhase] = useState<Phase>('confirm')

  useEffect(() => {
    if (phase !== 'waiting') return
    const timer = setTimeout(() => {
      setPhase(shouldDecline ? 'declined' : 'accepted')
    }, OTHER_PARTY_CONFIRM_DELAY_MS)
    return () => clearTimeout(timer)
  }, [phase, shouldDecline])

  if (phase === 'declined') {
    return (
      <div className="screen">
        <p className="screen-kicker screen-kicker--critical">Request declined</p>
        <h1 className="screen-title">Request Declined</h1>
        <div className={`card ${styles.diagramCard} ${styles['diagramCard--critical']}`}>
          <ConnectionDiagram state="declined" otherName={supplier.name} />
        </div>
        <div className={styles.actions}>
          <Button fullWidth onClick={() => navigate('/discovery/results')}>
            Try another Supplier
          </Button>
        </div>
      </div>
    )
  }

  if (phase === 'accepted') {
    return (
      <div className="screen">
        <p className="screen-kicker screen-kicker--trust">Mutual consent verified</p>
        <h1 className="screen-title">Connection Accepted</h1>
        <div className={`card ${styles.diagramCard} ${styles['diagramCard--trust']}`}>
          <ConnectionDiagram state="accepted" otherName={supplier.name} />
        </div>

        <div className={`card ${styles.revealCard}`}>
          <StatusPill tone="trust">Identity revealed</StatusPill>
          <RedactionBar revealed variant="photo" delay={0}>
            Photo revealed
          </RedactionBar>
          <RedactionBar revealed variant="name" delay={150}>
            {supplier.name}
          </RedactionBar>
          <RedactionBar revealed variant="line-long" delay={300} />
          <RedactionBar revealed variant="line-medium" delay={450} />
        </div>

        <div className={styles.actions}>
          <Button fullWidth onClick={() => navigate(`/discovery/revealed/${supplier.id}`)}>
            Message Supplier
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <p className="screen-kicker">Mutual consent</p>
      <h1 className="screen-title">Confirm Request</h1>
      <div className={`card ${styles.diagramCard}`}>
        <ConnectionDiagram state={phase === 'waiting' ? 'confirm-you' : 'pending'} otherName={supplier.name} />
      </div>

      {phase === 'waiting' && (
        <div className={styles.waitingBanner} role="status">
          <StatusPill tone="signal">Pending</StatusPill>
          <p>You — Confirmed · Other business — Pending</p>
        </div>
      )}

      <div className={styles.actions}>
        {phase === 'confirm' && (
          <>
            <Button fullWidth onClick={() => setPhase('waiting')}>
              Send Request
            </Button>
            <Button variant="secondary" fullWidth onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
