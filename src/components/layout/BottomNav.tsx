import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { to: '/discovery', label: 'Discovery', icon: '⌕' },
  { to: '/mesh', label: 'Mesh', icon: '◇' },
  { to: '/comm-link', label: 'Messages', icon: '▢' },
  { to: '/profile', label: 'Profile', icon: '○' },
]

export function BottomNav() {
  return (
    <nav className={styles['bottom-nav']} aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `${styles['bottom-nav__item']} ${isActive ? styles['bottom-nav__item--active'] : ''}`
          }
        >
          <span className={styles['bottom-nav__icon']} aria-hidden="true">{item.icon}</span>
          <span className={styles['bottom-nav__label']}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
