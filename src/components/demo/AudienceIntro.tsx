import { Button } from '../ui/Button'
import styles from './AudienceIntro.module.css'

export const INTRO_SESSION_KEY = 'voucher-audience-intro-seen'

interface AudienceIntroProps {
  onContinue: () => void
}

const PRINCIPLES = [
  {
    number: '01',
    title: 'Verified business trust',
    description: 'Verified activity builds access without turning trust into a paid subscription.',
  },
  {
    number: '02',
    title: 'Barangay supply signals',
    description: 'Nearby reports are checked before a possible shortage is treated as reliable.',
  },
  {
    number: '03',
    title: 'Anonymous, consent-based exchange',
    description: 'Businesses control when identities are revealed and confirm exchanges together.',
  },
]

export function AudienceIntro({ onContinue }: AudienceIntroProps) {
  return (
    <section className={styles.intro} aria-labelledby="audience-intro-title">
      <div className={styles.eyebrow}>Barangay trust and supply network</div>
      <div className={styles.mark} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <h1 id="audience-intro-title">Trade with clarity, even when supply is uncertain.</h1>
      <p className={styles.lead}>
        Voucher helps Filipino MSMEs build verified trust, understand nearby scarcity,
        and exchange supplies safely.
      </p>

      <ol className={styles.principles}>
        {PRINCIPLES.map((principle) => (
          <li key={principle.number}>
            <span className={styles.number}>{principle.number}</span>
            <div>
              <h2>{principle.title}</h2>
              <p>{principle.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.action}>
        <Button fullWidth onClick={onContinue}>
          Explore Voucher
        </Button>
        <p>No sign-in required. This is a guided product prototype.</p>
      </div>
    </section>
  )
}
