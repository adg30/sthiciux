import { useNavigate } from 'react-router-dom'
import { RedactionBar } from '../../components/ui/RedactionBar'
import { MOCK_SUPPLIERS } from '../../data/constants'
import styles from './DiscoveryResultsPage.module.css'

export function DiscoveryResultsPage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <h1 className="screen-title">Search Results</h1>

      <ul className={styles.list}>
        {MOCK_SUPPLIERS.map((supplier) => (
          <li key={supplier.id}>
            <button
              type="button"
              className={styles.item}
              onClick={() => navigate(`/discovery/supplier/${supplier.id}`)}
            >
              <div className={styles.thumb} aria-hidden="true" />
              <div className={styles.info}>
                <RedactionBar revealed={false} variant="line-medium" />
                <span className={styles.meta}>{supplier.category} · {supplier.distance}</span>
              </div>
              <span className={styles.chevron} aria-hidden="true">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
