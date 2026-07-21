import { useNavigate } from 'react-router-dom'
import { ListRow } from '../components/ui/ListRow'
import { ScoreCard } from '../components/ui/ScoreCard'
import { ScarcityGrid } from '../components/ui/ScarcityGrid'
import { usePrototype } from '../context/PrototypeContext'
import { getLevelLabel, getScoreLabel } from '../data/constants'

export function DashboardPage() {
  const navigate = useNavigate()
  const { vouchScore } = usePrototype()

  return (
    <div className="screen">
      <ScoreCard
        score={vouchScore}
        statusLabel={getScoreLabel(vouchScore)}
        levelLabel={getLevelLabel(vouchScore)}
        onClick={() => navigate('/vouch-score')}
      />

      <ScarcityGrid compact onEpicenterClick={() => navigate('/scarcity')} />

      <ListRow label="Trust Activity" onClick={() => navigate('/vouch-actions')} />
    </div>
  )
}
