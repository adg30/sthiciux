import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { MOCK_SUPPLIERS } from '../../data/constants'

export function SupplierProfilePage() {
  const { supplierId } = useParams()
  const navigate = useNavigate()
  const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) ?? MOCK_SUPPLIERS[0]

  return (
    <div className="screen">
      <h1 className="screen-title">Supplier Profile</h1>

      <RedactionBar revealed={false} variant="photo" label="Blocked Photo">
        Blocked Photo
      </RedactionBar>

      <div className="card">
        <RedactionBar revealed={false} variant="name" />
        <RedactionBar revealed={false} variant="line-long" />
        <RedactionBar revealed={false} variant="line-medium" />
        <RedactionBar revealed={false} variant="line-short" />
        <p style={{ margin: '12px 0 0', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          {supplier.category} · {supplier.distance}
        </p>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Button fullWidth onClick={() => navigate(`/discovery/gate/${supplier.id}`)}>
          Request Access
        </Button>
      </div>
    </div>
  )
}
