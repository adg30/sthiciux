import { Button } from '../ui/Button'
import { SignalTip } from '../ui/SignalTip'
import styles from './AudienceIntro.module.css'

export const INTRO_SESSION_KEY = 'voucher-audience-intro-seen'

interface AudienceIntroProps {
  onContinue: () => void
}

const PRINCIPLES = [
  { number: '01', title: 'Trust opens supply' },
  { number: '02', title: 'Check signals first' },
  { number: '03', title: 'Connect only with consent' },
]

export function AudienceIntro({ onContinue }: AudienceIntroProps) {
  return (
    <section className={styles.intro} aria-labelledby="audience-intro-title">
      <p className={styles.eyebrow}>Barangay supply network</p>
      <h1 id="audience-intro-title">Trade clearly when supply is uncertain.</h1>
      <p className={styles.lead}>
        KaUgnay helps sari-sari and MSME owners find trusted supply nearby.
      </p>

      <ol className={styles.principles}>
        {PRINCIPLES.map((principle) => (
          <li key={principle.number}>
            <span className={styles.number}>{principle.number}</span>
            <h2>{principle.title}</h2>
          </li>
        ))}
      </ol>

      <SignalTip label="Ano ito?">
        <p>
          Verified activity builds access. Local reports are checked before you act.
          Identities stay hidden until both sides agree.
        </p>
      </SignalTip>

      <div className={styles.action}>
        <Button fullWidth onClick={onContinue}>
          Enter KaUgnay
        </Button>
      </div>
    </section>
  )
}
