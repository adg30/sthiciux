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
        name: 'Trade with clarity, even when supply is uncertain.',
      }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Explore Voucher' }))

    expect(sessionStorage.getItem(INTRO_SESSION_KEY)).toBe('true')
    expect(screen.getByRole('heading', { name: 'Explore the Voucher network' })).toBeInTheDocument()
  })

  it('links all four required prototype flows from the hub', () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true')

    renderDashboard()

    expect(screen.getByRole('link', { name: /Find Trusted Suppliers/i })).toHaveAttribute(
      'href',
      '/discovery',
    )
    expect(screen.getByRole('link', { name: /Understand Your Vouch Score/i })).toHaveAttribute(
      'href',
      '/vouch-score',
    )
    expect(screen.getByRole('link', { name: /Verify Nearby Scarcity/i })).toHaveAttribute(
      'href',
      '/scarcity',
    )
    expect(screen.getByRole('link', { name: /Exchange Through the Mesh/i })).toHaveAttribute(
      'href',
      '/mesh',
    )
  })
})
