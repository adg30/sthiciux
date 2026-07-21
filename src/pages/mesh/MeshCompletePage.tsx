import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ConnectionDiagram } from '../../components/ui/ConnectionDiagram'
import { usePrototype } from '../../context/PrototypeContext'
import { OTHER_PARTY_CONFIRM_DELAY_MS } from '../../data/constants'

type CompletePhase = 'you-confirmed' | 'both-confirmed' | 'vouch-prompt'

export function MeshCompletePage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const { setMeshExchangeCompleted } = usePrototype()
  const [phase, setPhase] = useState<CompletePhase>('you-confirmed')

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
            <Button variant="dashed" fullWidth onClick={() => setPhase('vouch-prompt')}>
              Would you like to vouch?
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
