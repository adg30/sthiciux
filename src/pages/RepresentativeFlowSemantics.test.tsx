import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PrototypeProvider } from '../context/PrototypeContext'
import { MeshBoardPage } from './mesh/MeshBoardPage'
import { ScarcityFlowPage } from './scarcity/ScarcityFlowPage'
import { VouchScorePage } from './VouchScorePage'

describe('Representative flow semantics', () => {
  function renderVouchScorePage(preset?: 'restricted' | 'limited' | 'full') {
    if (preset) {
      localStorage.setItem('voucher-prototype-preset', preset)
    } else {
      localStorage.removeItem('voucher-prototype-preset')
    }

    return render(
      <MemoryRouter>
        <PrototypeProvider>
          <VouchScorePage />
        </PrototypeProvider>
      </MemoryRouter>,
    )
  }

  it('frames the current Vouch Score as an access state, not a subscription tier', () => {
    renderVouchScorePage()

    expect(screen.getByText('Current access state')).toBeInTheDocument()
    expect(screen.getByText('Score-driven')).toBeInTheDocument()
  })

  it('shows the terminal Vouch Score state as fully unlocked High-Trust access', () => {
    renderVouchScorePage('full')

    expect(screen.getByText('All thresholds unlocked')).toBeInTheDocument()
    expect(screen.getByText('High-Trust ready')).toBeInTheDocument()
    expect(screen.getByText('8 of 8 capabilities unlocked')).toBeInTheDocument()
  })

  it('explains that scarcity signals must be verified before action', () => {
    render(
      <MemoryRouter>
        <PrototypeProvider>
          <ScarcityFlowPage />
        </PrototypeProvider>
      </MemoryRouter>,
    )

    expect(screen.getByText('Verify first')).toBeInTheDocument()
    expect(screen.getByText(/Reported shortages stay informational until Voucher verifies them/i)).toBeInTheDocument()
  })

  it('updates scarcity status framing when a different resource is selected', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <PrototypeProvider>
          <ScarcityFlowPage />
        </PrototypeProvider>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Packaging' }))

    const signalSummary = screen.getByText(/4 peer reports within 3.0 km/i).closest('div')
    expect(signalSummary).not.toBeNull()
    expect(within(signalSummary as HTMLDivElement).getByText('Packaging')).toBeInTheDocument()
    expect(within(signalSummary as HTMLDivElement).getByText('Stable')).toBeInTheDocument()
  })

  it('summarizes mesh relationship states without exposing identity by default', () => {
    render(
      <MemoryRouter>
        <MeshBoardPage />
      </MemoryRouter>,
    )

    const stateSection = screen.getByRole('region', { name: 'Read each supplier post by its consent state' })
    expect(within(stateSection).getByText('Relationship states')).toBeInTheDocument()
    expect(within(stateSection).getByText('Connected')).toBeInTheDocument()
    expect(within(stateSection).getByText('Pending')).toBeInTheDocument()
    expect(within(stateSection).getByText('Anonymous')).toBeInTheDocument()
  })
})
