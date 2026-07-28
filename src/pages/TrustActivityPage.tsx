import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { usePrototype } from '../context/prototype-context'

export function TrustActivityPage() {
  const navigate = useNavigate()
  const { meshExchangeCompleted, prototypeSession, vouchSubmitted } = usePrototype()

  return (
    <div className="screen">
      <h1 className="screen-title">Trust Activity</h1>
      <div className="card">
        <p style={{ margin: '0 0 12px', fontWeight: 700 }}>Recent network activity</p>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, fontSize: '0.875rem' }}>
          <li>Barangay business location verified</li>
          <li>Scarcity signal available for verification</li>
          {prototypeSession.hasVerifiedScarcity && (
            <li>Scarcity signal {prototypeSession.verifiedScarcityId} verified this session</li>
          )}
          {meshExchangeCompleted && <li>Mesh exchange verified by both parties</li>}
          {vouchSubmitted && <li>Voluntary peer vouch submitted</li>}
        </ul>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Button fullWidth onClick={() => navigate('/vouch-actions')}>
          View Trust-Building Actions
        </Button>
      </div>
    </div>
  )
}
