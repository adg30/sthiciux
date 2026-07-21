import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

interface HeaderProps {
  showBack?: boolean
  title?: string
  onBack?: () => void
}

export function Header({ showBack, title, onBack }: HeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  if (showBack) {
    return (
      <header className={`${styles.header} ${styles['header--with-back']}`}>
        <button
          type="button"
          className={styles.header__back}
          onClick={handleBack}
          aria-label="Go back"
        >
          ←
        </button>
        {title && <h1 className={styles.header__title}>{title}</h1>}
        <div className={styles.header__spacer} aria-hidden="true" />
      </header>
    )
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__brand}>Voucher</div>
      <div className={styles.header__profile}>
        <div className={styles.header__avatar} aria-hidden="true">
          ○
        </div>
        <span className={styles.header__role}>MSME Owner</span>
      </div>
    </header>
  )
}
