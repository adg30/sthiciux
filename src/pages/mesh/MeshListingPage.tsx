import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { MESH_ITEMS } from '../../data/constants'

export function MeshListingPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const item = MESH_ITEMS.find((i) => i.id === itemId) ?? MESH_ITEMS[0]

  return (
    <div className="screen">
      <h1 className="screen-title">{item.name}</h1>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ height: 140, background: '#d0d0d0' }} aria-hidden="true" />
        <div style={{ padding: 16 }}>
          <RedactionBar revealed={false} variant="line-long" />
          <RedactionBar revealed={false} variant="line-medium" />
          <p style={{ margin: '12px 0 4px', fontSize: '0.8125rem' }}>Distance: {item.distance}</p>
          <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600 }}>Identity: Hidden</p>
          <RedactionBar revealed={false} variant="name" />
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Button fullWidth onClick={() => navigate(`/mesh/confirm/${item.id}`)}>
          Request Exchange
        </Button>
      </div>
    </div>
  )
}
