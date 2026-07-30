import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { SignalTip } from '../../components/ui/SignalTip'
import { usePrototype } from '../../context/prototype-context'
import { MESH_ITEMS } from '../../data/constants'
import styles from './MeshBoardPage.module.css'

interface NodePosition {
  x: number
  y: number
}

function getNodePositions(count: number): NodePosition[] {
  if (count === 0) return []
  if (count === 1) return [{ x: 50, y: 22 }]
  if (count === 2) {
    return [
      { x: 30, y: 22 },
      { x: 70, y: 22 },
    ]
  }
  if (count === 3) {
    return [
      { x: 50, y: 16 },
      { x: 22, y: 72 },
      { x: 78, y: 72 },
    ]
  }
  if (count === 4) {
    return [
      { x: 50, y: 14 },
      { x: 84, y: 50 },
      { x: 50, y: 86 },
      { x: 16, y: 50 },
    ]
  }

  return Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / count
    return { x: 50 + Math.cos(angle) * 36, y: 50 + Math.sin(angle) * 36 }
  })
}

export function MeshBoardPage() {
  const navigate = useNavigate()
  const { meshPostCount } = usePrototype()
  const visibleItems = useMemo(
    () => MESH_ITEMS.slice(0, meshPostCount),
    [meshPostCount],
  )
  const positions = getNodePositions(visibleItems.length)
  const [activeId, setActiveId] = useState<string | null>(null)
  const isEmpty = visibleItems.length === 0
  const connectedCount = visibleItems.filter((item) => item.relationship === 'connected').length

  return (
    <div className="screen">
      <p className="screen-kicker screen-kicker--trust">
        {isEmpty
          ? 'No live posts'
          : `${visibleItems.length} live posts · ${connectedCount} connection`}
      </p>
      <h1 className="screen-title">Barangay Supply Mesh</h1>

      <SignalTip label="Paano basahin ang nodes?">
        <p>
          Teal = already connected. Amber = pending. Dim = anonymous until both sides agree.
        </p>
      </SignalTip>

      <div className={`card ${styles.network}`}>
        <div
          className={styles.networkCanvas}
          aria-label={isEmpty ? 'Empty mesh board' : `${visibleItems.length} active Mesh posts`}
        >
          <svg viewBox="0 0 100 100" className={styles.networkSvg} aria-hidden="true">
            {!isEmpty &&
              positions.map((position, index) => (
                <line
                  key={`hub-${visibleItems[index].id}`}
                  x1="50"
                  y1="50"
                  x2={position.x}
                  y2={position.y}
                />
              ))}
            <circle cx="50" cy="50" r="4.5" className={styles.hub} />
          </svg>
          <span className={styles.youNode} aria-hidden="true">
            YOU
          </span>
          {!isEmpty &&
            visibleItems.map((item, index) => (
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
                aria-label={`${item.shortLabel}, ${item.relationship === 'connected' ? `connected with ${item.business}` : `${item.relationship} business`}`}
              >
                <span>{item.shortLabel}</span>
              </button>
            ))}
        </div>
        {!isEmpty && (
          <div className={styles.legend}>
            <span>
              <i className={styles.connectedKey} /> Connected
            </span>
            <span>
              <i className={styles.pendingKey} /> Pending
            </span>
            <span>
              <i className={styles.hiddenKey} /> Anonymous
            </span>
          </div>
        )}
      </div>

      {isEmpty ? (
        <p className={styles.emptyCopy}>The mesh is quiet. Post a need to start.</p>
      ) : (
        <ul className={styles.list}>
          {visibleItems.map((item) => (
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
                <div className={styles.info}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={`${styles.relationship} ${styles[`relationship--${item.relationship}`]}`}>
                    {item.relationship === 'connected'
                      ? item.business
                      : item.relationship === 'pending'
                        ? 'Pending'
                        : 'Anonymous'}
                  </span>
                </div>
                <span className={styles.plus} aria-hidden="true">
                  ›
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 'auto' }}>
        <Button fullWidth onClick={() => navigate('/mesh/post-need')}>
          Post a need or offer
        </Button>
      </div>
    </div>
  )
}
