import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ConnectionDiagram } from '../../components/ui/ConnectionDiagram'
import { MESH_ITEMS } from '../../data/constants'

type Phase = 'confirm' | 'waiting' | 'accepted' | 'declined'

export function MeshConfirmPage() {
  const { itemId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const item = MESH_ITEMS.find((i) => i.id === itemId) ?? MESH_ITEMS[0]
  const simulateDecline = searchParams.get('outcome') === 'decline'

  const [phase, setPhase] = useState<Phase>('confirm')

  useEffect(() => {
    if (phase !== 'waiting') return
    const timer = setTimeout(() => {
      setPhase(simulateDecline ? 'declined' : 'accepted')
    }, 1800)
    return () => clearTimeout(timer)
  }, [phase, simulateDecline])

  if (phase === 'declined') {
    return (
      <div className="screen">
        <h1 className="screen-title">Request Declined</h1>
        <ConnectionDiagram
          state="declined"
          message="The business declined to start an exchange."
        />
        <div style={{ marginTop: 'auto' }}>
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
        <h1 className="screen-title">Request Accepted</h1>
        <ConnectionDiagram state="accepted" otherName={item.business} />
        <div style={{ marginTop: 'auto' }}>
          <Button fullWidth onClick={() => navigate(`/mesh/logistics/${item.id}`)}>
            Arrange Logistics
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Confirm Request</h1>
      <ConnectionDiagram state={phase === 'waiting' ? 'confirm-you' : 'pending'} />

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
