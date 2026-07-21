import styles from './ScarcityGrid.module.css'

interface ScarcityGridProps {
  compact?: boolean
  interactive?: boolean
  onEpicenterClick?: () => void
}

function buildGridLines(compact: boolean) {
  const lines: { x1: number; y1: number; x2: number; y2: number; key: string }[] = []
  const epicenterX = compact ? 72 : 68
  const epicenterY = compact ? 78 : 75

  for (let i = 0; i <= 8; i++) {
    const t = i / 8
    const spacing = 8 + t * t * (compact ? 28 : 32)
    const x = epicenterX - spacing * (4 - i)
    if (x >= 4 && x <= 96) {
      lines.push({ x1: x, y1: 4, x2: x, y2: 96, key: `v-${i}` })
    }
  }

  for (let i = 0; i <= 8; i++) {
    const t = i / 8
    const spacing = 8 + t * t * (compact ? 28 : 32)
    const y = epicenterY - spacing * (4 - i)
    if (y >= 4 && y <= 96) {
      lines.push({ x1: 4, y1: y, x2: 96, y2: y, key: `h-${i}` })
    }
  }

  return { lines, epicenterX, epicenterY }
}

export function ScarcityGrid({ compact = false, interactive = false, onEpicenterClick }: ScarcityGridProps) {
  const { lines, epicenterX, epicenterY } = buildGridLines(compact)

  const svg = (
    <svg
      className={styles['scarcity-preview__svg']}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {lines.map((line) => (
        <line
          key={line.key}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#111"
          strokeWidth={compact ? 0.6 : 0.8}
        />
      ))}
      <g
        className={interactive ? styles['scarcity-preview__target'] : undefined}
        onClick={interactive ? onEpicenterClick : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onEpicenterClick?.()
                }
              }
            : undefined
        }
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? 'Activate scarcity epicenter' : undefined}
      >
        <circle cx={epicenterX} cy={epicenterY} r={interactive ? 6 : 4} fill="none" stroke="#111" strokeWidth="1.2" />
        <line x1={epicenterX - 8} y1={epicenterY} x2={epicenterX + 8} y2={epicenterY} stroke="#111" strokeWidth="1" />
        <line x1={epicenterX} y1={epicenterY - 8} x2={epicenterX} y2={epicenterY + 8} stroke="#111" strokeWidth="1" />
      </g>
    </svg>
  )

  if (compact) {
    return (
      <div>
        <h2 className={styles['scarcity-preview__section-title']}>Nearby supply status</h2>
        <button
          type="button"
          className={styles['scarcity-preview']}
          onClick={onEpicenterClick}
          aria-label="Open scarcity map. Cooking oil critical nearby."
        >
          {svg}
        </button>
        <p className={styles['scarcity-preview__caption']}>Cooking oil — critical nearby</p>
      </div>
    )
  }

  return (
    <div className={`card card--dashed ${styles['scarcity-preview']}`} style={{ aspectRatio: '3 / 4', padding: 0 }}>
      {svg}
    </div>
  )
}

export function StabilizingIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="48" fill="none" stroke="#111" strokeWidth="4" />
      <line x1="60" y1="8" x2="60" y2="28" stroke="#111" strokeWidth="3" />
      <line x1="60" y1="92" x2="60" y2="112" stroke="#111" strokeWidth="3" />
      <line x1="8" y1="60" x2="28" y2="60" stroke="#111" strokeWidth="3" />
      <line x1="92" y1="60" x2="112" y2="60" stroke="#111" strokeWidth="3" />
      <circle cx="60" cy="60" r="6" fill="#111" />
    </svg>
  )
}
