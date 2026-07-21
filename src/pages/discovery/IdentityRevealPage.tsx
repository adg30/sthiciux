import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { MOCK_SUPPLIERS } from '../../data/constants'

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
      <h1 className="screen-title">Supplier Profile</h1>

      <RedactionBar revealed={revealed} variant="photo" delay={0}>
        Revealed Photo
      </RedactionBar>

      <div className="card">
        <RedactionBar revealed={revealed} variant="name" delay={150}>
          {supplier.name}
        </RedactionBar>
        <RedactionBar revealed={revealed} variant="line-long" delay={300}>
          Verified supplier in your barangay network
        </RedactionBar>
        <RedactionBar revealed={revealed} variant="line-medium" delay={450}>
          {supplier.category} · {supplier.distance}
        </RedactionBar>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button fullWidth onClick={() => alert('Messaging prototype — connection established.')}>
          Message Supplier
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}
