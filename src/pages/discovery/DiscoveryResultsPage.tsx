import { useNavigate } from 'react-router-dom'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { StatusPill } from '../../components/ui/StatusPill'
import { isSupplierAccessible, MOCK_SUPPLIERS } from '../../data/constants'
import { usePrototype } from '../../context/prototype-context'
import styles from './DiscoveryResultsPage.module.css'

export function DiscoveryResultsPage() {
  const navigate = useNavigate()
  const { vouchScore } = usePrototype()

  return (
    <div className="screen">
      <p className="screen-kicker">Protected results</p>
      <h1 className="screen-title">Search Results</h1>
      <p className="screen-lead">
        Supplier identities remain obscured until you pass the access gate and both
        parties consent.
      </p>

      <ul className={styles.list}>
        {MOCK_SUPPLIERS.map((supplier) => {
          const accessible = isSupplierAccessible(supplier, vouchScore)

          return (
            <li key={supplier.id}>
              <button
                type="button"
                className={styles.item}
                onClick={() => navigate(`/discovery/supplier/${supplier.id}`)}
              >
                <div
                  className={`${styles.thumb} ${accessible ? styles['thumb--available'] : styles['thumb--gated']}`}
                  aria-hidden="true"
                >
                  <span className={styles.thumbDot} />
                  <span>{supplier.nodeCode}</span>
                </div>
                <div className={styles.info}>
                  <div className={styles.infoTop}>
                    <RedactionBar revealed={false} variant="line-medium" />
                    <StatusPill tone={accessible ? 'trust' : 'scarcity'}>
                      {accessible ? 'Available' : 'Gated'}
                    </StatusPill>
                  </div>
                  <span className={styles.meta}>
                    {supplier.category} · {supplier.distance}
                    {!accessible ? ` · needs ${supplier.requiredScore}+` : ''}
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
          )
        })}
      </ul>
    </div>
  )
}
