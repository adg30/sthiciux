import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { MESH_ITEMS } from '../../data/constants'
import styles from './MeshBoardPage.module.css'

export function MeshBoardPage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <h1 className="screen-title">Barangay Supply Mesh</h1>

      <div className={`card ${styles.network}`} aria-hidden="true">
        <svg viewBox="0 0 200 80" className={styles.networkSvg}>
          <circle cx="40" cy="40" r="8" fill="#111" />
          <circle cx="100" cy="20" r="8" fill="#111" />
          <circle cx="160" cy="40" r="8" fill="#111" />
          <circle cx="100" cy="60" r="8" fill="#111" />
          <line x1="40" y1="40" x2="100" y2="20" stroke="#111" strokeWidth="1.5" />
          <line x1="100" y1="20" x2="160" y2="40" stroke="#111" strokeWidth="1.5" />
          <line x1="40" y1="40" x2="100" y2="60" stroke="#111" strokeWidth="1.5" />
          <line x1="100" y1="60" x2="160" y2="40" stroke="#111" strokeWidth="1.5" />
        </svg>
      </div>

      <ul className={styles.list}>
        {MESH_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={styles.item}
              onClick={() => navigate(`/mesh/item/${item.id}`)}
            >
              <div className={styles.thumb} aria-hidden="true" />
              <div className={styles.info}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.meta}>{item.distance}</span>
              </div>
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 'auto' }}>
        <Button variant="dashed" fullWidth onClick={() => alert('Post a need — prototype placeholder.')}>
          Post a need
        </Button>
      </div>
    </div>
  )
}
