import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { MESH_ITEMS } from '../../data/constants'
import styles from './MeshBoardPage.module.css'

interface NodePosition { x: number; y: number }

function getNodePositions(count: number): NodePosition[] {
  if (count === 1) return [{ x: 50, y: 50 }]
  if (count === 2) return [{ x: 30, y: 50 }, { x: 70, y: 50 }]
  if (count === 3) return [{ x: 50, y: 19 }, { x: 22, y: 72 }, { x: 78, y: 72 }]
  if (count === 4) return [
    { x: 50, y: 14 }, { x: 84, y: 50 }, { x: 50, y: 86 }, { x: 16, y: 50 },
  ]

  return Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / count
    return { x: 50 + Math.cos(angle) * 36, y: 50 + Math.sin(angle) * 36 }
  })
}

export function MeshBoardPage() {
  const navigate = useNavigate()
  const positions = getNodePositions(MESH_ITEMS.length)

  return (
    <div className="screen">
      <h1 className="screen-title">Barangay Supply Mesh</h1>

      <div className={`card ${styles.network}`}>
        <div className={styles.networkHeader}>
          <div><strong>Active Mesh</strong><span>{MESH_ITEMS.length} supply posts nearby</span></div>
          <span className={styles.live}>Live</span>
        </div>
        <div className={styles.networkCanvas} aria-label={`${MESH_ITEMS.length} active Mesh posts`}>
          <svg viewBox="0 0 100 100" className={styles.networkSvg} aria-hidden="true">
            {positions.map((position, index) => {
              const next = positions[(index + 1) % positions.length]
              return <line key={`edge-${MESH_ITEMS[index].id}`} x1={position.x} y1={position.y} x2={next.x} y2={next.y} />
            })}
            {positions.map((position, index) => (
              <line key={`hub-${MESH_ITEMS[index].id}`} x1="50" y1="50" x2={position.x} y2={position.y} />
            ))}
            <circle cx="50" cy="50" r="3" className={styles.hub} />
          </svg>
          {MESH_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.node} ${styles[`node--${item.relationship}`]}`}
              style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%` }}
              onClick={() => navigate(`/mesh/item/${item.id}`)}
              aria-label={`${item.name}, ${item.relationship === 'connected' ? `connected with ${item.business}` : `${item.relationship} business`}`}
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
        <div className={styles.legend}>
          <span><i className={styles.connectedKey} /> Connected</span>
          <span><i className={styles.pendingKey} /> Pending</span>
          <span><i className={styles.hiddenKey} /> Anonymous</span>
        </div>
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
                <span className={styles.relationship}>
                  {item.relationship === 'connected'
                    ? `Connected · ${item.business}`
                    : item.relationship === 'pending'
                      ? 'Connection pending'
                      : 'Anonymous business'}
                </span>
              </div>
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 'auto' }}>
        <Button variant="dashed" fullWidth onClick={() => navigate('/mesh/post-need')}>
          Post a need
        </Button>
      </div>
    </div>
  )
}
