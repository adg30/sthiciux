import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { VOUCH_ACTIONS } from '../data/constants'

export function VouchActionDetailPage() {
  const { actionId } = useParams()
  const navigate = useNavigate()
  const action = VOUCH_ACTIONS.find((a) => a.id === actionId)

  if (!action) {
    return (
      <div className="screen">
        <p>Action not found.</p>
        <Button onClick={() => navigate('/vouch-actions')}>Back to list</Button>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">{action.title}</h1>
      <div className="card">
        <p style={{ margin: 0, lineHeight: 1.5 }}>{action.description}</p>
        <p style={{ margin: '16px 0 0', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          Complete this action to earn trust points toward your Vouch Score. This is a prototype
          simulation — no backend verification is required.
        </p>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Button fullWidth onClick={() => navigate('/vouch-actions')}>
          Mark as started
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('/vouch-actions')} style={{ marginTop: 8 }}>
          Back to list
        </Button>
      </div>
    </div>
  )
}
