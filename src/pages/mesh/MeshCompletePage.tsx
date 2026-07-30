import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ConnectionDiagram } from '../../components/ui/ConnectionDiagram'
import { StatusPill } from '../../components/ui/StatusPill'
import { usePrototype } from '../../context/prototype-context'
import { MESH_ITEMS, OTHER_PARTY_CONFIRM_DELAY_MS } from '../../data/constants'
import styles from './MeshCompletePage.module.css'

type CompletePhase = 'you-confirmed' | 'both-confirmed' | 'received' | 'vouch-prompt'

export function MeshCompletePage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setMeshExchangeCompleted, completionMode } = usePrototype()
  const [phase, setPhase] = useState<CompletePhase>('you-confirmed')
  const item = MESH_ITEMS.find((candidate) => candidate.id === itemId) ?? MESH_ITEMS[0]
  const isExistingConnection =
    searchParams.get('existing') === '1' || item.relationship === 'connected'
  const isNewAnonymousExchange = !isExistingConnection && item.relationship === 'anonymous'
  const autoConfirmOther = completionMode === 'both'

  useEffect(() => {
    if (phase !== 'you-confirmed' || !autoConfirmOther) return
    const timer = setTimeout(() => {
      setPhase('both-confirmed')
    }, OTHER_PARTY_CONFIRM_DELAY_MS)
    return () => clearTimeout(timer)
  }, [phase, autoConfirmOther])

  if (phase === 'vouch-prompt') {
    navigate(`/mesh/vouch/${itemId}`)
    return null
  }

  return (
    <div className="screen">
      <p className="screen-kicker screen-kicker--trust">Mesh complete</p>
      <h1 className="screen-title">Exchange confirmation</h1>

      <ConnectionDiagram
        state={phase === 'both-confirmed' || phase === 'received' ? 'confirm-both' : 'confirm-you'}
        otherName={isExistingConnection || phase === 'both-confirmed' || phase === 'received' ? item.business : undefined}
        revealOther={isExistingConnection || phase === 'both-confirmed' || phase === 'received'}
        message={
          phase === 'both-confirmed'
            ? 'Logistics confirmed by both parties. Confirm receipt only after the goods arrive.'
            : phase === 'received'
              ? 'Goods received. The exchange is now complete.'
              : autoConfirmOther
                ? 'Waiting for the other business to confirm logistics…'
                : 'Only your confirmation is recorded. The other party has not confirmed yet.'
        }
      />

      <div className={`card ${styles.summary}`}>
        <div className={styles.summaryRow}>
          <strong>{item.shortLabel}</strong>
          <StatusPill tone={phase === 'received' ? 'trust' : 'signal'}>
            {phase === 'received' ? 'Complete' : phase === 'both-confirmed' ? 'Both confirmed' : 'One party'}
          </StatusPill>
        </div>
        <p>
          {item.quantity} · {item.exchangeType} · {item.neededBy}
        </p>
        {!autoConfirmOther && phase === 'you-confirmed' && (
          <p className={styles.modeNote}>
            Demo mode: completion stays one-party until you change completion mode to both.
          </p>
        )}
      </div>

      <div className={styles.footer}>
        {phase === 'you-confirmed' && (
          <Button fullWidth disabled>
            {autoConfirmOther ? 'Awaiting other confirmation…' : 'Other party not confirmed'}
          </Button>
        )}
        {phase === 'both-confirmed' && (
          <Button
            fullWidth
            onClick={() => {
              setMeshExchangeCompleted(true)
              setPhase('received')
            }}
          >
            Confirm goods received
          </Button>
        )}
        {phase === 'received' && (
          <>
            <Button fullWidth onClick={() => navigate('/')}>
              Return to dashboard
            </Button>
            {isExistingConnection ? (
              <Button variant="dashed" fullWidth onClick={() => navigate(`/comm-link/${item.businessId}`)}>
                Return to Comm-Link
              </Button>
            ) : isNewAnonymousExchange ? (
              <Button variant="dashed" fullWidth onClick={() => setPhase('vouch-prompt')}>
                Would you like to vouch?
              </Button>
            ) : (
              <Button variant="secondary" fullWidth onClick={() => navigate('/mesh')}>
                Back to mesh
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
