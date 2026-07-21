import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import styles from './TrustCardPage.module.css'

export function TrustCardPage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <h1 className="screen-title">Trust Card</h1>

      <div className={`card card--dashed ${styles.card}`}>
        <div className={styles.qr} aria-hidden="true" />
        <div className={styles.divider} />
        <p className={styles.name}>MSME Owner</p>
        <div className={styles.divider} />
      </div>

      <div className={styles.footer}>
        <Button
          fullWidth
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'Voucher Trust Card', text: 'MSME Owner — Certified Network Tier' }).catch(() => {})
            } else {
              alert('Trust Card link copied to clipboard (prototype).')
            }
          }}
        >
          Share Card
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('/vouch-score')}>
          Back
        </Button>
      </div>
    </div>
  )
}
