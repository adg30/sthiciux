import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { StatusPill } from '../../components/ui/StatusPill'
import { MESH_ITEMS } from '../../data/constants'
import styles from './MeshListingPage.module.css'

export function MeshListingPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const item = MESH_ITEMS.find((i) => i.id === itemId) ?? MESH_ITEMS[0]
  const isConnected = item.relationship === 'connected'
  const isPending = item.relationship === 'pending'
  const isAnonymous = item.relationship === 'anonymous'

  return (
    <div className="screen">
      <p className={`screen-kicker ${isConnected ? 'screen-kicker--trust' : isPending ? 'screen-kicker--caution' : ''}`}>
        Mesh listing
      </p>
      <h1 className="screen-title">{item.name}</h1>

      <div className={`card ${styles.listing}`}>
        <div className={`${styles.hero} ${styles[`hero--${item.relationship}`]}`} aria-hidden="true">
          {isConnected && <span>{item.business.charAt(0)}</span>}
          {!isConnected && <span className={styles.heroHidden}>Hidden</span>}
        </div>
        <div className={styles.content}>
          <StatusPill tone={isConnected ? 'trust' : isPending ? 'scarcity' : 'ink'}>
            {isConnected ? 'Connected' : isPending ? 'Pending' : 'Anonymous'}
          </StatusPill>
          {isConnected ? (
            <p className={styles.businessName}>{item.business}</p>
          ) : (
            <RedactionBar revealed={false} variant="name">
              {item.business}
            </RedactionBar>
          )}
          <dl className={styles.details}>
            <div>
              <dt>Quantity</dt>
              <dd>{item.quantity}</dd>
            </div>
            <div>
              <dt>Needed by</dt>
              <dd>{item.neededBy}</dd>
            </div>
            <div>
              <dt>Exchange type</dt>
              <dd>{item.exchangeType}</dd>
            </div>
            <div>
              <dt>Distance</dt>
              <dd>{item.distance}</dd>
            </div>
          </dl>
          <p className={styles.consent}>{item.consentSummary}</p>
          <p className={styles.identity}>
            {isConnected
              ? 'Identity revealed through existing connection — no anonymity barrier.'
              : isPending
                ? 'Identity protected while mutual confirmation is in progress.'
                : 'Identity hidden until both parties accept the exchange request.'}
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        {isConnected ? (
          <>
            <Button fullWidth onClick={() => navigate(`/mesh/logistics/${item.id}?existing=1`)}>
              Arrange exchange
            </Button>
            <Button variant="secondary" fullWidth onClick={() => navigate(`/comm-link/${item.businessId}`)}>
              Open Comm-Link
            </Button>
          </>
        ) : isPending ? (
          <>
            <Button fullWidth disabled>
              Request pending
            </Button>
            <Button variant="secondary" fullWidth onClick={() => navigate('/mesh')}>
              Back to mesh
            </Button>
          </>
        ) : (
          <Button fullWidth onClick={() => navigate(`/mesh/confirm/${item.id}`)}>
            Request exchange
          </Button>
        )}
        {isAnonymous && (
          <p className={styles.anonNote}>
            First verified exchange with this business may offer an optional vouch afterward — never
            for existing connections.
          </p>
        )}
      </div>
    </div>
  )
}
