import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScarcityGrid, type ScarcityGridPhase } from '../../components/ui/ScarcityGrid'
import { SignalTip } from '../../components/ui/SignalTip'
import { Button } from '../../components/ui/Button'
import { usePrototype } from '../../context/prototype-context'
import {
  MOCK_SUPPLIERS,
  SCARCITY_SIGNALS,
  STABILIZING_DELAY_MS,
  type SignalResult,
} from '../../data/constants'
import styles from './ScarcityFlowPage.module.css'

type ScarcityPhase =
  | 'ready'
  | 'stabilizing'
  | 'verified'
  | 'verified-suppliers'
  | 'no-data'
  | 'forming'
  | 'conflicting'
  | 'normal'

function resultPhaseFromSignal(signalResult: SignalResult): ScarcityPhase {
  if (signalResult === 'verified') return 'verified'
  return signalResult
}

function getResultCopy(phase: ScarcityPhase) {
  switch (phase) {
    case 'verified':
      return {
        title: 'Verified problem',
        tip: 'Several nearby stores report the same shortage. Safe to look for suppliers.',
        primary: 'Find suppliers',
        secondary: 'Check Mesh',
      }
    case 'no-data':
      return {
        title: 'No signal data',
        tip: 'Not enough reports yet. Do not treat this item as scarce.',
        primary: 'Back to map',
      }
    case 'forming':
      return {
        title: 'Signal forming',
        tip: 'Some reports exist, but not enough to decide. Wait for more.',
        primary: 'Back to map',
      }
    case 'conflicting':
      return {
        title: 'Conflicting signal',
        tip: 'Stores disagree. Do not treat this as verified scarcity.',
        primary: 'Back to map',
      }
    case 'normal':
      return {
        title: 'Availability normal',
        tip: 'Nearby reports look stable. Continue browsing as usual.',
        primary: 'Back to map',
      }
    default:
      return null
  }
}

function gridPhaseFromPagePhase(phase: ScarcityPhase): ScarcityGridPhase {
  if (phase === 'verified-suppliers') return 'verified'
  if (phase === 'ready' || phase === 'stabilizing' || phase === 'verified' || phase === 'no-data' || phase === 'forming' || phase === 'conflicting' || phase === 'normal') {
    return phase
  }
  return 'ready'
}

export function ScarcityFlowPage() {
  const navigate = useNavigate()
  const { signalResult, setVerifiedScarcityId } = usePrototype()
  const [phase, setPhase] = useState<ScarcityPhase>('ready')
  const [selectedId, setSelectedId] = useState<(typeof SCARCITY_SIGNALS)[number]['id']>('oil')
  const selected =
    SCARCITY_SIGNALS.find((resource) => resource.id === selectedId) ?? SCARCITY_SIGNALS[0]

  useEffect(() => {
    if (phase !== 'stabilizing') return
    const timer = setTimeout(() => {
      const nextPhase = resultPhaseFromSignal(signalResult)
      if (signalResult === 'verified') {
        setVerifiedScarcityId(selected.id)
      }
      setPhase(nextPhase)
    }, STABILIZING_DELAY_MS)
    return () => clearTimeout(timer)
  }, [phase, selected.id, setVerifiedScarcityId, signalResult])

  if (phase === 'stabilizing') {
    return (
      <div className="screen">
        <p className="screen-kicker screen-kicker--caution">
          {selected.name} · live barangay telemetry
        </p>
        <h1 className="screen-title">Barangay Supply Signal</h1>
        <ScarcityGrid
          phase="stabilizing"
          itemLabel={selected.name}
          reports={selected.reports}
          confidence={selected.confidence}
        />
        <p className={styles.hint}>Checking nearby store reports…</p>
      </div>
    )
  }

  const result = getResultCopy(phase)

  if (result && phase !== 'ready') {
    if (phase === 'verified-suppliers') {
      return (
        <div className="screen">
          <p className="screen-kicker screen-kicker--trust">Supplier matches</p>
          <h1 className="screen-title">Find suppliers</h1>
          <ul className={styles.supplierList}>
            {MOCK_SUPPLIERS.map((supplier) => (
              <li key={supplier.id}>
                <button
                  type="button"
                  className={styles.supplierRow}
                  onClick={() => navigate(`/discovery/supplier/${supplier.id}`)}
                >
                  <strong>{supplier.nodeCode}</strong>
                  <span>
                    {supplier.category} · {supplier.distance}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button fullWidth onClick={() => navigate('/discovery/results')}>
              Open Discovery
            </Button>
            <Button variant="secondary" fullWidth onClick={() => navigate('/mesh')}>
              Check Mesh
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="screen">
        <p className="screen-kicker">{selected.name} · live barangay telemetry</p>
        <h1 className="screen-title">{result.title}</h1>
        <ScarcityGrid
          phase={gridPhaseFromPagePhase(phase)}
          itemLabel={selected.name}
          reports={selected.reports}
          confidence={selected.confidence}
        />
        <SignalTip label="Ano ang ibig sabihin?">
          <p>{result.tip}</p>
        </SignalTip>
        <div className={styles.telemetry}>
          {selected.reports} reports · {selected.radius} · updated now
        </div>
        <div className={styles.actions}>
          {phase === 'verified' ? (
            <>
              <Button fullWidth onClick={() => setPhase('verified-suppliers')}>
                {result.primary}
              </Button>
              <Button variant="secondary" fullWidth onClick={() => navigate('/mesh')}>
                Check Mesh
              </Button>
            </>
          ) : (
            <Button fullWidth onClick={() => setPhase('ready')}>
              {result.primary}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <p className="screen-kicker screen-kicker--caution">
        {selected.name} · live barangay telemetry
      </p>
      <h1 className="screen-title">Barangay Supply Signal</h1>

      <div className={styles.filters} role="group" aria-label="Item">
        {SCARCITY_SIGNALS.map((resource) => (
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

      <ScarcityGrid
        interactive
        phase="ready"
        itemLabel={selected.name}
        reports={selected.reports}
        confidence={selected.confidence}
        onEpicenterClick={() => setPhase('stabilizing')}
      />

      <p className={styles.hint}>Tap the center to stabilize this signal.</p>

      <Button fullWidth onClick={() => setPhase('stabilizing')}>
        Stabilize Signal
      </Button>

      <div className={styles.telemetry}>
        {selected.reports} reports · {selected.radius} · updated now
      </div>

      <SignalTip label="Bakit may grid?">
        <p>
          Lines tighten toward the reported problem. Stabilize before you act on a shortage.
        </p>
      </SignalTip>
    </div>
  )
}
