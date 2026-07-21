import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScarcityGrid, StabilizingIcon } from '../../components/ui/ScarcityGrid'
import { STABILIZING_DELAY_MS } from '../../data/constants'
import styles from './ScarcityFlowPage.module.css'

type ScarcityPhase = 'map' | 'stabilizing' | 'verified'

export function ScarcityFlowPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<ScarcityPhase>('map')

  useEffect(() => {
    if (phase !== 'stabilizing') return
    const timer = setTimeout(() => setPhase('verified'), STABILIZING_DELAY_MS)
    return () => clearTimeout(timer)
  }, [phase])

  if (phase === 'stabilizing') {
    return (
      <div className={`screen ${styles.centered}`}>
        <StabilizingIcon />
        <p className={styles.stabilizingText}>Stabilizing Signal</p>
      </div>
    )
  }

  if (phase === 'verified') {
    return (
      <div className="screen">
        <h1 className="screen-title">Verified Scarcity</h1>
        <div className={`card card--dashed ${styles.result}`}>
          <p className={styles.resultTitle}>Cooking oil scarcity confirmed</p>
          <p className={styles.resultSub}>Signal verified within your barangay</p>
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
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Scarcity Map</h1>
      <ScarcityGrid interactive onEpicenterClick={() => setPhase('stabilizing')} />
      <p className={styles.hint}>Grid tightens toward scarcity epicenter</p>
    </div>
  )
}
