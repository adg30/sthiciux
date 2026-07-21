import styles from './ListRow.module.css'

interface ListRowProps {
  label: string
  onClick?: () => void
}

export function ListRow({ label, onClick }: ListRowProps) {
  return (
    <button type="button" className={styles['list-row']} onClick={onClick}>
      <span>{label}</span>
      <span className={styles['list-row__chevron']} aria-hidden="true">
        →
      </span>
    </button>
  )
}
