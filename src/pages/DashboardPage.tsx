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
    title: 'Find Trusted Suppliers',
    description: 'Discover suppliers whose access is governed by verified trust.',
    to: '/discovery',
    statusLabel: 'Trust-gated',
    statusTone: 'trust',
  },
  {
    number: '02',
    title: 'Understand Your Vouch Score',
    description: 'See how verified activity changes the network you can reach.',
    to: '/vouch-score',
    statusLabel: 'Score-driven',
    statusTone: 'signal',
  },
  {
    number: '03',
    title: 'Verify Nearby Scarcity',
    description: 'Check whether local shortage signals are reliable before acting.',
    to: '/scarcity',
    statusLabel: 'Verified',
    statusTone: 'scarcity',
  },
  {
    number: '04',
    title: 'Exchange Through the Mesh',
    description: 'Connect anonymously and confirm community exchanges together.',
    to: '/mesh',
    statusLabel: 'Consent-based',
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
      // The prototype remains usable when browser storage is unavailable.
    }
    setShowIntroduction(false)
  }

  if (showIntroduction) {
    return <AudienceIntro onContinue={continueToDashboard} />
  }

  return (
    <div className="screen">
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Your barangay supply network</span>
        <h1>Explore the Voucher network</h1>
        <p>
          Build verified trust, understand nearby supply conditions, and exchange
          resources without giving up control of your identity.
        </p>
        <div className={styles.heroMeta}>
          <span>Signals from verified businesses</span>
          <span>Identity stays protected until consent</span>
        </div>
      </section>

      <section className={styles.flowSection} aria-labelledby="prototype-flows">
        <h2 id="prototype-flows" className={styles.sectionHeading}>
          Four ways Voucher supports MSMEs
        </h2>
        <div className={styles.flowGrid}>
          {FLOW_CARDS.map((flow) => (
            <FlowHubCard key={flow.number} {...flow} />
          ))}
        </div>
      </section>

      <section className={styles.statusSection} aria-labelledby="network-status">
        <h2 id="network-status" className={styles.sectionHeading}>
          Your network today
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
