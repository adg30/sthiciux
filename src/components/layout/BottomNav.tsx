import { NavLink, useLocation } from 'react-router-dom'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  {
    to: '/discovery',
    label: 'Discover',
    isActive: (pathname: string) => pathname.startsWith('/discovery'),
  },
  {
    to: '/mesh',
    label: 'Mesh',
    isActive: (pathname: string) => pathname.startsWith('/mesh'),
  },
  {
    to: '/comm-link',
    label: 'Network',
    isActive: (pathname: string) => pathname.startsWith('/comm-link'),
  },
  {
    to: '/vouch-score',
    label: 'Profile',
    isActive: (pathname: string) =>
      pathname.startsWith('/vouch-score') ||
      pathname.startsWith('/vouch-actions') ||
      pathname.startsWith('/trust-card') ||
      pathname.startsWith('/trust-activity') ||
      pathname.startsWith('/profile'),
  },
]

export function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className={styles['bottom-nav']} aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const active = item.isActive(pathname)
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={`${styles['bottom-nav__item']} ${active ? styles['bottom-nav__item--active'] : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {active && <span className={styles['bottom-nav__indicator']} aria-hidden="true" />}
            <span className={styles['bottom-nav__label']}>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
