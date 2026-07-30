import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { INTRO_SESSION_KEY } from '../components/demo/AudienceIntro'
import { PrototypeProvider } from '../context/PrototypeContext'
import { DashboardPage } from './DashboardPage'

function renderDashboard() {
  return render(
    <MemoryRouter>
      <PrototypeProvider>
        <DashboardPage />
      </PrototypeProvider>
    </MemoryRouter>,
  )
}

describe('DashboardPage audience narrative', () => {
  it('shows the introduction in a fresh browser session and records dismissal', async () => {
    const user = userEvent.setup()

    renderDashboard()

    expect(
      screen.getByRole('heading', {
        name: 'Trade clearly when supply is uncertain.',
      }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Enter KaUgnay' }))

    expect(sessionStorage.getItem(INTRO_SESSION_KEY)).toBe('true')
    expect(screen.getByRole('heading', { name: 'KaUgnay' })).toBeInTheDocument()
  })

  it('links all four required prototype flows from the hub', () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true')

    renderDashboard()

    expect(screen.getByRole('link', { name: /Find suppliers/i })).toHaveAttribute(
      'href',
      '/discovery',
    )
    expect(screen.getByRole('link', { name: /Vouch Score/i })).toHaveAttribute(
      'href',
      '/vouch-score',
    )
    expect(screen.getByRole('link', { name: /Supply signal/i })).toHaveAttribute(
      'href',
      '/scarcity',
    )
    expect(screen.getByRole('link', { name: /Mesh exchange/i })).toHaveAttribute(
      'href',
      '/mesh',
    )
  })

  it('shows short status tags that preview how each flow works', () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true')

    renderDashboard()

    expect(screen.getByText('Discover')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Signal')).toBeInTheDocument()
    expect(screen.getByText('Mesh')).toBeInTheDocument()
  })
})
