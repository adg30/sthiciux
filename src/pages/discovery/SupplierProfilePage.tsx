import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { StatusPill } from '../../components/ui/StatusPill'
import { isSupplierAccessible, MOCK_SUPPLIERS } from '../../data/constants'
import { usePrototype } from '../../context/prototype-context'
import styles from './SupplierProfilePage.module.css'

export function SupplierProfilePage() {
  const { supplierId } = useParams()
  const navigate = useNavigate()
  const { vouchScore } = usePrototype()
  const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) ?? MOCK_SUPPLIERS[0]
  const accessible = isSupplierAccessible(supplier, vouchScore)

  return (
    <div className="screen">
      <p className={`screen-kicker ${accessible ? 'screen-kicker--trust' : 'screen-kicker--caution'}`}>
        {accessible ? 'Access path open' : 'Identity protected'}
      </p>
      <h1 className="screen-title">Supplier Profile</h1>

      <div className={styles.hero}>
        <RedactionBar revealed={false} variant="photo" label="Blocked Photo">
          Blocked Photo
        </RedactionBar>
        <div className={styles.heroOverlay}>
          <StatusPill tone={accessible ? 'trust' : 'scarcity'}>
            {accessible ? 'Accessible now' : 'Trust gate required'}
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
        <strong>{accessible ? 'Ready for access gate' : 'Higher trust needed'}</strong>
        <p>
          {accessible
            ? 'Your Vouch Score meets this supplier’s requirement. Identity still stays hidden until mutual consent.'
            : `This path needs a Vouch Score of ${supplier.requiredScore}+. Your current score is ${vouchScore}.`}
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
