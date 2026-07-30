import { useState, type ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AudienceIntro,
  INTRO_SESSION_KEY,
} from '../components/demo/AudienceIntro'
import { FlowHubCard } from '../components/demo/FlowHubCard'
import { ListRow } from '../components/ui/ListRow'
import { ScoreCard } from '../components/ui/ScoreCard'
import { ScarcityGrid } from '../components/ui/ScarcityGrid'
import { usePrototype } from '../context/prototype-context'
import { getLevelLabel, getScoreLabel } from '../data/constants'
import styles from './DashboardPage.module.css'

const FLOW_CARDS: ComponentProps<typeof FlowHubCard>[] = [
  {
    number: '01',
    title: 'Find suppliers',
    description: 'Trust-gated supply nearby',
    to: '/discovery',
    statusLabel: 'Discover',
    statusTone: 'trust',
  },
  {
    number: '02',
    title: 'Vouch Score',
    description: 'See what you can unlock',
    to: '/vouch-score',
    statusLabel: 'Profile',
    statusTone: 'signal',
  },
  {
    number: '03',
    title: 'Supply signal',
    description: 'Check if a shortage is real',
    to: '/scarcity',
    statusLabel: 'Signal',
    statusTone: 'scarcity',
  },
  {
    number: '04',
    title: 'Mesh exchange',
    description: 'Trade with consent',
    to: '/mesh',
    statusLabel: 'Mesh',
    statusTone: 'ink',
  },
]

function shouldShowIntroduction() {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true'
  } catch {
    return true
  }
}

export function DashboardPage() {
  const navigate = useNavigate()
  const { vouchScore } = usePrototype()
  const [showIntroduction, setShowIntroduction] = useState(shouldShowIntroduction)

  const continueToDashboard = () => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true')
    } catch {
      // Prototype remains usable without storage.
    }
    setShowIntroduction(false)
  }

  if (showIntroduction) {
    return <AudienceIntro onContinue={continueToDashboard} />
  }

  return (
    <div className="screen">
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Your network</span>
        <h1>KaUgnay</h1>
        <p>Trusted supply for your barangay store.</p>
      </section>

      <section className={styles.flowSection} aria-labelledby="prototype-flows">
        <h2 id="prototype-flows" className={styles.sectionHeading}>
          Start here
        </h2>
        <div className={styles.flowGrid}>
          {FLOW_CARDS.map((flow) => (
            <FlowHubCard key={flow.number} {...flow} />
          ))}
        </div>
      </section>

      <section className={styles.statusSection} aria-labelledby="network-status">
        <h2 id="network-status" className={styles.sectionHeading}>
          Today
        </h2>
        <ScoreCard
          score={vouchScore}
          statusLabel={getScoreLabel(vouchScore)}
          levelLabel={getLevelLabel(vouchScore)}
          onClick={() => navigate('/vouch-score')}
        />

        <ScarcityGrid compact onEpicenterClick={() => navigate('/scarcity')} />

        <ListRow label="Trust Activity" onClick={() => navigate('/trust-activity')} />
      </section>
    </div>
  )
}
