import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { StatusPill } from '../../components/ui/StatusPill'
import { MOCK_SUPPLIERS } from '../../data/constants'
import styles from './SupplierProfilePage.module.css'

export function SupplierProfilePage() {
  const { supplierId } = useParams()
  const navigate = useNavigate()
  const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) ?? MOCK_SUPPLIERS[0]

  return (
    <div className="screen">
      <p className="screen-kicker screen-kicker--caution">Identity protected</p>
      <h1 className="screen-title">Supplier Profile</h1>

      <div className={styles.hero}>
        <RedactionBar revealed={false} variant="photo" label="Blocked Photo">
          Blocked Photo
        </RedactionBar>
        <div className={styles.heroOverlay}>
          <StatusPill tone={supplier.trustState === 'gated' ? 'scarcity' : 'trust'}>
            {supplier.trustState === 'gated' ? 'Trust gate required' : 'Accessible now'}
          </StatusPill>
          <span className={styles.nodeBadge}>{supplier.nodeCode}</span>
        </div>
      </div>

      <div className={`card ${styles.profileCard}`}>
        <RedactionBar revealed={false} variant="name" />
        <RedactionBar revealed={false} variant="line-long" />
        <RedactionBar revealed={false} variant="line-medium" />
        <RedactionBar revealed={false} variant="line-short" />
        <div className={styles.metaRow}>
          <span>{supplier.category}</span>
          <span aria-hidden="true">·</span>
          <span>{supplier.distance}</span>
          <span aria-hidden="true">·</span>
          <span className={styles.confidence}>{supplier.matchConfidence}</span>
        </div>
        <p className={styles.availability}>{supplier.availabilityNote}</p>
      </div>

      <div className={`card ${styles.gateHint}`}>
        <strong>Access gate ahead</strong>
        <p>
          Your Vouch Score determines whether you can unlock this supplier path.
          Identity stays hidden until mutual consent.
        </p>
      </div>

      <div className={styles.actions}>
        <Button fullWidth onClick={() => navigate(`/discovery/gate/${supplier.id}`)}>
          Request Access
        </Button>
      </div>
    </div>
  )
}
