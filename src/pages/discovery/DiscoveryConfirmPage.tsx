import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ConnectionDiagram } from '../../components/ui/ConnectionDiagram'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { OTHER_PARTY_CONFIRM_DELAY_MS } from '../../data/constants'
import { MOCK_SUPPLIERS } from '../../data/constants'

type Phase = 'confirm' | 'waiting' | 'accepted' | 'declined'

export function DiscoveryConfirmPage() {
  const { supplierId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) ?? MOCK_SUPPLIERS[0]
  const simulateDecline = searchParams.get('outcome') === 'decline'

  const [phase, setPhase] = useState<Phase>('confirm')

  useEffect(() => {
    if (phase !== 'waiting') return
    const timer = setTimeout(() => {
      setPhase(simulateDecline ? 'declined' : 'accepted')
    }, OTHER_PARTY_CONFIRM_DELAY_MS)
    return () => clearTimeout(timer)
  }, [phase, simulateDecline])

  if (phase === 'declined') {
    return (
      <div className="screen">
        <h1 className="screen-title">Request Declined</h1>
        <ConnectionDiagram state="declined" otherName={supplier.name} />
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
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
        <h1 className="screen-title">Connection Accepted</h1>
        <ConnectionDiagram state="accepted" otherName={supplier.name} />

        <div className="card">
          <RedactionBar revealed variant="photo" delay={0}>
            Revealed Photo
          </RedactionBar>
          <RedactionBar revealed variant="name" delay={150}>
            {supplier.name}
          </RedactionBar>
          <RedactionBar revealed variant="line-long" delay={300} />
          <RedactionBar revealed variant="line-medium" delay={450} />
        </div>

        <div style={{ marginTop: 'auto' }}>
          <Button fullWidth onClick={() => navigate(`/discovery/revealed/${supplier.id}`)}>
            Message Supplier
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Confirm Request</h1>
      <ConnectionDiagram state={phase === 'waiting' ? 'confirm-you' : 'pending'} otherName={supplier.name} />

      {phase === 'waiting' && (
        <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          You — Confirmed · Other business — Pending
        </p>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
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
