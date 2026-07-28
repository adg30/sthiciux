import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FlowContext } from '../../components/demo/FlowContext'
import { ScarcityGrid, StabilizingIcon } from '../../components/ui/ScarcityGrid'
import { STABILIZING_DELAY_MS } from '../../data/constants'
import styles from './ScarcityFlowPage.module.css'

type ScarcityPhase = 'map' | 'stabilizing' | 'verified'

const RESOURCES = [
  { id: 'oil', name: 'Cooking oil', status: 'Critical', reports: 12, radius: '1.4 km', confidence: 94 },
  { id: 'rice', name: 'Rice', status: 'Limited', reports: 7, radius: '2.1 km', confidence: 81 },
  { id: 'packaging', name: 'Packaging', status: 'Stable', reports: 4, radius: '3.0 km', confidence: 76 },
] as const

export function ScarcityFlowPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<ScarcityPhase>('map')
  const [selectedId, setSelectedId] = useState<(typeof RESOURCES)[number]['id']>('oil')
  const selected = RESOURCES.find((resource) => resource.id === selectedId) ?? RESOURCES[0]

  useEffect(() => {
    if (phase !== 'stabilizing') return
    const timer = setTimeout(() => setPhase('verified'), STABILIZING_DELAY_MS)
    return () => clearTimeout(timer)
  }, [phase])

  if (phase === 'stabilizing') {
    return (
      <div className={`screen ${styles.centered}`}>
        <StabilizingIcon />
        <p className={styles.stabilizingText}>Verifying signal reliability…</p>
        <p className={styles.stabilizingSub}>
          Comparing reports from nearby verified businesses.
        </p>
      </div>
    )
  }

  if (phase === 'verified') {
    return (
      <div className="screen">
        <h1 className="screen-title">Verified Scarcity</h1>
        <div className={`card card--dashed ${styles.result}`}>
          <span className={styles.verifiedBadge}>Verified using nearby reports</span>
          <p className={styles.resultTitle}>{selected.name} scarcity confirmed</p>
          <p className={styles.resultSub}>Signal verified within your barangay</p>
          <dl className={styles.evidence}>
            <div><dt>Confidence</dt><dd>{selected.confidence}%</dd></div>
            <div><dt>Peer reports</dt><dd>{selected.reports}</dd></div>
            <div><dt>Affected radius</dt><dd>{selected.radius}</dd></div>
          </dl>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => navigate('/discovery/results')}
          >
            Find Supplier
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => navigate('/mesh')}
          >
            Check the Mesh for this Item
          </button>
          <button
            type="button"
            className={styles.returnBtn}
            onClick={() => navigate('/')}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Supply Signals Near You</h1>
      <FlowContext label="Verify before acting">
        Nearby business reports are checked before a possible shortage is treated
        as reliable.
      </FlowContext>
      <div className={styles.mapHeader}>
        <div>
          <strong>Barangay supply scan</strong>
          <span>Updated from verified peer signals</span>
        </div>
        <span className={styles.live}><i /> Live</span>
      </div>
      <div className={styles.filters} role="group" aria-label="Resource shown on map">
        {RESOURCES.map((resource) => (
          <button
            key={resource.id}
            type="button"
            className={selectedId === resource.id ? styles.activeFilter : ''}
            aria-pressed={selectedId === resource.id}
            onClick={() => setSelectedId(resource.id)}
          >
            {resource.name}
          </button>
        ))}
      </div>
      <p className={styles.instruction}>Select a signal to verify whether the reported shortage is reliable.</p>
      <ScarcityGrid
        interactive
        targetLabel={`${selected.name} · ${selected.status}`}
        onEpicenterClick={() => setPhase('stabilizing')}
      />
      <div className={styles.legend} aria-label="Map signal legend">
        <span><i className={styles.criticalDot} /> Critical</span>
        <span><i className={styles.limitedDot} /> Limited</span>
        <span><i className={styles.stableDot} /> Stable</span>
      </div>
      <div className={styles.signalSummary}>
        <strong>{selected.name}: {selected.status}</strong>
        <span>{selected.reports} peer reports within {selected.radius}</span>
      </div>
      <p className={styles.hint}>
        Tighter grid lines indicate a stronger concentration of shortage reports.
      </p>
    </div>
  )
}
