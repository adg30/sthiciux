import type { CSSProperties } from 'react'
import type { SignalResult } from '../../data/constants'
import styles from './ScarcityGrid.module.css'

export type ScarcityGridPhase =
  | 'ready'
  | 'stabilizing'
  | 'verified'
  | 'no-data'
  | 'forming'
  | 'conflicting'
  | 'normal'

interface ScarcityGridProps {
  compact?: boolean
  interactive?: boolean
  phase?: ScarcityGridPhase
  onEpicenterClick?: () => void
  itemLabel?: string
  reports?: number
  confidence?: number
  statusLabel?: string
}

/** Figma HF positions (node 15:1534) — percent of map card */
const VERTICAL_X = [6.3, 18.4, 29.5, 38.9, 46.3, 52.1, 57.4, 63.7, 72.1, 83.7, 93.7]
const HORIZONTAL_Y = [13.6, 22.4, 30.0, 36.8, 42.0, 46.0, 49.2, 53.2, 58.8, 65.6, 69.6]
const CYAN_V = new Set([4, 5, 6, 7])
const CYAN_H = new Set([4, 5, 6, 7])

function getCompression(phase: ScarcityGridPhase): number {
  switch (phase) {
    case 'stabilizing':
      return 0.42
    case 'verified':
      return 0.72
    case 'conflicting':
      return 0.55
    case 'forming':
      return 0.28
    case 'no-data':
      return 0.08
    case 'normal':
      return 0
    default:
      return 0.2
  }
}

function compress(value: number, epicenter: number, factor: number): number {
  return value + (epicenter - value) * factor
}

function statusForPhase(phase: ScarcityGridPhase, fallback?: string): { text: string; tone: string } {
  if (fallback) return { text: fallback, tone: styles['status--scarcity'] }
  switch (phase) {
    case 'verified':
      return { text: 'VERIFIED SIGNAL', tone: styles['status--trust'] }
    case 'stabilizing':
      return { text: 'STABILIZING…', tone: styles['status--signal'] }
    case 'forming':
      return { text: 'SIGNAL FORMING', tone: styles['status--signal'] }
    case 'conflicting':
      return { text: 'CONFLICTING', tone: styles['status--critical'] }
    case 'no-data':
      return { text: 'NO SIGNAL DATA', tone: styles['status--ink'] }
    case 'normal':
      return { text: 'AVAILABILITY NORMAL', tone: styles['status--trust'] }
    default:
      return { text: 'SCARCITY SIGNAL · HIGH', tone: styles['status--scarcity'] }
  }
}

export function ScarcityGrid({
  compact = false,
  interactive = false,
  phase = 'ready',
  onEpicenterClick,
  itemLabel = 'Cooking oil',
  reports = 12,
  confidence = 94,
  statusLabel,
}: ScarcityGridProps) {
  const compression = getCompression(phase)
  const epicenter = 50
  const status = statusForPhase(phase, statusLabel)
  const isStabilizing = phase === 'stabilizing'
  const showMarker =
    phase !== 'no-data' && (phase !== 'normal' || compression === 0)

  const verticals = VERTICAL_X.map((x, index) => {
    const cx = compress(x, epicenter, compression)
    return {
      key: `v-${index}`,
      style: { left: `${cx}%` } as CSSProperties,
      cyan: CYAN_V.has(index) && phase !== 'no-data' && phase !== 'normal',
    }
  })

  const horizontals = HORIZONTAL_Y.map((y, index) => {
    const cy = compress(y, epicenter + 4, compression)
    return {
      key: `h-${index}`,
      style: { top: `${cy}%` } as CSSProperties,
      cyan: CYAN_H.has(index) && phase !== 'no-data' && phase !== 'normal',
    }
  })

  const map = (
    <div
      className={[
        styles.map,
        compact ? styles['map--compact'] : '',
        isStabilizing ? styles['map--stabilizing'] : '',
        styles[`map--${phase}`],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.mapHeader}>
        <span className={`${styles.status} ${status.tone}`}>{status.text}</span>
        <span className={styles.peers}>{reports} PEER SIGNALS</span>
      </div>

      <div className={styles.gridArea} aria-hidden="true">
        {verticals.map((line) => (
          <span
            key={line.key}
            className={`${styles.vLine} ${line.cyan ? styles['line--cyan'] : ''}`}
            style={line.style}
          />
        ))}
        {horizontals.map((line) => (
          <span
            key={line.key}
            className={`${styles.hLine} ${line.cyan ? styles['line--cyan'] : ''}`}
            style={line.style}
          />
        ))}

        {showMarker && (
          <div className={styles.epicenter}>
            <span className={styles.ringOuter} />
            <span className={styles.ringMid} />
            <span className={styles.point} />
            {isStabilizing && (
              <>
                <span className={`${styles.scan} ${styles['scan--1']}`} />
                <span className={`${styles.scan} ${styles['scan--2']}`} />
                <span className={`${styles.scan} ${styles['scan--3']}`} />
              </>
            )}
            {phase === 'verified' && <span className={styles.check}>✓</span>}
            {phase === 'conflicting' && <span className={styles.warn}>!</span>}
            {phase === 'normal' && <span className={styles.check}>✓</span>}
          </div>
        )}
      </div>

      <div className={styles.labels}>
        <p className={styles.epicenterLabel}>EPICENTER / {itemLabel.toUpperCase()}</p>
        <p className={styles.confidence}>
          {phase === 'no-data'
            ? 'INSUFFICIENT REPORTS'
            : phase === 'forming'
              ? 'GATHERING REPORTS'
              : phase === 'conflicting'
                ? 'UNRELIABLE SIGNAL'
                : phase === 'normal'
                  ? 'STABLE AVAILABILITY'
                  : `${confidence}% CONFIDENCE`}
        </p>
      </div>

      {interactive && phase === 'ready' && onEpicenterClick && (
        <button
          type="button"
          className={styles.hitTarget}
          onClick={onEpicenterClick}
          aria-label={`Stabilize ${itemLabel} signal`}
        />
      )}
    </div>
  )

  if (compact) {
    return (
      <div className={styles.compactWrap}>
        <button
          type="button"
          className={styles.compactButton}
          onClick={onEpicenterClick}
          aria-label={`Open supply signal. ${itemLabel} critical nearby.`}
        >
          {map}
        </button>
        <p className={styles.caption}>{itemLabel} — check signal</p>
      </div>
    )
  }

  return map
}

export function StabilizingIcon() {
  return (
    <div className={styles.stabilizingIcon} aria-hidden="true">
      <span className={styles.ringOuter} />
      <span className={styles.ringMid} />
      <span className={styles.point} />
    </div>
  )
}

export function signalResultToGridPhase(result: SignalResult): ScarcityGridPhase {
  if (result === 'verified') return 'verified'
  return result
}
