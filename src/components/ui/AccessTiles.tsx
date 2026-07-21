import { CAPABILITIES } from '../../data/constants'
import styles from './AccessTiles.module.css'

interface AccessTilesProps {
  unlockedCount: number
}

export function AccessTiles({ unlockedCount }: AccessTilesProps) {
  return (
    <div className={styles['access-grid']} role="list" aria-label="Access capabilities">
      {CAPABILITIES.map((capability, index) => {
        const unlocked = index < unlockedCount
        return (
          <div
            key={capability}
            className={`${styles['access-tile']} ${unlocked ? styles['access-tile--unlocked'] : ''}`}
            role="listitem"
            aria-label={`${capability} ${unlocked ? 'unlocked' : 'locked'}`}
          >
            <span className={styles['access-tile__icon']} aria-hidden="true">
              {unlocked ? '✓' : '🔒'}
            </span>
            <span className={styles['access-tile__label']}>{capability}</span>
          </div>
        )
      })}
    </div>
  )
}
