import { Outlet } from 'react-router-dom'
import { DemoSettings } from '../ui/DemoSettings'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

interface AppShellProps {
  showNav?: boolean
  showHeader?: boolean
  subpage?: boolean
  subpageTitle?: string
}

export function AppShell({
  showNav = true,
  showHeader = true,
  subpage = false,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <div className="app-frame">
        {showHeader && (subpage ? <Header showBack /> : <Header />)}
        <main className={`app-main ${showNav ? 'app-main--with-nav' : ''}`}>
          <Outlet />
        </main>
        {showNav && <BottomNav />}
        <DemoSettings />
      </div>
    </div>
  )
}
