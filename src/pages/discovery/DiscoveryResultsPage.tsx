import { useNavigate } from 'react-router-dom'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { StatusPill } from '../../components/ui/StatusPill'
import { MOCK_SUPPLIERS } from '../../data/constants'
import styles from './DiscoveryResultsPage.module.css'

export function DiscoveryResultsPage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <p className="screen-kicker">Protected results</p>
      <h1 className="screen-title">Search Results</h1>
      <p className="screen-lead">
        Supplier identities remain obscured until you pass the access gate and both
        parties consent.
      </p>

      <ul className={styles.list}>
        {MOCK_SUPPLIERS.map((supplier) => (
          <li key={supplier.id}>
            <button
              type="button"
              className={styles.item}
              onClick={() => navigate(`/discovery/supplier/${supplier.id}`)}
            >
              <div className={styles.thumb} aria-hidden="true">
                <span>{supplier.nodeCode}</span>
              </div>
              <div className={styles.info}>
                <div className={styles.infoTop}>
                  <RedactionBar revealed={false} variant="line-medium" />
                  <StatusPill
                    tone={supplier.trustState === 'gated' ? 'scarcity' : 'trust'}
                  >
                    {supplier.trustState === 'gated' ? 'Gated' : 'Available'}
                  </StatusPill>
                </div>
                <span className={styles.meta}>
                  {supplier.category} · {supplier.distance}
                </span>
                <div className={styles.signals}>
                  <span className={styles.nodeCode}>{supplier.nodeCode}</span>
                  <span className={styles.confidence}>{supplier.matchConfidence}</span>
                </div>
              </div>
              <span className={styles.chevron} aria-hidden="true">
                ›
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
