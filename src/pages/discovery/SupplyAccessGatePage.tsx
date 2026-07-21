import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { usePrototype } from '../../context/PrototypeContext'
import styles from './SupplyAccessGatePage.module.css'

const TRACK_HEIGHT = 280
const HANDLE_SIZE = 48
const MAX_LOCKED_PROGRESS = 0.55

export function SupplyAccessGatePage() {
  const navigate = useNavigate()
  const { supplierId } = useParams()
  const { vouchScore, gateRequiredScore } = usePrototype()
  const canUnlock = vouchScore >= gateRequiredScore

  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [snapping, setSnapping] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [showInsufficient, setShowInsufficient] = useState(false)
  const startYRef = useRef(0)
  const startProgressRef = useRef(0)

  const maxProgress = canUnlock ? 1 : MAX_LOCKED_PROGRESS

  const applyResistance = useCallback(
    (raw: number) => {
      if (canUnlock) return raw
      // Increasing resistance as handle approaches the limit
      const normalized = raw / MAX_LOCKED_PROGRESS
      const resisted = MAX_LOCKED_PROGRESS * (1 - Math.pow(1 - normalized, 2.5))
      return Math.min(resisted, MAX_LOCKED_PROGRESS)
    },
    [canUnlock],
  )

  const updateFromPointer = useCallback(
    (clientY: number) => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const usable = rect.height - HANDLE_SIZE
      const y = clientY - rect.top - HANDLE_SIZE / 2
      const raw = 1 - Math.max(0, Math.min(1, y / usable))
      const resisted = applyResistance(raw)
      setProgress(Math.min(resisted, maxProgress))
    },
    [applyResistance, maxProgress],
  )

  const handlePointerDown = (e: ReactPointerEvent) => {
    if (unlocked) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    setSnapping(false)
    setShowInsufficient(false)
    startYRef.current = e.clientY
    startProgressRef.current = progress
  }

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (!dragging || unlocked) return
    updateFromPointer(e.clientY)
  }

  const handlePointerUp = () => {
    if (!dragging || unlocked) return
    setDragging(false)
    setSnapping(true)

    if (canUnlock && progress >= 0.92) {
      setProgress(1)
      setUnlocked(true)
      setTimeout(() => {
        navigate(`/discovery/confirm/${supplierId}`)
      }, 600)
      return
    }

    setProgress(0)
    if (!canUnlock) {
      setShowInsufficient(true)
      setTimeout(() => setShowInsufficient(false), 3000)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (unlocked) return
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setProgress((p) => Math.min(maxProgress, p + (canUnlock ? 0.15 : 0.08)))
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setProgress((p) => Math.max(0, p - 0.15))
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (canUnlock) {
        setProgress(1)
        setUnlocked(true)
        setTimeout(() => navigate(`/discovery/confirm/${supplierId}`), 600)
      } else {
        setShowInsufficient(true)
        setTimeout(() => setShowInsufficient(false), 3000)
      }
    }
  }

  useEffect(() => {
    if (!dragging && snapping && progress > 0 && progress < 0.92) {
      const timer = setTimeout(() => setSnapping(false), 400)
      return () => clearTimeout(timer)
    }
  }, [dragging, snapping, progress])

  const handleOffset = (1 - progress) * (TRACK_HEIGHT - HANDLE_SIZE)

  return (
    <div className="screen">
      <h1 className="screen-title">Supply Access Gate</h1>

      <div className={styles.gateArea}>
        <div
          ref={trackRef}
          className={`${styles.track} ${unlocked ? styles['track--open'] : ''}`}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label="Drag to unlock supplier access"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className={`${styles.lockTarget} ${unlocked ? styles['lockTarget--open'] : ''}`}>
            <span aria-hidden="true">{unlocked ? '🔓' : '🔒'}</span>
          </div>

          <div className={styles.trackLine} aria-hidden="true" />

          <div
            className={`${styles.handle} ${dragging ? styles['handle--dragging'] : ''} ${snapping ? styles['handle--snapping'] : ''}`}
            style={{ transform: `translateY(${handleOffset}px)` }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="presentation"
          >
            <span aria-hidden="true">🔒</span>
          </div>
        </div>

        <p className={styles.instruction}>Drag to unlock</p>

        {showInsufficient && (
          <div className={styles.insufficient} role="alert">
            <p className={styles.insufficientTitle}>Higher trust is required to access this supplier.</p>
            <p className={styles.insufficientScores}>
              Your score: {vouchScore}/100 · Required: {gateRequiredScore}/100
            </p>
            <Button variant="secondary" fullWidth onClick={() => navigate('/vouch-actions')}>
              See how to raise the score
            </Button>
          </div>
        )}

        {unlocked && (
          <p className={styles.success} role="status">
            Access granted — proceeding to confirm request…
          </p>
        )}
      </div>

      <div className={styles.fallback}>
        <Button
          variant="dashed"
          fullWidth
          onClick={() => {
            if (canUnlock) {
              setUnlocked(true)
              navigate(`/discovery/confirm/${supplierId}`)
            } else {
              setShowInsufficient(true)
              setTimeout(() => setShowInsufficient(false), 3000)
            }
          }}
        >
          Tap to attempt unlock (keyboard fallback)
        </Button>
      </div>
    </div>
  )
}
