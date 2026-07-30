import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  tone?: 'restricted' | 'limited' | 'full' | 'default'
}

export function ProgressBar({ value, max = 100, label, tone = 'default' }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  const fillClass =
    tone === 'restricted'
      ? styles['progress__fill--restricted']
      : tone === 'limited'
        ? styles['progress__fill--limited']
        : tone === 'full'
          ? styles['progress__fill--full']
          : ''

  return (
    <div>
      <div
        className={styles.progress}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? `Progress ${value} of ${max}`}
      >
        <div
          className={`${styles.progress__fill} ${fillClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {label && <div className={styles.progress__label}>{label}</div>}
    </div>
  )
}
