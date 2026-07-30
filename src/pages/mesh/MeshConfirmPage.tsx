import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ConnectionDiagram } from '../../components/ui/ConnectionDiagram'
import { StatusPill } from '../../components/ui/StatusPill'
import { MESH_ITEMS } from '../../data/constants'
import { usePrototype } from '../../context/prototype-context'
import styles from './MeshConfirmPage.module.css'

type Phase = 'confirm' | 'waiting' | 'accepted' | 'declined'

export function MeshConfirmPage() {
  const { itemId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const item = MESH_ITEMS.find((i) => i.id === itemId) ?? MESH_ITEMS[0]
  const simulateDecline = searchParams.get('outcome') === 'decline'
  const { simulatedOutcome } = usePrototype()
  const shouldDecline = simulateDecline || simulatedOutcome === 'decline'

  const [phase, setPhase] = useState<Phase>('confirm')

  useEffect(() => {
    if (phase !== 'waiting') return
    const timer = setTimeout(() => {
      setPhase(shouldDecline ? 'declined' : 'accepted')
    }, 1800)
    return () => clearTimeout(timer)
  }, [phase, shouldDecline])

  if (phase === 'declined') {
    return (
      <div className="screen">
        <p className="screen-kicker screen-kicker--critical">Request declined</p>
        <h1 className="screen-title">Exchange not started</h1>
        <ConnectionDiagram state="declined" message="The business declined to start an exchange." />
        <div className={styles.footer}>
          <Button fullWidth onClick={() => navigate('/mesh')}>
            Back to mesh board
          </Button>
        </div>
      </div>
    )
  }

  if (phase === 'accepted') {
    return (
      <div className="screen">
        <p className="screen-kicker screen-kicker--trust">Request accepted</p>
        <h1 className="screen-title">New connection forming</h1>
        <ConnectionDiagram state="accepted" otherName={item.business} />
        <div className={`card ${styles.summary}`}>
          <StatusPill tone="trust">Accepted</StatusPill>
          <p>
            {item.shortLabel} · {item.quantity} · {item.exchangeType}
          </p>
        </div>
        <div className={styles.footer}>
          <Button fullWidth onClick={() => navigate(`/mesh/logistics/${item.id}`)}>
            Arrange logistics
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <p className="screen-kicker">Anonymous request</p>
      <h1 className="screen-title">Confirm request</h1>
      <ConnectionDiagram state={phase === 'waiting' ? 'confirm-you' : 'pending'} />

      <div className={`card ${styles.itemCard}`}>
        <dl className={styles.itemDetails}>
          <div>
            <dt>Item</dt>
            <dd>{item.name}</dd>
          </div>
          <div>
            <dt>Quantity</dt>
            <dd>{item.quantity}</dd>
          </div>
          <div>
            <dt>Needed by</dt>
            <dd>{item.neededBy}</dd>
          </div>
          <div>
            <dt>Exchange</dt>
            <dd>{item.exchangeType}</dd>
          </div>
        </dl>
      </div>

      {phase === 'waiting' && (
        <p className={styles.waitingNote}>
          <StatusPill tone="scarcity">Pending</StatusPill>
          You — confirmed · Other business — pending
        </p>
      )}

      <div className={styles.footer}>
        {phase === 'confirm' && (
          <>
            <Button fullWidth onClick={() => setPhase('waiting')}>
              Send request
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
