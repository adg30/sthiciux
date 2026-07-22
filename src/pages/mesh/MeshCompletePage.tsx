import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ConnectionDiagram } from '../../components/ui/ConnectionDiagram'
import { usePrototype } from '../../context/prototype-context'
import { MESH_ITEMS, OTHER_PARTY_CONFIRM_DELAY_MS } from '../../data/constants'

type CompletePhase = 'you-confirmed' | 'both-confirmed' | 'vouch-prompt'

export function MeshCompletePage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setMeshExchangeCompleted } = usePrototype()
  const [phase, setPhase] = useState<CompletePhase>('you-confirmed')
  const item = MESH_ITEMS.find((candidate) => candidate.id === itemId) ?? MESH_ITEMS[0]
  const isExistingConnection = searchParams.get('existing') === '1' || item.relationship === 'connected'

  useEffect(() => {
    if (phase !== 'you-confirmed') return
    const timer = setTimeout(() => {
      setPhase('both-confirmed')
      setMeshExchangeCompleted(true)
    }, OTHER_PARTY_CONFIRM_DELAY_MS)
    return () => clearTimeout(timer)
  }, [phase, setMeshExchangeCompleted])

  if (phase === 'vouch-prompt') {
    navigate(`/mesh/vouch/${itemId}`)
    return null
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Mesh Complete</h1>

      <ConnectionDiagram
        state={phase === 'both-confirmed' ? 'confirm-both' : 'confirm-you'}
        otherName={item.business}
        revealOther
      />

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {phase === 'you-confirmed' && (
          <Button fullWidth disabled>
            Awaiting other confirmation…
          </Button>
        )}
        {phase === 'both-confirmed' && (
          <>
            <Button fullWidth onClick={() => navigate('/')}>
              Return to Dashboard
            </Button>
            {isExistingConnection ? (
              <Button variant="dashed" fullWidth onClick={() => navigate(`/comm-link/${item.businessId}`)}>
                Return to Comm-Link
              </Button>
            ) : (
              <Button variant="dashed" fullWidth onClick={() => setPhase('vouch-prompt')}>
                Would you like to vouch?
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
