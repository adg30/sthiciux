import styles from './RedactionBar.module.css'

interface RedactionBarProps {
  revealed: boolean
  delay?: number
  variant?: 'photo' | 'line-short' | 'line-medium' | 'line-long' | 'name'
  children?: React.ReactNode
  label?: string
}

export function RedactionBar({
  revealed,
  delay = 0,
  variant = 'line-long',
  children,
  label,
}: RedactionBarProps) {
  const isPhoto = variant === 'photo'

  return (
    <div
      className={`${styles.redaction} ${isPhoto ? styles['redaction--photo'] : styles[`redaction--${variant}`]} ${!isPhoto ? styles['redaction--block'] : ''}`}
      aria-hidden={!revealed && !label}
      aria-label={!revealed ? 'Redacted content' : undefined}
    >
      <div
        className={`${styles.redaction__content} ${revealed ? styles['redaction__content--revealed'] : ''}`}
      >
        {children ?? (isPhoto ? 'Revealed Photo' : '████████')}
      </div>
      <div
        className={`${styles.redaction__bar} ${revealed ? styles['redaction__bar--revealed'] : ''}`}
        style={{ transitionDelay: revealed ? `${delay}ms` : '0ms' }}
        aria-hidden="true"
      />
    </div>
  )
}
