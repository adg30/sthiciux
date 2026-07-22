import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { MESH_ITEMS } from '../../data/constants'
import styles from './MeshListingPage.module.css'

export function MeshListingPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const item = MESH_ITEMS.find((i) => i.id === itemId) ?? MESH_ITEMS[0]
  const isConnected = item.relationship === 'connected'
  const isPending = item.relationship === 'pending'

  return (
    <div className="screen">
      <h1 className="screen-title">{item.name}</h1>

      <div className={`card ${styles.listing}`}>
        <div className={styles.hero} aria-hidden="true">
          {isConnected && <span>{item.business.charAt(0)}</span>}
        </div>
        <div className={styles.content}>
          <span className={`${styles.badge} ${styles[`badge--${item.relationship}`]}`}>
            {isConnected ? 'Existing connection' : isPending ? 'Connection pending' : 'Anonymous post'}
          </span>
          <RedactionBar revealed={isConnected} variant="name">{item.business}</RedactionBar>
          <RedactionBar revealed={isConnected} variant="line-long">
            Verified business in your barangay network
          </RedactionBar>
          <p style={{ margin: '12px 0 4px', fontSize: '0.8125rem' }}>Distance: {item.distance}</p>
          <p className={styles.identity}>
            Identity: {isConnected ? 'Revealed through existing connection' : 'Hidden until mutual acceptance'}
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        {isConnected ? (
          <>
            <Button fullWidth onClick={() => navigate(`/mesh/logistics/${item.id}?existing=1`)}>
              Arrange Exchange
            </Button>
            <Button variant="secondary" fullWidth onClick={() => navigate(`/comm-link/${item.businessId}`)}>
              Open Comm-Link
            </Button>
          </>
        ) : isPending ? (
          <>
            <Button fullWidth disabled>Request Pending</Button>
            <Button variant="secondary" fullWidth onClick={() => navigate('/mesh')}>Back to Mesh</Button>
          </>
        ) : (
          <Button fullWidth onClick={() => navigate(`/mesh/confirm/${item.id}`)}>
            Request Exchange
          </Button>
        )}
      </div>
    </div>
  )
}
