import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { usePrototype } from '../context/prototype-context'
import { getLevelLabel, getScoreLabel } from '../data/constants'
import styles from './TrustCardPage.module.css'

const VERIFIED_EXCHANGES = 12
const MEMBERSHIP_YEAR = 2075

export function TrustCardPage() {
  const navigate = useNavigate()
  const { vouchScore } = usePrototype()
  const [shareStatus, setShareStatus] = useState('')
  const accessTier = getScoreLabel(vouchScore)
  const levelLabel = getLevelLabel(vouchScore)

  const shareText = [
    'KaUgnay Trust Card',
    `${accessTier} · ${levelLabel}`,
    `Score ${vouchScore}/100`,
    `${VERIFIED_EXCHANGES} verified exchanges`,
    `Member since ${MEMBERSHIP_YEAR}`,
    'Barangay verified',
  ].join(' · ')

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'KaUgnay Trust Card', text: shareText })
        setShareStatus('Trust Card shared.')
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText)
        setShareStatus('Trust Card details copied to clipboard.')
      } else {
        setShareStatus('Sharing is unavailable in this browser.')
      }
    } catch {
      setShareStatus('Sharing cancelled.')
    }
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Trust Card</h1>
      <p className={styles.lead}>
        Privacy-safe proof of verified network activity. No private business identity is exposed.
      </p>

      <div className={`card ${styles.card}`} aria-label="KaUgnay Trust Card">
        <span className={styles.brand}>KaUgnay</span>
        <div className={styles.qr} aria-hidden="true" />
        <div className={styles.scoreBlock}>
          <span className={styles.scoreValue}>{vouchScore}</span>
          <span className={styles.scoreDenom}>/100</span>
        </div>
        <p className={`${styles.tier} ${styles[`tier--${accessTier.replace(/\s+/g, '-').toLowerCase()}`]}`}>
          {accessTier}
        </p>
        <p className={styles.level}>{levelLabel}</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>{VERIFIED_EXCHANGES}</strong>
            <span>Verified exchanges</span>
          </div>
          <div className={styles.stat}>
            <strong>{MEMBERSHIP_YEAR}</strong>
            <span>Member since</span>
          </div>
        </div>
        <span className={styles.badge}>Barangay verified</span>
      </div>

      <div className={styles.footer}>
        {shareStatus && (
          <p role="status" className={styles.status}>
            {shareStatus}
          </p>
        )}
        <Button fullWidth onClick={handleShare}>
          Share Card
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('/vouch-score')}>
          Back
        </Button>
      </div>
    </div>
  )
}
