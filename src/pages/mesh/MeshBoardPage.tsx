import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FlowContext } from '../../components/demo/FlowContext'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
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
  const [activeId, setActiveId] = useState<string | null>(null)
  const connectedCount = MESH_ITEMS.filter((item) => item.relationship === 'connected').length
  const pendingCount = MESH_ITEMS.filter((item) => item.relationship === 'pending').length
  const anonymousCount = MESH_ITEMS.filter((item) => item.relationship === 'anonymous').length

  return (
    <div className="screen">
      <h1 className="screen-title">Barangay Supply Mesh</h1>
      <FlowContext label="Consent-based exchange">
        Businesses connect anonymously and reveal identity only through mutual
        acceptance.
      </FlowContext>

      <section className={`card ${styles.stateCard}`} aria-labelledby="mesh-relationship-states">
        <div className={styles.stateHeader}>
          <div>
            <span className={styles.kicker}>Relationship states</span>
            <h2 id="mesh-relationship-states">Read each supplier post by its consent state</h2>
          </div>
          <StatusPill tone="signal">Map + list paired</StatusPill>
        </div>
        <div className={styles.stateGrid}>
          <div className={styles.stateItem}>
            <StatusPill tone="trust">Connected</StatusPill>
            <p>{connectedCount} active post uses an existing connection, so identity is already shared.</p>
          </div>
          <div className={styles.stateItem}>
            <StatusPill tone="scarcity">Pending</StatusPill>
            <p>{pendingCount} post is awaiting mutual confirmation before identity unlock can continue.</p>
          </div>
          <div className={styles.stateItem}>
            <StatusPill tone="ink">Anonymous</StatusPill>
            <p>{anonymousCount} posts keep inventory visible while identity stays hidden until both sides agree.</p>
          </div>
        </div>
      </section>

      <div className={`card ${styles.network}`}>
        <div className={styles.networkHeader}>
          <div><strong>Active Mesh</strong><span>{MESH_ITEMS.length} supply posts nearby</span></div>
          <span className={styles.live}>Live</span>
        </div>
        <p className={styles.networkLead}>
          Tap a node on the map or its matching list row below to inspect the same
          supplier state without exposing hidden identities.
        </p>
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
              className={`${styles.node} ${styles[`node--${item.relationship}`]} ${activeId === item.id ? styles['node--active'] : ''}`}
              style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%` }}
              onClick={() => navigate(`/mesh/item/${item.id}`)}
              onPointerEnter={() => setActiveId(item.id)}
              onPointerLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId(null)}
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
        {MESH_ITEMS.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className={`${styles.item} ${styles[`item--${item.relationship}`]} ${activeId === item.id ? styles['item--active'] : ''}`}
              onClick={() => navigate(`/mesh/item/${item.id}`)}
              onPointerEnter={() => setActiveId(item.id)}
              onPointerLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId(null)}
            >
              <span className={`${styles.itemNumber} ${styles[`itemNumber--${item.relationship}`]}`} aria-hidden="true">
                {index + 1}
              </span>
              <div className={`${styles.thumb} ${item.relationship === 'connected' ? styles['thumb--connected'] : ''}`} aria-hidden="true">
                {item.relationship === 'connected' ? item.business.charAt(0) : 'Hidden'}
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.meta}>
                  {item.distance} · {item.barangay}
                </span>
                <span className={`${styles.relationship} ${styles[`relationship--${item.relationship}`]}`}>
                  {item.relationship === 'connected'
                    ? `Connected state · ${item.business}`
                    : item.relationship === 'pending'
                      ? 'Pending state · Awaiting mutual confirmation'
                      : 'Anonymous state · Identity hidden'}
                </span>
                <span className={styles.fulfillmentNote}>{item.fulfillmentNote}</span>
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
